# Walkthrough — Login & Register Components UI

We have implemented a dark luxury glassmorphism UI for the **Login** and **Register** components, inspired by the reference frames, styled using **TailwindCSS** and a dedicated **CSS animation stylesheet** (`auth.animations.css`).

---

## 🎨 What Was Created & Updated

### 1. `src/features/auth/pages/auth.animations.css`
A standalone animation stylesheet featuring:
- **Ambient glowing waves** with floating keyframes (`floatWave`)
- **3D flip and slide transitions** (`flipTransitionIn`, `slideOutFade`)
- **Glassmorphism container styles** with top-left and bottom-right golden corner accents
- **Golden button shimmer gradients** (`btn-primary-gold`) with smooth hover/active states
- **Input focus glow effects** (`auth-input`)
- **OAuth button styling** and **spinner animations**
- **Zero inline styles or `<style>` tags used in JSX**

### 2. [Login.jsx](file:///d:/Tanmay%20Verma/Cohort%202.0/Projects/Snitch/Clovyn/Frontend/src/features/auth/pages/Login.jsx)
- **Header**: "Welcome **Back**" with gold highlight and subtitle.
- **Fields**: Email Address (`email`), Password (`password`) with show/hide password toggle, and "Remember me" checkbox.
- **Actions**:
  - Primary button: "Sign In →" with loading spinner state from Redux.
  - Secondary button: Dummy "Google" OAuth button with Google SVG logo.
  - Link: "Sign Up" which triggers a smooth exit animation before routing to `/register`.
- **Integration**: Connected to `useAuth().handleLogin({ email, password })` and `useSelector((state) => state.auth)`.

### 3. [Register.jsx](file:///d:/Tanmay%20Verma/Cohort%202.0/Projects/Snitch/Clovyn/Frontend/src/features/auth/pages/Register.jsx)
- **Header**: "Create **Account**" with gold highlight and subtitle.
- **Fields**:
  - Full Name (`fullname`)
  - Email Address (`email`)
  - Contact Number (`contact`)
  - Password (`password`) with show/hide toggle
  - Confirm Password (`confirmPassword`) with password matching check
- **Seller Checkbox (`isSeller`)**:
  - Controlled boolean state (`isSeller`).
  - Automatically converted to string `role: "seller"` (if checked) or `role: "buyer"` (if unchecked) upon submission.
- **Actions**:
  - Primary button: "Create Account →" with loading spinner state.
  - Secondary button: Dummy "Google" OAuth button.
  - Link: "Sign In" which triggers smooth exit animation before routing to `/login`.
- **Integration**: Connected to `useAuth().handleRegister({ fullname, email, password, contact, role })` and `useSelector((state) => state.auth)`.

### 4. [index.html](file:///d:/Tanmay%20Verma/Cohort%202.0/Projects/Snitch/Clovyn/Frontend/index.html)
- Added modern typography via Google Fonts (`Plus Jakarta Sans`).

---

## 🧪 Validation & Results

- **Build verification**: `npm run build` completed cleanly with `0` errors.
- **Linter verification**: `npm run lint` completed cleanly with `0` warnings and `0` errors.
- **Compliance check**:
  - ✅ No inline `style={...}` props.
  - ✅ No `<style>` tags in components.
  - ✅ No changes to Redux state (`auth.slice.js`), services (`auth.api.js`), or hooks (`useAuth.js`).
  - ✅ Checkbox `isSeller` boolean converts to `"seller"` / `"buyer"` string for `role`.
