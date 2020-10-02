const Freelancer = require('../../models/freelancers')

exports.create = ({ username, email, contact_number, skillsets, hobby }) => {
  return Freelancer.query().insert({
    username,
    email,
    contact_number,
    skillsets,
    hobby
  })
}

exports.getAll = ({ number, size, email }) => {
  let result = Freelancer.query()
    .whereNull('deleted_at');

  email && result.where('email', 'like', `${email}%`);
  result.orderBy('id', 'desc');
  result.page(Number(number) - 1, size);
  return result;
};

exports.getByID = (id) => {
  return Freelancer.query().findById(id).whereNull('deleted_at');
};

exports.delete = async id => {
  const freelancer = await Freelancer.query().whereNull('deleted_at').findById(id);
  return Freelancer.query().whereNull('deleted_at').patchAndFetchById(id, {
    email: `${freelancer.email}-deleted`,
    deleted_at: new Date()
  });
};

exports.update = (id, attr = {}) => {
  return Freelancer.query().whereNull('deleted_at')
    .patchAndFetchById(id, attr);
};
