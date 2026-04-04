import { FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return(
        <div className="bg-linear-to-br from-[#DDD788] to-[#B8A355] min-h-screen relative">
            <div className="flex items-center justify-between px-30 py-50">
                <div className="flex flex-col gap-4 ml-50">
                    <h1 className="text-7xl font-bold tracking-wide" style={{ fontFamily: "'Jersey 20', cursive" }}>
                        Kelola uang <br /> jadi <span className="" style={{ fontFamily: "'Jersey 20', cursive" }}>lebih cerdas</span>
                    </h1>
                    <p className=" text-lg max-w-md">
                        FinBear hadir untuk membantu kamu belajar keuangan, mencatat pemasukan & pengeluaran, serta meraih tujuan finansialmu 
                        dengan cara yang menyenangkan.
                    </p>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 p-4">
                <button onClick={() => navigate('/profile')}
                    className="flex items-center gap-15 bg-gray-300 px-6 py-3 rounded-lg cursor-pointer w-60">
                    <FaUserCircle className="text-gray-600" size={32}/>
                    <span className="font-semibold cursor-pointer   ">Profil</span>
                </button>
            </div>
        </div>
    )
}

export default Home;