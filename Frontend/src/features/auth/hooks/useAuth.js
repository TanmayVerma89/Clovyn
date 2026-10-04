import { setUser, setError, setLoading } from "../state/auth.slice";
import { useDispatch } from "react-redux";
import { register, login } from "../service/auth.api";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleRegister({ fullname, email, password, contact, role }) {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));
      const response = await register({
        fullname,
        email,
        password,
        contact,
        role,
      });

      if (response && response.success === false) {
        throw new Error(response.message || "Registration failed");
      }

      dispatch(setUser(response.user || response));
      dispatch(setLoading(false));
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setError(null));
      dispatch(setLoading(true));
      const response = await login({ email, password });

      if (response && response.success === false) {
        throw new Error(response.message || "Login failed");
      }

      dispatch(setUser(response.user || response));
      dispatch(setLoading(false));
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  }

  const clearAuthError = () => {
    dispatch(setError(null));
  };

  return { handleLogin, handleRegister, clearAuthError };
};

