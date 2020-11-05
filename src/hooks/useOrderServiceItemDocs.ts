import {IDocument, IServiceListItem} from '../store/retail/interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {useEffect} from 'react';
import {requestOrderServiceItemDocs} from '../store/docs/actions';

export const useOrderServiceItemDocs = (orderServiceItem: IServiceListItem): IDocument[] => {
    const dispatch = useDispatch()
    const docs = useSelector((state: RootState) => state.docs.orderServiceItemDocs)

    useEffect(() => {
        dispatch(requestOrderServiceItemDocs(orderServiceItem))
    }, [dispatch, orderServiceItem])

    return docs
}
