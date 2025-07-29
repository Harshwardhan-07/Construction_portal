import React from 'react';
import { useParams, Link } from 'react-router-dom';

const DepartmentSelection = () => {
  const { qrCodeId } = useParams();

  const departments = [
    { name: 'On-Site', path: 'onsite', color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'Warehouse', path: 'warehouse', color: 'bg-purple-600 hover:bg-purple-700' },
    { name: 'Quality Check', path: 'quality', color: 'bg-yellow-600 hover:bg-yellow-700' },
    { name: 'Logistics', path: 'logistics', color: 'bg-orange-600 hover:bg-orange-700' },
    { name: 'Finance', path: 'finance', color: 'bg-green-600 hover:bg-green-700' }
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-6">Select Department</h2>
      <div className="grid grid-cols-1 gap-4">
        {departments.map((dept) => (
          <Link
            key={dept.path}
            to={`/delivery/${qrCodeId}/${dept.path}`}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${dept.color} focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            {dept.name} Department
          </Link>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">QR Code ID: {qrCodeId}</p>
      </div>
    </div>
  );
};

export default DepartmentSelection;