import { Outlet } from "react-router-dom";
const Dashboard = () => {
    return (
        <div className="flex">
            <div className="w-64 bg-base-200 min-h-screen">Sidebar up</div>
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};
export default Dashboard;