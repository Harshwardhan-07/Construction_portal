import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const LogisticsViewEdit = () => {
  const { qrCodeId } = useParams();
  const [formData, setFormData] = useState({
    transportMode: 'road',
    carrierName: '',
    trackingNumber: '',
    estimatedArrival: '',
    actualArrival: '',
    shippingDocuments: '',
    handlerInformation: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/delivery/${qrCodeId}`);
        if (response.data.logisticsDetails) {
          setFormData({
            transportMode: response.data.logisticsDetails.transportMode || 'road',
            carrierName: response.data.logisticsDetails.carrierName || '',
            trackingNumber: response.data.logisticsDetails.trackingNumber || '',
            estimatedArrival: response.data.logisticsDetails.estimatedArrival || '',
            actualArrival: response.data.logisticsDetails.actualArrival || '',
            shippingDocuments: response.data.logisticsDetails.shippingDocuments || '',
            handlerInformation: response.data.logisticsDetails.handlerInformation || ''
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load logistics data');
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
      await axios.put(`/api/delivery/update-logistics/${qrCodeId}`, formData);
      toast.success('Logistics details saved successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save logistics details');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Logistics Department</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Transport Mode</label>
            {isEditing ? (
              <select
                name="transportMode"
                value={formData.transportMode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="road">Road</option>
                <option value="rail">Rail</option>
                <option value="air">Air</option>
                <option value="sea">Sea</option>
              </select>
            ) : (
              <p className="mt-1 text-gray-900 capitalize">{formData.transportMode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Carrier Name</label>
            {isEditing ? (
              <input
                type="text"
                name="carrierName"
                value={formData.carrierName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.carrierName || 'Not specified'}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tracking Number</label>
            {isEditing ? (
              <input
                type="text"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.trackingNumber || 'Not specified'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Handler Information</label>
            {isEditing ? (
              <input
                type="text"
                name="handlerInformation"
                value={formData.handlerInformation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.handlerInformation || 'Not specified'}</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Estimated Arrival</label>
          {isEditing ? (
            <input
              type="date"
              name="estimatedArrival"
              value={formData.estimatedArrival}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          ) : (
            <p className="mt-1 text-gray-900">{formData.estimatedArrival || 'Not specified'}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Actual Arrival</label>
          {isEditing ? (
            <input
              type="date"
              name="actualArrival"
              value={formData.actualArrival}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          ) : (
            <p className="mt-1 text-gray-900">{formData.actualArrival || 'Not specified'}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Shipping Documents</label>
        {isEditing ? (
          <textarea
            name="shippingDocuments"
            value={formData.shippingDocuments}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        ) : (
          <p className="mt-1 text-gray-900">{formData.shippingDocuments || 'No documents'}</p>
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
            Edit Logistics Details
          </button>
        )}
      </div>
    </div>
  );
};

export default LogisticsViewEdit;