# Authentication & Frontend System Context (`auth-pages.md`)

This document contains full context and architectural specifications for the Authentication Pages, Frontend Initialization, Routing, and Redux State Management in Clovyn.

---

## 🏗️ Architecture Overview

```
Frontend Structure
├── src/
│   ├── app/
│   │   ├── App.jsx             # Top-level React App wrapper with Redux Provider & Router
│   │   ├── app.routes.jsx      # React Router config (`/`, `/login`, `/register`)
│   │   ├── app.store.js       # Redux Toolkit Store configuration
│   │   └── App.css             # Main styling entry point
│   ├── features/
│   │   └── auth/
│   │       ├── hooks/
│   │       │   └── useAuth.js         # Custom hook for handling login/register flow
│   │       ├── pages/
│   │       │   ├── Login.jsx          # Dark glassmorphism Login page
│   │       │   ├── Register.jsx       # Dark glassmorphism Register page
│   │       │   └── auth.animations.css# Keyframe CSS animations & glass UI utilities
│   │       ├── service/
│   │       │   └── auth.api.js        # Axios instance & authentication API calls
│   │       └── state/
│   │           └── auth.slice.js      # Redux Toolkit Auth Slice (user, loading, error)
```

---

## 🔑 Authentication Page Flow & Specifications

### 1. Login Component (`Login.jsx`)
- **UI & Layout**: Dark luxury glassmorphism container with gold corner accents, floating wave ambient glow, and high contrast inputs.
- **Form Controls**:
  - `email`: Email input field.
  - `password`: Password input field with interactive show/hide toggle.
  - `rememberMe`: "Remember me" checkbox.
- **Actions & State**:
  - Submits via `useAuth().handleLogin({ email, password })`.
  - Dispatches `setLoading(true)` during API call and shows loading spinner in primary CTA button ("Sign In →").
  - Redirects to `/register` with smooth page transition animations when clicking the "Sign Up" toggle link.
  - Includes secondary Google OAuth button.

### 2. Register Component (`Register.jsx`)
- **UI & Layout**: Identical dark glassmorphism styling consistent with Login component.
- **Form Controls**:
  - `fullname`: User full name input field.
  - `email`: User email input field.
  - `contact`: User contact number input field.
  - `password`: Password input field with show/hide toggle.
  - `confirmPassword`: Confirm password field with client-side match validation.
  - `isSeller`: Checkbox converting boolean state (`true`/`false`) to role payload string (`"seller"` or `"buyer"`).
- **Actions & State**:
  - Submits via `useAuth().handleRegister({ fullname, email, password, contact, role })`.
  - Shows animated loading spinner inside primary CTA ("Create Account →").
  - Redirects to `/login` with smooth transition animations when clicking the "Sign In" link.

---

## 🔄 State Management & Custom Hooks

### Redux Auth Slice (`auth.slice.js`)
- State Shape:
  ```json
  {
    "user": null,
    "loading": false,
    "error": null
  }
  ```
- Actions: `setUser`, `setLoading`, `setError`.

### Custom Hook (`useAuth.js`)
- Exposes: `{ handleLogin, handleRegister, clearAuthError }`.
- Encapsulates Redux dispatching (`setLoading`, `setUser`, `setError`), API calls (`login`, `register`), and navigation (`navigate('/')`).

---

## 🌐 API & Router Integration

### Axios Service (`auth.api.js`)
- Base URL: `http://localhost:3000` with `withCredentials: true`.
- Endpoints:
  - `POST /auth/login`
  - `POST /auth/register`
- Helper function `extractErrorMessage` parses nested validation errors, array payloads, and backend message strings gracefully.

### Routing Setup (`app.routes.jsx`)
- Built using `createBrowserRouter` from `react-router`:
  - `/` -> Home Element
  - `/login` -> `<Login />`
  - `/register` -> `<Register />`
