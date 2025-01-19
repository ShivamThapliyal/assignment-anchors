import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [videoUrl, setvideoUrl] = useState("");
  const navigate = useNavigate();
  const handelurl = (e) => {
    setvideoUrl(e.target.value);
  };
  const handleAnalyzeClick = () => {
    navigate("/Result", { state: { videoUrl } });
  };
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="border-2 rounded-[6px] border-gray-500 p-4 flex flex-col items-center gap-[18px] text-white">
        <h1 className="p-2 text-3xl font-bold">Youtube Comment Analyzer</h1>
        <p className="text-[15px] font-extrabold">
          Enter a Youtube video URL to analyze its comment
        </p>
        <input
          value={videoUrl}
          onChange={handelurl}
          type="url"
          placeholder="paste the link here..."
          className="w-[95%] text-center font-semibold tracking-widest rounded-[5px] bg-black p-2 border-3"
          required
        />
        <button
          onClick={handleAnalyzeClick}
          className="bg-white text-black w-[90%] rounded-[8px] p-1 hover:border-gray-500 hover:border-2 text-[18px] font-extrabold"
        >
          Click to Analyze
        </button>
      </div>
    </div>
  );
}

export default Home;
