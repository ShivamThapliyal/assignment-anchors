import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoUrl = location.state?.videoUrl;
  // const [totalComments, setTotalComments] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch("https://assignment-anchors-frontend.vercel.app/api/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoUrl }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data from the server");
        }

        const result = await response.json();
        console.log(result);

        if (result && result.success) {
          setData(result);
        } else {
          setError("Failed to fetch valid data from the server");
        }
      } catch (error) {
        console.error("Error fetching analysis:", error);
        setError("Error fetching analysis");
      }
    };

    if (videoUrl) {
      fetchAnalysis();
    }
  }, [videoUrl]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  const commentCountsByMonth = data?.commentCountsByMonth;
  const months = Object.keys(commentCountsByMonth || {}).map((key) => {
    const date = new Date(key);
    return date.toLocaleString("default", { month: "short" });
  });
  const commentCounts = months.map((month, index) => {
    const key = Object.keys(commentCountsByMonth || {})[index];
    return commentCountsByMonth[key];
  });

  // Chart.js data
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Comments per Month",
        data: commentCounts,
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Comment Counts",
        font: {
          size: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.raw} comments`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Comments",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex h-screen text-white bg-black">
      <div className="flex flex-col mt-[50px] mr-[60px] ml-[60px] gap-[30px]  w-[100%]">
        <div>
          <button
            onClick={() => navigate("/")}
            className="text-black bg-white rounded-[5px] px-3 py-2"
          >
            Back
          </button>
        </div>
        <h1 className="text-3xl font-semibold ">Analysis Result</h1>
        <div className="flex gap-4 p-2 w-[90%] items-center justify-center">
          <div className="flex flex-col border-2 border-gray-500 p-[25px] rounded-[10px] gap-[5px] w-[40%]">
            <h1 className="text-2xl font-medium">Sentiment Analysis</h1>
            {data && data.sentimentCounts ? (
              <>
                <div>
                  <p className="text-[18px]">
                    Agree: {data.sentimentCounts.agree}%
                  </p>
                  <div className="w-full bg-gray-700 h-[10px] rounded">
                    <div
                      className="bg-green-500 h-[10px] rounded"
                      style={{ width: `${data.sentimentCounts.agree}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-[18px]">
                    Disagree: {data.sentimentCounts.disagree}%
                  </p>
                  <div className="w-full bg-gray-700 h-[10px] rounded">
                    <div
                      className="bg-green-500 h-[10px] rounded"
                      style={{ width: `${data.sentimentCounts.disagree}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <p className="text-[18px]">
                    Neutral: {data.sentimentCounts.neutral}%
                  </p>
                  <div className="w-full bg-gray-700 h-[10px] rounded">
                    <div
                      className="bg-green-500 h-[10px] rounded"
                      style={{ width: `${data.sentimentCounts.neutral}%` }}
                    ></div>
                  </div>
                </div>
              </>
            ) : (
              <p>Loading analysis...</p>
            )}
          </div>
          {data && data.totalComments ? (
            <div className="flex flex-col border-2 border-gray-500 p-[25px] rounded-[10px] gap-[40px] w-[40%]">
              <div className="text-2xl font-medium">
                <h1>Total Comment</h1>
                <p>{data.totalComments}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>
                    {Math.floor(
                      data.totalComments * (data.sentimentCounts.agree / 100)
                    )}
                  </p>
                  <p className="text-[18px] font-light">agree</p>
                </div>
                <div>
                  <p>
                    {Math.floor(
                      data.totalComments * (data.sentimentCounts.disagree / 100)
                    )}
                  </p>
                  <p className="text-[18px] font-light">disagree</p>
                </div>
                <div>
                  <p>
                    {Math.floor(
                      data.totalComments * (data.sentimentCounts.neutral / 100)
                    )}
                  </p>
                  <p className="text-[18px] font-light">neutral</p>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading analysis...</p>
          )}
        </div>
        <div className="w-full mt-6">
          {data && data.commentCountsByMonth && (
            <div className="w-full h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Result;
