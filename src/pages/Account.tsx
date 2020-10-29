import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {requestTranslations} from '../store/app/actions';
import {useL10n} from '../hooks/useL10n';
import {RootState} from '../store';

const Account: React.FC = () => {
    const dispatch = useDispatch()
    const t = useL10n()
    const user = useSelector((state: RootState) => state.auth.user)
    const locale = useSelector((state: RootState) => state.app.initOptions.locale)

    /**
     * TODO move fetch the translations to more appropriate place,
     * only current page has translation, in future need to translate other parts
     */
    useEffect(() => {
        dispatch(requestTranslations(locale))
    }, [dispatch, locale])

    return (
        <>
            <div className="page-account-details">
                <div className="account-img-block shadow-ellipse-container">
                    <div className="shadow-ellipse-container__shadow">
                        <div className="shadow-ellipse-container__bottom_ellipse">
                            <div className="container collision_top">
                                <h1>{t.get('your_account')}</h1>
                                <p className="account-img-block__id">ID {user?.account_number}</p>
                                <p>First name: {user?.first_name}</p>
                                <p>Last name: {user?.last_name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account
