import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function login({ email, password }) {
  try {
    const response = await api.post("/auth/login", { email, password });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "An error occured during login",
    );
  }
}

export async function register({ fullname, email, password, contact, role }) {
  try {
    const response = await api.post("/auth/register", {
      fullname,
      email,
      password,
      role,
      contact,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "An error occured during registration",
    );
  }
}
