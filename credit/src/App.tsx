import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FileText } from 'lucide-react';
import UploadPage from './pages/UploadPage';
import ReportListPage from './pages/ReportListPage';
import ReportViewPage from './pages/ReportViewPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Credit Report System</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/reports" element={<ReportListPage />} />
            <Route path="/view-report/:id" element={<ReportViewPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;