import {IDocument, IOrder, IServiceListItem} from '../store/retail/interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {useEffect} from 'react';
import {requestAllDocs} from '../store/docs/actions';

export const useAllDocs = (
    order: IOrder,
    orderServiceItem: IServiceListItem
): {orderDocs: IDocument[], orderServiceItemDocs: IDocument[]} => {
    const dispatch = useDispatch()
    const docs = useSelector((state: RootState) => state.docs)

    useEffect(() => {
        dispatch(requestAllDocs(order, orderServiceItem))
    }, [dispatch, order, orderServiceItem])

    return docs
}
