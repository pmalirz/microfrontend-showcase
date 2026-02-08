/**
 * ============================================
 * TYPE DECLARATIONS FOR SHARED UI (Module Federation)
 * ============================================
 * 
 * This file declares what modules are available via Module Federation
 * from the sharedUI remote. IMPORTANT: These types should be synchronized
 * with the actual implementation in shared-ui!
 * 
 * Benefits:
 * 1. TypeScript knows what can be imported from 'sharedUI/SharedButton'
 * 2. We get autocomplete and type checking
 * 3. Contract change in shared-ui = compilation error here
 */

// Module declaration for Module Federation
declare module 'sharedUI/SharedButton' {
    import type { FC } from 'react';

    export type SharedButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
    export type SharedButtonSize = 'sm' | 'md' | 'lg';

    export interface SharedButtonProps {
        /** Button content */
        children: React.ReactNode;
        /** Visual variant */
        variant?: SharedButtonVariant;
        /** Size */
        size?: SharedButtonSize;
        /** Whether disabled */
        disabled?: boolean;
        /** Click handler */
        onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
        /** Inline styles */
        style?: React.CSSProperties;
        /** CSS class */
        className?: string;
        /** HTML button type */
        type?: 'button' | 'submit' | 'reset';
        /** Test ID */
        testId?: string;
    }

    const SharedButton: FC<SharedButtonProps>;
    export default SharedButton;
}
