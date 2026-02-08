/**
 * ============================================
 * TYPE DECLARATIONS FOR SHARED UI (Module Federation)
 * ============================================
 * 
 * This file declares what modules are available via Module Federation
 * from the sharedUI remote. IMPORTANT: These types should be synchronized
 * with the actual implementation in shared-ui!
 */

declare module 'sharedUI/SharedButton' {
    import type { FC } from 'react';

    export type SharedButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
    export type SharedButtonSize = 'sm' | 'md' | 'lg';

    export interface SharedButtonProps {
        children: React.ReactNode;
        variant?: SharedButtonVariant;
        size?: SharedButtonSize;
        disabled?: boolean;
        onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
        style?: React.CSSProperties;
        className?: string;
        type?: 'button' | 'submit' | 'reset';
        testId?: string;
    }

    const SharedButton: FC<SharedButtonProps>;
    export default SharedButton;
}
