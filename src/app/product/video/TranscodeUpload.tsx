"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface props {
  jobId: string;
  setTranscodeUpload: (b: boolean) => void;
  setJobId: (id: string | null) => void;
}

const serverUrl = "https://mi-server.onrender.com";
// const serverUrl = "http://localhost:8000/";

const TranscodeUpload = ({ jobId, setTranscodeUpload, setJobId }: props) => {
  const [data, setData] = useState<null | {
    jobStatus: string;
    jobProgress: number;
  }>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${serverUrl}/api/v1/media/video/getProgress/${jobId}`
        ); // Replace with your API endpoint
        console.log(data);
        setData(data.data);
        if (data?.data.jobStatus === "COMPLETE") {
          setJobId(null);
          setTranscodeUpload(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  console.log(data);

  return (
    <div>
      {data && (
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                {data?.jobStatus}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-teal-600">
                {data?.jobStatus == "COMPLETE" && true
                  ? "100%"
                  : `${data?.jobProgress === -1 ? 10 : data.jobProgress}%`}
              </span>
            </div>
          </div>
          <div className="flex mb-2 items-center justify-between">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="w-full bg-teal-300 rounded-full h-2"
                style={{
                  width:
                    data.jobStatus === "COMPLETE"
                      ? "100%"
                      : `${
                          data?.jobProgress == -1 ? "10" : data?.jobProgress
                        }%`,
                }}
              ></div>
              {/* <div
                    className={`w-full ${
                      loading ? "bg-blue-300" : "bg-teal-300"
                    } rounded-full h-2`}
                    style={{ width: `${transcodeUpload}%` }}
                  ></div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscodeUpload;
