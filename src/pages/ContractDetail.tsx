import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  FileText,
  Eye,
  TrendingUp,
  Info
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface ContractDetail {
  id: string;
  name: string;
  parties: string;
  start: string;
  expiry: string;
  status: 'Active' | 'Expired' | 'Renewal Due';
  risk: 'Low' | 'Medium' | 'High';
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

const ContractDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { contractDetails, setContractDetails, isLoading, setIsLoading, error, setError } = useApp();
  const [showEvidencePanel, setShowEvidencePanel] = useState(false);
  const [selectedClause, setSelectedClause] = useState<string | null>(null);

  const contract = contractDetails[id!];

  useEffect(() => {
    if (!contract && id) {
      fetchContractDetail(id);
    }
  }, [id, contract]);

  const fetchContractDetail = async (contractId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/contract-details.json');
      if (!response.ok) {
        throw new Error('Failed to fetch contract details');
      }
      const data = await response.json();
      setContractDetails({ ...contractDetails, ...data });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-700 bg-red-100 border-red-200';
      case 'Medium': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'Low': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-700 bg-green-100';
      case 'Expired': return 'text-red-700 bg-red-100';
      case 'Renewal Due': return 'text-amber-700 bg-amber-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return CheckCircle;
      case 'Expired': return AlertTriangle;
      case 'Renewal Due': return Clock;
      default: return FileText;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-700 bg-green-100';
    if (confidence >= 0.6) return 'text-amber-700 bg-amber-100';
    return 'text-red-700 bg-red-100';
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-8 w-64 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-200 rounded-lg h-48"></div>
              <div className="bg-gray-200 rounded-lg h-64"></div>
            </div>
            <div className="bg-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="p-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Contracts
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Contract Not Found</h3>
          <p className="text-red-600 mb-4">
            {error || 'The requested contract could not be found.'}
          </p>
          <Link
            to="/"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(contract.status);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Contracts
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{contract.name}</h1>
            <p className="text-gray-600 mt-1">{contract.parties}</p>
          </div>
          <button
            onClick={() => setShowEvidencePanel(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Evidence
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contract Metadata */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contract Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Start Date</p>
                  <p className="text-sm text-gray-600">
                    {new Date(contract.start).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Expiry Date</p>
                  <p className="text-sm text-gray-600">
                    {new Date(contract.expiry).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <StatusIcon className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status)} mt-1`}>
                    {contract.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Risk Level</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(contract.risk)} mt-1`}>
                    {contract.risk}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Clauses Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Clauses</h2>
            <div className="space-y-4">
              {contract.clauses.map((clause, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer"
                  onClick={() => setSelectedClause(selectedClause === clause.title ? null : clause.title)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{clause.title}</h3>
                      <p className="text-gray-600 mt-1">{clause.summary}</p>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getConfidenceColor(clause.confidence)}`}>
                        {Math.round(clause.confidence * 100)}% confidence
                      </span>
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  {selectedClause === clause.title && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-700">
                        This clause has been identified with {Math.round(clause.confidence * 100)}% confidence based on contract analysis. 
                        Click "View Evidence" to see the source text and analysis details.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
              AI Insights
            </h3>
            <div className="space-y-3">
              {contract.insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${getRiskColor(insight.risk)}`}
                >
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wide">
                          {insight.risk} Risk
                        </span>
                      </div>
                      <p className="text-sm">{insight.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Export Contract Summary
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Schedule Renewal Review
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Generate Risk Report
              </button>
              <button
                onClick={() => setShowEvidencePanel(true)}
                className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                View All Evidence
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Panel (Slide-over) */}
      {showEvidencePanel && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowEvidencePanel(false)} />
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Evidence Panel</h2>
                      <button
                        onClick={() => setShowEvidencePanel(false)}
                        className="rounded-md text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    <div className="space-y-4">
                      {contract.evidence.map((evidence, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">{evidence.source}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getConfidenceColor(evidence.relevance)}`}>
                              {Math.round(evidence.relevance * 100)}% relevant
                            </span>
                          </div>
                          <blockquote className="text-sm text-gray-700 italic border-l-4 border-gray-300 pl-3">
                            "{evidence.snippet}"
                          </blockquote>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractDetail;