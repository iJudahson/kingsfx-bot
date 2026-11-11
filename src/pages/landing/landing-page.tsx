import { generateOAuthURL } from '@/components/shared';
import './landing-page.scss';

// Check this address, and swap in your client's partner link if he has one
const DERIV_SIGNUP_URL = 'https://deriv.com/signup/';

const FEATURES = [
    { title: 'Free bots', text: 'Load a ready-made bot from the KingsFX list in one click.', accent: 'gold' },
    { title: 'Bot Builder', text: 'Build your own bot with drag-and-drop blocks. No coding.', accent: 'green' },
    { title: 'Quick strategies', text: 'Start from a strategy template and set your own limits.', accent: 'sky' },
    { title: 'Live charts', text: 'Watch the markets while your bot runs.', accent: 'blue' },
];

const STEPS = [
    {
        title: 'Log in with Deriv',
        text: 'You sign in on Deriv’s own page, so KingsFX never sees your password.',
    },
    { title: 'Pick or build a bot', text: 'Choose a free bot, start from a template, or build your own.' },
    { title: 'Test on demo first', text: 'Run it on your demo account and watch the results before risking real money.' },
];

const LandingPage = () => {
    const handleLogin = async () => {
        const oauth_url = await generateOAuthURL();
        if (oauth_url) {
            window.location.replace(oauth_url);
        }
    };

    return (
        <div className='kfx-landing'>
            <section className='kfx-landing__hero'>
                <span className='kfx-landing__tag'>Automated trading for Deriv</span>
                <h1 className='kfx-landing__title'>
                    Build, load and run Deriv bots <span>in your browser</span>
                </h1>
                <p className='kfx-landing__text'>
                    Sign in with your Deriv account to open the KingsFX workspace: free ready-made bots, a visual Bot
                    Builder and live charts.
                </p>
                <div className='kfx-landing__buttons'>
                    <button type='button' className='kfx-landing__primary' onClick={handleLogin}>
                        Log in with Deriv
                    </button>
                    <a
                        className='kfx-landing__secondary'
                        href={DERIV_SIGNUP_URL}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Create a Deriv account
                    </a>
                </div>
                <p className='kfx-landing__note'>
                    Trading involves risk. Start on a demo account. KingsFX is independent and is not made by Deriv.
                </p>
            </section>

            <section className='kfx-landing__section'>
                <h2 className='kfx-landing__heading'>Everything in one workspace</h2>
                <div className='kfx-landing__grid'>
                    {FEATURES.map(({ title, text, accent }) => (
                        <div key={title} className={`kfx-landing__card kfx-landing__card--${accent}`}>
                            <h3 className='kfx-landing__card-title'>{title}</h3>
                            <p className='kfx-landing__card-text'>{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className='kfx-landing__section'>
                <h2 className='kfx-landing__heading'>How it works</h2>
                <div className='kfx-landing__steps'>
                    {STEPS.map(({ title, text }, index) => (
                        <div key={title} className='kfx-landing__step'>
                            <span className='kfx-landing__step-number'>{index + 1}</span>
                            <h3 className='kfx-landing__card-title'>{title}</h3>
                            <p className='kfx-landing__card-text'>{text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className='kfx-landing__risk'>
                <h2 className='kfx-landing__heading'>Before you trade</h2>
                <p className='kfx-landing__card-text'>
                    Automated bots can lose money, and past results do not predict future ones. Nothing on KingsFX is
                    financial advice. Always start on a demo account.
                </p>
            </section>
        </div>
    );
};

export default LandingPage;
