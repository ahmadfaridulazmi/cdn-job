const config = require('./config');

const _config = {

  development: {
    client: config.db.dev.client,
    connection: async function () {
      return {
        host: config.db.dev.host,
        database: config.db.dev.name,
        user: config.db.dev.user,
        password: config.db.dev.password
      };
    },
    pool: {
      min: Number(config.db.dev.min_pool) || 0,
      max: Number(config.db.dev.max_pool) || 1
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/db/migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

module.exports = _config;

