import React from 'react';
import './risk-badge.scss';

const RiskBadge = () => {
    const [is_open, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        if (!is_open) return undefined;
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [is_open]);

    return (
        <>
            <button type='button' className='kfx-risk-badge' onClick={() => setIsOpen(true)}>
                <svg
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path d='M12 3L2 21h20L12 3z' />
                    <path d='M12 10v5M12 18.5v.01' />
                </svg>
                Risk disclaimer
            </button>

            {is_open && (
                <div className='kfx-risk-overlay' onClick={() => setIsOpen(false)}>
                    <div
                        className='kfx-risk-modal'
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby='kfx-risk-title'
                        onClick={event => event.stopPropagation()}
                    >
                        <h2 className='kfx-risk-modal__title' id='kfx-risk-title'>
                            Risk disclaimer
                        </h2>
                        <div className='kfx-risk-modal__body'>
                            <p>
                                Trading involves risk. Automated bots can lose money, and past results do not predict
                                future ones. Only trade with money you can afford to lose.
                            </p>
                            <p>
                                Some bots raise their stake after losses, and stakes can grow very quickly. Always test
                                a bot on a demo account first, and set your own stop-loss and take-profit limits.
                            </p>
                            <p>
                                Nothing on KingsFX is financial advice. You are responsible for the bots you run and
                                the trades they place.
                            </p>
                            <p>
                                KingsFX is independent and is not made by Deriv. Trading is carried out through your
                                own Deriv account, under Deriv’s terms.
                            </p>
                        </div>
                        <button type='button' className='kfx-risk-modal__close' onClick={() => setIsOpen(false)}>
                            I understand
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RiskBadge;
