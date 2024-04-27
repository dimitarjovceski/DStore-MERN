import { useEffect, useState } from "react";
import { useUpdateProfileMutation } from "../../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { setCredentials } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password not match!");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully!");
      } catch (error) {
        console.log(error);
        toast.error(error?.data.message || error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl text-gray-300 font-semibold mb-4 text-center uppercase">
             Your Profile
          </h2>

          <form
            onSubmit={handleUpdateProfile}
            className="bg-black bg-opacity-50 p-5 rounded-md"
          >
            <div className="mb-4 ">
              <label className="text-sm text-gray-300 font-bold">
                Username
              </label>
              <input
                type="text"
                className="form-input p-2 rounded-md w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-300 font-bold">Email</label>
              <input
                type="email"
                className="form-input p-2 rounded-md w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm  text-gray-300 font-bold">
                Password
              </label>
              <input
                type="password"
                className="form-input p-2 rounded-md w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm text-gray-300 font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-input p-2 rounded-md w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                disabled={isLoading}
                type="submit"
                className="p-2 rounded-md bg-green-500 text-white  uppercase  "
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
              <Link to="/user-orders">
                <button
                  type="button"
                  className="p-2 rounded-md bg-gray-300 text-black  uppercase opacity-70 hover:opacity-100"
                >
                  My Orders
                </button>
              </Link>
            </div>
          </form>
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
