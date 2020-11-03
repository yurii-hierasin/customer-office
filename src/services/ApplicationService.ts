import {IDestination, IServiceListItem, IVisaGroup} from '../store/retail/interfaces';

export default class ApplicationService {

    constructor(
        private application: IServiceListItem,
    ) {
    }

    getCreatedDate(locale: string): string {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }

        return new Intl.DateTimeFormat(locale, options).format(new Date(this.application.created))
    }

    getServiceDescription(
        visaGroups: IVisaGroup[],
        destinations: IDestination[],
    ): string {
        const description = []

        if (this.application.cost_list.keys.visa_type) {
            description.push(this.application.cost_list.keys.visa_type.name)

            const visaGroup = visaGroups.find(group => group.id === this.application.service_item.visa_group)
            visaGroup && description.push(visaGroup.label)
        }

        if (this.application.service.keys.includes('destination')) {
            const destination = destinations.find(dest => dest.alpha2 === this.application.service_item.destination)
            destination && description.push(destination.label)
        }

        return description.join(' / ')
    }

    getFullName(): string {
        return [
            this.application.key_questions['first-name'] || '',
            this.application.key_questions['last-name'] || '',
        ].join(' ')
    }

    getTotal(): string {
        return `${this.application.total.toFixed(2)} ${this.application.currency.code}`
    }

}
