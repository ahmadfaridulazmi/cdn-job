const joi = require('joi'),
  Freelancer = require('../../models/freelancers'),
  { MAX_ITEMS_PER_PAGE } = require('../../../config'),
  exists = require('../../schema/shared/exists');

exports.create = {
  schema: () => {
    return joi.object().keys({
      username: joi.string().max(150).required(),
      email: joi.string().email().required(),
      contact_number: joi.number().required(),
      skillsets: joi.object().optional(),
      hobby: joi.object().optional()
    });
  }
};

exports.getByID = {
  schema: () => {
    return joi.object().keys({
      id: joi.number().required().external(exists(Freelancer, 'freelancer_id', 'id')),
    });
  }
};

exports.getAll = {
  schema: () => {
    return joi.object().keys({
      page: joi.object().keys({
        number: joi.number().positive().optional(),
        size: joi.number().positive().max(MAX_ITEMS_PER_PAGE).optional()
      }),
      filter: joi.object().keys({
        email: joi.string().optional().allow(''),
      })
    });
  }
};

exports.update = {
  schema: () => {
    return joi.object().keys({
      id: joi.number().required().external(exists(Freelancer, 'freelancer_id', 'id')),
      username: joi.string().max(150).optional(),
      email: joi.string().email().optional(),
      contact_number: joi.number().optional(),
      skillsets: joi.object().optional(),
      hobby: joi.object().optional()
    });
  }
};

exports.delete = {
  schema: () => {
    return joi.object().keys({
      id: joi.number().required().external(exists(Freelancer, 'freelancer_id', 'id'))
    });
  }
};
