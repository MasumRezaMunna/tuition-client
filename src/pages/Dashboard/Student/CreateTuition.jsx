import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CreateTuition = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const tuitionData = {
            subject: data.subject,
            classGrade: data.classGrade,
            location: data.location,
            salary: parseFloat(data.salary), 
            daysPerWeek: parseInt(data.daysPerWeek), 
                        description: data.description,
            studentName: user?.displayName,
            studentEmail: user?.email,
            status: 'pending' 
        };

        const tuitionRes = await axiosSecure.post('/tuitions', tuitionData);
        
        if (tuitionRes.data.insertedId || tuitionRes.data._id) {
            reset(); 
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Tuition Posted Successfully!",
                text: "Waiting for Admin Approval.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="w-full p-10 bg-base-100 shadow-xl rounded-xl">
            <h2 className="text-3xl font-bold text-center mb-10">Post a New Tuition</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Subject</span></label>
                        <input 
                            type="text" 
                            placeholder="e.g. Mathematics, English" 
                            {...register("subject", { required: true })} 
                            className="input input-bordered w-full" />
                        {errors.subject && <span className="text-red-500 text-sm">Subject is required</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Class / Grade</span></label>
                        <select defaultValue="default" {...register("classGrade", { required: true })} className="select select-bordered w-full">
                            <option disabled value="default">Select a Class</option>
                            <option value="Class 6">Class 6</option>
                            <option value="Class 7">Class 7</option>
                            <option value="Class 8">Class 8</option>
                            <option value="Class 9">Class 9</option>
                            <option value="Class 10">Class 10</option>
                            <option value="SSC Candidate">SSC Candidate</option>
                            <option value="HSC Candidate">HSC Candidate</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Location (Area)</span></label>
                        <input 
                            type="text" 
                            placeholder="e.g. Dhanmondi, Dhaka" 
                            {...register("location", { required: true })} 
                            className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Days Per Week</span></label>
                        <select defaultValue="3" {...register("daysPerWeek", { required: true })} className="select select-bordered w-full">
                            <option value="1">1 Day</option>
                            <option value="2">2 Days</option>
                            <option value="3">3 Days</option>
                            <option value="4">4 Days</option>
                            <option value="5">5 Days</option>
                        </select>
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Monthly Salary (Budget)</span></label>
                        <input 
                            type="number" 
                            placeholder="e.g. 5000" 
                            {...register("salary", { required: true })} 
                            className="input input-bordered w-full" />
                    </div>

                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Your Email</span></label>
                        <input type="text" value={user?.email} readOnly className="input input-bordered w-full bg-gray-100" />
                    </div>

                </div>

                <div className="form-control w-full mt-6">
                    <label className="label"><span className="label-text">Additional Details</span></label>
                    <textarea 
                        {...register("description")} 
                        className="textarea textarea-bordered h-24" 
                        placeholder="Any specific requirements (e.g. Female tutor preferred)..."></textarea>
                </div>

                <div className="mt-8 flex justify-center">
                    <button className="btn btn-primary btn-wide">Post Tuition</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTuition;