const { ApplicationError } = require('../errors');

exports.schemaValidator = async (schema, body, queryParams = false) => {
  try {
    return await schema.schema().validateAsync(body, { abortEarly: false });
  } catch (e) {
    let error = e.details;
    let errorArray = [];
    let existsNot = error[0].type === 'any.exist';
    error.map(error => {
      errorArray.push({
        code: 10001,
        title: existsNot ? 'Resource Not Found' : 'Validation Error',
        source: queryParams ?
          { source: { parameter: error.context.key } }
          : { pointer: error.context.key },
        details: error.message
      });
    });
    let errorCode = existsNot ? 404 : 400;
    throw new ApplicationError(errorArray, 10001, errorCode);
  }
};
