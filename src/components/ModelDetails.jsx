// src/components/ModelDetails.jsx
import React from "react";

export default function ModelDetails({ model }) {
  if (!model) return null;
  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold">{model.name}</h2>
      <p className="text-gray-400">{model.description}</p>
    </div>
  );
}
