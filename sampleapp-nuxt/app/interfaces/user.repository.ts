import { User } from '../models/user.entity';
import type { BaseRepository } from './base.repository'

export interface UserRepository extends BaseRepository<User> {}
