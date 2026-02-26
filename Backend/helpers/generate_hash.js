const bcrypt = require('bcrypt');
const saltHash = process.env.BCRYPT_HASH;

exports.comparePassword = (password, saltHash) => {
	return bcrypt.compare(password, saltHash)
}
exports.hashPassword = (password) => {
	return bcrypt.hash(password, Number(saltHash))
}