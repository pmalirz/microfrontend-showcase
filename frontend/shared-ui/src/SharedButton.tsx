import React, { useState } from 'react';
import type { SharedButtonProps } from './types';

/**
 * Universal button with dynamic color change.
 * 
 * @example
 * ```tsx
 * <SharedButton variant="primary" onClick={() => console.log('clicked')}>
 *   Click me!
 * </SharedButton>
 * ```
 */
const SharedButton: React.FC<SharedButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    onClick,
    style,
    className,
    type = 'button',
    testId,
}) => {
    const [bgColor, setBgColor] = useState<string | null>(null);

    // Base colors for variants
    const variantColors: Record<string, string> = {
        primary: '#3b82f6',
        secondary: '#6b7280',
        danger: '#ef4444',
        ghost: 'transparent',
    };

    // Sizes
    const sizeStyles: Record<string, React.CSSProperties> = {
        sm: { padding: '6px 12px', fontSize: '12px' },
        md: { padding: '10px 20px', fontSize: '14px' },
        lg: { padding: '14px 28px', fontSize: '16px' },
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;

        // Random color on click
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        setBgColor(randomColor);

        onClick?.(event);
    };

    const baseStyle: React.CSSProperties = {
        background: bgColor ?? variantColors[variant],
        color: variant === 'ghost' ? '#3b82f6' : 'white',
        border: variant === 'ghost' ? '1px solid #3b82f6' : 'none',
        borderRadius: '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontWeight: 500,
        transition: 'all 0.2s ease',
        ...sizeStyles[size],
        ...style,
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled}
            style={baseStyle}
            className={className}
            data-testid={testId}
        >
            {children}
        </button>
    );
};

export default SharedButton;

// Re-export types for convenience
export type { SharedButtonProps } from './types';
