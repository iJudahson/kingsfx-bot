type TBrandLogoProps = {
    width?: number;
    height?: number;
    fill?: string;
    className?: string;
};

export const BrandLogo = ({
    width = 130,
    height = 32,
    fill = 'currentColor',
    className = '',
}: TBrandLogoProps) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox='0 0 130 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            aria-label='KingsFX'
        >
            {/* Crown */}
            <g transform='translate(2, 8)'>
                <path d='M0 14L2 3L6 8L10 1L14 8L18 3L20 14Z' fill='#C9A227' />
            </g>

            {/* Wordmark */}
            <text
                x='28'
                y='24'
                fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif"
                fontSize='22'
                fontWeight='700'
                fill={fill}
            >
                Kings
                <tspan fill='#C9A227'>FX</tspan>
            </text>
        </svg>
    );
};
