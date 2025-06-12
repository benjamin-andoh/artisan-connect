const express = require('express');
const ArtisanProfile = require('../models/ArtisanProfile');
const authenticateToken  = require('../middleware/auth');
// const { Op } = require('sequelize');


const router = express.Router();

router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { bio, skills, location } = req.body;
    const profile = await ArtisanProfile.create({
      userId: req.user.id,
      bio,
      skills,
      location
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// router.get('/', async (req, res) => {
//     try {
//       const { skill, location } = req.query;
  
//       const filters = {};
//       if (skill) filters.skills = { [Op.contains]: [skill] };
//       if (location) filters.location = location;
  
//       const profiles = await ArtisanProfile.findAll({ where: filters });
  
//       res.json(profiles);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  

module.exports = router;
