const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		console.log('토큰 없음');
		return res.sendStatus(401);
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			console.log('토큰 오류', err.message);
			return res.sendStatus(403);
		}
		req.user = user;
		next();
	});
}

module.exports = authenticateToken;
