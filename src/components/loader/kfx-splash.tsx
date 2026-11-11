import { BrandLogo } from '@/components/layout/app-logo/BrandLogo';
import './kfx-splash.scss';

const CANDLES = [
    { left: '6%', height: 90, delay: '0s' },
    { left: '14%', height: 140, delay: '0.6s' },
    { left: '22%', height: 70, delay: '1.2s' },
    { left: '78%', height: 110, delay: '0.3s' },
    { left: '86%', height: 150, delay: '0.9s' },
    { left: '94%', height: 80, delay: '1.5s' },
];

const FEATURES = ['Free bots', 'Bot Builder', 'Live charts'];

export default function KfxSplash({ message }: { message: string }) {
    return (
        <div className='kfx-splash'>
            {CANDLES.map(candle => (
                <span
                    key={candle.left}
                    className='kfx-splash__candle'
                    style={{ left: candle.left, height: candle.height, animationDelay: candle.delay }}
                />
            ))}
            <div className='kfx-splash__card'>
                <BrandLogo width={260} height={64} />
                <p className='kfx-splash__tag'>Automated trading for Deriv</p>
                <div className='kfx-splash__bar' />
                <p className='kfx-splash__message'>{message}</p>
                <div className='kfx-splash__features'>
                    {FEATURES.map((label, index) => (
                        <span
                            key={label}
                            className='kfx-splash__feature'
                            style={{ animationDelay: `${index * 0.5}s` }}
                        >
                            {label}
                        </span>
                    ))}
                </div>
                <p className='kfx-splash__note'>Trading involves risk. Start on a demo account.</p>
            </div>
        </div>
    );
}
