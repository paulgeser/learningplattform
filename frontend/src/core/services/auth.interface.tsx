import { BehaviorSubject, Observable } from "rxjs";
import { AuthStatus } from "../model/auth-status.enum";

/**
 * This interface defines which methods need to be
 * implemented in the datastore service.
 */
export interface AuthService {
    setUserLoggedIn: (loggedIn: AuthStatus) => void;
    userLoggedIn$: Observable<AuthStatus>;
    checkLogin: () => void;
    login: (username: string, password: string) => Promise<void | Response>;
}