import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Contract {
  id: string;
  name: string;
  parties: string;
  expiry: string;
  status: 'Active' | 'Expired' | 'Renewal Due';
  risk: 'Low' | 'Medium' | 'High';
  start: string;
}

interface ContractDetail extends Contract {
  clauses: Array<{
    title: string;
    summary: string;
    confidence: number;
  }>;
  insights: Array<{
    risk: 'Low' | 'Medium' | 'High';
    message: string;
  }>;
  evidence: Array<{
    source: string;
    snippet: string;
    relevance: number;
  }>;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

interface AppContextType {
  contracts: Contract[];
  setContracts: (contracts: Contract[]) => void;
  contractDetails: { [key: string]: ContractDetail };
  setContractDetails: (details: { [key: string]: ContractDetail }) => void;
  uploadedFiles: UploadedFile[];
  setUploadedFiles: (files: UploadedFile[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [contractDetails, setContractDetails] = useState<{ [key: string]: ContractDetail }>({});
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const value = {
    contracts,
    setContracts,
    contractDetails,
    setContractDetails,
    uploadedFiles,
    setUploadedFiles,
    isLoading,
    setIsLoading,
    error,
    setError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};