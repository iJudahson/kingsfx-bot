import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import './dashboard-greeting.scss';

const DashboardGreeting = observer(() => {
    const { client } = useStore();
    if (!client.is_logged_in) return null;

    return (
        <div className='kfx-greeting'>
            <h1 className='kfx-greeting__title'>
                Welcome back, <span>{client.loginid}</span>
            </h1>
            <p className='kfx-greeting__text'>
                Load a bot, build your own, or pick a ready-made one, and test it on your demo account first.
            </p>
        </div>
    );
});

export default DashboardGreeting;
