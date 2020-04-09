const { logger } = require('../lib/helpers/logger');

const AnaliticsController = {
  getItems: async (req, res) => {
    const { offset, limit, filter } = req.query;

    db.all(`SELECT * FROM analitics WHERE id NOT IN (
      SELECT id FROM analitics ORDER BY ? LIMIT ?
    ) ORDER BY ?`, []);
  },
  createAnaliticItem: async (req, res) => {
    const { userId, area, timestamp } = req.body;
    try {
      await db.run('INSERT INTO analitics (user_id, area_id, timestamp) VALUES (?, ?, ?)', [userId, area, timestamp]);
    } catch (err) {
      logger.error(err);
    }

    res.sendStatus(404);
  },
};

module.exports = {
  AnaliticsController,
};
