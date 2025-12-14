import { Link, Outlet, NavLink } from "react-router-dom";
import useRole from "../hooks/useRole";
import { FaHome, FaUsers, FaBook, FaWallet, FaChalkboardTeacher } from "react-icons/fa"; 

const Dashboard = () => {
    const [role] = useRole(); 

    const adminLinks = <>
        <li><NavLink to="/dashboard/users"><FaUsers/> Manage Users</NavLink></li>
        <li><NavLink to="/dashboard/manage-tuitions"><FaBook/> Manage Tuitions</NavLink></li>
        <li><NavLink to="/dashboard/statistics"><FaChalkboardTeacher/> Statistics</NavLink></li>
    </>;

    const tutorLinks = <>
        <li><NavLink to="/dashboard/my-applications"><FaBook/> My Applications</NavLink></li>
        <li><NavLink to="/dashboard/my-students"><FaUsers/> My Students</NavLink></li>
        <li><NavLink to="/dashboard/earnings"><FaWallet/> Earnings</NavLink></li>
    </>;

    const studentLinks = <>
        <li><NavLink to="/dashboard/post-tuition"><FaBook/> Post Tuition</NavLink></li>
        <li><NavLink to="/dashboard/my-tuitions"><FaBook/> My Tuitions</NavLink></li>
        <li><NavLink to="/dashboard/payment-history"><FaWallet/> Payment History</NavLink></li>
    </>;

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            <div className="drawer-content flex flex-col items-center justify-center p-8">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Menu</label>
                <div className="w-full h-full">
                    <Outlet />
                </div>
            </div> 
            
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold">eTuitionBd</h2>
                        <p className="badge badge-primary uppercase">{role}</p>
                    </div>

                    {role === 'admin' && adminLinks}
                    {role === 'tutor' && tutorLinks}
                    {role === 'student' && studentLinks}

                    <div className="divider"></div> 
                    
                    <li><Link to="/"><FaHome/> Home</Link></li>
                    <li><Link to="/profile">Profile Settings</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;