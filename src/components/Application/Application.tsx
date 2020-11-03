import React from 'react';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import {IDestination, IServiceListItem, IVisaGroup} from '../../store/retail/interfaces';
import ApplicationService from '../../services/ApplicationService';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import StatusesService from '../../services/StatusesService';
import './index.scss'


interface IApplicationProps {
    application: IServiceListItem
    visaGroups: IVisaGroup[]
    destinations: IDestination[]
    paymentStatus: string
}

const Application = ({application, visaGroups, destinations, paymentStatus}: IApplicationProps) => {
    const locale = useSelector((state: RootState) => state.app.initOptions.locale)
    const applicationService = new ApplicationService(application)
    const createdDate = applicationService.getCreatedDate(locale)
    const description = applicationService.getServiceDescription(
        visaGroups,
        destinations
    )

    const statusesService = new StatusesService()
    const getClassName = (): string => {
        const classes = ['btn']
        classes.push(['cancelled', 'denied'].includes(application.status) ? 'btn-danger' : 'btn-success')

        return classes.join(' ')
    }

    return (
        <div className="card mt-3 p-2">
            <div className="row">
                <div data-test="date" className="col-md">{createdDate}</div>
                <div data-test="desc" className="col-md col-lg-3">{description}</div>
                <div className="col-md col-lg-2">
                    <span data-test="service-label">{application.service.label}</span>
                    for
                    <span data-test="applicant-full-name">{applicationService.getFullName()}</span>
                </div>
                <div data-test="status" className="col-md-2">
                    <button data-test="btn-status" type="button" className={getClassName()}>
                        {statusesService.searchStatus(application.status).description}
                    </button>
                </div>
                <div className="col-md col-lg-2">
                    <div data-test="price">{applicationService.getTotal()}</div>
                    <div>{paymentStatus}</div>
                </div>
                <div className="pr-2 context-dropdown-wrapper">
                    <DropdownButton drop="left" title={
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-three-dots-vertical mb-1"
                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>
                    }>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </div>
    )
}

export default Application
