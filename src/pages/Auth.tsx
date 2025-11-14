import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

const signupSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  role: z.enum(['admin', 'cleaner', 'client']),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'client',
    },
  });

  const onLogin = async (data: LoginFormData) => {
    const { error } = await signIn(data.email, data.password);
    if (error) {
      toast({
        title: 'Erro ao fazer login',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      navigate('/dashboard');
    }
  };

  const onSignup = async (data: SignupFormData) => {
    const { error } = await signUp(data.email, data.password, data.name, data.role);
    if (error) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Conta criada com sucesso!',
        description: 'Você pode fazer login agora.',
      });
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? 'Login' : 'Criar Conta'}</CardTitle>
          <CardDescription>
            {isLogin
              ? 'Entre com suas credenciais para acessar o sistema'
              : 'Preencha os dados para criar sua conta'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...loginForm.register('email')}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  {...loginForm.register('password')}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
              <p className="text-center text-sm">
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-primary hover:underline"
                >
                  Criar conta
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  {...signupForm.register('name')}
                />
                {signupForm.formState.errors.name && (
                  <p className="text-sm text-destructive">{signupForm.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="seu@email.com"
                  {...signupForm.register('email')}
                />
                {signupForm.formState.errors.email && (
                  <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Senha</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••"
                  {...signupForm.register('password')}
                />
                {signupForm.formState.errors.password && (
                  <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Tipo de Usuário</Label>
                <Select
                  onValueChange={(value) => signupForm.setValue('role', value as any)}
                  defaultValue="client"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Cliente</SelectItem>
                    <SelectItem value="cleaner">Profissional de Limpeza</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Criar Conta
              </Button>
              <p className="text-center text-sm">
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-primary hover:underline"
                >
                  Fazer login
                </button>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
