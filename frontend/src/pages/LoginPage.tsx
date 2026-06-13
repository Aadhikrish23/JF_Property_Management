import React, { useState } from 'react';
import { Input, Button, Card } from '../components';
import { useLogin } from '../features/auth';

export function LoginPage() {
  const [email, setEmail] = useState('agent@crm.local');
  const [password, setPassword] = useState('demo123');
  
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl mb-4">
            JF
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in to your account</h2>
        </div>
        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            {loginMutation.isError && (
              <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                {(loginMutation.error as any).response?.data?.error || 'Failed to login'}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
            </Button>
            
            <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
              <span className="font-semibold block mb-1">Demo Credentials:</span>
              <div className="grid grid-cols-3 gap-1 mb-1 font-mono text-[10px]">
                <div>manager@crm.local</div>
                <div>agent@crm.local</div>
                <div>admin@crm.local</div>
              </div>
              Password: <b className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">demo123</b>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
