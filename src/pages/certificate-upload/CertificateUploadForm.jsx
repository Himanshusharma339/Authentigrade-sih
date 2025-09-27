import React, { useState } from "react";
import axios from "axios";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const CertificateUploadForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [institution, setInstitution] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title || !institution || !issueDate) {
      alert("Please fill all fields and upload a certificate file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("institution", institution);
    formData.append("issueDate", issueDate);

    setIsUploading(true);
    try {
      const response = await axios.post("/api/certificates/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Certificate uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to upload certificate.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleUpload}
        className="bg-gray-800 rounded-lg p-8 shadow-lg w-full max-w-lg space-y-6 animate-fadeIn"
      >
        <h2 className="text-2xl font-semibold text-blue-400 text-center">
          Upload Your Certificate
        </h2>

        <input
          type="text"
          placeholder="Certificate Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-blue-400"
        />

        <input
          type="text"
          placeholder="Institution Name"
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          required
          className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-blue-400"
        />

        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          required
          className="w-full p-3 bg-gray-700 rounded-md text-white focus:outline-blue-400"
        />

        <input
          type="file"
          accept="application/pdf,image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
          className="w-full p-3 bg-gray-700 rounded-md text-white"
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          {isUploading ? (
            <div className="flex items-center justify-center space-x-2 animate-pulse">
              <Icon name="Loader2" size={18} />
              <span>Uploading...</span>
            </div>
          ) : (
            <span>Upload Certificate</span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default CertificateUploadForm;
