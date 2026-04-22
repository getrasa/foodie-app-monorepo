// import { Loaded } from '@mikro-orm/core';
// import { User } from '../entities/user.entity';

// export interface AuthSession {
//   user: {
//     id: string;
//     email: string;
//     name: string;
//   };
//   token: string;
//   expiresAt: Date;
// }

// export interface AuthContext {
//   session: AuthSession;
//   user: Loaded<User, 'patreonMember.tier'> | null;
//   isAdmin: boolean;
//   userTierId: string | undefined;
// }

// export interface RequestWithAuth extends Request {
//   auth: AuthContext;
// }
