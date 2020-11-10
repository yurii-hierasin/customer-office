import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import DateTimeService from '../../../services/date-time.service';
import {useState} from 'react';
import {requestDeleteDoc} from '../../../store/docs/actions';
import {IDocument, IServiceListItem} from '../../../store/retail/interfaces';

export const useDocsItem = (doc: IDocument, orderServiceItem: IServiceListItem) => {
    const dispatch = useDispatch()
    const locale = useSelector((state: RootState) => state.app.initOptions.locale)
    const dateTimeService = new DateTimeService(locale)
    const [showModal, setModalShow] = useState(false)

    const handleDelete = (): void => {
        setModalShow(true)
    }

    const handleModalAgree = (isAgree: boolean): void => {
        setModalShow(false)

        if (isAgree) {
            dispatch(requestDeleteDoc(doc, orderServiceItem))
        }
    }

    return {
        showModal,
        dateTimeService,
        handleDelete,
        handleModalAgree,
    }
}
