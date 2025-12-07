import User from "./user.entity";

export interface Micropost {
    id: number,
    content: string,
    attachImage?: string,
    userId: number,
    user?: User
}
