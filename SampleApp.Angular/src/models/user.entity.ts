import { Base } from './base.entity';

export default interface User extends Base {
  name: string;
  login: string;
  avatar: string;
  token: string;
}
