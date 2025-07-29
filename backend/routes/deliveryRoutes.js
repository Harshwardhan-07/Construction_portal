import express from 'express';
import QRCode from 'qrcode';
import Delivery from '../models/Delivery.js';

const router = express.Router();

// Generate QR Code (Original)
router.post('/generate-qr', async (req, res) => {
  try {
    const onSiteData = req.body;
    const qrCodeId = `DEL-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const newDelivery = new Delivery({
      qrCodeId,
      onSiteDetails: {
        ...onSiteData,
        lastUpdated: new Date()
      }
    });
    
    await newDelivery.save();
    
    const qrCodeData = JSON.stringify({ qrCodeId });
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);
    
    res.json({ qrCodeImage, qrCodeId });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Get Delivery Data (All Departments)
router.get('/:qrCodeId', async (req, res) => {
  try {
    const { qrCodeId } = req.params;
    const delivery = await Delivery.findOne({ qrCodeId });
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    
    res.json(delivery);
  } catch (error) {
    console.error('Error fetching delivery:', error);
    res.status(500).json({ error: 'Failed to fetch delivery' });
  }
});

// Department-Specific Update Routes

// 1. On-Site Department
router.put('/update-onsite/:qrCodeId', async (req, res) => {
  try {
    const { qrCodeId } = req.params;
    const updatedData = req.body;
    
    const delivery = await Delivery.findOneAndUpdate(
      { qrCodeId },
      { 
        $set: { 
          'onSiteDetails': {
            ...updatedData,
            lastUpdated: new Date()
          }
        } 
      },
      { new: true }
    );
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    
    res.json(delivery);
  } catch (error) {
    console.error('Error updating on-site details:', error);
    res.status(500).json({ error: 'Failed to update on-site details' });
  }
});

// 2. Warehouse Department
router.put('/update-warehouse/:qrCodeId', async (req, res) => {
  try {
    const { qrCodeId } = req.params;
    const updatedData = req.body;
    
    const delivery = await Delivery.findOneAndUpdate(
      { qrCodeId },
      { 
        $set: { 
          'warehouseDetails': {
            ...updatedData,
            lastUpdated: new Date()
          }
        } 
      },
      { new: true }
    );
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    
    res.json(delivery);
  } catch (error) {
    console.error('Error updating warehouse details:', error);
    res.status(500).json({ error: 'Failed to update warehouse details' });
  }
});

// 3. Quality Check Department
router.put('/update-quality/:qrCodeId', async (req, res) => {
  try {
    const { qrCodeId } = req.params;
    const updatedData = req.body;
    
    const delivery = await Delivery.findOneAndUpdate(
      { qrCodeId },
      { 
        $set: { 
          'qualityDetails': {
            ...updatedData,
            lastUpdated: new Date()
          }
        } 
      },
      { new: true }
    );
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    
    res.json(delivery);
  } catch (error) {
    console.error('Error updating quality details:', error);
    res.status(500).json({ error: 'Failed to update quality details' });
  }
});

// 4. Logistics Department
router.put('/update-logistics/:qrCodeId', async (req, res) => {
  try {
    const { qrCodeId } = req.params;
    const updatedData = req.body;
    
    const delivery = await Delivery.findOneAndUpdate(
      { qrCodeId },
      { 
        $set: { 
          'logisticsDetails': {
            ...updatedData,
            lastUpdated: new Date()
          }
        } 
      },
      { new: true }
    );
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    
    res.json(delivery);
  } catch (error) {
    console.error('Error updating logistics details:', error);
    res.status(500).json({ error: 'Failed to update logistics details' });
  }
});

// 5. Finance Department (Original)
router.put('/update-finance/:qrCodeId', async (req, res) => {
  try {
    const { qrCodeId } = req.params;
    const updatedData = req.body;
    
    const delivery = await Delivery.findOneAndUpdate(
      { qrCodeId },
      { 
        $set: { 
          'financeDetails': {
            ...updatedData,
            lastUpdated: new Date()
          }
        } 
      },
      { new: true }
    );
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    
    res.json(delivery);
  } catch (error) {
    console.error('Error updating finance details:', error);
    res.status(500).json({ error: 'Failed to update finance details' });
  }
});

export default router;