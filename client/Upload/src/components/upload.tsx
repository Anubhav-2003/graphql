import React, { useState, ChangeEvent } from 'react';

function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setFiles(filesArray);
    }
  };

  const handleUpload = async () => {
    try {
      if (!files.length) {
        console.error('Please select at least one file.');
        return;
      }

      const formData = new FormData();
      files.forEach((file) => {
        formData.append(`files`, file);
      });

      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'id': localStorage.getItem('userId') || '',
        } as HeadersInit,
        body: formData,
      });

      if (response.ok) {
        console.log('Files uploaded successfully!');
      } else {
        console.error('Failed to upload files.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
