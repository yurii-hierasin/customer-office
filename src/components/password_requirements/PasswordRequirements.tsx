import React from 'react';
import './PasswordRequirements.css'
import {IPwdStrength} from '../../interfaces';

interface IProps {
    validation: IPwdStrength
}

const PasswordRequirements: React.FC<IProps> = ({validation}) => {
    const baseClasses = ['list-group-item', 'd-flex align-items-center', 'flex-fill', 'disabled']
    const lowCharClasses = validation.lower ? baseClasses.filter(c => c !== 'disabled') : baseClasses
    const upCharClasses = validation.upper ? baseClasses.filter(c => c !== 'disabled') : baseClasses
    const numberClasses = validation.number ? baseClasses.filter(c => c !== 'disabled') : baseClasses
    const symbolClasses = validation.symbol ? baseClasses.filter(c => c !== 'disabled') : baseClasses

    return (
        <ul className="list-group list-group-horizontal-sm password-requirements">
            <div className="row">
                <div className="col">
                    <li className={lowCharClasses.join(' ')}>
                        <span className="badge badge-success badge-pill mr-1">&nbsp;</span>
                        <small>One lowercase character</small>
                    </li>
                    <li className={upCharClasses.join(' ')}>
                        <span className="badge badge-success badge-pill mr-1">&nbsp;</span>
                        <small>One uppercase character</small>
                    </li>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <li className={symbolClasses.join(' ')}>
                        <span className="badge badge-success badge-pill mr-1">&nbsp;</span>
                        <small>One symbol  e.g. @#$%</small>
                    </li>
                    <li className={numberClasses.join(' ')}>
                        <span className="badge badge-success badge-pill mr-1">&nbsp;</span>
                        <small>One number</small>
                    </li>

                </div>
            </div>
        </ul>
    )
}

export default PasswordRequirements
