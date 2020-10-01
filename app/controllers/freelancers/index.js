const FreelancerService = require('../../services/freelancers'),
    FreelancerSchema = require('../../schema/freelancers'),
    { DEFAULT_ITEMS_PER_PAGE } = require('../../../config'),
    { schemaValidator } = require('../../utils/validators');

exports.create = async(req, res) => {
  await schemaValidator(FreelancerSchema.create, req.body);
  const freelancer = await FreelancerService.create(req.body);
  res.status(201);
  return freelancer
}

exports.getById = async (req, res) => {
  await schemaValidator(FreelancerSchema.getByID, { ...req.params });
  const { id } = req.params;
  let freelancer = await FreelancerService.getByID(id);
  res.status(200);
  return freelancer;
}

exports.getAll = async (req, res) => {
  await schemaValidator(FreelancerSchema.getAll, req.query);
  const { page = {}, filter = {} } = req.query;
  const { number = 1, size = DEFAULT_ITEMS_PER_PAGE } = page;
  let { email } = filter;
  let freelancers = await FreelancerService.getAll({
    email, number, size
  });
  res.status(200);
  return freelancers.results;
};

exports.update = async (req, res) => {
  const { id } = req.params;
  await schemaValidator(FreelancerSchema.update, { ...req.body, id });
  const freelancer = await FreelancerService.update(id, req.body);
  res.status(200);
  return freelancer;
};

exports.delete = async (req, res) => {
  await schemaValidator(FreelancerSchema.delete, req.params);
  const { id } = req.params;
  await FreelancerService.delete(id);
  res.status(204);
  return {};
};

