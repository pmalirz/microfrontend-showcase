import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Remote Module Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div style={{ padding: '20px', border: '1px solid #ff0000', color: '#ff0000', borderRadius: '4px' }}>
                    <h3>Module Unavailable</h3>
                    <p>We couldn't load this section. Please try refreshing.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
