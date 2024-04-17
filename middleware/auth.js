const { getUser } = require("../service/auth");

async function restrictUser(req, res, next) {
	const userUID = req.cookies?.uid;
	if (!userUID) {
		return res.status(401).redirect("/login");
	}
	const user = getUser(userUID);
	if (!user) {
		return res.status(401).redirect("/login");
	}
	req.user = user;
	next();
}

async function checkAuth(req, res, next) {
	const userUID = req.cookies?.uid;
	const user = getUser(userUID);
	req.user = user;
	next();
}

module.exports = { restrictUser, checkAuth };
