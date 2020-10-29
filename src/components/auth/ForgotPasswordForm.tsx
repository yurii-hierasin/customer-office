import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {requestForgotPassword} from '../../store/auth/actions';

const ForgotPasswordForm: React.FC = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState({email: ''})
    const email = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (email && email.current) {
            email.current.focus()
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const [validated, setValidated] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (e.currentTarget.checkValidity()) {
            dispatch(requestForgotPassword(state.email))
        }
        setValidated(true)
    }

    return (
        <>
            <p>Enter email address you used to register</p>
            <form
                className={validated ? 'was-validated' : 'needs-validation'}
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="form-row">
                    <div className="form-group col-md-9">
                        <input type="email"
                               name="email"
                               className="form-control w-100"
                               placeholder="jane.smith@gmail.com"
                               ref={email}
                               value={state.email}
                               onChange={handleInputChange}
                               required
                        />
                    </div>
                    <div className="form-group col-md-3">
                        <button type="submit" className="btn btn-primary btn-block">Send</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ForgotPasswordForm
