import {IDocument, IOrder} from '../store/retail/interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {useEffect} from 'react';
import {requestOrderDocs} from '../store/docs/actions';

export const useOrderDocs = (order: IOrder): IDocument[] => {
    const dispatch = useDispatch()
    const docs = useSelector((state: RootState) => state.docs.orderDocs)

    useEffect(() => {
        dispatch(requestOrderDocs(order))
    }, [dispatch, order])

    return docs
}
