import React, { useState } from 'react';
import { FormField, FormData, FormErrors } from '../types/form';
import { AlertCircle } from 'lucide-react';

interface DynamicFormProps {
  schema: FormField[];
  onSubmit: (data: FormData) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (field: FormField, value: any): string => {
    if (field.required && !value) {
      return 'This field is required';
    }

    if (field.validation?.pattern) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        return field.validation.message || 'Invalid format';
      }
    }

    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Invalid email format';
      }
    }

    return '';
  };

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    
    const field = schema.find(f => f.id === fieldId);
    if (field) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [fieldId]: error
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    const validateFields = (fields: FormField[]) => {
      fields.forEach(field => {
        if (field.type === 'section' && field.fields) {
          validateFields(field.fields);
        } else {
          const error = validateField(field, formData[field.id]);
          if (error) {
            newErrors[field.id] = error;
          }
        }
      });
    };

    validateFields(schema);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    const commonClasses = "w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
    const errorClasses = errors[field.id] ? "border-red-500" : "border-gray-300";

    switch (field.type) {
      case 'section':
        return (
          <fieldset key={field.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <legend className="text-lg font-semibold px-2">{field.label}</legend>
            <div className="space-y-4">
              {field.fields?.map(renderField)}
            </div>
          </fieldset>
        );

      case 'text':
      case 'email':
      case 'number':
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={formData[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className={`${commonClasses} ${errorClasses}`}
            />
            {errors[field.id] && (
              <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                <AlertCircle size={16} />
                {errors[field.id]}
              </div>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={formData[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className={`${commonClasses} ${errorClasses}`}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors[field.id] && (
              <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                <AlertCircle size={16} />
                {errors[field.id]}
              </div>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={formData[field.id] || false}
                onChange={(e) => handleChange(field.id, e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {errors[field.id] && (
              <div className="mt-1 text-red-500 text-sm flex items-center gap-1">
                <AlertCircle size={16} />
                {errors[field.id]}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {schema.map(renderField)}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};