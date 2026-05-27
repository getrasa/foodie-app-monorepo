import type { Request } from 'express';

export interface AuthContext {
  userId: string;
  email: string;
  name: string;
}

export interface RequestWithAuth extends Request {
  auth: AuthContext;
}
