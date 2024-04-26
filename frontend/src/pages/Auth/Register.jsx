import { useState, useEffect } from "react";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import logo from "../../assets/dstore.jpg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const search = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password not match!");
    } else {
      try {
        const res = await register({ username, email, password });
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered!");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex justify-between">
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl text-center uppercase mb-4 font-semibold text-gray-300">
            Register
          </h1>

          <form onSubmit={handleRegister} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="username"
                className="text-sm font-bold text-gray-300"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter Username"
                className="w-full border p-2 rounded-md mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="text-sm font-bold text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter Email Address"
                className="w-full border p-2 rounded-md mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="text-sm font-bold text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                className="w-full border p-2 rounded-md mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-bold text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter Confirm Password"
                className="w-full border p-2 rounded-md mt-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="p-2 rounded-md bg-black text-white opacity-70 hover:opacity-100 w-full uppercase"
            >
              {isLoading ? "Register loading..." : "Register"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-gray-300">
              Already have an account?
              <Link
                className="ml-2 font-bold hover:underline"
                to={redirect ? `/login?${redirect}` : "/login"}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="sm:hidden md:block lg:block xl:block mr-[8rem] mt-[5rem]">
        <img src={logo} alt="name" className="w-full h-[600px] object-cover border" />
      </section>
    </div>
  );
};

export default Register;
