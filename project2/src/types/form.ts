export type FieldType = 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'section';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required?: boolean;
  options?: string[];
  fields?: FormField[];
  validation?: {
    pattern?: string;
    message?: string;
  };
}

export interface FormData {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}