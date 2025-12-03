import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fileUploadEndpoints, ProfileEndPoints } from "../../../services/apis";
import { apiConnector } from "../../../services/apiConnector";
import { deleteFile } from "../../../services/operations/profileAPI.js";

const { GET_USER_NOTES } = fileUploadEndpoints;
const { GET_USER_DOWNLOADS, UPDATE_USER_PROFILE } = ProfileEndPoints;

const MyProfile = () => {
  const [files, setFiles] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { user } = useSelector((state) => state.profile);

  // Load files and downloads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resNotes = await apiConnector(
          "GET",
          `${GET_USER_NOTES}?userid=${user._id}`
        );
        setFiles(resNotes.data.notes);

        const resDownloads = await apiConnector(
          "GET",
          `${GET_USER_DOWNLOADS}?userid=${user._id}`
        );
        setDownloads(resDownloads.data.downloads);

        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    if (user?._id) fetchData();
  }, [user]);

  const handleDelete = async (fileId) => {
    await deleteFile(fileId);
    setFiles((prev) => prev.filter((file) => file._id !== fileId));
  };

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await apiConnector("PUT", UPDATE_USER_PROFILE, { ...formData, userId: user._id });
      alert("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-green-200 text-black p-8">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="w-full md:w-1/4 mx-auto flex flex-col items-center gap-6 justify-center md:block">
          <img
            src={user?.image}
            alt={user?.firstName}
            className="rounded-full w-40 h-40 object-cover shadow-xl hover:scale-110 transition-transform duration-300"
          />
          <div className="text-4xl font-bold text-gray-900">{`${user?.firstName} ${user?.lastName}`}</div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-3/4 mx-auto space-y-10">
          {/* Profile Edit Form */}
          {isEditing && (
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="p-3 border rounded-lg"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="p-3 border rounded-lg"
                />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="p-3 border rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="p-3 border rounded-lg"
                />
              </div>
              <button
                onClick={handleSave}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* Files Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">My Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {files.map((file) => (
                <div
                  key={file._id}
                  className="bg-gradient-to-r from-cyan-300 to-blue-400 text-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out"
                >
                  <div className="text-xl font-semibold text-gray-900">
                    {file.subject}
                  </div>
                  <div className="text-md font-medium text-gray-700">
                    {file.firstName}
                  </div>
                  <div className="text-xs text-gray-600 mb-4">
                    {formatDate(file.uploadedAt)}
                  </div>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  >
                    Delete File
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Downloads Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">My Downloads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {downloads.map((file) => (
                <div
                  key={file._id}
                  className="bg-gradient-to-r from-yellow-300 to-orange-400 text-sm rounded-xl p-6 shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out"
                >
                  <div className="text-xl font-semibold text-gray-900">
                    {file.subject}
                  </div>
                  <div className="text-md font-medium text-gray-700">
                    {file.firstName}
                  </div>
                  <div className="text-xs text-gray-600 mb-4">
                    {formatDate(file.downloadedAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
