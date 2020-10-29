import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {requestTranslations} from '../store/app/actions';
import {useL10n} from '../hooks/useL10n';
import {RootState} from '../store';
import {ChangePasswordForm} from '../components/auth/ChangePasswordForm';
import ProfileDetailsForm from '../components/auth/ProfileDetailsForm';
import EmailNotificationsForm from '../components/EmailNotificationsForm/EmailNotificationsForm';
import {requestProfile} from '../store/auth/actions';

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

    useEffect(() => {
        dispatch(requestProfile())
    }, [dispatch])

    return (
        <>
            <div className="container mt-3">
                <h1>{t.get('your_account')}</h1>
                <h3>ID: {user?.account_number}</h3>
                <div className="row mt-3">
                    <div className="col-md-6 col-sm-12">
                        <div className="card">
                            <div className="card-body">
                                <h3>{t.get('profile_details')}</h3>
                                <small>{t.get('account_details_tell_us')}</small>
                                <ProfileDetailsForm/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="row">
                            <div className="card col">
                                <div className="card-body">
                                    <h3>{t.get('email_notifications')}</h3>
                                    <EmailNotificationsForm/>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="card col">
                                <div className="card-body">
                                    <h3>{t.get('change_password_capitalize')}</h3>
                                    <ChangePasswordForm/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Account
