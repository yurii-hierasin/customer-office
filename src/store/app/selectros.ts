import {IRootState} from '../../interfaces/signUp';

export const getRetailBaseUrl = (state: IRootState): string => state.app.initOptions.retailUrl
