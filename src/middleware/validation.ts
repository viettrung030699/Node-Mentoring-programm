import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const userSchema = Joi.object().keys({
  id: Joi.string().required(),
  login: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  age: Joi.number().min(4).max(130).required(),
  isDeleted: Joi.boolean().required(),
});

const errorResponse = (schemaErrors: Joi.ValidationErrorItem[]) => {
  const errors = schemaErrors.map((error) => {
    let { path, message } = error;
    return { path, message };
  });

  return {
    status: 'failed',
    errors,
  };
};

export const validateSchema = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    error?.isJoi ? res.status(400).json(errorResponse(error.details)) : next();
  };
};
