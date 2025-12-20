import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const Login = () => {
  const { googleSignIn, signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signIn(email, password);
      const loggedUser = result.user;

      const userInfo = {
        name: loggedUser.displayName || "",
        email: loggedUser.email,
        photoURL: loggedUser.photoURL || "",
      };

      const res = await axiosPublic.post("/users", userInfo);
      const { token } = res.data;

      localStorage.setItem("access-token", token);

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Check console for details.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      const res = await axiosPublic.post("/users", userInfo);
      const { token } = res.data;

      localStorage.setItem("access-token", token);

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-In failed. Check console.");
    }
  };

  return (
    <>
      <Helmet>
        <title>eTuitionBd | Login</title>
      </Helmet>

      <div className="hero min-h-screen bg-base-200">
        <div className="flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left w-full">
            <h1 className="text-5xl font-bold mb-4">Login now!</h1>
          </div>

          <div className="card shrink-0 w-full shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>
            </form>

            <div className="divider px-8">OR</div>

            <div className="px-8 pb-8 space-y-4">
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-block btn-outline"
              >
                <FcGoogle className="text-2xl mr-2" />
                Login with Google
              </button>

              <p className="text-center">
                New here?{" "}
                <Link
                  to="/register"
                  className="link link-hover text-blue-500 font-bold"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
