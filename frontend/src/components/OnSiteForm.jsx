import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OnSiteForm = () => {
  const [formData, setFormData] = useState({
    quantity: '',
    materialName: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    vehicleNumber: '',
    chalanNumber: '',
    supplier: '',
    materialType: 'cement',
    projectSite: '',
    receivingPerson: '',
    remarks: ''
  });

  const [qrCodeId, setQrCodeId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/delivery/generate-qr', formData);
      setQrCodeId(response.data.qrCodeId);
      setSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          quantity: '',
          materialName: '',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          vehicleNumber: '',
          chalanNumber: '',
          supplier: '',
          materialType: 'cement',
          projectSite: '',
          receivingPerson: '',
          remarks: ''
        });
        setSubmitted(false);
        setQrCodeId('');
      }, 10000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to generate QR code. Please try again.');
    }
  };

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = `delivery-${qrCodeId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  // ONLY NEW FUNCTION ADDED
  const handleQrClick = () => {
    navigate(`/delivery/${qrCodeId}`);
    toast.info('Simulated QR code scan!');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">On-Site Delivery Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Material Type</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                name="materialType"
                value={formData.materialType}
                onChange={handleChange}
                required
              >
                <option value="cement">Cement</option>
                <option value="steel">Steel</option>
                <option value="bricks">Bricks</option>
                <option value="sand">Sand</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Material Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                name="materialName"
                value={formData.materialName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Supplier</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Vehicle Number</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Chalan Number</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                name="chalanNumber"
                value={formData.chalanNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Site</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              name="projectSite"
              value={formData.projectSite}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Receiving Person</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              name="receivingPerson"
              value={formData.receivingPerson}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Remarks</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate QR Code
        </button>
      </form>
      
      {submitted && (
        <div className="mt-8 text-center">
          <h3 className="text-lg font-medium">Delivery QR Code</h3>
          {/* ONLY CHANGE MADE - added onClick handler */}
          <div 
            className="flex justify-center my-4 cursor-pointer" 
            onClick={handleQrClick}
          >
            <QRCodeSVG
              id="qr-code-svg"
              value={`${window.location.origin}/delivery/${qrCodeId}`}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-sm text-gray-500 mb-4">Delivery ID: {qrCodeId}</p>
          <button
            onClick={downloadQRCode}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

export default OnSiteForm;