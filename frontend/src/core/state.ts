import React from "react"
import { CreateAuthService } from "./services/auth.service";


// Create new instances of services
export const errorServiceInstance = CreateAuthService();

// Create state object
export const state = {
    authServiceInstance: errorServiceInstance
}

// Create a react context with defined state
export const StateContext = React.createContext(state)
