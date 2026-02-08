import React, { useEffect, useState, Suspense } from "react";
import type { SharedButtonProps } from "sharedUI/SharedButton";

const SharedButton = React.lazy(() => import("sharedUI/SharedButton"));

export default function Widget(): JSX.Element {
    const [message, setMessage] = useState<string>("Loading...");

    useEffect(() => {
        fetch("http://localhost:8082/api/b/hello")
            .then((res) => res.json())
            .then((data: { message: string }) => setMessage(data.message))
            .catch(() => setMessage("Failed to reach Service B"));
    }, []);

    // Example: remote2 uses a different variant
    const buttonProps: Partial<SharedButtonProps> = {
        variant: 'secondary',
        size: 'lg',
        testId: 'remote2-shared-button',
    };

    return (
        <div>
            <div>Remote 2 widget</div>
            <div>Service B says: {message}</div>
            <div style={{ marginTop: '10px' }}>
                <Suspense fallback={<div>Loading Button...</div>}>
                    <SharedButton {...buttonProps}>
                        Hello from Remote2 (TypeScript)!
                    </SharedButton>
                </Suspense>
            </div>
        </div>
    );
}
