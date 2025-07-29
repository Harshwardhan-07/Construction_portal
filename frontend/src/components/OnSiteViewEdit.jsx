import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OnSiteViewEdit = () => {
  const { qrCodeId } = useParams();
  const [formData, setFormData] = useState({
    quantity: '',
    materialName: '',
    date: '',
    time: '',
    vehicleNumber: '',
    chalanNumber: '',
    supplier: '',
    materialType: 'cement',
    projectSite: '',
    receivingPerson: '',
    remarks: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/delivery/${qrCodeId}`);
        const { onSiteDetails } = response.data;
        
        setFormData({
          quantity: onSiteDetails?.quantity || '',
          materialName: onSiteDetails?.materialName || '',
          date: onSiteDetails?.date ? new Date(onSiteDetails.date).toISOString().split('T')[0] : '',
          time: onSiteDetails?.time || '',
          vehicleNumber: onSiteDetails?.vehicleNumber || '',
          chalanNumber: onSiteDetails?.chalanNumber || '',
          supplier: onSiteDetails?.supplier || '',
          materialType: onSiteDetails?.materialType || 'cement',
          projectSite: onSiteDetails?.projectSite || '',
          receivingPerson: onSiteDetails?.receivingPerson || '',
          remarks: onSiteDetails?.remarks || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      await axios.put(`/api/delivery/update-onsite/${qrCodeId}`, formData);
      setSuccessMessage('Changes saved successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">On-Site Delivery Details</h2>
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
            Edit Details
          </button>
        )}
      </div>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Material Type</label>
            {isEditing ? (
              <select
                name="materialType"
                value={formData.materialType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="cement">Cement</option>
                <option value="steel">Steel</option>
                <option value="bricks">Bricks</option>
                <option value="sand">Sand</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p className="mt-1 text-gray-900">{formData.materialType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Material Name</label>
            {isEditing ? (
              <input
                type="text"
                name="materialName"
                value={formData.materialName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.materialName}</p>
            )}
          </div>

          {/* Add other fields similarly */}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            {isEditing ? (
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
            {isEditing ? (
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.vehicleNumber}</p>
            )}
          </div>

          {/* Add other fields similarly */}
        </div>
      </div>

      {/* Full width fields */}
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
    </div>
  );
};

export default OnSiteViewEdit;