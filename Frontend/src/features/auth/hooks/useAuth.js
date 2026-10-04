import { setUser, setError, setLoading } from "../state/auth.slice";
import { useDispatch } from "react-redux";
import { register, login } from "../service/auth.api";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleRegister({ fullname, email, password, contact, role }) {
    try {
      dispatch(setLoading(true));
      const response = await register({
        fullname,
        email,
        password,
        contact,
        role,
      });
      dispatch(setUser(response));
      dispatch(setLoading(false));
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const response = await login({ email, password });
      dispatch(setUser(response));
      dispatch(setLoading(false));
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  }

  return { handleLogin, handleRegister };
};
