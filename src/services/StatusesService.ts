import {IApplicationStatus} from '../interfaces/ApplicationStatus'

export default class StatusesService {
    static statuses: Array<IApplicationStatus> = [
        {
            'status': 'pending',
            'description': 'Waiting for documents'
        },
        {
            'status': 'incomplete',
            'description': 'Incomplete / Continue'
        },
        {
            'status': 'received',
            'description': 'Documents received'
        },
        {
            'status': 'prepared',
            'description': 'Documents received'
        },
        {
            'status': 'submitted',
            'description': 'Application submitted'
        },
        {
            'status': 'completed',
            'description': 'Order completed'
        },
        {
            'status': 'cancelled',
            'description': 'Application is cancelled'
        },
        {
            'status': 'problems',
            'description': 'Problems with application'
        },
        {
            'status': 'denied',
            'description': 'Application is denied'
        }
    ]

    searchStatus(status: string): IApplicationStatus {
        let foundStatus = {
            status: '',
            description: ''
        };

        StatusesService.statuses.forEach((statusObj) => {
            if (statusObj.status === status) {
                foundStatus = statusObj;
            }
        });

        return foundStatus;
    }

}
