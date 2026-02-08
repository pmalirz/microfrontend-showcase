import React, { Suspense, useState } from 'react';
import ReactDOM from 'react-dom/client';

const LazySharedButton = React.lazy(() => import('./SharedButton'));

function App() {
  const [showButton, setShowButton] = useState(false);

  return (
    <div>
      <h1>Shared UI Library</h1>
      <button onClick={() => setShowButton(!showButton)}>
        {showButton ? 'Hide' : 'Show'} SharedButton
      </button>
      {showButton && (
        <Suspense fallback={<div>Loading SharedButton...</div>}>
          <LazySharedButton>Test Button</LazySharedButton>
        </Suspense>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
