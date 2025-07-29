import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const WarehouseViewEdit = () => {
  const { qrCodeId } = useParams();
  const [formData, setFormData] = useState({
    storageLocation: '',
    binNumber: '',
    receivedQuantity: '',
    storageCondition: 'dry',
    handlingInstructions: '',
    damageReport: '',
    warehouseManager: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/delivery/${qrCodeId}`);
        if (response.data.warehouseDetails) {
          setFormData(response.data.warehouseDetails);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load warehouse data');
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
      await axios.put(`/api/delivery/update-warehouse/${qrCodeId}`, formData);
      toast.success('Warehouse details saved successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Failed to save warehouse details');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Warehouse Department</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Storage Location</label>
            {isEditing ? (
              <input
                type="text"
                name="storageLocation"
                value={formData.storageLocation}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.storageLocation || 'Not specified'}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bin Number</label>
            {isEditing ? (
              <input
                type="text"
                name="binNumber"
                value={formData.binNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.binNumber || 'Not specified'}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Storage Condition</label>
            {isEditing ? (
              <select
                name="storageCondition"
                value={formData.storageCondition}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="dry">Dry</option>
                <option value="cold">Cold</option>
                <option value="ventilated">Ventilated</option>
                <option value="hazardous">Hazardous</option>
              </select>
            ) : (
              <p className="mt-1 text-gray-900 capitalize">{formData.storageCondition}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Warehouse Manager</label>
            {isEditing ? (
              <input
                type="text"
                name="warehouseManager"
                value={formData.warehouseManager}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{formData.warehouseManager || 'Not specified'}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Handling Instructions</label>
        {isEditing ? (
          <textarea
            name="handlingInstructions"
            value={formData.handlingInstructions}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        ) : (
          <p className="mt-1 text-gray-900">{formData.handlingInstructions || 'No instructions'}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Damage Report</label>
        {isEditing ? (
          <textarea
            name="damageReport"
            value={formData.damageReport}
            onChange={handleChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        ) : (
          <p className="mt-1 text-gray-900">{formData.damageReport || 'No damage reported'}</p>
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
            Edit Warehouse Details
          </button>
        )}
      </div>
    </div>
  );
};

export default WarehouseViewEdit;