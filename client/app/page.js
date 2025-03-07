"use client";
import { useState, useRef, useEffect } from "react";

export default function HomePage() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const previewRef = useRef(null);

  // Handle new files (from drag & drop or file input)
  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Drag & drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  // Open file picker
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files?.length) {
      handleFiles(e.target.files);
    }
  };

  // Remove a selected file by index
  const removeFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // 3D "flutter" effect on scroll
  const handleScroll = () => {
    if (!previewRef.current) return;
    const container = previewRef.current;
    const children = container.querySelectorAll(".preview-item");
    children.forEach((child) => {
      const rect = child.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const offset = rect.top - containerRect.top;
      const normalized = (offset / container.clientHeight) - 0.5;
      const angle = normalized * 10;
      child.style.transform = `perspective(500px) rotateX(${angle}deg)`;
    });
  };

  useEffect(() => {
    const container = previewRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [uploadedFiles]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#121212" }}>
      {/* Navigation Header */}
      <header className="shadow p-4" style={{ backgroundColor: "#121212" }}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo on the left */}
          <div className="text-3xl font-bold text-gray-400">
            Post Polish
          </div>
          {/* Navigation links on the right */}
          <nav className="flex items-center space-x-6">
            <a href="#" className="font-semibold text-gray-400 hover:text-gray-200">
              Sign In
            </a>
            <a href="#" className="font-semibold text-gray-400 hover:text-gray-200">
              Rate My Photos
            </a>
            <a href="#" className="font-semibold text-gray-400 hover:text-gray-200">
              Previous Uploads
            </a>
            <a href="#" className="font-semibold text-gray-400 hover:text-gray-200">
              Get More Credits
            </a>
            <a href="#" className="flex items-center hover:text-gray-200">
              {/* My Account Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.28 0 4.41.54 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex flex-1 p-4 space-x-4">
        {/* Left: Upload Area */}
        <div
          className="flex-1 border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center"
          style={{ borderColor: "#333" }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p className="mb-4 text-gray-400">Drag & drop your photos here</p>
          <button
            onClick={handleUploadClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Or click to upload
          </button>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>

        {/* Right: Preview Column */}
        <div
          ref={previewRef}
          className="w-80 border rounded-md p-4 overflow-y-auto"
          style={{ borderColor: "#333", maxHeight: "calc(100vh - 128px)" }}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-400">Preview</h2>
          <div className="space-y-4">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="relative preview-item transition-transform duration-300"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="w-full h-auto rounded"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          {uploadedFiles.length > 5 && (
            <div className="mt-4 text-center text-sm text-gray-500">
              Scroll to see more...
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


