import { Outlet } from "react-router-dom";
const Main = () => {
    return (
        <div>
            <h2>Navbar Placeholder</h2>
            <Outlet />
            <h2>Footer Placeholder</h2>
        </div>
    );
};
export default Main;