// src/pages/ModelsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { models } from "../data/models";

export default function ModelsPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black">
      <div className="bg-[#121212] p-4 flex items-center">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ChevronLeft className="text-white" />
        </button>
        <h1 className="text-white text-2xl">3D Collection</h1>
      </div>
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {models.map((model) => (
          <div
            key={model.id}
            onClick={() => navigate(`/viewer/${model.id}`)}
            className="bg-[#121212] rounded-xl overflow-hidden cursor-pointer"
          >
            <img src={model.thumbnail} alt={model.name} className="w-full" />
            <div className="p-3">
              <h3 className="text-white">{model.name}</h3>
              <p className="text-gray-400 text-sm">{model.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
