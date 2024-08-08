// routes/logs.js
const express = require('express');
const logger = require('../logger');

const router = express.Router();

router.post('/', (req, res) => {
    const { level, message } = req.body;
    logger.log({ level, message });
    res.status(204).send();
});

module.exports = router;
