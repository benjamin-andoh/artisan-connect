const { ArtisanProfile, Category } = require('../models');

exports.assignCategoriesToArtisan = async (req, res) => {
  try {
    const artisanId = req.user.id; 
    const { categoryIds } = req.body; 

    const artisanProfile = await ArtisanProfile.findOne({ where: { userId: artisanId } });
    if (!artisanProfile) {
      return res.status(404).json({ error: 'Artisan profile not found' });
    }

    const categories = await Category.findAll({
      where: { id: categoryIds }
    });

    await artisanProfile.setCategories(categories);

    res.status(200).json({ message: 'Categories assigned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
