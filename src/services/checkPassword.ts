import {IPwdStrength} from '../interfaces';

export function preparePwdStrengthResult(result: any): IPwdStrength {
    const prepared: any = {
        all: true
    }

    for (const key in result) {
        if (
            result.hasOwnProperty(key)
            && ['lower', 'upper', 'symbol', 'number'].includes(key)
        ) {
            prepared[key] = result[key]

            if (!result[key]) {
                prepared.all = false
            }
        }
    }

    return prepared
}

export const strengthLevels: any = {
    SHORT: {
        label: 'Too short',
        percents: '10%',
        color: 'dark',
    },
    VERY_WEAK: {
        label: 'Very weak',
        percents: '20%',
        color: 'danger',
    },
    WEAK: {
        label: 'Weak',
        percents: '50%',
        color: 'warning',
    },
    REASONABLE: {
        label: 'Good',
        percents: '70%',
        color: 'primary',
    },
    STRONG: {
        label: 'Strong',
        percents: '80%',
        color: 'success',
    },
    VERY_STRONG: {
        label: 'Very strong',
        percents: '100%',
        color: 'info',
    },
}
