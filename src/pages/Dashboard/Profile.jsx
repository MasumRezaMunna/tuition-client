import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    
    const { data: dbUser = {}, refetch } = useQuery({
        queryKey: ['dbUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user?.email}`);
            
            return res.data;
        }
    });

    const onSubmit = async (data) => {
        try {
            
            await updateUserProfile(data.name, data.photoURL);

            
            const profileInfo = {
                name: data.name,
                phone: data.phone,
                photoURL: data.photoURL
            };

            const res = await axiosSecure.patch(`/users/update/${user?.email}`, profileInfo);
            
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Profile Updated Successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10">
            <h2 className="text-3xl font-bold text-center mb-8">My Profile</h2>
            
            <div className="flex flex-col md:flex-row items-center gap-10">
                
                <div className="text-center space-y-4">
                    <div className="avatar">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL || "https://i.ibb.co/hYsm3Dq/default-user.png"} alt="User" />
                        </div>
                    </div>
                    <p className="badge badge-primary uppercase p-3">{dbUser?.role || 'User'}</p>
                </div>

                
                <form onSubmit={handleSubmit(onSubmit)} className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Full Name</span></label>
                        <input type="text" defaultValue={user?.displayName} {...register("name")} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email (Read Only)</span></label>
                        <input type="text" value={user?.email} readOnly className="input input-bordered bg-gray-100 cursor-not-allowed" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Phone Number</span></label>
                        <input type="text" placeholder="Add phone number" {...register("phone")} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Photo URL</span></label>
                        <input type="text" defaultValue={user?.photoURL} {...register("photoURL")} className="input input-bordered" />
                    </div>
                    
                    <div className="md:col-span-2 mt-4 text-center">
                        <button className="btn btn-primary btn-block">Update Profile</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;