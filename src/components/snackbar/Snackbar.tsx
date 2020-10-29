import React, {useEffect, useState} from 'react';
import {ISnackbar} from '../../interfaces/app';
import {useDispatch} from 'react-redux';
import {closeSnackbar} from '../../store/app/actions';

interface IProps {
    snackbar: ISnackbar
}

const Snackbar: React.FC<IProps> = ({snackbar}) => {
    const dispatch = useDispatch()
    const [active, setActive] = useState(false)
    const [timer, setTimer] = useState(0)
    const [timeLeft, setTimeLeft] = useState(snackbar.delay)

    // allow animation to slide up from the bottom of view point
    useEffect(() => {
        const timer = setTimeout(() => setActive(true), 50)
        return () => clearTimeout(timer)
    }, [])

    // allow animation to slide down to the bottom of view point and the remove snackbar
    // here in deps we pass snackbar and it works once because we don't change snackbar,
    // be careful and do not change snackbar, if change then debug the behavior effect re-run
    useEffect(() => {
        if (snackbar.delay) {
            const timerDeactivate = window.setTimeout(() => {
                setActive(false)
                setTimeout(() => dispatch(closeSnackbar(snackbar)), 1000)
            }, snackbar.delay)

            setTimer(timerDeactivate)

            return () => clearTimeout(timerDeactivate)
        }
    }, [dispatch, snackbar])

    const handleClick = (snackbar: ISnackbar) => {
        setActive(false)
        setTimeout(() => dispatch(closeSnackbar(snackbar)), 1000)
    }

    // pause the timer when the customer hover the cursor under snackbar
    const handleMouseOver = () => {
        clearTimeout(timer)
        setTimeLeft(snackbar.delay - (new Date().getTime() - snackbar.id))
    }

    // start the timer again with remaining time
    const handleMouseLeave = () => {
        const timerDeactivate = window.setTimeout(() => {
            setActive(false)
            setTimeout(() => dispatch(closeSnackbar(snackbar)), 1000)
        }, timeLeft)

        setTimer(timerDeactivate)
    }

    return (
        <div className={`snackbar ${active ? 'active' : ''}`}
             onMouseOver={handleMouseOver}
             onMouseLeave={handleMouseLeave}
        >
            {snackbar.message + ' '}
            {snackbar.delay === 0
            && <span id={snackbar.id.toString()} onClick={() => handleClick(snackbar)}>CLOSE</span>}
        </div>
    )
}

export default Snackbar
