export interface IRetailState {
    orders: IOrder[]
    visaGroups: IVisaGroup[]
    destinations: IDestination[]
    citizenships: ICitizenship[]
}

export interface IOrder {
    id: number
    invoice: string
    services?: Array<IService>
    created: string
    updated: string
    status: string
    total: number
    meta_info?: Object
    source: {
        label: string
    } | null
    invoice_url?: string | null
    conclusion_url?: string | null
    shipping_list: IShipment[]
    service_list: Array<IServiceListItem>
}

export interface IServiceListItem {
    id: number
    order_id: number
    currency: ICurrency
    total: number
    created: string
    updated: string
    status: string
    cost_list: {
        keys: {
            proc_time: {
                id: number
                name: string
                days_count: number
            } | null
            visa_type: {
                id: number
                name: string
            } | null
            docs_count: null
            validity: null
        }
        fields: []
    }
    service: IService
    service_item: IServiceItem
    key_questions: any
    meta_info: Object
    tax_rate: number
    conclusion_url: string | null
}

export interface IService {
    id: number;
    label: string
    keys: string[]
    key_questions: {
        entrydate: Array<string>
    };
    status: string;
    agent_id: number;
    meta_info: {
        received_date?: string;
        prepared_date?: string;
        problems_date?: string;
        cancelled_date?: string;
        submitted_date?: string;
        completed_date?: string;
        denied_date?: string;
        pickup_date?: string,
        refund_reason?: string,
        send_refund_reason?: boolean
    };
    service: {
        id: number,
        label: string
    };
    prices: {
        keys: any,
        fields: any
    };
    service_item: IServiceItem;
    currency: {
        code: string
    };
    tax_rate: number;
    total: number;
}

export interface IServiceItem {
    id: number;
    visa_group?: number;
    destination?: string;
    residency?: string;
    citizenship?: string;
    language?: string;
    name?: string;
    price: Array<any>;
}

export interface IShipment {
    id: number;
    order_id: number
    currency: ICurrency
    type: string;
    status: string;
    shipment_name: string;
    from_client: boolean
    recipient: IShipmentAddress | null;
    sender: IShipmentAddress | null;
    total: number;
    default_prices: boolean
    service_name: string
    additional_options: string | null
}

export interface IShipmentAddress {
    street: string;
    province: IProvince;
    postal_code: string;
    country: ICountry;
    contact_name: string;
}

export interface IProvince {
    state: string;
    label: string;
    residency: string;
}

export interface ICountry {
    label: string;
    alpha2: string;
}

export interface ICurrency {
    code: string
    numeric: string
    label: string
}

export interface IVisaGroup {
    id: number
    label: string
    type: string
    description: string | null
    tags: Array<string>
}

export interface IDestination {
    label: string
    alpha2: string
    alpha3: string
    numeric: string
}

export interface ICitizenship extends IDestination {

}
