import React, {useState} from 'react';
import './emailNotificationsForm.css'

const n10nModes = [
    {
        label: 'Send all application status updates to me only',
        value: 'account_holder',
    },
    {
        label: 'Send all application status updates to applicants only',
        value: 'active_applicant',
    },
    {
        label: 'Send all application status updates to both me and applicants',
        value: 'account_and_applicant',
    },
    {
        label: 'Send all application status updates to an alternative email address',
        value: 'alternative',
    },
]

interface IEmail {
    value: string
    key: number
}

const EmailNotificationsForm = () => {
    const [state, setState] = useState<IEmail[]>([])
    const [isValidated, setValidated] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault()
        if (state.length >= 5) return

        setState((prevState) => {
            return [
                ...prevState, {value: '', key: new Date().getTime()}
            ]
        })
    }

    const classes = isValidated ? 'was-validated' : 'needs-validation'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: number): void => {
        const value = e.target.value
        setState(prevState => prevState.map(el => el.key === key ? {...el, value} : el))
    }

    const handleRemoveEmail = (key: number): void => {
        setState(prevState => prevState.filter(el => el.key !== key))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const form = e.currentTarget
        if (form.checkValidity()) {
            e.stopPropagation()
            // dispatch(requestSignUp(state))
            alert('dispatch change emails (TODO) ' + JSON.stringify(state))
        }

        setValidated(true)
    }

    return (
        <form onSubmit={handleSubmit} className={classes} noValidate>
            <div className="form-group">
                <label htmlFor="notification-mode">
                    Notification Mode
                </label>
                <select className="form-control" name="notificationMode" id="notification-mode">
                    {n10nModes.map(mode => (
                        <option value={mode.value} key={mode.value}>{mode.label}</option>
                    ))}
                </select>
            </div>

            <a href="#" title="Placeholder link title" className="text-decoration-none" onClick={handleClick}>
                <svg width="1em" height="1em" viewBox="0 0 16 16"
                     className="bi bi-plus-circle mb-1" fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fillRule="evenodd"
                          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                <span className="pl-1">Add email</span>
            </a>

            {state.length ? <p>Additional Email ({state.length} of 5 used)</p> : ''}
            {state.map(email => {
                return (
                    <div className="row" key={email.key}>
                        <div className="col-11">
                            <div className="form-group">
                                <input
                                    id="email"
                                    type="email"
                                    name={`email${email.key}`}
                                    onChange={(e) => handleChange(e, email.key)}
                                    placeholder="Email"
                                    value={email.value} className="form-control"
                                    required
                                    aria-describedby="emailHelp"/>
                            </div>
                        </div>
                        <div className="col-1 p-0" onClick={() => handleRemoveEmail(email.key)}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16"
                                 className="bi bi-plus-circle remove-email-icon" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path fillRule="evenodd"
                                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </div>
                    </div>
                )
            })}

            {state.length ? <button type="submit" className="btn btn-primary">Submit</button> : ''}

        </form>
    )
}

export default EmailNotificationsForm
