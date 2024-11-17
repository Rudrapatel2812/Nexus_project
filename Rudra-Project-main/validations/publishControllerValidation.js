import Joi from "joi";

export const publishControllerValidation = (req, res, callback) => {
  const schema = Joi.object({
    title: Joi.required().string(),
    description: Joi.required().string(),
  });

  const { error } = schema.validate(req);
  if (error) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }
  return callback(true);
};

export const shareProjectValidation = (req, res, callback) => {
  const schema = Joi.object({
    projectId: Joi.required(),
    option: Joi.required(),
  });

  const { error } = schema.validate(req);
  if (error) {
    return res
      .status(400)
      .json({ message: "Project ID and option are required." });
  }
  return callback(true);
};

export const projectCollaboratorsValidation = (req, res, callback) => {
  const schema = Joi.object({
    projectId: Joi.required(),
    usernameOrEmail: Joi.required(),
    role: Joi.required(),
  });

  const { error } = schema.validate(req);
  if (error) {
    return res
      .status(400)
      .json({ message: "Project ID and username/email are required." });
  }
  return callback(true);
};

export const collaboratorsProjectValidation = (req, res, callback) => {
  const schema = Joi.object({
    projectId: Joi.required(),
    usernameOrEmail: Joi.required(),
    role: Joi.required(),
  });

  const { error } = schema.validate(req);
  if (error) {
    return res
      .status(400)
      .json({ message: "Project ID and username/email are required." });
  }
  return callback(true);
};
