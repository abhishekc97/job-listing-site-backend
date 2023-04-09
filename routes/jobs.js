const { Router } = require("express");
const route = Router();

const JobPost = require("../models/JobPost");

// Create a job post
route.post("/new", async function (req, res, next) {
    try {
        const {
            companyName,
            companyLogo,
            jobPosition,
            monthlySalary,
            jobType,
            jobMode,
            jobLocation,
            jobDescription,
            aboutCompany,
            skillset,
        } = req.body;

        if (!companyName || !jobPosition || !monthlySalary)
            res.status(400).send(
                "Bad request, new job must have company name, job position and monthly salary parameters."
            );

        let skillArray = [];
        if (skillset !== "") {
            console.log(skillset);
            skillArray = skillset.split(",");
            console.log(skillArray);
        }
        const newJob = {
            companyName: companyName,
            companyLogo: companyLogo,
            jobPosition: jobPosition,
            monthlySalary: monthlySalary,
            jobType: jobType,
            jobMode: jobMode,
            jobLocation: jobLocation,
            jobDescription: jobDescription,
            aboutCompany: aboutCompany,
            skillset: skillArray,
        };
        const results = await JobPost.create(newJob).then(
            res.status(200).send("new Job Post created")
        );
    } catch (error) {
        next(error);
        console.log(error);
    }
});

// Get a job post by its id
route.get("/job/:id", async function (req, res, next) {
    try {
        const jobId = req.params.id;
        if (!jobId)
            res.status(400).send("Bad request. please check given parameters");

        const foundJobPost = await JobPost.findById(jobId);
        if (foundJobPost) {
            res.status(200).send(foundJobPost);
        } else {
            res.status(404).send("Could not find a Job Post with given Id.");
        }
    } catch (error) {
        next(error);
        console.log(error);
    }
});

// Update a job post
route.put("/edit/:id", async function (req, res, next) {
    try {
        const { id } = req.params;
        if (!id) res.status(400).send("Please check your given parameters");
        const {
            companyName,
            companyLogo,
            jobPosition,
            monthlySalary,
            jobType,
            jobMode,
            jobLocation,
            jobDescription,
            aboutCompany,
            skillset,
        } = req.body;

        if (!companyName || !jobPosition || !monthlySalary)
            res.status(400).send(
                "Bad request, job must have company name, job position and monthly salary parameters."
            );

        let skillArray = [];
        if (skillset.length != 0) {
            console.log(skillset);
            skillArray = skillset.split(",");
            console.log(skillArray);
        }
        const editedJob = {
            companyName: companyName,
            companyLogo: companyLogo,
            jobPosition: jobPosition,
            monthlySalary: monthlySalary,
            jobType: jobType,
            jobMode: jobMode,
            jobLocation: jobLocation,
            jobDescription: jobDescription,
            aboutCompany: aboutCompany,
            skillset: skillArray,
        };

        console.log(req.body);
        const job = await JobPost.findByIdAndUpdate(req.params.id, {
            $set: editedJob,
            // $set: req.body,
        });
        if (job) {
            res.status(200).json("Job details have been updated");
        }
    } catch (error) {
        next(error);
        console.log(error);
    }
});

// delete a job post
route.delete("/delete/:id", async function (req, res, next) {
    try {
        const { id } = req.params;
        if (!id) res.status(400).send("Please check your given parameters");

        const job = await JobPost.findByIdAndDelete(id);

        if (job) {
            res.status(200).json("Job post has been deleted");
        }
    } catch (error) {
        next(error);
        console.log(error);
    }
});

// get all job posts
route.get("/all", async function (req, res, next) {
    try {
        const results = await JobPost.find({});

        if (results) {
            res.status(200).json(results);
        } else {
            res.status(404).send("No data found");
        }
    } catch (error) {
        next(error);
        console.log(error);
    }
});

module.exports = route;
