// controllers/serviceRequestController.js
const ServiceRequest = require('../models/ServiceRequest');
const User = require('../models/Users');

exports.createServiceRequest = async (req, res) => {
  try {
    const { artisanId, description } = req.body;
    const customerId = req.user.id;

    const serviceRequest = await ServiceRequest.create({
      customerId,
      artisanId,
      description,
    });

    res.status(201).json(serviceRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.findAll({
      include: ['customer', 'artisan'],
    });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getServiceRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await ServiceRequest.findByPk(id, {
      include: ['customer', 'artisan'],
    });

    if (!request) {
      return res.status(404).json({ error: 'Service request not found' });
    }

    res.json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateServiceRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await ServiceRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ error: 'Service request not found' });
    }

    request.status = status;
    await request.save();

    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
