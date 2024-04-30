import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.interface';
import { AuthStatus } from '../model/auth-status.enum';
import { Constants } from '../constants';

/**
 * This function creates a new instance of the auth service.
 * 
 * @returns {AuthService} An instance of the datastore service
 */
export const CreateAuthService = (): AuthService => {

    // Define variables
    const userLoggedIn: BehaviorSubject<AuthStatus> = new BehaviorSubject<AuthStatus>(AuthStatus.CONFIG_LOADING);

    /**
     * This function sets the user logged in value.
     * 
     * @param {string} loggedIn New logged in value
     */
    const setUserLoggedIn = (loggedIn: AuthStatus): void => {
        userLoggedIn.next(loggedIn);
    }

    /**
     * This function checks the login status of the user by sending a test request to the backend
     */
    const checkLogin = (): void => {
        const requestOptions = {
            method: 'GET'
        };
        fetch(`${Constants.url}/auth/check-login`, requestOptions)
            .then(response => {
                console.log();
                if (response.status === 200) {
                    setUserLoggedIn(AuthStatus.LOGGED_IN);
                } else {
                    setUserLoggedIn(AuthStatus.NOT_LOGGED_IN);
                }
            })
            .catch(error => console.warn(error));
    }

    /**
 * This function checks the login status of the user by sending a test request to the backend
 */
    const login = (username: string, password: string): Promise<void | Response> => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
        return fetch(`${Constants.url}/auth/login`, requestOptions)
            .then(response => {
                console.log();
                if (response.status === 200) {
                    setUserLoggedIn(AuthStatus.LOGGED_IN);
                } else {
                    setUserLoggedIn(AuthStatus.NOT_LOGGED_IN);
                }
                return response;
            })
            .catch(error => console.warn(error));
    }


    // Define observable getter constants
    const userLoggedIn$ = userLoggedIn.asObservable();


    // Return implemented methods according to interface model
    return {
        setUserLoggedIn: setUserLoggedIn,
        userLoggedIn$: userLoggedIn$,
        checkLogin: checkLogin,
        login: login
    }
}
