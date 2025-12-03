import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { setLoading, setToken } from "../../slices/authSlice";
import { endpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";

const { LOGIN_API, SIGNUP_API } = endpoints;

// ====================== SIGNUP ======================
export function signUp(firstName, lastName, username, email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        username, // ✅ Added username
        email,
        password,
      });

      console.log("Sign up API response.......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login"); // ✅ Navigate to login after signup
    } catch (error) {
      console.log("SIGN UP API ERROR ...", error.message);
      toast.error("SIGNUP FAILED");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// ====================== LOGIN ======================
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}${response.data.user.lastName}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      navigate("/dashboard"); // ✅ Navigate to dashboard after login
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

// ====================== LOGOUT ======================
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out");
    navigate("/");
  };
}
