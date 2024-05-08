import { BehaviorSubject, Observable } from "rxjs";
import { AuthStatus } from "../enum/auth-status.enum";
import { AppRole } from "../enum/app-role.enum";
import { CheckLoginResponse } from "../model/check-login-response.model";
import { AxiosResponse } from "axios";
import { BasicUser } from "../model/basic-user.model";

/**
 * This interface defines which methods need to be
 * implemented in the datastore service.
 */
export interface AuthService {
    setUserLoggedIn: (loggedIn: AuthStatus) => void;
    userLoggedIn$: Observable<AuthStatus>;
    setUserRole: (userAppRole: AppRole) => void;
    userRole$: Observable<AppRole | null>;
    setUser: (user: BasicUser) => void;
    user$: Observable<BasicUser | null>;
    checkLogin: () => void;
    login: (username: string, password: string) => Promise<AxiosResponse<CheckLoginResponse> | void>;
    logout: () => Promise<AxiosResponse<any> | void | undefined>;
}