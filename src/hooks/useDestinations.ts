import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {useEffect} from 'react';
import {requestDestinations} from '../store/retail/actions';

export const useDestinations = () => {
    const destinations = useSelector((state: RootState) => state.retail.destinations)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestDestinations())
    }, [dispatch])

    return destinations
}
