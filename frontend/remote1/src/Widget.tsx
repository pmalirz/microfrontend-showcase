import React, { useEffect, useState, Suspense } from "react";
import type { SharedButtonProps } from "sharedUI/SharedButton";

const SharedButton = React.lazy(() => import("sharedUI/SharedButton"));

export default function Widget(): JSX.Element {
    const [message, setMessage] = useState<string>("Loading...");

    useEffect(() => {
        fetch("http://localhost:8081/api/a/hello")
            .then((res) => res.json())
            .then((data: { message: string }) => setMessage(data.message))
            .catch(() => setMessage("Failed to reach Service A"));
    }, []);

    // Example of using props that match the contract
    const buttonProps: Partial<SharedButtonProps> = {
        variant: 'primary',
        size: 'md',
        testId: 'remote1-shared-button',
    };

    return (
        <div>
            <div>Remote 1 widget</div>
            <div>Service A says: {message}</div>
            <div style={{ marginTop: '10px' }}>
                <Suspense fallback={<div>Loading Button...</div>}>
                    <SharedButton {...buttonProps}>
                        Hello from Remote1 (TypeScript)!
                    </SharedButton>
                </Suspense>
            </div>
        </div>
    );
}
