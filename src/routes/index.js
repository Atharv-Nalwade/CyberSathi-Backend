// import express from 'express';

// import router from './v1';

// const v1ApiRoutes = router;

// router.use('/v1', v1ApiRoutes);

// export default router;

// routes/index.js

const express = require('express');
const router = express.Router();
const v1ApiRoutes = require('./v1');

router.use('/v1', v1ApiRoutes);

module.exports = router;
