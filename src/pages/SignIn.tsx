import React, {useState} from 'react';
import SignInForm from '../components/auth/SignInForm';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import {Link} from 'react-router-dom';

const SignIn: React.FC = () => {
    const [state, setState] = useState({
        showForgotPassword: false
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setState(state => ({
            ...state,
            showForgotPassword: !state.showForgotPassword
        }))
    }

    return (
        <div className="container mt-3" style={{maxWidth: '400px'}}>
            <SignInForm/>

            <div className="text-center mt-2">
                <Link to="/sign-up">Sign up</Link>
                <span className="p-2">|</span>
                <span className="btn btn-link pl-0" onClick={handleClick}>Forgot password</span>
            </div>

            {state.showForgotPassword &&
                <div className="mt-2">
                    <ForgotPasswordForm/>
                </div>
            }

        </div>
    )
}

export default SignIn;
