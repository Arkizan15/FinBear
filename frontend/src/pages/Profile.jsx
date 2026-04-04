import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

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
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-300 rounded-2xl p-10 w-96 flex flex-col items-center gap-4">
          <div className="relative">
            {savedImage || profileImage ? (
                <img 
                src={savedImage || profileImage}
                className="w-24 h-24 rounded-full object-cover cursor-pointer"
                onClick={() => fileInputRef.current.click()}  
                />
            ) : (
                <FaUserCircle 
                size={96}
                className="text-gray-600 cursor-pointer"
                onClick={() => fileInputRef.current.click()}
                />
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
                <p className="text-sm text-gray-600">Pelajar Keuangan · Member sejak 2026</p>
                <div className="flex gap-4 mt-2">
                    <div className="bg-gray-400 p-4 rounded flex flex-col items-center">
                        <span className="text-sm">poin</span>
                        <span className="text-2xl font-bold">0</span>
                    </div> 
                    <div className="bg-gray-400 p-4 rounded flex flex-col items-center">
                        <span className="text-sm">Level:</span>
                        <span className="text-sm font-bold">beruang bayi</span>
                    </div> 
                </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
                <p className="text-center text-sm font-medium">Login untuk melihat level beruang</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
