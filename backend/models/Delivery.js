import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  qrCodeId: { type: String, unique: true },
  onSiteDetails: {
    quantity: Number,
    materialName: String,
    date: Date,
    time: String,
    vehicleNumber: String,
    chalanNumber: String,
    supplier: String,
    materialType: { type: String, enum: ['cement', 'steel', 'bricks', 'sand', 'other'] },
    projectSite: String,
    receivingPerson: String,
    remarks: String,
    lastUpdated: Date
  },
  warehouseDetails: {
    storageLocation: String,
    binNumber: String,
    receivedQuantity: Number,
    storageCondition: { type: String, enum: ['dry', 'cold', 'ventilated', 'hazardous'] },
    handlingInstructions: String,
    damageReport: String,
    warehouseManager: String,
    lastUpdated: Date
  },
  qualityDetails: {
    testResults: String,
    qualityStatus: { type: String, enum: ['passed', 'failed', 'pending'] },
    inspectorName: String,
    inspectionDate: Date,
    complianceStandard: String,
    sampleSize: Number,
    remarks: String,
    lastUpdated: Date
  },
  logisticsDetails: {
    transportMode: { type: String, enum: ['road', 'rail', 'air', 'sea'] },
    carrierName: String,
    trackingNumber: String,
    estimatedArrival: Date,
    actualArrival: Date,
    shippingDocuments: String,
    handlerInformation: String,
    lastUpdated: Date
  },
  financeDetails: {
    amount: Number,
    paymentStatus: { type: String, enum: ['pending', 'partial', 'paid'] },
    paymentDate: Date,
    invoiceNumber: String,
    taxDetails: String,
    paymentMethod: { type: String, enum: ['cash', 'cheque', 'transfer', 'card'] },
    bankDetails: String,
    lastUpdated: Date
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Delivery', deliverySchema);