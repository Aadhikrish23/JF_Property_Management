import { useMutation } from '@tanstack/react-query';
import { login } from './api';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { loginState } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: Record<string, string>) => login(email, password),
    onSuccess: (response) => {
      loginState(response.data.user, response.data.token);
      navigate('/', { replace: true });
    },
  });
};
