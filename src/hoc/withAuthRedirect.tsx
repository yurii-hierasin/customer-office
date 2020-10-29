import {connect} from 'react-redux';
import {RootState} from '../store';
import {Redirect} from 'react-router-dom';
import React from 'react';
import {RoutesEnum} from '../interfaces/app';

const mapStateToProps = (state: RootState) => ({
    isAuth: !!state.auth.user?.id
})


export const withAuthRedirect = (Component: React.ComponentType) => {

    class RedirectComponent extends React.Component<any, any>{
        static displayName: string;

        render() {
            if (this.props.isAuth) {
                if ([RoutesEnum.SIGN_IN, RoutesEnum.SIGN_UP].includes(this.props.path)) {
                    return <Redirect to={RoutesEnum.PROFILE} />
                }
            } else if (
                !this.props.isAuth
                && [RoutesEnum.PROFILE].includes(this.props.path)
            ) {
                return <Redirect to={RoutesEnum.SIGN_IN} />
            }

            return <Component {...this.props} />
        }
    }

    RedirectComponent.displayName = `RedirectComponent(${Component.displayName || Component.name || 'Component'})`

    return connect(mapStateToProps)(RedirectComponent)
}
