import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const QualityCheckViewEdit = () => {
  const { qrCodeId } = useParams();
  const [formData, setFormData] = useState({
    testResults: '',
    qualityStatus: 'pending',
    inspectorName: '',
    inspectionDate: '',
    complianceStandard: '',
    sampleSize: '',
    remarks: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/delivery/${qrCodeId}`);
        if (response.data.qualityDetails) {
          setFormData({
            testResults: response.data.qualityDetails.testResults || '',
            qualityStatus: response.data.qualityDetails.qualityStatus || 'pending',
            inspectorName: response.data.qualityDetails.inspectorName || '',
            inspectionDate: response.data.qualityDetails.inspectionDate || '',
            complianceStandard: response.data.qualityDetails.complianceStandard || '',
            sampleSize: response.data.qualityDetails.sampleSize || '',
            remarks: response.data.qualityDetails.remarks || ''
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load quality check data');
        setLoading(false);
      }
    };
    fetchData();
  }, [qrCodeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/delivery/update-quality/${qrCodeId}`, formData);
      toast.success('Quality details saved successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save quality details');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Quality Check Department</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Quality Status</label>
            {isEditing ? (
              <select
                name="qualityStatus"
                value={formData.qualityStatus}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
              </select>
            ) : (
              <p className="mt-1 text-gray-900 capitalize">{formData.qualityStatus}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Inspector Name</label>
            {isEditing ? (
              <input
                type="text"
                name="inspectorName"
                value={formData.inspectorName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.inspectorName || 'Not specified'}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Inspection Date</label>
            {isEditing ? (
              <input
                type="date"
                name="inspectionDate"
                value={formData.inspectionDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.inspectionDate || 'Not specified'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sample Size</label>
            {isEditing ? (
              <input
                type="number"
                name="sampleSize"
                value={formData.sampleSize}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.sampleSize || 'Not specified'}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Test Results</label>
        {isEditing ? (
          <textarea
            name="testResults"
            value={formData.testResults}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        ) : (
          <p className="mt-1 text-gray-900">{formData.testResults || 'No test results'}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Remarks</label>
        {isEditing ? (
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        ) : (
          <p className="mt-1 text-gray-900">{formData.remarks || 'No remarks'}</p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        {isEditing ? (
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Edit Quality Details
          </button>
        )}
      </div>
    </div>
  );
};

export default QualityCheckViewEdit;