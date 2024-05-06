import { BehaviorSubject, Observable } from "rxjs";
import { AuthStatus } from "../enum/auth-status.enum";
import { AppRole } from "../enum/app-role.enum";

/**
 * This interface defines which methods need to be
 * implemented in the datastore service.
 */
export interface AuthService {
    setUserLoggedIn: (loggedIn: AuthStatus) => void;
    userLoggedIn$: Observable<AuthStatus>;
    setUserRole: (userAppRole: AppRole) => void;
    userRole$: Observable<AppRole | null>;
    checkLogin: () => void;
    login: (username: string, password: string) => Promise<void | Response>;
}