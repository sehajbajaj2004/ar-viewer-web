import React from "react";
import { ChevronLeft } from "lucide-react";
import { models } from "../data/models";

const ModelSelectionScreen = React.memo(function ModelSelectionScreen({ onSelectModel, onBack }) {
  return (
    <div className="min-h-screen bg-black">
      <div className="bg-[#121212] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-3 sm:mr-4 p-2 rounded-xl hover:bg-gray-800 transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                3D Collection
              </h1>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                Choose a model to explore in AR
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="bg-[#121212] rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] overflow-hidden group border border-gray-800 active:scale-95"
            >
              <div className="aspect-square overflow-hidden bg-gray-800">
                <img
                  src={model.thumbnail}
                  alt={model.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-3 sm:p-4 md:p-5">
                <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
                  {model.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {model.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ModelSelectionScreen;