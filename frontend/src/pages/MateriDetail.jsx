import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { div } from "three/src/nodes/TSL.js";

function MateriDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await fetch(`http://localhost:3000/modules/${id}`);
        const data = await response.json();
        setModule(data);
      } catch (error) {
        console.error("Error fetching module", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  if (loading) return <div>Loading ...</div>;
  if (!module) return <div>Modul tidak ditemukan</div>;
  return (
    <div className="bg-linear-to-br from-[#DDD788] to-[#B8A355] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/belajar")}
            className="text-2xl cursor-pointer"
          >
            ←
          </button>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "'Jersey 20', cursive" }}
          >
            {module.title}
          </h1>
        </div>

        <div className="bg-[#E0CEA9] rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">
            {module.slides[currentSlide].title}
          </h2>
          <p className="whitespace-pre-line">
            {module.slides[currentSlide].content}
          </p>
        </div>
        <div className="flex justify-end mt-6">
        <button className="bg-[#241919] text-white px-8 py-3 rounded-xl font-semibold">
          Mulai
        </button>
        </div>
      </div>
    </div>
  );
}

export default MateriDetail;
