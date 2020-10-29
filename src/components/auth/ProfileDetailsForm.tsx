import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

const ProfileDetailsForm = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const emailSettings = useSelector((state: RootState) => state.auth.profile?.emails.find(e => e.is_primary))
    const [isValidated, setValidated] = useState(false)
    const [state, setState] = useState({
        email: '',
        firstName: user?.first_name,
        lastName: user?.last_name,
        phone: '',
    })
    const classes = isValidated ? 'was-validated' : 'needs-validation'

    useEffect(() => {
        if (emailSettings?.email) {
            setState(prevState => ({...prevState, email: emailSettings?.email}))
        }
    }, [emailSettings])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target

        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const form = e.currentTarget
        if (form.checkValidity()) {
            e.stopPropagation()
            // dispatch(requestSignUp(state))
            alert('dispatch change profile details (TODO)')
        }

        setValidated(true)
    }

    return (
        <form onSubmit={handleSubmit} className={classes} noValidate>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={state.email} className="form-control"
                    required
                    aria-describedby="emailHelp"/>
            </div>
            <div className="form-group">
                <label htmlFor="first-name">First name</label>
                <input
                    id="first-name"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={state.firstName} className="form-control"
                    required
                    aria-describedby="firstNameHelp"/>
            </div>
            <div className="form-group">
                <label htmlFor="last-name">Last name</label>
                <input
                    id="last-name"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={state.lastName} className="form-control"
                    required
                    aria-describedby="lastNameHelp"/>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    type="tel"
                    name="phone"
                    onChange={handleChange}
                    value={state.phone} className="form-control"
                    aria-describedby="phoneHelp"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default ProfileDetailsForm
