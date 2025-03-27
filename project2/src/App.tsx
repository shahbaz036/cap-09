import React, { useState } from 'react';
import { DynamicForm } from './components/DynamicForm';
import { FormField, FormData } from './types/form';
import { FileJson } from 'lucide-react';

const formSchema: FormField[] = [
  {
    id: 'personalInfo',
    type: 'section',
    label: 'Personal Information',
    fields: [
      {
        id: 'name',
        type: 'text',
        label: 'Full Name',
        required: true
      },
      {
        id: 'email',
        type: 'email',
        label: 'Email Address',
        required: true,
        validation: {
          pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
          message: 'Please enter a valid email address'
        }
      }
    ]
  },
  {
    id: 'education',
    type: 'section',
    label: 'Education',
    fields: [
      {
        id: 'degree',
        type: 'select',
        label: 'Degree',
        required: true,
        options: ["Bachelor\u2019s", "Master\u2019s", "PhD", "Other"]
      },
      {
        id: 'fieldOfStudy',
        type: 'text',
        label: 'Field of Study',
        required: true
      }
    ]
  },
  {
    id: 'workExperience',
    type: 'section',
    label: 'Work Experience',
    fields: [
      {
        id: 'currentlyEmployed',
        type: 'checkbox',
        label: 'I am currently employed',
      },
      {
        id: 'yearsOfExperience',
        type: 'number',
        label: 'Years of Experience',
        required: true
      }
    ]
  }
];

function App() {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleSubmit = (data: FormData) => {
    setSubmittedData(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FileJson size={48} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Dynamic Form Generator</h1>
          <p className="mt-2 text-gray-600">Generate forms dynamically from JSON schema</p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
          <DynamicForm schema={formSchema} onSubmit={handleSubmit} />
        </div>

        {submittedData && (
          <div className="mt-8 bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Submitted Data:</h2>
            <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;