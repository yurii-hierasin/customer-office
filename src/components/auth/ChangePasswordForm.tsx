import React, {useRef, useState} from 'react';
import {PasswordField} from './PasswordField';

export const ChangePasswordForm = () => {
    const [isValid, setValid] = useState(false)
    const isPasswordValid = useRef(false)
    const [state, setState] = useState({
        passwordCurrent: '',
        password: '',
    })
    const classes = isValid ? 'was-validated' : 'needs-validation'

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, isValid: boolean = false): void => {
        const {name, value} = event.target

        if (name === 'password' && isValid) {
            isPasswordValid.current = true
        }

        setState(prevState => ({
            ...prevState,
            [name]: value
            })
        )
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const form = e.currentTarget
        if (form.checkValidity() && isPasswordValid.current) {
            e.stopPropagation()
            //dispatch(requestSignUp(state))
            alert('all is valid, send request to change the password (TODO)')
        }

        setValid(true)
    }

    return (
        <form onSubmit={handleSubmit} className={classes} noValidate>
            <div className="form-group">
                <label htmlFor="passwordCurrent">Current password</label>
                <input
                    type="password"
                    name="passwordCurrent"
                    value={state.passwordCurrent}
                    className="form-control"
                    id="passwordCurrent"
                    onChange={handleChange}
                    required
                />
            </div>
            <PasswordField label={'New password'} password={state.password} handleChange={handleChange}/>

            <button className="btn btn-primary" type="submit">Change</button>
        </form>
    )
}
