import { useState } from "react";
import { useSelector } from "react-redux";
import public_id from "../../redux/public_id";

const UploadFileForm = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const public_id = useSelector((state) => state.public_id);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://127.0.0.1:5555//upload-profile-picture/${public_id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUploadStatus(data.message);
        setFile(""); // Update status
      } else {
        const errorData = await response.json();
        setUploadStatus(`Error: ${errorData.message}`); // Show error message
      }
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`); // Catch error
    }
  };

  return (
    <div className="playfair gap-8 flex flex-col items-center justify-center border-2 border-sky-400 font-bold ">
      <div className="text-3xl mt-8">Choose a profile photo</div>
      <label className="submit-button flex justify-center">
        <span>Upload file</span>
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
      {file && <p className="mt-2 text-center">{file.name}</p>}
      <button
        className="submit-button"
        onClick={handleFileUpload}
        type="submit"
      >
        Submit Profile Img
      </button>
      <p className="mt-2">{uploadStatus}</p>
    </div>
  );
};

export default UploadFileForm;