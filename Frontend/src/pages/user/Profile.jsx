import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../redux/api/user";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    // ✅ FIX: Check if userInfo exists before setting state
    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo?.username || ""); 
            setEmail(userInfo?.email || "");
        }
    }, [userInfo]);

    // ✅ Prevent component from crashing if userInfo is null
    if (!userInfo) {
        return <div className="text-center text-red-500">User not logged in</div>;
    }

    // 🔹 Handle Profile Update Submission
    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res = await updateProfile({ username, email, password }).unwrap();
            dispatch(setCredentials(res)); // Update Redux store
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error(error?.data?.message || "Profile update failed!");
        }
    };

    return (
        <div className="container mx-auto p-4 mt-[10rem]">
            <div className="flex justify-center align-center md:flex md:space-x-4">
                <div className="md:w-1/3">
                    <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

                    <form onSubmit={submitHandler} className="mb-4">
                        <div className="mb-4">
                            <label className="block text-white mb-2">User Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                className="form-input p-4 rounded-sm w-full"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="form-input p-4 rounded-sm w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                className="form-input p-4 rounded-sm w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white mb-2">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="form-input p-4 rounded-sm w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded w-full"
                            disabled={loadingUpdateProfile}
                        >
                            {loadingUpdateProfile ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
