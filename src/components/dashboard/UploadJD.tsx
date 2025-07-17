
import React, { useState } from 'react';
import { Upload, AlertCircle, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UploadJD = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('jd', file);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful upload
      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800">Upload Job Description</h3>
        <p className="text-slate-500 text-sm mt-1">
          Upload your JD file to find matching candidates
        </p>
      </div>
      
      <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center bg-slate-50 mb-4">
        <input 
          type="file" 
          id="jd-file" 
          className="hidden" 
          accept=".pdf,.doc,.docx,.txt" 
          onChange={handleChange} 
        />
        <label 
          htmlFor="jd-file"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-10 w-10 text-indigo-400 mb-3" />
          <p className="text-slate-600 mb-2">
            {file ? file.name : "Drag & drop or click to browse"}
          </p>
          <p className="text-xs text-slate-500">
            Supports PDF, DOC, DOCX, and TXT (Max 5MB)
          </p>
        </label>
      </div>
      
      {uploadStatus === 'success' && (
        <div className="flex items-center p-3 bg-green-50 text-green-700 rounded-lg mb-4">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>File uploaded successfully!</span>
        </div>
      )}
      
      {uploadStatus === 'error' && (
        <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-lg mb-4">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{errorMessage}</span>
        </div>
      )}
      
      <Button 
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-indigo-600 hover:bg-indigo-700"
      >
        {uploading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </span>
        ) : (
          <span className="flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload Job Description
          </span>
        )}
      </Button>
    </div>
  );
};

export default UploadJD;
