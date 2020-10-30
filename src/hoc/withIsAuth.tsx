import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

export const withIsAuth = (Component: React.ComponentType) => (props: any) => {
    const isAuth = useSelector((state: RootState) => !!state.auth.user?.id)

    return <Component {...props} isAuth={isAuth}/>
}
