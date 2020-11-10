import React from 'react';
import {IDestination, IOrder, IServiceListItem, IVisaGroup} from '../../store/retail/interfaces';
import ApplicationService from '../../services/ApplicationService';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import StatusesService from '../../services/StatusesService';
import './index.scss'
import ApplicationMenu from './ApplicationMenu/ApplicationMenu';


interface IApplicationProps {
    order: IOrder
    application: IServiceListItem
    visaGroups: IVisaGroup[]
    destinations: IDestination[]
}

const Application = ({order, application, visaGroups, destinations}: IApplicationProps) => {
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
        <div className="card mt-2 p-2">
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
                    <div>{order.status}</div>
                </div>
                <div className="pr-2 context-dropdown-wrapper">
                    <ApplicationMenu order={order} applicationService={applicationService}/>
                </div>
            </div>
        </div>
    )
}

export default Application
