import { generateOAuthURL } from '@/components/shared';
import './welcome-hero.scss';

const WelcomeHero = () => {
    const handleLogin = async () => {
        const oauth_url = await generateOAuthURL();
        if (oauth_url) {
            window.location.replace(oauth_url);
        }
    };

    return (
        <div className='kfx-hero'>
            <span className='kfx-hero__tag'>Automated trading for Deriv</span>
            <h1 className='kfx-hero__title'>
                Welcome to Kings<span>FX</span>
            </h1>
            <p className='kfx-hero__text'>
                Load a ready-made bot or build your own, then run it on your Deriv demo account in a few clicks.
            </p>
            <button type='button' className='kfx-hero__button' onClick={handleLogin}>
                Log in with Deriv
            </button>
            <p className='kfx-hero__note'>
                Trading involves risk. Start on a demo account. KingsFX is independent and is not made by Deriv.
            </p>
        </div>
    );
};

export default WelcomeHero;