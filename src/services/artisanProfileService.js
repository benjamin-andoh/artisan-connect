const ArtisanProfile = require('../models/ArtisanProfile');
const { Category } = require('../models');


exports.createProfile = async (data, userId) => {
  const { categoryIds, ...profileData } = data;
  let profile;
  try {
    profile = await ArtisanProfile.create({ ...profileData, userId });
  } catch (err) {
    console.error("❌ Error creating ArtisanProfile:", err);
    throw new Error(err.message);
  }

  try {
    const categoryArray = Array.isArray(categoryIds) ? categoryIds : [categoryIds];

    if (categoryArray.length > 0) {
      await profile.addCategories(categoryArray);
    }
  } catch (err) {
    console.error("❌ Error linking categories:", err);
    throw new Error(err.message);
  }

  return profile;
};

exports.getAllProfiles = async () => {
  return await ArtisanProfile.findAll();
};

exports.getProfileById = async (id) => {
  return await ArtisanProfile.findByPk(id);
};

exports.updateProfile = async (id, data) => {
  console.log("Updating the user profile data: ", data)
  const profile = await ArtisanProfile.findOne({ where: { userId: id } });

  if (!profile) {
    throw new Error('Profile not found');
  }

  const { categoryIds, ...profileFields } = data;

  // Update main profile fields
  await profile.update(profileFields);
  console.log("this is the profile: ", profile)
  // Update category associations
  if (categoryIds) {
    console.log("creating category for the profile ")
    const categoryArray = Array.isArray(categoryIds) ? categoryIds : [categoryIds];
    await profile.setCategories(categoryArray);
  }

  return profile;
};

exports.deleteProfile = async (id) => {
  const profile = await ArtisanProfile.findByPk(id);
  if (!profile) {
    throw new Error('Profile not found');
  }
  await profile.destroy();
};


exports.getArtisansByCategoryName = async (categoryName) => {
  if (!categoryName) {
    throw new Error('Category name is required');
  }

  const category = await Category.findOne({ where: { name: categoryName } });
  console.log("service category ***", category.id)

  if (!category) {
    throw new Error('Category not found');
  }

  const artisans = await category.getArtisanProfiles();

  console.log("service artisan---", artisans)
  return artisans.map((artisan) => ({
    id: artisan.id,
    bio: artisan.bio,
    skills: artisan.skills,
    location: artisan.location,
    user: artisan.User ? {
      username: artisan.User.username,
      email: artisan.User.email
    } : null,
  }));
};