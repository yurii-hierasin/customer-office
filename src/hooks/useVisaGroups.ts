import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {requestVisaGroups} from '../store/retail/actions';
import {RootState} from '../store';

export const useVisaGroups = () => {
    const visaGroups = useSelector((state: RootState) => state.retail.visaGroups)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestVisaGroups())
    }, [dispatch])

    return visaGroups
}
