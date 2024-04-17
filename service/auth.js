const sessionIdtoUser = new Map();

function setUser(id, user) {
    sessionIdtoUser.set(id, user);
}

function getUser(id) {
    return sessionIdtoUser.get(id);
}

module.exports = { setUser, getUser };