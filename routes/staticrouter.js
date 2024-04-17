const express = require("express");
const router = require("express").Router();
const URL = require("../model/url");

router.get("/", async (req, res) => {
	const allURL = await URL.find({});
	return res.render("index", { urls: allURL });
});

module.exports = router;
