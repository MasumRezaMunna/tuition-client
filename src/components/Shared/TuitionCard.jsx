import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaDollarSign, FaCalendarAlt } from "react-icons/fa";

const TuitionCard = ({ item }) => {
    const { _id, subject, classGrade, location, salary, daysPerWeek, description } = item;

    return (
        <div className="card w-full bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="card-title text-2xl text-primary">{subject}</h2>
                        <div className="badge badge-secondary badge-outline mt-1">{classGrade}</div>
                    </div>
                    <div className="badge badge-ghost p-3 font-bold text-lg">
                        <FaDollarSign className="mr-1"/> {salary}
                    </div>
                </div>

                <div className="my-4 space-y-2 text-gray-600">
                    <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" /> {location}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" /> {daysPerWeek} days / week
                    </p>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">
                    {description || "No additional details provided."}
                </p>

                <div className="card-actions justify-end mt-4">
                    
                    <Link to={`/tuition/${_id}`}>
                        <button className="btn btn-primary btn-sm">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TuitionCard;