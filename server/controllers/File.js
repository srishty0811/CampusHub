const File = require("../models/FileUpload");

// ---------------------- LOCAL FILE UPLOAD ----------------------
exports.localFileUpload = async (req, res) => {
  try {
    const { firstName, lastName, Department, subject, year, fileName } = req.body;
    const files = req.file;
    const userId = req.user.id;

    console.log("User ID:", userId);

    if (!files) {
      return res.status(400).json({
        success: false,
        message: "No file received",
      });
    }

    const newFile = new File({
      firstName,
      lastName,
      Department,
      year,
      subject,
      fileName,
      filePath: files.path,
      uploadedBy: userId,
    });

    await newFile.save();
    return res.status(200).json({
      success: true,
      message: "File uploaded and data saved",
    });
  } catch (error) {
    console.error("Error in localFileUpload:", error.message);
    return res.status(500).json({
      success: false,
      message: "File not uploaded",
    });
  }
};

// ---------------------- FILE UPLOAD USING DRIVE LINK ----------------------
exports.fileUploadUsingDriveLink = async (req, res) => {
  try {
    const { firstName, lastName, Department, subject, year, fileName, driveLink } = req.body;
    const userId = req.user.id;

    const newFile = new File({
      firstName,
      lastName,
      Department,
      year,
      subject,
      fileName,
      driveLink,
      uploadedBy: userId,
    });

    await newFile.save();
    return res.status(200).json({
      success: true,
      message: "File uploaded and data saved",
    });
  } catch (error) {
    console.error("Error in fileUploadUsingDriveLink:", error.message);
    return res.status(500).json({
      success: false,
      message: "File not uploaded",
    });
  }
};

// ---------------------- GET SUBJECT NAMES ----------------------
exports.getSubjectName = async (req, res) => {
  try {
    const { Department } = req.query;

    if (!Department) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter: Department",
      });
    }

    const subjects = await File.find({ Department }).distinct("subject");
    return res.status(200).json({
      success: true,
      message: "Subject names found",
      subjects,
    });
  } catch (error) {
    console.error("Error in getSubjectName:", error.message);
    return res.status(500).json({
      success: false,
      message: "Subject names cannot be fetched",
    });
  }
};

// ---------------------- GET FILES BY DEPARTMENT & SUBJECT ----------------------
exports.getFilesByDepartmentAndSubject = async (req, res) => {
  try {
    const { Department, subjectName } = req.query;

    if (!Department || !subjectName) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: Department or Subject Name",
      });
    }

    const files = await File.find({ Department, subject: subjectName });

    // ✅ Add file URL for frontend
    const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
    const filesWithUrl = files.map((file) => ({
      ...file._doc,
      fileUrl: file.filePath
        ? `${backendUrl}/${file.filePath.replace(/\\/g, "/")}`
        : file.driveLink || null,
    }));

    return res.status(200).json({
      success: true,
      message: "Files found",
      files: filesWithUrl,
    });
  } catch (error) {
    console.error("Error in getFilesByDepartmentAndSubject:", error.message);
    return res.status(500).json({
      success: false,
      message: "Files cannot be fetched",
    });
  }
};

// ---------------------- GET USER NOTES ----------------------
exports.getUserNotes = async (req, res) => {
  try {
    const userId = req.query.userid;
    const notes = await File.find({ uploadedBy: userId });

    if (!notes || notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notes found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("Error fetching user notes:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not fetch notes.",
    });
  }
};

// ---------------------- DELETE NOTE ----------------------
exports.DeleteNote = async (req, res) => {
  try {
    const noteId = req.body.params.noteId;

    const note = await File.findOne({ _id: noteId });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or no permission to delete",
      });
    }

    await File.findByIdAndDelete(noteId);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Could not delete note",
    });
  }
};
