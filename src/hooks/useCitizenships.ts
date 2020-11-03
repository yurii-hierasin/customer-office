import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {useEffect} from 'react';
import {requestCitizenships} from '../store/retail/actions';

export const useCitizenships = () => {
    const citizenships = useSelector((state: RootState) => state.retail.citizenships)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestCitizenships())
    }, [dispatch])

    return citizenships
}
