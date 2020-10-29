import React, {useEffect, useState} from 'react';
import {IPwdStrengthLevel} from '../../interfaces';
import {preparePwdStrengthResult, strengthLevels} from '../../services/checkPassword';
import PasswordRequirements from '../password_requirements/PasswordRequirements';

const taiPasswordStrength = require("tai-password-strength");
const strengthTester = new taiPasswordStrength.PasswordStrength();

interface IPasswordField {
    label: string
    password: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, isValid: boolean) => void
}

export const PasswordField = (props: IPasswordField) => {
    const {label, password, handleChange} = props
    const [showPwd, setShowPwd] = useState(false)
    const [strength, setStrength] = useState<IPwdStrengthLevel>(strengthLevels.SHORT)
    const [validation, setValidation] = useState({
        lower: false,
        number: false,
        symbol: false,
        upper: false,
        all: false,
    })

    useEffect(() => {
        const results = strengthTester.check(password)
        const prepared = preparePwdStrengthResult(results.charsets)
        const code = password.length < 8 ? 'SHORT' : results.strengthCode

        setValidation(prepared)
        setStrength(strengthLevels[code])
    }, [password])

    return (
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">{label}</label>
            <div className="input-group mb-3">
                <input type={showPwd ? 'text' : 'password'}
                       name="password"
                       value={password}
                       className="form-control"
                       placeholder="6UdC9Ldn?tYE~&$8"
                       id="exampleInputPassword1"
                       pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}|?><~]).{8,}"
                       onChange={(event) => handleChange(event, validation.all)}
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

                <div className="form-group">
                    <PasswordRequirements validation={validation}/>
                </div>
            </div>
        </div>
    )
}
