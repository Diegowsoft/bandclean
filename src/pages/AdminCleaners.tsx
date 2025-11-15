import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Edit, UserCog } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const cleanerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(100),
  phone: z.string().optional(),
  payment_details: z.string().optional(),
});

interface Cleaner {
  id: string;
  name: string;
  phone: string | null;
  payment_details: string | null;
  user_id: string | null;
}

interface Client {
  id: string;
  name: string;
  email: string | null;
  user_id: string | null;
}

export default function AdminCleaners() {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cleaners, setCleaners] = useState<Cleaner[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPromoteOpen, setIsPromoteOpen] = useState(false);
  const [selectedCleaner, setSelectedCleaner] = useState<Cleaner | null>(null);
  const [selectedClient, setSelectedClient] = useState<string>('');

  const form = useForm<z.infer<typeof cleanerSchema>>({
    resolver: zodResolver(cleanerSchema),
    defaultValues: {
      name: '',
      phone: '',
      payment_details: '',
    },
  });

  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchCleaners();
    fetchClients();
  }, [userRole, navigate]);

  const fetchCleaners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('cleaners')
      .select('*')
      .order('name');

    if (error) {
      toast({
        title: 'Erro ao carregar profissionais',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      setCleaners(data || []);
    }
    setLoading(false);
  };

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .not('user_id', 'is', null)
      .order('name');

    if (error) {
      console.error('Erro ao carregar clientes:', error);
    } else {
      setClients(data || []);
    }
  };

  const onSubmitAdd = async (values: z.infer<typeof cleanerSchema>) => {
    const { data, error } = await supabase
      .from('cleaners')
      .insert([{
        name: values.name,
        phone: values.phone || null,
        payment_details: values.payment_details || null,
      }])
      .select()
      .single();

    if (error) {
      toast({
        title: 'Erro ao adicionar profissional',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Profissional adicionado com sucesso',
      });
      setIsAddOpen(false);
      form.reset();
      fetchCleaners();
    }
  };

  const onSubmitEdit = async (values: z.infer<typeof cleanerSchema>) => {
    if (!selectedCleaner) return;

    const { error } = await supabase
      .from('cleaners')
      .update(values)
      .eq('id', selectedCleaner.id);

    if (error) {
      toast({
        title: 'Erro ao atualizar profissional',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Profissional atualizado com sucesso',
      });
      setIsEditOpen(false);
      setSelectedCleaner(null);
      form.reset();
      fetchCleaners();
    }
  };

  const handlePromoteToRole = async () => {
    if (!selectedClient) return;

    try {
      // Find the client
      const client = clients.find(c => c.id === selectedClient);
      if (!client || !client.user_id) {
        toast({
          title: 'Erro',
          description: 'Cliente não encontrado ou sem usuário associado',
          variant: 'destructive',
        });
        return;
      }

      // Create cleaner profile
      const { data: cleanerData, error: cleanerError } = await supabase
        .from('cleaners')
        .insert([{
          name: client.name,
          phone: null,
          user_id: client.user_id,
        }])
        .select()
        .single();

      if (cleanerError) throw cleanerError;

      // Update user role
      const { error: roleError } = await supabase
        .from('user_roles')
        .update({ role: 'cleaner' })
        .eq('user_id', client.user_id);

      if (roleError) throw roleError;

      toast({
        title: 'Usuário promovido com sucesso',
        description: `${client.name} agora é um profissional de limpeza`,
      });

      setIsPromoteOpen(false);
      setSelectedClient('');
      fetchCleaners();
      fetchClients();
    } catch (error: any) {
      toast({
        title: 'Erro ao promover usuário',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (cleaner: Cleaner) => {
    setSelectedCleaner(cleaner);
    form.reset({
      name: cleaner.name,
      phone: cleaner.phone || '',
      payment_details: cleaner.payment_details || '',
    });
    setIsEditOpen(true);
  };

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
          <h1 className="text-4xl font-bold">Gerenciar Profissionais de Limpeza</h1>
        </div>

        <div className="flex gap-4 mb-6">
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Profissional
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Profissional</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitAdd)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="payment_details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Detalhes de Pagamento (PIX/etc)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="ex: PIX - email@exemplo.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">Adicionar</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={isPromoteOpen} onOpenChange={setIsPromoteOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <UserCog className="mr-2 h-4 w-4" />
                Promover Cliente para Profissional
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Promover Cliente para Profissional</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Selecione o Cliente</Label>
                  <select
                    className="w-full mt-2 p-2 border rounded-md"
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                  >
                    <option value="">Selecione um cliente</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name} ({client.email})
                      </option>
                    ))}
                  </select>
                </div>
                <Button onClick={handlePromoteToRole} className="w-full" disabled={!selectedClient}>
                  Promover para Profissional
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profissionais Cadastrados</CardTitle>
            <CardDescription>
              {cleaners.length} profissional(is) no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Detalhes de Pagamento</TableHead>
                  <TableHead>Usuário Vinculado</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cleaners.map((cleaner) => (
                  <TableRow key={cleaner.id}>
                    <TableCell className="font-medium">{cleaner.name}</TableCell>
                    <TableCell>{cleaner.phone || '-'}</TableCell>
                    <TableCell>{cleaner.payment_details || '-'}</TableCell>
                    <TableCell>{cleaner.user_id ? 'Sim' : 'Não'}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(cleaner)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Profissional</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="payment_details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detalhes de Pagamento (PIX/etc)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="ex: PIX - email@exemplo.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Atualizar</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
