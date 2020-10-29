import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {requestSignUp} from '../../store/auth/actions';
import {ISignUpData} from '../../interfaces/signUp';
import {RootState} from '../../store';
import {SIGN_UP_REQUEST} from '../../store/auth/types';
import {checkIfLoading} from '../../store/ui/selectors';
import PasswordRequirements from '../../components/password_requirements/PasswordRequirements';
import {preparePwdStrengthResult, strengthLevels} from '../../services/checkPassword';
import {IPwdStrengthLevel} from '../../interfaces';

const taiPasswordStrength = require("tai-password-strength");
const strengthTester = new taiPasswordStrength.PasswordStrength();

const SignUpForm: React.FC = () => {
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false)
    const [showPwd, setShowPwd] = useState(false)
    const [state, setState] = useState<ISignUpData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const [validation, setValidation] = useState({
        lower: false,
        number: false,
        symbol: false,
        upper: false,
        all: false,
    })
    const [strength, setStrength] = useState<IPwdStrengthLevel>(strengthLevels.SHORT)
    const isLoading = useSelector(((state: RootState) => checkIfLoading(state, [SIGN_UP_REQUEST])))

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.currentTarget

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'password') {
            const results = strengthTester.check(value)
            const prepared = preparePwdStrengthResult(results.charsets)
            const code = value.length < 8 ? 'SHORT' : results.strengthCode

            setValidation(prepared)
            setStrength(strengthLevels[code])
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const form = e.currentTarget
        if (form.checkValidity() && validation.all) {
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

            <label htmlFor="exampleInputPassword1">Password</label>
            <div className="input-group mb-3">
                <input type={showPwd ? 'text' : 'password'}
                       name="password"
                       value={state.password}
                       className="form-control"
                       placeholder="6UdC9Ldn?tYE~&$8"
                       id="exampleInputPassword1"
                       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}|?><~]).{8,}"
                       onChange={handleChange}
                       required
                />

                <div className="input-group-append">
                    <div className="input-group-text inline-group-last-element">
                        <input type="checkbox"
                               aria-label="Show/Hide password"
                               title="Show/Hide password"
                               checked={showPwd}
                               onChange={() => setShowPwd(prev => !prev)}
                        />
                    </div>
                </div>

                <div className="ml-2 pt-1">
                    <div className="text-center">
                        <small className={`text-${strength.color}`}>{strength.label}</small>
                    </div>
                    <div className="progress" style={{width: '100px', height: '5px'}}>
                        <div className={['progress-bar', `bg-${strength.color}`].join(' ')}
                             role='progressbar'
                             aria-valuenow={70}
                             aria-valuemin={0}
                             aria-valuemax={10}
                             style={{width: strength.percents}}/>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <PasswordRequirements validation={validation}/>
            </div>

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
