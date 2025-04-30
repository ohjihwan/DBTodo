const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
        }

        const hashed = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashed]);
        res.status(201).json({ message: '회원가입 성공' });
    } catch (err) {
        res.status(500).json({ message: '서버 오류', error: err.message });
    }
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const [rows] = await pool.query(
			'SELECT * FROM users WHERE username = ?',
			[username]
		);
		if (rows.length === 0) {
			return res.status(401).json({ message: '아이디 또는 비밀번호 오류' });
		}

		const user = rows[0];
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(401).json({ message: '아이디 또는 비밀번호 오류' });
		}

		const token = jwt.sign(
			{ id: user.id },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);
		res.json({ message: '로그인 성공', token });
	} catch (err) {
		res.status(500).json({ message: '서버 오류', error: err.message });
	}
};
