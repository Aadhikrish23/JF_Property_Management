

import { prisma } from '../../config/prisma.config';
import { sign } from '../../utils/jwt.utils';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const hashedPassword = hashPassword(password);

    if (hashedPassword !== user.password) {
      throw new Error('Invalid credentials');
    }

    const token = sign({ id: user.id, email: user.email, role: user.role });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }
}

export const authService = new AuthService();
