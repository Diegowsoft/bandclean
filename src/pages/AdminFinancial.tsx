import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface FinancialData {
  total_faturamento: number;
  total_lucro: number;
  total_a_pagar: number;
}

interface MonthlyData {
  month: string;
  faturamento: number;
  lucro: number;
  a_pagar: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function AdminFinancial() {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchFinancialData();
  }, [userRole, navigate]);

  const fetchFinancialData = async () => {
    setLoading(true);
    try {
      // Get overall financial data using the database function
      const { data: functionData, error: functionError } = await supabase
        .rpc('get_financial_dashboard');

      if (functionError) throw functionError;

      setFinancialData(functionData as unknown as FinancialData);

      // Get monthly data for charts
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('booking_date, client_value, cleaner_value, profit')
        .order('booking_date', { ascending: true });

      if (bookingsError) throw bookingsError;

      // Process monthly data
      const monthlyMap = new Map<string, MonthlyData>();
      
      bookingsData?.forEach((booking) => {
        const date = new Date(booking.booking_date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const monthLabel = date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });

        if (!monthlyMap.has(monthKey)) {
          monthlyMap.set(monthKey, {
            month: monthLabel,
            faturamento: 0,
            lucro: 0,
            a_pagar: 0,
          });
        }

        const current = monthlyMap.get(monthKey)!;
        current.faturamento += Number(booking.client_value);
        current.lucro += Number(booking.profit || 0);
        current.a_pagar += Number(booking.cleaner_value);
      });

      const sortedMonthly = Array.from(monthlyMap.values())
        .sort((a, b) => a.month.localeCompare(b.month))
        .slice(-6); // Last 6 months

      setMonthlyData(sortedMonthly);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar dados financeiros',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  const pieData = [
    { name: 'Faturamento Total', value: financialData?.total_faturamento || 0 },
    { name: 'Lucro', value: financialData?.total_lucro || 0 },
    { name: 'A Pagar', value: financialData?.total_a_pagar || 0 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-4xl font-bold">Dashboard Financeiro</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{(financialData?.total_faturamento || 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Valor total faturado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lucro Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                €{(financialData?.total_lucro || 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Lucro líquido
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">A Pagar Profissionais</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                €{(financialData?.total_a_pagar || 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Valores pendentes
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Evolução Mensal</CardTitle>
              <CardDescription>Últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => `€${value.toFixed(2)}`}
                  />
                  <Legend />
                  <Bar dataKey="faturamento" fill="#0088FE" name="Faturamento" />
                  <Bar dataKey="lucro" fill="#00C49F" name="Lucro" />
                  <Bar dataKey="a_pagar" fill="#FFBB28" name="A Pagar" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição Financeira</CardTitle>
              <CardDescription>Totais acumulados</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `€${value.toFixed(2)}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
