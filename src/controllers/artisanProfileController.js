const artisanProfileService = require('../services/artisanProfileService');

exports.createProfile = async (req, res) => {
  try {
    const profile = await artisanProfileService.createProfile(req.body, req.user.id);
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await artisanProfileService.getAllProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await artisanProfileService.getProfileById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updated = await artisanProfileService.updateProfile(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    await artisanProfileService.deleteProfile(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
