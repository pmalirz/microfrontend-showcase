/**
 * ============================================
 * SHARED UI - TYPE CONTRACTS
 * ============================================
 * 
 * This file defines the public API of the shared-ui library.
 * Consumers (remote1, remote2, remote3) import these types.
 * 
 * IMPORTANT: Changing these types = BREAKING CHANGE!
 * Make sure all consumers are ready before making changes.
 */

import { ReactNode, CSSProperties, MouseEvent } from 'react';

// ============================================
// SHARED BUTTON
// ============================================

/**
 * Visual variants for the button.
 * Adding a new variant = MINOR version bump.
 * Removing/changing a variant = MAJOR version bump.
 */
export type SharedButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

/**
 * Button sizes.
 */
export type SharedButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the SharedButton component.
 * 
 * @example
 * ```tsx
 * import { SharedButtonProps } from '@micro-frontend-showcase/shared-ui/types';
 * 
 * const MyButton = (props: SharedButtonProps) => {
 *   return <SharedButton {...props} />;
 * };
 * ```
 */
export interface SharedButtonProps {
    /** Button content (text, icons, other elements) */
    children: ReactNode;

    /** Visual variant of the button */
    variant?: SharedButtonVariant;

    /** Button size */
    size?: SharedButtonSize;

    /** Whether the button is disabled */
    disabled?: boolean;

    /** Click handler */
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /** Additional inline styles */
    style?: CSSProperties;

    /** Additional CSS classes */
    className?: string;

    /** HTML type attribute for the button */
    type?: 'button' | 'submit' | 'reset';

    /** data-testid attribute for testing */
    testId?: string;
}

// ============================================
// COMMON UTILITY TYPES
// ============================================

/**
 * Base type for components with variants.
 * Can be extended for new components.
 */
export interface BaseComponentProps {
    className?: string;
    style?: CSSProperties;
    testId?: string;
}

// ============================================
// RE-EXPORTS (for convenience)
// ============================================

// Additional type re-exports can be added here in the future
