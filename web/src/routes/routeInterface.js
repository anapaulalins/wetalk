import React from 'react'
import { Route, Redirect} from 'react-router-dom'
import { useAuth } from '../hooks/Auth'


const RouteInterface = ({ isPrivate = false, component: Component, ...rest}) => {

    const { user } = useAuth()

    return (
        <Route 
        {...rest} 
        render={({location}) => {
            return isPrivate === !!user ? (
                <Component />
            ) : (
                <Redirect to={{
                    pathname: isPrivate ? '/' : '/window',
                    state: {from: location}
                }} />
            )
        }} 
        />
    )
}

export default RouteInterface