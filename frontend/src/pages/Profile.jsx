import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaPencilAlt, FaPen } from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  const savedImage = localStorage.getItem("profileImage");
  return (
    <div className="bg-linear-to-br from-[#DDD788] to-[#B8A335] min-h-screen relative">
      <button
        className="absolute top-10 left-12 cursor-pointer"
        onClick={() => navigate("/")}
      >
        ← Kembali
      </button>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-300 rounded-2xl p-10 w-2/3 flex flex-col items-center gap-4">
          <div className="relative">
            {savedImage || profileImage ? (
              <img
                src={savedImage || profileImage}
                className="w-50 h-50 rounded-full object-cover cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              />
            ) : (
              <FaUserCircle size={96} className="text-gray-600" />
            )}

            {token && (
              <div
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <FaPencilAlt size={12} className="text-gray-600" />
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {token ? (
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl font-bold">Hi, {user.username}!</h2>
              <p className="text-sm text-gray-600">
                Pelajar Keuangan · Member sejak 2026
              </p>
              <div className="flex gap-20 mt-2">
                <div className="bg-gray-400 py-4 px-10 rounded flex flex-col items-center">
                  <span className="text-sm">poin:</span>
                  <span
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Jersey 20', sans-serif" }}
                  >
                    0
                  </span>
                </div>
                <div className="bg-gray-400 p-4 rounded flex flex-col items-center">
                  <span className="text-sm">Level:</span>
                  <span
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Jersey 20', sans-serif" }}
                  >
                    beruang bayi
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="text-red-500 font-bold cursor-pointer mt-2"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-sm font-medium">
                Login untuk melihat level beruang
              </p>
              <button
                onClick={() => navigate("/login")}
                style={{ fontFamily: "'Jersey 20', sans-serif" }}
                className="text-3xl mt-5 bg-gray-400 px-5 py-3 rounded-lg cursor-pointer"
              >
                LOGIN
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
