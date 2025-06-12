const ArtisanProfile = require('../models/ArtisanProfile');

exports.createProfile = async (data, userId) => {
  return await ArtisanProfile.create({ ...data, userId });
};

exports.getAllProfiles = async () => {
  return await ArtisanProfile.findAll();
};

exports.getProfileById = async (id) => {
  return await ArtisanProfile.findByPk(id);
};

exports.updateProfile = async (id, data) => {
  const profile = await ArtisanProfile.findByPk(id);
  if (!profile) throw new Error('Profile not found');
  return await profile.update(data);
};

exports.deleteProfile = async (id) => {
  const profile = await ArtisanProfile.findByPk(id);
  if (!profile) throw new Error('Profile not found');
  await profile.destroy();
};
