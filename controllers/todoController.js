const pool = require('../db');

exports.addTodo = async (req, res) => {
	const { title, description } = req.body;
	const userId = req.user.id;

	try {
		await pool.query(
			'INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)',
			[userId, title, description]
		);
		res.status(201).json({ message: '할 일 추가 완료' });
	} catch (err) {
		res.status(500).json({ message: '서버 오류', error: err.message });
	}
};

exports.getTodos = async (req, res) => {
	const userId = req.user.id;

	try {
		const [todos] = await pool.query(
			'SELECT * FROM todos WHERE user_id = ? ORDER BY created_at DESC',
			[userId]
		);
		res.json(todos);
	} catch (err) {
		res.status(500).json({ message: '서버 오류', error: err.message });
	}
};

exports.updateTodo = async (req, res) => {
	const userId = req.user.id;
	const { id } = req.params;
	const { title, description, is_done } = req.body;

	try {
		const [result] = await pool.query(
			'UPDATE todos SET title = ?, description = ?, is_done = ? WHERE id = ? AND user_id = ?',
			[title, description, is_done, id, userId]
		);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: '할 일을 찾을 수 없거나 권한이 없습니다.' });
		}
		res.json({ message: '할 일 수정 완료' });
	} catch (err) {
		res.status(500).json({ message: '서버 오류', error: err.message });
	}
};

exports.deleteTodo = async (req, res) => {
	const userId = req.user.id;
	const { id } = req.params;

	try {
		const [result] = await pool.query(
			'DELETE FROM todos WHERE id = ? AND user_id = ?',
			[id, userId]
		);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: '할 일을 찾을 수 없거나 권한이 없습니다.' });
		}
		res.json({ message: '할 일 삭제 완료' });
	} catch (err) {
		res.status(500).json({ message: '서버 오류', error: err.message });
	}
};
