import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.interface';
import { AuthStatus } from '../enum/auth-status.enum';
import { Constants } from '../constants';
import { axiosCall } from './helper';
import { CheckLoginResponse } from '../model/check-login-response.model';
import { AxiosResponse } from 'axios';
import { AppRole } from '../enum/app-role.enum';
import { BasicUser } from '../model/basic-user.model';

/**
 * This function creates a new instance of the auth service.
 * 
 * @returns {AuthService} An instance of the datastore service
 */
export const CreateAuthService = (): AuthService => {

    // Define variables
    const userLoggedIn: BehaviorSubject<AuthStatus> = new BehaviorSubject<AuthStatus>(AuthStatus.CONFIG_LOADING);
    const userRole: BehaviorSubject<AppRole | null> = new BehaviorSubject<AppRole | null>(null);
    const user: BehaviorSubject<BasicUser | null> = new BehaviorSubject<BasicUser | null>(null);

    /**
     * This function sets the user logged in value.
     * 
     * @param {string} loggedIn New logged in value
     */
    const setUserLoggedIn = (loggedIn: AuthStatus): void => {
        userLoggedIn.next(loggedIn);
    }

    /**
     * This function sets the user role value.
     * 
     * @param {AppRole} userRoleValue User role of current logged in user
     */
    const setUserRole = (userRoleValue: AppRole | null): void => {
        userRole.next(userRoleValue);
    }

    /**
     * This function sets the user value.
     * 
     * @param {BasicUser} userValue User of current logged in user
     */
    const setUser = (userValue: BasicUser | null): void => {
        user.next(userValue);
    }

    /**
     * This function checks the login status of the user by sending a test request to the backend
     */
    const checkLogin = (): void => {
        axiosCall({
            method: 'GET',
            url: 'auth/check-login'
        }).then((response: AxiosResponse<any> | undefined) => {
            if (response && response.status === 200) {
                const roleValue = localStorage.getItem(Constants.localStorageItemNames.role);
                const userValue = localStorage.getItem(Constants.localStorageItemNames.user);
                if (roleValue && userValue) {
                    const user: BasicUser = JSON.parse(userValue);
                    setUserRole(roleValue as AppRole);
                    setUser(user);
                    setUserLoggedIn(AuthStatus.LOGGED_IN);
                }
            } else {
                setUserLoggedIn(AuthStatus.NOT_LOGGED_IN);
            }
            return response;
        }).catch(error => console.error(error));
    }

    /**
     * This function checks the login status of the user by sending a test request to the backend
     */
    const login = (username: string, password: string): Promise<AxiosResponse<CheckLoginResponse> | void | any> => {
        return axiosCall({
            method: 'POST',
            url: 'auth/login',
            data: {
                username: username,
                password: password
            },
        }).then((response: AxiosResponse<CheckLoginResponse> | undefined) => {
            if (response && response.status === 201) {
                const appRole = response.data.user.appRole;
                localStorage.setItem(Constants.localStorageItemNames.role, appRole);
                setUserRole(appRole);
                setUserLoggedIn(AuthStatus.LOGGED_IN);
                setUser(response.data.user);
            } else {
                setUserLoggedIn(AuthStatus.NOT_LOGGED_IN);
            }
            return response;
        }).catch(error => console.error(error));
    }

    const logout = (): Promise<AxiosResponse<any> | void | undefined> => {
        setUserRole(null);
        setUserLoggedIn(AuthStatus.NOT_LOGGED_IN);
        setUser(null);
        localStorage.clear();
        return axiosCall({
            method: 'POST',
            url: 'auth/logout',
        }).catch(error => console.error(error));
    }


    // Define observable getter constants
    const userLoggedIn$ = userLoggedIn.asObservable();
    const userRole$ = userRole.asObservable();
    const user$ = user.asObservable();


    // Return implemented methods according to interface model
    return {
        setUserLoggedIn: setUserLoggedIn,
        userLoggedIn$: userLoggedIn$,
        setUserRole: setUserRole,
        userRole$: userRole$,
        setUser: setUser,
        user$: user$,
        checkLogin: checkLogin,
        login: login,
        logout: logout
    }
}
