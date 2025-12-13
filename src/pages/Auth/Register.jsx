import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic"; 
import { useForm } from "react-hook-form";
import { FaUserPlus } from "react-icons/fa";

const Register = () => {
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [registerError, setRegisterError] = useState('');
    
    const onSubmit = (data) => {
        setRegisterError('');
        const { name, email, password, role, phone, photoURL } = data;

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log('Firebase User Created:', loggedUser);

                updateUserProfile(name, photoURL)
                    .then(() => {
                        
                        const userInfo = {
                            name,
                            email,
                            role,
                            phone,
                            photoURL
                        };

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    logOut().then(() => {
                                        console.log('Registration complete. Please log in.');
                                        navigate('/login');
                                    });
                                }
                            })
                            .catch(dbError => {
                                console.error("DB Save Error:", dbError.message);
                                setRegisterError('User created but failed to save role data. Please contact support.');
                            });

                    })
                    .catch(profileError => {
                        console.error('Profile Update Error:', profileError.message);
                        setRegisterError(profileError.message);
                    })
            })
            .catch(error => {
                console.error('Firebase Registration Error:', error.message);
                setRegisterError(error.message);
            })
    };

    return (
        <>
            <Helmet>
                <title>eTuitionBd | Register</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-4 flex items-center gap-2 justify-center">
                            <FaUserPlus /> Join eTuitionBd
                        </h1>
                        <p className="py-2">Register as a Student or Tutor to get started.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Register As</span>
                                </label>
                                <select {...register("role", { required: true })} className="select select-bordered w-full">
                                    <option value="">Select Role</option>
                                    <option value="student">Student</option>
                                    <option value="tutor">Tutor</option>
                                </select>
                                {errors.role && <span className="text-red-500 text-sm mt-1">Role is required</span>}
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="Your Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500 text-sm mt-1">Name is required</span>}
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500 text-sm mt-1">Email is required</span>}
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, minLength: 6 })} placeholder="password" className="input input-bordered" />
                                {errors.password && errors.password.type === "required" && <span className="text-red-500 text-sm mt-1">Password is required</span>}
                                {errors.password && errors.password.type === "minLength" && <span className="text-red-500 text-sm mt-1">Password must be at least 6 characters</span>}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Phone</span></label>
                                    <input type="tel" {...register("phone")} placeholder="Phone (Optional)" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Photo URL</span></label>
                                    <input type="url" {...register("photoURL")} placeholder="Photo URL (Optional)" className="input input-bordered" />
                                </div>
                            </div>
                            
                            {registerError && (
                                <div role="alert" className="alert alert-error mt-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{registerError}</span>
                                </div>
                            )}

                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        
                        <p className="px-8 pb-8 text-center">
                            Already have an account? <Link to="/login" className="link link-hover text-blue-500 font-bold">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;