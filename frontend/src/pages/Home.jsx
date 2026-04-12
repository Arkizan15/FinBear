import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BearModel from "../components/BearModel";
import { useAuth } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const savedImage = localStorage.getItem("profileImage");
  const { user } = useAuth();
  const points = user?.points ?? 0;
  const bearLevel =
    points >= 100
      ? "Beruang Dewasa"
      : points >= 50
        ? "Beruang Remaja"
        : "Beruang Bayi";

  return (
    <div className="bg-linear-to-br from-[#DDD788] to-[#B8A355] min-h-screen relative">
      <div className="flex items-center justify-between px-30 py-20">
        <div className="flex flex-col gap-4 ml-50">
          <h1
            className="text-7xl font-bold tracking-wide"
            style={{ fontFamily: "'Jersey 20', cursive" }}
          >
            Kelola uang <br /> jadi{" "}
            <span className="" style={{ fontFamily: "'Jersey 20', cursive" }}>
              lebih cerdas
            </span>
          </h1>
          <p className=" text-lg max-w-md">
            FinBear hadir untuk membantu kamu belajar keuangan, mencatat
            pemasukan & pengeluaran, serta meraih tujuan finansialmu dengan cara
            yang menyenangkan.
          </p>
        </div>

        <div className="w-112.5 h-137.5 relative">
          <BearModel />
          <span
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-bold text-2xl whitespace-nowrap"
            style={{ fontFamily: "'Jersey 20', cursive" }}
          >
            {bearLevel}
          </span>
          <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm whitespace-nowrap">
            🐾 Beruang bisa diputar dan di-zoom!
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-4">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-15 bg-gray-300 px-6 py-3 rounded-lg cursor-pointer w-60"
        >
          {savedImage ? (
            <img
              src={savedImage}
              className="w-13 h-13 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-gray-600" size={32} />
          )}
          <span className="font-semibold cursor-pointer   ">Profil</span>
        </button>
      </div>
    </div>
  );
}

export default Home;
