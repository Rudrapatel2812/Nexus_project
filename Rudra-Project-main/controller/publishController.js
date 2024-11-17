import { publishControllerValidation } from "../validations/publishControllerValidation";

/**
 * @description This function is used to publish projects.
 * @param {*} req
 * @param {*} res
 */
export const publishProject = async (req, res) => {
  const reqParam = req.body;
  publishControllerValidation(reqParam, res, async (validate) => {
    if (validate) {
      try {
        const project = new Project({
          title,
          description,
          tags,
          isPublished: true,
        });

        await project.save();
        res
          .status(201)
          .json({ message: "Project published successfully!", project });
      } catch (error) {
        res.status(500).json({
          message: "An error occurred while publishing the project.",
          error,
        });
      }
    }
  });
};

/**
 * @description This function is used to get projects.
 * @param {*} req
 * @param {*} res
 */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isPublished: true });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects.", error });
  }
};
