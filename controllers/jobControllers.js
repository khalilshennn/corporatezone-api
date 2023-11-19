const mongoose = require("mongoose");
const { Job } = require("../models/jobModel");

// get all jobs
const allJobs = async (req, res) => {
  try {
    if (!req.query.jobType) {
      const jobs = await Job.find({});
      res.json({
        count: jobs.length,
        data: jobs,
      });
    }
    if (req.query.jobType) {
      if (req.query.jobType === "all") {
        const jobs = await Job.find({});
        res.json({
          count: jobs.length,
          data: jobs,
        });
      } else {
        const jobType = req.query.jobType;
        const jobs = await Job.find({ jobType });
        res.json({
          count: jobs.length,
          data: jobs,
        });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// all approved jobs based on category
const approvedJobs = async (req, res) => {
  try {
    if (!req.query.jobType) {
      const jobs = await Job.find({ status: "approved" });
      res.json({
        count: jobs.length,
        data: jobs,
      });
    }
    if (req.query.jobType) {
      if (req.query.jobType === "all") {
        const jobs = await Job.find({ status: "approved" });
        res.json({
          count: jobs.length,
          data: jobs,
        });
      } else {
        const jobType = req.query.jobType;
        const jobs = await Job.find({ status: "approved", jobType });
        res.json({
          count: jobs.length,
          data: jobs,
        });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// all notify jobs
const notifyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ notify: true });
    res.json(jobs.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a job by id
const getJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: mongoose.Types.ObjectId(id) };
    const result = await Job.findOne(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// post a new job
const postJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    const result = await job.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update a job post by _id
const updateJob = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const updateDoc = { $set: req.body };
    const options = { upsert: true };
    const result = await Job.findOneAndUpdate(filter, updateDoc, options);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// delete a job by id
const deleteJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: mongoose.Types.ObjectId(id) };
    const result = await Job.findOneAndDelete(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  postJob,
  allJobs,
  approvedJobs,
  notifyJobs,
  getJobById,
  updateJob,
  deleteJobById,
};
