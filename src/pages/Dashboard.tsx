import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Band Clean - SGO</h1>
            <p className="text-muted-foreground mt-2">
              Bem-vindo, {user?.email} ({userRole})
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            Sair
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userRole === 'admin' && (
            <>
              <Button
                onClick={() => navigate('/clients')}
                className="h-32 text-lg"
                variant="outline"
              >
                Gerenciar Clientes
              </Button>
              <Button
                onClick={() => navigate('/cleaners')}
                className="h-32 text-lg"
                variant="outline"
              >
                Gerenciar Profissionais
              </Button>
              <Button
                onClick={() => navigate('/services')}
                className="h-32 text-lg"
                variant="outline"
              >
                Gerenciar Serviços
              </Button>
              <Button
                onClick={() => navigate('/bookings')}
                className="h-32 text-lg"
                variant="outline"
              >
                Agendamentos
              </Button>
              <Button
                onClick={() => navigate('/financial')}
                className="h-32 text-lg"
                variant="outline"
              >
                Dashboard Financeiro
              </Button>
            </>
          )}
          
          {userRole === 'cleaner' && (
            <Button
              onClick={() => navigate('/my-schedule')}
              className="h-32 text-lg"
              variant="outline"
            >
              Minha Agenda
            </Button>
          )}
          
          {userRole === 'client' && (
            <>
              <Button
                onClick={() => navigate('/my-bookings')}
                className="h-32 text-lg"
                variant="outline"
              >
                Meus Agendamentos
              </Button>
              <Button
                onClick={() => navigate('/new-booking')}
                className="h-32 text-lg"
              >
                Novo Agendamento
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
