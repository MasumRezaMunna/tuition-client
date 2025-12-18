import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FaUsers, FaBook, FaChalkboardTeacher, FaClock } from "react-icons/fa";

const AdminStats = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    
    const chartData = [
        { name: 'Students', value: stats.studentCount || 0 },
        { name: 'Tutors', value: stats.tutorCount || 0 },
        { name: 'Pending Jobs', value: stats.pendingTuitions || 0 },
        { name: 'Live Jobs', value: stats.approvedTuitions || 0 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-8">System Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="stat shadow bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <div className="stat-title text-blue-600 font-bold">Total Users</div>
                        <div className="stat-value">{stats.usersCount}</div>
                    </div>
                    <FaUsers className="text-4xl text-blue-300" />
                </div>
                
                <div className="stat shadow bg-green-50 border-l-4 border-green-500 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <div className="stat-title text-green-600 font-bold">Total Jobs</div>
                        <div className="stat-value">{stats.tuitionCount}</div>
                    </div>
                    <FaBook className="text-4xl text-green-300" />
                </div>

                <div className="stat shadow bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <div className="stat-title text-yellow-600 font-bold">Pending Approval</div>
                        <div className="stat-value">{stats.pendingTuitions}</div>
                    </div>
                    <FaClock className="text-4xl text-yellow-300" />
                </div>

                <div className="stat shadow bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4 flex items-center justify-between">
                    <div>
                        <div className="stat-title text-purple-600 font-bold">Active Tutors</div>
                        <div className="stat-value">{stats.tutorCount}</div>
                    </div>
                    <FaChalkboardTeacher className="text-4xl text-purple-300" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-xl shadow-lg">
                
                <div className="h-[300px]">
                    <h3 className="text-xl font-semibold mb-4 text-center">Overview Bar Chart</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8">
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="h-[300px]">
                    <h3 className="text-xl font-semibold mb-4 text-center">Distribution Pie Chart</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default AdminStats;