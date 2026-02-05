# Grozny Microfrontend POC

Learning showcase: React microfrontends with Webpack Module Federation + Spring Boot microservices.

## Structure

- `frontend/host` - shell/host app
- `frontend/remote1` - federated module A
- `frontend/remote2` - federated module B
- `backend/service-a` - REST API for Remote A
- `backend/service-b` - REST API for Remote B

## Run (dev)

### Frontend

1. One-time install:
   - `npm run install:all`
2. Start all MFEs:
   - `npm run dev`
3. Open `http://localhost:3000`

### Backend

1. In two terminals:
   - `cd backend/service-a` then `../..\\gradlew.bat bootRun` (Windows)
   - `cd backend/service-b` then `../..\\gradlew.bat bootRun` (Windows)
2. APIs:
   - `http://localhost:8081/api/a/hello`
   - `http://localhost:8082/api/b/hello`

### One command (frontend + backend)

1. `npm run dev:all`

### Windows-friendly (frontend + backend)

1. `npm run dev:all:win`

### Stop all dev servers

1. `npm run stop`

## Notes

- This POC keeps things intentionally small and explicit for learning.
- CORS is enabled in both services for local development.

## How It Works (Technical Overview)

This POC uses Webpack Module Federation to load independently built React apps (remotes) into a host at runtime.

Key ideas:

- Each remote builds its own bundle and exposes a module via `ModuleFederationPlugin`.
- The host does not bundle remote code at build time. It loads it at runtime from each remote’s `remoteEntry.js`.
- Shared deps (`react`, `react-dom`) are configured as singletons to avoid duplicate React copies.
- The host uses `React.lazy()` + `Suspense` to load remote modules asynchronously.
- Each remote calls its own Spring Boot service via REST.

Runtime flow:

- Start the remotes; each serves `remoteEntry.js` on its dev server.
- Start the host; it references the remotes via URLs in `webpack.config.js`.
- When the host renders a remote component, Webpack fetches the remote container and executes the exposed module.
- The remote component fetches data from its backend service.

### Sequence Diagram (Bootstrap + Runtime Load)

```mermaid
sequenceDiagram
  autonumber
  participant Browser
  participant HostDev as Host Dev Server
  participant Remote1 as Remote1 Dev Server
  participant Remote2 as Remote2 Dev Server
  participant SvcA as Service A (Spring)
  participant SvcB as Service B (Spring)

  Browser->>HostDev: GET / (index.html + host bundle)
  HostDev-->>Browser: host bundle (includes MF runtime)
  Browser->>Remote1: GET /remoteEntry.js
  Remote1-->>Browser: remote1 container
  Browser->>Remote2: GET /remoteEntry.js
  Remote2-->>Browser: remote2 container
  Browser->>Remote1: load exposed module remote1/Widget
  Remote1-->>Browser: Widget module
  Browser->>Remote2: load exposed module remote2/Widget
  Remote2-->>Browser: Widget module
  Browser->>SvcA: GET /api/a/hello
  SvcA-->>Browser: JSON message
  Browser->>SvcB: GET /api/b/hello
  SvcB-->>Browser: JSON message
```

## Module Federation Registry (Control Plane)

This project includes a **Control Plane** (Registry) for a Micro-Frontend architecture. It serves as a centralized gateway that dynamically resolves the location of remote modules.

Instead of hardcoding remote URLs in the Host application, the Host points to this Registry. The Registry then redirects the request to the correct version or location of the remote.

### How It Works

1. **Request**: The Host application requests a remote entry file from the Registry (e.g., `http://localhost:3003/remote1/remoteEntry.js`).
2. **Resolution**: The Registry looks up its configuration (`frontend/registry/config.json`) to determine the current active URL for `remote1` (e.g., `http://localhost:3001/remoteEntry.js`).
3. **Redirect**: The Registry responds with a `302 Found` redirect, sending the browser to the actual location.

### Benefits

#### 🚀 Dynamic Traffic Control

You can change where a remote points to **without redeploying the Host**. This enables powerful deployment strategies:

- **Canary Releases**: Direct 10% of traffic to a new version of a remote.
- **A/B Testing**: Serve different versions of a feature to different user segments.
- **Blue/Green Deployment**: Instantly switch all traffic to a new deployment.

#### 🛡️ Immediate Rollbacks

If a new version of a remote introduces a critical bug, you can revert to the previous version instantly by updating the Registry configuration. No need to rollback or rebuild the Host application.

#### 📦 Version Management

The Host application remains decoupled from specific versions. It always asks for "remote1", and the Control Plane decides whether that translates to `v1.0.0`, `v1.1.0`, or a `beta` build.

### Configuration

The mapping is defined in `frontend/registry/config.json`:

```json
{
  "remote1": "http://localhost:3001/remoteEntry.js",
  "remote2": "http://localhost:3002/remoteEntry.js"
}
```

Updating this file typically applies changes immediately (depending on caching strategies).
