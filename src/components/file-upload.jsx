"use client"
import React, { useState } from 'react';
import { PiFileAudioLight, PiCheckCircleLight } from "react-icons/pi";

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    console.log('Uploaded file:', uploadedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const uploadedFile = event.dataTransfer.files[0];
    setFile(uploadedFile);
    console.log('Dropped file:', uploadedFile);
  };

  return (
    <div className="mt-14 flex justify-center items-center">
      <label
        htmlFor="fileUploadInput"
        className="px-60 py-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center space-y-3 cursor-pointer hover:border-gray-400"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".m4a"
          onChange={handleFileUpload}
          className="hidden"
          id="fileUploadInput"
        />
        {file ? <PiCheckCircleLight className="h-10 w-10 text-gray-500" /> : <PiFileAudioLight className="h-10 w-10 text-gray-500"/>}
        <span className="text-gray-600 whitespace-nowrap" style={{ fontWeight: '500' }}>
          {file ? 'Uploaded!' : '파일을 업로드해 주세요'}
        </span>
        {file && <p className="mt-2 text-sm text-gray-600">{file.name}</p>}
      </label>
    </div>
  );
}

export default FileUpload;
