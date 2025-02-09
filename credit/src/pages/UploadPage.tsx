import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import { CreditReport } from '../types/types';
import { ListFilter, FileText } from 'lucide-react';

const UploadPage = () => {
  const navigate = useNavigate();
  const [uploadedReport, setUploadedReport] = useState<CreditReport | null>(null);

    // Handles successful upload
  const handleReportUploaded = (report: CreditReport) => {
    setUploadedReport(report);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Upload Credit Report</h2>
        <p className="mt-2 text-gray-600">
          Upload your XML credit report file to view the analysis
        </p>
      </div>

      <FileUpload onReportUploaded={handleReportUploaded} />

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => navigate('/reports')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <ListFilter className="w-5 h-5 mr-2" />
          View All Reports
        </button>

        {uploadedReport && (
          <button
            onClick={() => navigate(`/view-report/${uploadedReport._id}`)}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <FileText className="w-5 h-5 mr-2" />
            View Latest Report
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadPage;