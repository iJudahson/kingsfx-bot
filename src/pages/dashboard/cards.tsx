import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import GoogleDrive from '@/components/load-modal/google-drive';
import Dialog from '@/components/shared_ui/dialog';
import MobileFullPageModal from '@/components/shared_ui/mobile-full-page-modal';
import { DBOT_TABS } from '@/constants/bot-contents';
import { useStore } from '@/hooks/useStore';
import { localize } from '@deriv-com/translations';
import { useDevice } from '@deriv-com/ui';
import DashboardBotList from './bot-list/dashboard-bot-list';
import './kfx-cards.scss';

type TCardProps = {
    has_dashboard_strategies: boolean;
    is_mobile: boolean;
};

type TCardArray = {
    id: string;
    accent: string;
    icon: React.ReactElement;
    title: string;
    text: string;
    callback: () => void;
};

const icon_props = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
};

const Cards = observer(({ is_mobile, has_dashboard_strategies }: TCardProps) => {
    const { dashboard, load_modal, quick_strategy } = useStore();
    const { toggleLoadModal, setActiveTabIndex } = load_modal;
    const { isDesktop } = useDevice();
    const { onCloseDialog, dialog_options, is_dialog_open, setActiveTab, setPreviewOnPopup } = dashboard;
    const { setFormVisibility } = quick_strategy;

    const openFileLoader = () => {
        toggleLoadModal();
        setActiveTabIndex(is_mobile ? 0 : 1);
        setActiveTab(DBOT_TABS.BOT_BUILDER);
    };

    const actions: TCardArray[] = [
        {
            id: 'my-computer',
            accent: 'blue',
            icon: (
                <svg {...icon_props}>
                    <path d='M12 16V4m0 0L8 8m4-4l4 4M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3' />
                </svg>
            ),
            title: 'Upload bot',
            text: 'Load a saved bot file from your computer.',
            callback: openFileLoader,
        },
        {
            id: 'free-bots',
            accent: 'gold',
            icon: (
                <svg {...icon_props}>
                    <rect x='3' y='3' width='7' height='7' rx='1' />
                    <rect x='14' y='3' width='7' height='7' rx='1' />
                    <rect x='3' y='14' width='7' height='7' rx='1' />
                    <rect x='14' y='14' width='7' height='7' rx='1' />
                </svg>
            ),
            title: 'Free bots',
            text: 'Pick a ready-made bot from the KingsFX list.',
            callback: () => {
                setActiveTab(DBOT_TABS.TUTORIAL);
            },
        },
        {
            id: 'bot-builder',
            accent: 'green',
            icon: (
                <svg {...icon_props}>
                    <path d='M4 7l8-4 8 4-8 4-8-4zM4 12l8 4 8-4M4 17l8 4 8-4' />
                </svg>
            ),
            title: 'Bot Builder',
            text: 'Build your own bot with drag-and-drop blocks.',
            callback: () => {
                setActiveTab(DBOT_TABS.BOT_BUILDER);
            },
        },
        {
            id: 'quick-strategy',
            accent: 'sky',
            icon: (
                <svg {...icon_props}>
                    <path d='M13 2L4 14h7l-1 8 9-12h-7l1-8z' />
                </svg>
            ),
            title: 'Quick strategy',
            text: 'Start from a ready-made strategy template.',
            callback: () => {
                setActiveTab(DBOT_TABS.BOT_BUILDER);
                setFormVisibility(true);
            },
        },
    ];

    return React.useMemo(
        () => (
            <div
                className={classNames('tab__dashboard__table', {
                    'tab__dashboard__table--minimized': has_dashboard_strategies && is_mobile,
                })}
            >
                <div className='tab__dashboard__table__tiles' id='tab__dashboard__table__tiles'>
                    <div className='kfx-actions'>
                        <p className='kfx-actions__label'>Quick actions</p>
                        {actions.map(({ id, accent, icon, title, text, callback }) => (
                            <button
                                type='button'
                                key={id}
                                id={id}
                                className={`kfx-action kfx-action--${accent}`}
                                onClick={callback}
                            >
                                <span className='kfx-action__icon'>{icon}</span>
                                <span className='kfx-action__title'>{title}</span>
                                <span className='kfx-action__text'>{text}</span>
                                <span className='kfx-action__open'>Open →</span>
                            </button>
                        ))}
                    </div>

                    {!isDesktop ? (
                        <Dialog
                            title={dialog_options.title}
                            is_visible={is_dialog_open}
                            onCancel={onCloseDialog}
                            is_mobile_full_width
                            className='dc-dialog__wrapper--google-drive'
                            has_close_icon
                        >
                            <GoogleDrive />
                        </Dialog>
                    ) : (
                        <MobileFullPageModal
                            is_modal_open={is_dialog_open}
                            className='load-strategy__wrapper'
                            header={localize('Load strategy')}
                            onClickClose={() => {
                                setPreviewOnPopup(false);
                                onCloseDialog();
                            }}
                            height_offset='80px'
                        >
                            <div label='Google Drive' className='google-drive-label'>
                                <GoogleDrive />
                            </div>
                        </MobileFullPageModal>
                    )}
                </div>
                <DashboardBotList />
            </div>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [is_dialog_open, has_dashboard_strategies]
    );
});

export default Cards;