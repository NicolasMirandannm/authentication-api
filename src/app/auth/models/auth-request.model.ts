import { Request } from 'express';
import { UserEntity } from 'src/models/user.entity';

export interface AuthRequest extends Request {
  user: UserEntity;
}
