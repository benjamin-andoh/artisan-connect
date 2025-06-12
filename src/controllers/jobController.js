const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, description, category, location, budget } = req.body;
    console.log("***** printing the req.user.id");
    console.log(req.user.id)
    const job = await Job.create({
      title,
      description,
      category,
      location,
      budget,
      userId: req.user.id
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    // Optional: only allow owner to update
    if (job.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await job.update(req.body);
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    if (job.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await job.destroy();
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
