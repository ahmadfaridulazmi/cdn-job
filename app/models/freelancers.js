const Model = require('./model_base');

class Freelancers extends Model {
  static tableName = 'freelancers';

  static getTableName() {
    return this.tableName;
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Freelancers;
