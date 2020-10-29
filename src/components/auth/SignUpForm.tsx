import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {requestSignUp} from '../../store/auth/actions';
import {ISignUpData} from '../../interfaces/signUp';
import {RootState} from '../../store';
import {SIGN_UP_REQUEST} from '../../store/auth/types';
import {checkIfLoading} from '../../store/ui/selectors';
import {PasswordField} from './PasswordField';

const SignUpForm: React.FC = () => {
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false)
    const isPasswordValid = useRef(false)
    const [state, setState] = useState<ISignUpData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const isLoading = useSelector(((state: RootState) => checkIfLoading(state, [SIGN_UP_REQUEST])))

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, isValid: boolean = false): void => {
        const {name, value} = event.currentTarget

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'password' && isValid) {
            isPasswordValid.current = true
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const form = e.currentTarget
        if (form.checkValidity() && isPasswordValid.current) {
            e.stopPropagation()
            dispatch(requestSignUp(state))
        }

        setValidated(true)
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
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="first-name">First name</label>
                    <input type="text"
                           id="first-name"
                           name="firstName"
                           value={state.firstName}
                           className="form-control"
                           placeholder="Jane"
                           onChange={handleChange}
                           ref={firstNameInput}
                           required
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="last-name">Last name</label>
                    <input type="text"
                           id="last-name"
                           name="lastName"
                           value={state.lastName}
                           className="form-control"
                           placeholder="Smith"
                           onChange={handleChange}
                           required
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email"
                       name="email"
                       value={state.email}
                       className="form-control"
                       placeholder="jane.smith@gmail.com"
                       id="exampleInputEmail1"
                       aria-describedby="emailHelp"
                       onChange={handleChange}
                       required
                />
            </div>

            <PasswordField label={'Password'} password={state.password} handleChange={handleChange}/>

            <button type="submit" className="btn btn-lg btn-block btn-primary mt-3" disabled={isLoading}>
                {isLoading
                    ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                    : ''}
                Submit
            </button>

            <div className="text-center mt-2">
                <Link to="/sign-in">Sign in</Link>
            </div>
        </form>
    )
}

export default SignUpForm
