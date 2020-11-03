import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {useEffect} from 'react';
import {requestOrders} from '../store/retail/actions';

export const useOrders = () => {
    const dispatch = useDispatch()
    const applications = useSelector((state: RootState) => state.retail.orders)

    useEffect(() => {
        dispatch(requestOrders())
    }, [dispatch])

    return applications
}
