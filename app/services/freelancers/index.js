const FreeLancer = require('../../models/freelancers')

exports.create = ({ username, email, contact_number, skillsets, hobby }) => {
  return FreeLancer.query().insert({
    username,
    email,
    contact_number,
    skillsets,
    hobby
  })
}

exports.getAll = ({ number, size, email }) => {
  let result = FreeLancer.query()
    .whereNull('deleted_at');

  email && result.where('email', 'like', `${email}%`);
  result.orderBy('id', 'desc');
  result.page(Number(number) - 1, size);
  return result;
};

exports.getByID = (id) => {
  return FreeLancer.query().findById(id).whereNull('deleted_at');
};

exports.delete = async id => {
  const freeLancer = await FreeLancer.query().whereNull('deleted_at').findById(id);
  return FreeLancer.query().whereNull('deleted_at').findById(id).patch({
    name: `${freeLancer.name}-deleted`,
    deleted_at: new Date()
  });
};

exports.update = (id, attr = {}) => {
  return FreeLancer.query().whereNull('deleted_at')
    .patchAndFetchById(id, attr);
};
