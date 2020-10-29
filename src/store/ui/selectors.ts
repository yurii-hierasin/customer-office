import {RootState} from '../index';

export const checkIfLoading = (store: RootState, actionsToCheck: Array<string>) =>
    store.ui.loader.actions.some(action => actionsToCheck.includes(action.name));
