import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadStatus {
  type: 'success' | 'error';
  message: string;
}

const FileUpload: React.FC<{ onReportUploaded: (report: any) => void }> = ({ onReportUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<UploadStatus | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setStatus(null);
    const formData = new FormData();
    formData.append('xmlFile', file);

    try {
      const response = await fetch('http://localhost:5000/api/reports/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setStatus({
        type: 'success',
        message: 'File uploaded successfully!'
      });
      setFile(null);
      onReportUploaded(data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to upload file'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">XML files only</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".xml"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {file && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Selected file: {file.name}</p>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </button>
        </div>
      )}
      {status && (
        <div className={`mt-4 p-4 rounded-md ${
          status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          <div className="flex items-center">
            {status.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            {status.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;