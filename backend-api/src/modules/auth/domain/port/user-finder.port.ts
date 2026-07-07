import { SignInUser } from '../interface/sign-in-user';

export abstract class UserFinderPort {
    abstract findByEmail(email: string): Promise<SignInUser | null>;
}
