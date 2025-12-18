import { useLoaderData, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaDollarSign, FaClock } from "react-icons/fa";

const TuitionDetails = () => {
    
    const tuition = useLoaderData(); 
    const { user } = useAuth();
    const [role] = useRole();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const { _id, subject, classGrade, location: loc, salary, daysPerWeek, description, studentEmail } = tuition;

    const handleApply = () => {
        if (!user) {
            Swal.fire({
                title: "Please Login",
                text: "You need to login as a Tutor to apply.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
            return;
        }

        if (role !== 'tutor') {
            Swal.fire({
                icon: "error",
                title: "Access Denied",
                text: "Only registered Tutors can apply for jobs.",
            });
            return;
        }

        const applicationData = {
            tuitionId: _id,
            subject: subject,
            studentEmail: studentEmail,
            tutorName: user.displayName,
            tutorEmail: user.email,
            tutorId: user.uid
        };

        axiosSecure.post('/applications', applicationData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Application Sent!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else if (res.data.message === 'already-applied') {
                    Swal.fire({
                        icon: "info",
                        title: "Already Applied",
                        text: "You have already applied to this job.",
                    });
                }
            });
    };

    return (
        <div className="pt-24 max-w-4xl mx-auto px-4">
            <div className="card lg:card-side bg-base-100 shadow-xl border border-gray-200">
                <div className="card-body">
                    <h2 className="card-title text-4xl mb-4">{subject} <span className="text-lg font-normal badge badge-outline">{classGrade}</span></h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700">
                        <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-500"/> {loc}</p>
                        <p className="flex items-center gap-2"><FaDollarSign className="text-green-600"/> {salary} BDT / Month</p>
                        <p className="flex items-center gap-2"><FaClock className="text-blue-500"/> {daysPerWeek} Days / Week</p>
                    </div>

                    <div className="divider"></div>

                    <h3 className="font-bold text-xl">Details & Requirements:</h3>
                    <p className="whitespace-pre-line text-gray-600">{description}</p>

                    <div className="card-actions justify-end mt-8">
                        <button 
                            onClick={handleApply}
                            className="btn btn-primary btn-lg w-full md:w-auto">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TuitionDetails;