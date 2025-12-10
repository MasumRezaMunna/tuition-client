import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="pt-20 min-h-[calc(100vh-68px)]">
                <Outlet />
            </div>
        </div>
    );
};

export default Main;