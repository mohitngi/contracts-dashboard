import React, { useState, useCallback } from 'react';
import { Upload, X, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const { uploadedFiles, setUploadedFiles } = useApp();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  }, []);

  const handleFiles = (files: File[]) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const newFiles: UploadedFile[] = files
      .filter(file => allowedTypes.includes(file.type) && file.size <= 10 * 1024 * 1024) // 10MB limit
      .map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        status: 'uploading' as const,
        progress: 0
      }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);

    // Simulate upload process
    newFiles.forEach(file => simulateUpload(file));
  };

  const simulateUpload = (file: UploadedFile) => {
    const updateProgress = () => {
      setUploadedFiles(prev => prev.map(f => {
        if (f.id === file.id) {
          const newProgress = Math.min(f.progress + Math.random() * 30, 100);
          
          if (newProgress >= 100) {
            // Randomly succeed or fail for demo purposes
            const success = Math.random() > 0.1; // 90% success rate
            return {
              ...f,
              progress: 100,
              status: success ? 'success' : 'error'
            };
          }
          
          return { ...f, progress: newProgress };
        }
        return f;
      }));
    };

    const interval = setInterval(() => {
      updateProgress();
      
      setUploadedFiles(prev => {
        const currentFile = prev.find(f => f.id === file.id);
        if (currentFile && (currentFile.status === 'success' || currentFile.status === 'error')) {
          clearInterval(interval);
        }
        return prev;
      });
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading':
        return <Loader className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Upload Contract Files
              </h3>
              <button
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-base font-medium text-gray-900">
                    Drop files here or{' '}
                    <span className="text-blue-600 hover:text-blue-500">browse</span>
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInputChange}
                  />
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  PDF, DOC, DOCX up to 10MB each
                </p>
              </div>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <FileText className="h-8 w-8 text-blue-500 mr-3" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                        {file.status === 'uploading' && (
                          <div className="mt-1">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center ml-3">
                        {getStatusIcon(file.status)}
                        <span className={`ml-2 text-xs font-medium ${getStatusColor(file.status)}`}>
                          {file.status === 'uploading' && `${Math.round(file.progress)}%`}
                          {file.status === 'success' && 'Complete'}
                          {file.status === 'error' && 'Failed'}
                        </span>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="ml-2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
            >
              Done
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;