import React, {useEffect, useRef, useState} from 'react';
import {requestSingIn} from '../../store/auth/actions';
import {useDispatch} from 'react-redux';

const SignInForm: React.FC = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        isLoading: false,
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget

        setState(state => ({
            ...state,
            [name]: value
        }))
    }

    const [validated, setValidated] = useState(false)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        if (form.checkValidity()) {
            e.stopPropagation()
            dispatch(requestSingIn(state))
        }

        setValidated(true);
    }

    const classes = validated ? 'was-validated' : 'needs-validation'
    const firstNameInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (firstNameInput && firstNameInput.current) {
            firstNameInput.current.focus()
        }
    }, [])

    return (
        <form onSubmit={handleSubmit} className={classes} noValidate>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email"
                       name="email"
                       value={state.email}
                       placeholder="jane.smith@gmail.com"
                       className="form-control"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       onChange={handleChange}
                       ref={firstNameInput}
                       required
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password"
                       name="password"
                       placeholder="Password"
                       value={state.password}
                       className="form-control"
                       id="exampleInputPassword1"
                       onChange={handleChange}
                       pattern=".{8,}"
                       required
                />
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
            </div>
            <button type="submit" className="btn btn-lg btn-block btn-primary" disabled={state.isLoading}>
                {state.isLoading ?
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> : ''}
                Submit
            </button>


        </form>
    )
}

export default SignInForm;
