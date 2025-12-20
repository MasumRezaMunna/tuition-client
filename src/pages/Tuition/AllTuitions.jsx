import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TuitionCard from "../../components/Shared/TuitionCard";
import { Helmet } from "react-helmet-async";

const AllTuitions = () => {
    const axiosPublic = useAxiosPublic();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: tuitions = [], isLoading } = useQuery({
        queryKey: ['tuitions'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tuitions');
            return res.data;
        }
    });

    const filteredTuitions = tuitions.filter(item => 
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg"></span></div>;
    }

    return (
        <div className="pt-24 pb-12 px-4 max-w-screen-xl mx-auto">
            <Helmet>
                <title>eTuitionBd | All Jobs</title>
            </Helmet>

            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Available Tuitions</h2>
                <p className="text-gray-500">Find the perfect student for your schedule</p>
                
                <div className="mt-6 flex justify-center">
                    <input 
                        type="text" 
                        placeholder="Search by Subject or Location..." 
                        className="input input-bordered w-full max-w-md"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredTuitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTuitions.map(item => (
                        <TuitionCard key={item._id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-10">
                    <h3 className="text-2xl">No tuitions found matching your search.</h3>
                </div>
            )}
        </div>
    );
};

export default AllTuitions;