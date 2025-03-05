import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";  // Assuming you have this loader component
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useRegisterMutation } from "../../redux/api/user";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Using the mutation hook
  const [register, { isLoading, error }] = useRegisterMutation();
  
  // User info from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Handle redirect logic from URL query params
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/pages/Home';  // Default redirect path set to '/pages/Home'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);  // If userInfo is available, navigate to the redirect path
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      const res = await register({ username, email, password }).unwrap();
  
      if (res?.userInfo) {
        dispatch(setCredentials(res.userInfo));  // Dispatch userInfo to Redux store
        toast.success('User successfully registered.');
        navigate(redirect || '/pages/Home');  // Redirect to the desired page or home
      }
    } catch (err) {
      // Ensure you handle errors gracefully
      toast.error(err?.message || "Registration failed!");
    }
  };
  

  return (
    <div className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form className="container w-[40rem]" onSubmit={submitHandler}>
          <div className="my-[2rem]">
            <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 border rounded w-full"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              className="mt-1 border rounded w-full"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 border rounded w-full"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 border rounded w-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <button
            type="submit" className="w-full bg-blue-500 text-white py-2 rounded" disabled={isLoading}>
              {isLoading ? <Loader /> : 'Register'}
            </button>
          </div>

          {error && <div className="text-red-500">{error?.message || 'Registration failed!'}</div>}
        </form>

        <div className="mt-4">
          <p>Already have an account? 
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>

      <img
        src="https://images.pexels.com/photos/30858720/pexels-photo-30858720.jpeg" 
        alt="Creative workspace" 
        className="h-[40rem] w-[30%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </div>
  );
};

export default Register;
