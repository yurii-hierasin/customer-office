export interface IAction {
    type: string
    payload: any
}

export interface IPwdStrength {
    lower: boolean
    number: boolean
    symbol: boolean
    upper: boolean
    all: boolean
}

export interface IPwdStrengthLevel {
    label: string
    percents: string
    color: string
}
