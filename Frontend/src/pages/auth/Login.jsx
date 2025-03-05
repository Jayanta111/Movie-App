import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";  // Assuming you have this loader component
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/user";
import { useLogoutMutation } from "../../redux/api/user";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <form onSubmit={logoutHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Fixed onClick to onChange
              />
            </div>
            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Fixed onClick to onChange
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {isLoading && <Loader />}
            </button>
            <div className="mt-4">
              <p className="text-white">
                New User?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"} // Fixed template literal
                  className="text-teal-500 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
        <img
          src="https://images.pexels.com/photos/30858720/pexels-photo-30858720.jpeg"
          alt="Creative workspace"
          className="h-[40rem] w-[30%] xl:block md:hidden sm:hidden rounded-lg"
        />
      </section>
    </div>
  );
};

export default Login;
