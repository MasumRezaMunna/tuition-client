import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ManageTuitions = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tuitions = [], refetch } = useQuery({
        queryKey: ['all-tuitions'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tuitions/all');
            return res.data;
        }
    });

    const handleStatus = (tuition, newStatus) => {
        axiosSecure.patch(`/tuitions/status/${tuition._id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch(); 
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Tuition ${newStatus}!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    };

    return (
        <div className="w-full px-4">
            <h2 className="text-3xl font-bold my-4">Manage Tuitions Requests</h2>
            
            <div className="overflow-x-auto bg-base-100 shadow-xl rounded-lg">
                <table className="table w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Subject & Class</th>
                            <th>Student Info</th>
                            <th>Salary/Loc</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tuitions.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="font-bold">{item.subject}</div>
                                    <div className="text-sm opacity-50">{item.classGrade}</div>
                                </td>
                                <td>
                                    <div>{item.studentName}</div>
                                    <div className="text-xs text-blue-500">{item.studentEmail}</div>
                                </td>
                                <td>
                                    <div className="font-bold">{item.salary} BDT</div>
                                    <div className="text-sm">{item.location}</div>
                                </td>
                                <td>
                                    {item.status === 'pending' ? <span className="badge badge-warning">Pending</span> : 
                                     item.status === 'approved' ? <span className="badge badge-success text-white">Live</span> : 
                                     <span className="badge badge-error text-white">Rejected</span>}
                                </td>
                                <td>
                                    {item.status === 'pending' ? (
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleStatus(item, 'approved')}
                                                className="btn btn-sm btn-success text-white tooltip" data-tip="Approve">
                                                <FaCheckCircle />
                                            </button>
                                            <button 
                                                onClick={() => handleStatus(item, 'rejected')}
                                                className="btn btn-sm btn-error text-white tooltip" data-tip="Reject">
                                                <FaTimesCircle />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 font-semibold italic">Decided</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTuitions;