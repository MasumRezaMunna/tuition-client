import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TuitionCard from "../../components/Shared/TuitionCard";
import { Helmet } from "react-helmet-async";

const AllTuitions = () => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    
    const { data, isLoading } = useQuery({
        queryKey: ['tuitions', search, sort, currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tuitions?search=${search}&sort=${sort}&page=${currentPage}&limit=${itemsPerPage}`);
            return res.data;
        }
    });

    const tuitions = data?.result || [];
    const totalItems = data?.total || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (isLoading) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg"></span></div>;
    }

    return (
        <div className="pt-24 pb-12 px-4 max-w-screen-xl mx-auto">
            <Helmet><title>eTuitionBd | All Jobs</title></Helmet>

            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Available Tuitions</h2>
                
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    
                    <input 
                        type="text" 
                        placeholder="Search by Subject or Location..." 
                        className="input input-bordered w-full max-w-xs"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1); 
                        }}
                    />

                    
                    <select 
                        className="select select-bordered"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">Sort by Budget</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tuitions.map(item => <TuitionCard key={item._id} item={item} />)}
            </div>

            
            <div className="flex justify-center mt-12 join">
                {[...Array(totalPages).keys()].map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page + 1)}
                        className={`join-item btn ${currentPage === page + 1 ? 'btn-primary' : ''}`}
                    >
                        {page + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllTuitions;