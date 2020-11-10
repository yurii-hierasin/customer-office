import {RootState} from '../index';

export const checkIfLoading = (store: RootState, actionsToCheck: Array<string>) => {
    const x = store.ui.loader.actions.some(action => actionsToCheck.includes(action.name));

    return x
}
