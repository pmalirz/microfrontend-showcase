/**
 * ============================================
 * SHARED UI - MAIN ENTRY POINT
 * ============================================
 * 
 * Exports all components and types from the library.
 * Consumers can import:
 * 
 * import { SharedButton } from '@micro-frontend-showcase/shared-ui';
 * import type { SharedButtonProps } from '@micro-frontend-showcase/shared-ui';
 */

// Components
export { default as SharedButton } from './SharedButton';

// Types (re-export for convenience)
export type {
    SharedButtonProps,
    SharedButtonVariant,
    SharedButtonSize,
    BaseComponentProps,
} from './types';
