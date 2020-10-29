import React from 'react';
import SignUpForm from '../components/auth/SignUpForm';

const SignUp: React.FC = () => {
    return (
        <div className="container mt-3" style={{maxWidth: '400px'}}>
            <SignUpForm/>
        </div>
    )
}

export default SignUp
