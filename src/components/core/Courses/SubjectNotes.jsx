import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fileUploadEndpoints } from "../../../services/apis";
import toast from "react-hot-toast";
import { apiConnector } from "../../../services/apiConnector";

const { GET_FILES_BY_DEPARTMENT_AND_SUBJECT_API } = fileUploadEndpoints;

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const SubjectNotes = () => {
  const { Department, subjectName } = useParams();
  const [files, setFiles] = useState([]);

  async function getFiles(Department, subjectName) {
    const toastId = toast.loading("Loading files...");
    const url = `${GET_FILES_BY_DEPARTMENT_AND_SUBJECT_API}?Department=${Department}&subjectName=${subjectName}`;
    console.log(url);
    try {
      const response = await apiConnector("GET", url);
      console.log("Printing file data", response);
      if (response.data && response.data.files) {
        setFiles(response.data.files);
      } else {
        setFiles([]);
      }
    } catch (error) {
      console.error("Get Files API error:", error);
      setFiles([]);
    }
    toast.dismiss(toastId);
  }

  useEffect(() => {
    if (Department && subjectName) {
      getFiles(Department, subjectName);
    }
  }, [Department, subjectName]);

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleString("en-IN", options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-200">
      <div className="h-20 bg-[#86C3FB] text-center text-xl md:text-4xl font-medium font-sans flex items-center justify-center shadow-lg">
        {`${Department} - ${subjectName}`}
      </div>

      {/* File Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-1 w-10/12 mx-auto mt-8 gap-6">
        {files.length > 0 ? (
          files.map((file, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-sm rounded-lg shadow-xl p-6 hover:scale-105 transition-all duration-300 ease-in-out"
            >
              {/* File Info */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <p className="font-semibold text-gray-700">Year:</p>
                <p className="col-span-2 text-gray-900">{file.year}</p>
                <p className="font-semibold text-gray-700">Time:</p>
                <p className="col-span-2 text-gray-900">
                  {formatDate(file.uploadedAt)}
                </p>
                <p className="font-semibold text-gray-700">Uploaded By:</p>
                <p className="col-span-2 text-gray-900">{file.firstName}</p>
              </div>

              {/* Buttons to Open Files */}
              <div className="flex justify-between">
                {file.filePath ? (
                  <button
                    className="bg-blue-600 text-white rounded-lg px-6 py-3 shadow-md hover:bg-blue-700 transition-all duration-300"
                    onClick={() => window.open(`${backendUrl}/${file.filePath}`, "_blank")}
                  >
                    Open File
                  </button>
                ) : file.driveLink ? (
                  <button
                    className="bg-blue-600 text-white rounded-lg px-6 py-3 shadow-md hover:bg-blue-700 transition-all duration-300"
                    onClick={() => window.open(file.driveLink, "_blank")}
                  >
                    Open Drive Link
                  </button>
                ) : (
                  <p className="text-red-500 font-semibold">No file available</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl font-semibold text-gray-700 mt-8">
            No files found for this subject.
          </p>
        )}
      </div>
    </div>
  );
};

export default SubjectNotes;
