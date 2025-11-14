-- Criar enum para roles
CREATE TYPE public.app_role AS ENUM ('admin', 'cleaner', 'client');

-- Criar tabela de roles de usuário (mais seguro que app_metadata)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Habilitar RLS na tabela user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Política: usuários podem ver apenas seus próprios roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Função security definer para verificar roles (evita recursão em RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Tabela: clients (com user_id para vincular ao usuário autenticado)
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    UNIQUE (user_id)
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Políticas para clients
CREATE POLICY "Admins can view all clients"
ON public.clients FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view own profile"
ON public.clients FOR SELECT
USING (public.has_role(auth.uid(), 'client') AND user_id = auth.uid());

CREATE POLICY "Admins can insert clients"
ON public.clients FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can insert own profile"
ON public.clients FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'client') AND user_id = auth.uid());

CREATE POLICY "Admins can update clients"
ON public.clients FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can update own profile"
ON public.clients FOR UPDATE
USING (public.has_role(auth.uid(), 'client') AND user_id = auth.uid());

-- Tabela: addresses
CREATE TABLE public.addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
    street TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT
);

ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;

-- Políticas para addresses
CREATE POLICY "Admins can view all addresses"
ON public.addresses FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view own addresses"
ON public.addresses FOR SELECT
USING (
    public.has_role(auth.uid(), 'client') AND 
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can manage addresses"
ON public.addresses FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can manage own addresses"
ON public.addresses FOR ALL
USING (
    public.has_role(auth.uid(), 'client') AND 
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
);

-- Tabela: cleaners (com user_id para vincular ao usuário autenticado)
CREATE TABLE public.cleaners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT,
    payment_details TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    UNIQUE (user_id)
);

ALTER TABLE public.cleaners ENABLE ROW LEVEL SECURITY;

-- Políticas para cleaners
CREATE POLICY "Admins can view all cleaners"
ON public.cleaners FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Cleaners can view own profile"
ON public.cleaners FOR SELECT
USING (public.has_role(auth.uid(), 'cleaner') AND user_id = auth.uid());

CREATE POLICY "Admins can manage cleaners"
ON public.cleaners FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Cleaners can update own profile"
ON public.cleaners FOR UPDATE
USING (public.has_role(auth.uid(), 'cleaner') AND user_id = auth.uid());

-- Tabela: services
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    base_price NUMERIC NOT NULL
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Políticas para services (todos podem ver, só admin pode gerenciar)
CREATE POLICY "Anyone authenticated can view services"
ON public.services FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Only admins can manage services"
ON public.services FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Tabela: bookings
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_date TIMESTAMPTZ NOT NULL,
    status TEXT DEFAULT 'pending',
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
    address_id UUID REFERENCES public.addresses(id) ON DELETE SET NULL,
    cleaner_id UUID REFERENCES public.cleaners(id) ON DELETE SET NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL NOT NULL,
    client_value NUMERIC NOT NULL DEFAULT 0,
    cleaner_value NUMERIC NOT NULL DEFAULT 0,
    profit NUMERIC DEFAULT 0,
    client_paid BOOLEAN DEFAULT false,
    cleaner_paid BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Políticas para bookings
CREATE POLICY "Admins can view all bookings"
ON public.bookings FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Cleaners can view own bookings"
ON public.bookings FOR SELECT
USING (
    public.has_role(auth.uid(), 'cleaner') AND 
    cleaner_id IN (SELECT id FROM public.cleaners WHERE user_id = auth.uid())
);

CREATE POLICY "Clients can view own bookings"
ON public.bookings FOR SELECT
USING (
    public.has_role(auth.uid(), 'client') AND 
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
);

CREATE POLICY "Admins can manage all bookings"
ON public.bookings FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can create own bookings"
ON public.bookings FOR INSERT
WITH CHECK (
    public.has_role(auth.uid(), 'client') AND 
    client_id IN (SELECT id FROM public.clients WHERE user_id = auth.uid())
);

-- Trigger Function: Calcular lucro automaticamente
CREATE OR REPLACE FUNCTION public.calculate_profit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.profit := COALESCE(NEW.client_value, 0) - COALESCE(NEW.cleaner_value, 0);
    RETURN NEW;
END;
$$;

-- Trigger: Executar antes de INSERT ou UPDATE em bookings
CREATE TRIGGER trigger_calculate_profit
BEFORE INSERT OR UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.calculate_profit();

-- Função RPC: Dashboard Financeiro
CREATE OR REPLACE FUNCTION public.get_financial_dashboard()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result JSON;
BEGIN
    -- Apenas admins podem executar esta função
    IF NOT public.has_role(auth.uid(), 'admin') THEN
        RAISE EXCEPTION 'Access denied. Admin role required.';
    END IF;

    SELECT json_build_object(
        'total_faturamento', COALESCE(SUM(client_value), 0),
        'total_lucro', COALESCE(SUM(profit), 0),
        'total_a_pagar', COALESCE(SUM(CASE WHEN cleaner_paid = false THEN cleaner_value ELSE 0 END), 0)
    )
    INTO result
    FROM public.bookings;

    RETURN result;
END;
$$;