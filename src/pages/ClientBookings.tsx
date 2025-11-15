import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, MapPin, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Booking {
  id: string;
  booking_date: string;
  status: string;
  client_value: number;
  services: {
    name: string;
    description: string | null;
  };
  addresses: {
    street: string | null;
    city: string | null;
    state: string | null;
  } | null;
  cleaners: {
    name: string;
  } | null;
}

const statusMap = {
  pending: { label: 'Pendente', variant: 'secondary' as const },
  confirmed: { label: 'Confirmado', variant: 'default' as const },
  completed: { label: 'Concluído', variant: 'outline' as const },
  cancelled: { label: 'Cancelado', variant: 'destructive' as const },
};

export default function ClientBookings() {
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (userRole !== 'client') {
      navigate('/dashboard');
      return;
    }
    fetchBookings();
  }, [userRole, navigate, user]);

  const fetchBookings = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // First get the client id
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (clientError) throw clientError;

      // Then get bookings
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          booking_date,
          status,
          client_value,
          services (
            name,
            description
          ),
          addresses (
            street,
            city,
            state
          ),
          cleaners (
            name
          )
        `)
        .eq('client_id', clientData.id)
        .order('booking_date', { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar agendamentos',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId);

    if (error) {
      toast({
        title: 'Erro ao cancelar agendamento',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Agendamento cancelado com sucesso',
      });
      fetchBookings();
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-4xl font-bold">Meus Agendamentos</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmados</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelados</TabsTrigger>
          </TabsList>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBookings.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Nenhum agendamento encontrado
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {booking.services.name}
                      </CardTitle>
                      <Badge variant={statusMap[booking.status as keyof typeof statusMap]?.variant || 'secondary'}>
                        {statusMap[booking.status as keyof typeof statusMap]?.label || booking.status}
                      </Badge>
                    </div>
                    {booking.services.description && (
                      <CardDescription>{booking.services.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>
                        {format(new Date(booking.booking_date), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                      </span>
                    </div>

                    {booking.addresses && (
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <span>
                          {booking.addresses.street}, {booking.addresses.city} - {booking.addresses.state}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">
                        €{booking.client_value.toFixed(2)}
                      </span>
                    </div>

                    {booking.cleaners && (
                      <div className="text-sm text-muted-foreground">
                        Profissional: {booking.cleaners.name}
                      </div>
                    )}

                    {booking.status === 'pending' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancelar Agendamento
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
