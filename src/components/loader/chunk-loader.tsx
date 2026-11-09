import { BrandLogo } from '@/components/layout/app-logo/BrandLogo';
import './chunk-loader.scss';

export default function ChunkLoader({ message }: { message: string }) {
    return (
        <div className='app-root'>
            <div className='kfx-loader'>
                <BrandLogo width={220} height={54} />
                <div className='kfx-loader__bar' />
                <div className='kfx-loader__message'>{message}</div>
            </div>
        </div>
    );
}