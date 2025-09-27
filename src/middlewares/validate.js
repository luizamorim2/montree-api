const { ZodError } = require('zod');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.issues.map(issue => ({ path: issue.path.join('.'), message: issue.message }))
      });
    }
    return res.status(400).json({ message: 'A requisição possui um formato inválido.' });
  }
};

module.exports = validate;