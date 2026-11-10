import React from 'react';
import { observer } from 'mobx-react-lite';
import { getUrlBase } from '@/components/shared';
import { save_types } from '@/external/bot-skeleton';
import { useStore } from '@/hooks/useStore';
import './free-bots.scss';

type TFreeBot = {
    name: string;
    file: string;
    description: string;
    risk: string;
    author?: string;
};

const RISK_FILTERS = ['All', 'Low', 'Medium', 'High'];

const FreeBots = observer(({ handleTabChange }: { handleTabChange: (tab: number) => void }) => {
    const { load_modal } = useStore();
    const [bots, setBots] = React.useState<TFreeBot[]>([]);
    const [status, setStatus] = React.useState('loading');
    const [message, setMessage] = React.useState('');
    const [busy_file, setBusyFile] = React.useState('');
    const [query, setQuery] = React.useState('');
    const [risk_filter, setRiskFilter] = React.useState('All');

    React.useEffect(() => {
        const loadList = async () => {
            try {
                const response = await fetch(getUrlBase('/free-bots/bots.json'));
                const data = await response.json();
                setBots(Array.isArray(data) ? data : []);
                setStatus('ready');
            } catch {
                setStatus('error');
            }
        };
        loadList();
    }, []);

    const handleLoad = async (bot: TFreeBot) => {
        setBusyFile(bot.file);
        setMessage('');
        try {
            const response = await fetch(getUrlBase(`/free-bots/${encodeURIComponent(bot.file)}`));
            if (!response.ok) throw new Error('Not found');
            const xml = await response.text();
            if (!xml.includes('<xml')) throw new Error('Not a bot file');
            await load_modal.loadStrategyToBuilder({
                id: window.Blockly.utils.idGenerator.genUid(),
                xml,
                name: bot.name,
                save_type: save_types.UNSAVED,
            });
            handleTabChange(1);
        } catch {
            setMessage('Sorry, this bot could not be loaded. Please try again later.');
        }
        setBusyFile('');
    };

    const visible_bots = bots.filter(bot => {
        const matches_risk = risk_filter === 'All' || (bot.risk ?? '').toLowerCase() === risk_filter.toLowerCase();
        const text = `${bot.name ?? ''} ${bot.description ?? ''}`.toLowerCase();
        return matches_risk && text.includes(query.trim().toLowerCase());
    });

    return (
        <div className='kfx-freebots'>
            <h2 className='kfx-freebots__title'>Free bots</h2>
            <p className='kfx-freebots__intro'>
                Load a bot into the Bot Builder, review it, and test it on a demo account first. Bots can lose money
                and nothing here is financial advice.
            </p>

            {status === 'ready' && bots.length > 0 && (
                <div className='kfx-freebots__toolbar'>
                    <input
                        type='text'
                        className='kfx-freebots__search'
                        placeholder='Search bots'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <div className='kfx-freebots__filters'>
                        {RISK_FILTERS.map(level => (
                            <button
                                type='button'
                                key={level}
                                className={`kfx-freebots__chip${risk_filter === level ? ' kfx-freebots__chip--active' : ''}`}
                                onClick={() => setRiskFilter(level)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                    <span className='kfx-freebots__count'>
                        Showing {visible_bots.length} of {bots.length}
                    </span>
                </div>
            )}

            {message && <p className='kfx-freebots__error'>{message}</p>}
            {status === 'loading' && <p className='kfx-freebots__intro'>Loading bots...</p>}
            {status === 'error' && <p className='kfx-freebots__error'>The bot list could not be loaded right now.</p>}
            {status === 'ready' && bots.length === 0 && (
                <p className='kfx-freebots__intro'>No free bots yet. Check back soon.</p>
            )}
            {status === 'ready' && bots.length > 0 && visible_bots.length === 0 && (
                <p className='kfx-freebots__intro'>No bots match your search.</p>
            )}

            <div className='kfx-freebots__grid'>
                {visible_bots.map(bot => (
                    <div className='kfx-freebots__card' key={`${bot.file}-${bot.name}`}>
                        <div className='kfx-freebots__row'>
                            <h3 className='kfx-freebots__name'>{bot.name}</h3>
                            <span
                                className={`kfx-freebots__risk kfx-freebots__risk--${(bot.risk ?? '').toLowerCase()}`}
                            >
                                {bot.risk} risk
                            </span>
                        </div>
                        <p className='kfx-freebots__text' title={bot.description}>
                            {bot.description}
                        </p>
                        <button
                            type='button'
                            className='kfx-freebots__button'
                            disabled={busy_file === bot.file}
                            onClick={() => handleLoad(bot)}
                        >
                            {busy_file === bot.file ? 'Loading...' : 'Load bot →'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default FreeBots;