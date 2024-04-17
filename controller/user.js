const User = require("../model/user");
const {v4: uuidv4} = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
	try {
		const { name, email, password } = req.body;
		await User.create({
			name,
			email,
			password,
		});
		res.status(201).redirect("/");
	} catch (error) {
		res.status(400).send(error);
	}
}

async function handleUserLogin(req, res) {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email, password });
		if (!user) {
			return res
				.status(401)
				.render("login", { error: "Invalid email or password" });
		}
        const session_id = uuidv4();
        setUser(session_id, user);
        res.cookie("uid", session_id);
		res.status(200).redirect("/");
	} catch (error) {
		res.status(400).send(error);
	}
}

module.exports = { handleUserSignup, handleUserLogin };
