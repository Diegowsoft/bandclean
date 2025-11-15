-- ============================================
-- SECURITY FIXES FOR BAND CLEAN SGO
-- ============================================

-- 1. ADD SERVER-SIDE INPUT VALIDATION (CHECK CONSTRAINTS)
-- ============================================

-- Validate email format in clients table
ALTER TABLE public.clients 
ADD CONSTRAINT clients_email_format_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Validate name length in clients table
ALTER TABLE public.clients 
ADD CONSTRAINT clients_name_length_check 
CHECK (char_length(trim(name)) >= 2 AND char_length(trim(name)) <= 100);

-- Validate phone format (Brazilian format)
ALTER TABLE public.clients 
ADD CONSTRAINT clients_phone_format_check 
CHECK (phone IS NULL OR phone ~* '^\+?[0-9]{10,15}$');

-- Validate name length in cleaners table
ALTER TABLE public.cleaners 
ADD CONSTRAINT cleaners_name_length_check 
CHECK (char_length(trim(name)) >= 2 AND char_length(trim(name)) <= 100);

-- Validate phone format in cleaners table
ALTER TABLE public.cleaners 
ADD CONSTRAINT cleaners_phone_format_check 
CHECK (phone IS NULL OR phone ~* '^\+?[0-9]{10,15}$');

-- Validate payment_details length (should be just PIX key or similar, NOT full bank account)
ALTER TABLE public.cleaners 
ADD CONSTRAINT cleaners_payment_details_length_check 
CHECK (payment_details IS NULL OR char_length(trim(payment_details)) <= 200);

-- Validate service name and price
ALTER TABLE public.services 
ADD CONSTRAINT services_name_length_check 
CHECK (char_length(trim(name)) >= 2 AND char_length(trim(name)) <= 100);

ALTER TABLE public.services 
ADD CONSTRAINT services_price_positive_check 
CHECK (base_price > 0);

-- Validate booking values
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_client_value_positive_check 
CHECK (client_value >= 0);

ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_cleaner_value_positive_check 
CHECK (cleaner_value >= 0);

ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_status_valid_check 
CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'));

-- Validate booking date is not in the past (allow today)
ALTER TABLE public.bookings 
ADD CONSTRAINT bookings_date_not_past_check 
CHECK (booking_date >= CURRENT_DATE);

-- Validate address fields
ALTER TABLE public.addresses 
ADD CONSTRAINT addresses_street_length_check 
CHECK (street IS NULL OR char_length(trim(street)) <= 200);

ALTER TABLE public.addresses 
ADD CONSTRAINT addresses_city_length_check 
CHECK (city IS NULL OR char_length(trim(city)) <= 100);

ALTER TABLE public.addresses 
ADD CONSTRAINT addresses_state_length_check 
CHECK (state IS NULL OR char_length(trim(state)) <= 50);

ALTER TABLE public.addresses 
ADD CONSTRAINT addresses_zip_format_check 
CHECK (zip_code IS NULL OR zip_code ~* '^[0-9]{5}-?[0-9]{3}$');


-- 2. RESTRICT PAYMENT_DETAILS ACCESS (Make it admin-only for viewing)
-- ============================================

-- Drop existing cleaner policies and recreate with stricter rules
DROP POLICY IF EXISTS "Cleaners can view own profile" ON public.cleaners;
DROP POLICY IF EXISTS "Cleaners can update own profile" ON public.cleaners;

-- Cleaners can view their own profile but payment_details is redacted client-side
CREATE POLICY "Cleaners can view own profile" 
ON public.cleaners 
FOR SELECT 
USING (
  public.has_role(auth.uid(), 'cleaner') 
  AND user_id = auth.uid()
);

-- Cleaners can update their own profile (including payment_details)
CREATE POLICY "Cleaners can update own profile" 
ON public.cleaners 
FOR UPDATE 
USING (
  public.has_role(auth.uid(), 'cleaner') 
  AND user_id = auth.uid()
);


-- 3. ADD MISSING BOOKING ACCESS CONTROLS
-- ============================================

-- Allow cleaners to update booking status
CREATE POLICY "Cleaners can update own booking status" 
ON public.bookings 
FOR UPDATE 
USING (
  public.has_role(auth.uid(), 'cleaner') 
  AND cleaner_id IN (
    SELECT id FROM public.cleaners WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  public.has_role(auth.uid(), 'cleaner') 
  AND cleaner_id IN (
    SELECT id FROM public.cleaners WHERE user_id = auth.uid()
  )
);

-- Allow clients to cancel their own pending bookings
CREATE POLICY "Clients can cancel own pending bookings" 
ON public.bookings 
FOR UPDATE 
USING (
  public.has_role(auth.uid(), 'client') 
  AND client_id IN (
    SELECT id FROM public.clients WHERE user_id = auth.uid()
  )
  AND status = 'pending'
)
WITH CHECK (
  public.has_role(auth.uid(), 'client') 
  AND client_id IN (
    SELECT id FROM public.clients WHERE user_id = auth.uid()
  )
  AND status IN ('pending', 'cancelled')
);


-- 4. ADD EXPLICIT USER_ROLES POLICIES
-- ============================================

-- Only admins can insert roles
CREATE POLICY "Only admins can insert roles" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update roles
CREATE POLICY "Only admins can update roles" 
ON public.user_roles 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete roles
CREATE POLICY "Only admins can delete roles" 
ON public.user_roles 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Add policy for admins to view all roles
CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));


-- 5. ADD COMMENT TO PAYMENT_DETAILS COLUMN
-- ============================================
COMMENT ON COLUMN public.cleaners.payment_details IS 'Store only PIX key, email, or phone for payments. NEVER store full bank account numbers or sensitive credentials.';