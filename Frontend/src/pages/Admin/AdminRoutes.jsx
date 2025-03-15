import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
    // Get user info from the redux store
    const { userInfo } = useSelector((state) => state.auth);

    // Check if the user is an admin
    return userInfo && userInfo.isAdmin ? (
        <Outlet />  // Render the child routes if the user is an admin
    ) : (
        <Navigate to='/login' replace />  // Redirect to login page if the user is not an admin
    );
};

export default AdminRoute;
