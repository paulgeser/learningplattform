import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.interface';
import { AuthStatus } from '../enum/auth-status.enum';
import { Constants } from '../constants';
import { axiosCall } from './helper';
import { CheckLoginResponse } from '../model/check-login-response.model';
import { AxiosResponse } from 'axios';
import { AppRole } from '../enum/app-role.enum';

/**
 * This function creates a new instance of the auth service.
 * 
 * @returns {AuthService} An instance of the datastore service
 */
export const CreateAuthService = (): AuthService => {

    // Define variables
    const userLoggedIn: BehaviorSubject<AuthStatus> = new BehaviorSubject<AuthStatus>(AuthStatus.CONFIG_LOADING);
    const userRole: BehaviorSubject<AppRole | null> = new BehaviorSubject<AppRole | null>(null);

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
    const setUserRole = (userRoleValue: AppRole): void => {
        userRole.next(userRoleValue);
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
                setUserLoggedIn(AuthStatus.LOGGED_IN);
                const roleValue = localStorage.getItem(Constants.localStorageItemNames.role);
                if (roleValue) {
                    setUserRole(roleValue as AppRole);
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
    const login = (username: string, password: string): Promise<void | any> => {
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
            } else {
                setUserLoggedIn(AuthStatus.NOT_LOGGED_IN);
            }
            return response;
        }).catch(error => console.error(error));
    }


    // Define observable getter constants
    const userLoggedIn$ = userLoggedIn.asObservable();
    const userRole$ = userRole.asObservable();



    // Return implemented methods according to interface model
    return {
        setUserLoggedIn: setUserLoggedIn,
        userLoggedIn$: userLoggedIn$,
        setUserRole: setUserRole,
        userRole$: userRole$,
        checkLogin: checkLogin,
        login: login
    }
}
