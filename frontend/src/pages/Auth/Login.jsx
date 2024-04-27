import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import logo from "../../assets/dstore.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-between">
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold text-gray-300 mb-4 text-center uppercase">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="container lg:w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="text-sm text-gray-300 font-bold"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
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
                required
                type="password"
                className="w-full border p-2 rounded-md mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="p-2 uppercase bg-black text-white rounded-md w-full opacity-70 hover:opacity-100"
            >
              {isLoading ? "Login loading..." : "Login"}
            </button>

            {isLoading && <Loader />}
          </form>

          <div className="mt-4">
            <p className="text-gray-300">
              New Member?
              <Link
                className="ml-2 font-bold hover:underline"
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="sm:hidden md:block lg:block xl:block mr-[8rem] mt-[5rem]">
        <img
          src={logo}
          alt="name"
          className="w-full h-[600px] object-cover border"
        />
      </section>
    </div>
  );
};

export default Login;
