import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const extractErrorMessage = (data, defaultMessage) => {
  if (!data) return defaultMessage;

  if (typeof data === "string") return data;

  let validationDetails = "";
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    const details = data.errors
      .map((err) => {
        if (typeof err === "string") return err;
        return err?.msg || err?.message || err?.error || null;
      })
      .filter(Boolean);
    if (details.length > 0) {
      validationDetails = details.join(", ");
    }
  }

  if (data.message && typeof data.message === "string") {
    if (validationDetails && !data.message.includes(validationDetails)) {
      return `${data.message}: ${validationDetails}`;
    }
    return data.message;
  }

  if (validationDetails) {
    return validationDetails;
  }

  if (data.error) {
    if (typeof data.error === "string") return data.error;
    if (data.error?.message) return data.error.message;
  }

  return defaultMessage;
};

export async function login({ email, password }) {
  try {
    const response = await api.post("/auth/login", { email, password });
    if (response.data && response.data.success === false) {
      throw new Error(
        extractErrorMessage(response.data, "An error occurred during login")
      );
    }
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(
        extractErrorMessage(
          error.response.data,
          "An error occurred during login"
        )
      );
    }
    throw new Error(error.message || "An error occurred during login");
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
    if (response.data && response.data.success === false) {
      throw new Error(
        extractErrorMessage(
          response.data,
          "An error occurred during registration"
        )
      );
    }
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(
        extractErrorMessage(
          error.response.data,
          "An error occurred during registration"
        )
      );
    }
    throw new Error(error.message || "An error occurred during registration");
  }
}

