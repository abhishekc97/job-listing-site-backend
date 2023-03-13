const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
    {
        companyName: { type: String, required: true },
        companyLogo: { type: String },
        jobPosition: { type: String, required: true },
        monthlySalary: { type: Number, required: true },
        jobType: { type: String },
        jobMode: { type: String },
        jobLocation: { type: String, default: "" },
        employeeCount: { type: Number, default: 0 },
        jobDescription: { type: String, max: 5000, default: "" },
        aboutCompany: { type: String, default: "" },
        skillset: { type: Array, default: [] },
    },
    { timestamps: true }
);

const JobPost = mongoose.model("JobPost", jobPostSchema);

module.exports = JobPost;
