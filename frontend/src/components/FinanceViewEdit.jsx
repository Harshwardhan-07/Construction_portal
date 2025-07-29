import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FinanceViewEdit = () => {
  const { qrCodeId } = useParams();
  const [financeData, setFinanceData] = useState({
    amount: '',
    paymentStatus: 'pending',
    paymentDate: '',
    invoiceNumber: '',
    taxDetails: '',
    paymentMethod: '',
    bankDetails: ''
  });
  const [onSiteData, setOnSiteData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/delivery/${qrCodeId}`);
        const { financeDetails, onSiteDetails } = response.data;
        
        setFinanceData({
          amount: financeDetails?.amount || '',
          paymentStatus: financeDetails?.paymentStatus || 'pending',
          paymentDate: financeDetails?.paymentDate ? new Date(financeDetails.paymentDate).toISOString().split('T')[0] : '',
          invoiceNumber: financeDetails?.invoiceNumber || '',
          taxDetails: financeDetails?.taxDetails || '',
          paymentMethod: financeDetails?.paymentMethod || '',
          bankDetails: financeDetails?.bankDetails || ''
        });
        
        setOnSiteData(onSiteDetails || {});
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
    setFinanceData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/delivery/update-finance/${qrCodeId}`, financeData);
      setSuccessMessage('Financial details saved successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save financial details. Please try again.');
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
        <h2 className="text-2xl font-bold">Finance Department</h2>
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
            Edit Financial Details
          </button>
        )}
      </div>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Delivery Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
          <div>
            <p className="text-sm text-gray-500">Material</p>
            <p className="font-medium">{onSiteData.materialName} ({onSiteData.materialType})</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="font-medium">{onSiteData.quantity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Supplier</p>
            <p className="font-medium">{onSiteData.supplier}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Delivery Date</p>
            <p className="font-medium">
              {onSiteData.date ? new Date(onSiteData.date).toLocaleDateString() : ''} {onSiteData.time}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Financial Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="amount"
                  value={financeData.amount}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{financeData.amount || 'Not specified'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Status</label>
              {isEditing ? (
                <select
                  name="paymentStatus"
                  value={financeData.paymentStatus}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="partial">Partial</option>
                  <option value="paid">Paid</option>
                </select>
              ) : (
                <p className="mt-1 text-gray-900 capitalize">{financeData.paymentStatus}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Date</label>
              {isEditing ? (
                <input
                  type="date"
                  name="paymentDate"
                  value={financeData.paymentDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{financeData.paymentDate || 'Not specified'}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
              {isEditing ? (
                <input
                  type="text"
                  name="invoiceNumber"
                  value={financeData.invoiceNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{financeData.invoiceNumber || 'Not specified'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              {isEditing ? (
                <input
                  type="text"
                  name="paymentMethod"
                  value={financeData.paymentMethod}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{financeData.paymentMethod || 'Not specified'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Bank Details</label>
              {isEditing ? (
                <input
                  type="text"
                  name="bankDetails"
                  value={financeData.bankDetails}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              ) : (
                <p className="mt-1 text-gray-900">{financeData.bankDetails || 'Not specified'}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Tax Details</label>
          {isEditing ? (
            <textarea
              name="taxDetails"
              value={financeData.taxDetails}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          ) : (
            <p className="mt-1 text-gray-900">{financeData.taxDetails || 'No tax details'}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceViewEdit;