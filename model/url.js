const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
	{
		short_id: { type: String, required: true, unique: true },
		redirected_url: { type: String, required: true },
		visits: [{ timestamp: { type: Date, default: Date.now() } }],
	},
	{ timestamps: true }
);

const url = mongoose.model("url", urlSchema);

module.exports = url;
