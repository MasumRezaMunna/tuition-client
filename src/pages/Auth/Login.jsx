// src/pages/Auth/Login.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"; 

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log("Login Success:", user);
               
                
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error("Login Error:", error.message);
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log("Google Sign-In Success:", user);
               
                
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error("Google Sign-In Error:", error.message);
            })
    }

    return (
        <>
            <Helmet>
                <title>eTuitionBd | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className=" flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left w-full">
                        <h1 className="text-5xl font-bold mb-4">Login now!</h1>
                        
                    </div>
                    <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary w-full">Login</button>
                            </div>
                        </form>
                        
                        <div className="divider px-8">OR</div>

                        <div className="px-8 pb-8 space-y-4">
                            <button onClick={handleGoogleSignIn} className="btn btn-block btn-outline">
                                <FcGoogle className="text-2xl" /> 
                                Login with Google
                            </button>
                            <p className="text-center">
                                New here? <Link to="/register" className="link link-hover text-blue-500 font-bold">Create an account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;