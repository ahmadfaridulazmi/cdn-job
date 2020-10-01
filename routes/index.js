const express = require('express');
const router = express.Router();
const { controllerCallback } = require('../app/middleware');
const FreelancerController = require('../app/controllers/freelancers');

router.get('/health', function(req, res, next) {
  res.send({ health: 'ok' })
});

router.get('/freelancers', controllerCallback(FreelancerController.getAll));
router.post('/freelancers', controllerCallback(FreelancerController.create));
router.get('/freelancers/:id', controllerCallback(FreelancerController.getById));
router.post('/freelancers/:id', controllerCallback(FreelancerController.update) );
router.delete('/freelancers/:id', controllerCallback(FreelancerController.delete));

module.exports = router;
