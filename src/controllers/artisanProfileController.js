const artisanProfileService = require('../services/artisanProfileService');
const { ArtisanProfile, Category, User } = require('../models');

exports.createProfile = async (req, res) => {
  try {
    const existing = await ArtisanProfile.findOne({ where: { userId: req.user.id } });

    if (existing) {
      return res.status(409).json({ message: 'Profile already exists for this user' });
    }
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
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
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
    console.error('❌ Failed to update artisan profile:', error.message);
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


exports.getArtisansByCategory = async (req, res) => {
  const categoryName = req.params.name;
  console.log("Category name param:", categoryName);
  try {
    const categoryName = req.params.name;
    const artisans = await artisanProfileService.getArtisansByCategoryName(categoryName);
    res.status(200).json(artisans);
  } catch (error) {
    console.error('Error fetching artisans by category:', error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.searchArtisans = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: "Query is required" });

    const results = await ArtisanProfile.findAll({
      include: [
        {
          model: User,
          where: {
            username: { [Op.iLike]: `%${query}%` }
          },
          attributes: ['username', 'email']
        },
      ],
      where: {
        skills: {
          [Op.contains]: [query.toLowerCase()]
        }
      }
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyProfile = async (req, res) => {
  console.log("you are in artisan profile");
  try {
    const userId = req.user.id;

    console.log("this is the userID: ",userId)

    const profile = await ArtisanProfile.findOne({
      where: { userId },
      include: [
        { model: User, attributes: ['username', 'email'] },
        { model: Category, through: { attributes: [] } }
      ]
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('[getMyProfile] error:', error);
    res.status(500).json({ error: error.message });
  }
};
