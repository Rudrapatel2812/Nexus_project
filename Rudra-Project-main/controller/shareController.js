import Project from "../models/Project";
import User from "../models/User";
import {
  projectCollaboratorsValidation,
  shareProjectValidation,
} from "../validations/publishControllerValidation";

/**
 * @description This function is used to share projects.
 * @param {*} req
 * @param {*} res
 */
export const shareProject = async (req, res) => {
  const reqParam = req.body;
  shareProjectValidation(reqParam, res, async (validate) => {
    if (validate) {
      try {
        if (!["live-collab", "version-control"].includes(reqParam.option)) {
          return res.status(400).json({ message: "Invalid option." });
        }
        const project = await Project.findById(reqParam.projectId);
        if (!project) {
          return res.status(404).json({ message: "Project not found." });
        }
        // Save the user's choice
        project.option = reqParam.option;
        await project.save();
        res
          .status(200)
          .json({ message: "Option saved successfully.", project });
      } catch (error) {
        res.status(500).json({ message: "Error saving option.", error });
      }
    }
  });

  try {
  } catch (error) {
    res.status(500).json({ message: "Error saving option.", error });
  }
};

/**
 * @description This function is used to set projects collaborators.
 * @param {*} req
 * @param {*} res
 */
export const projectCollaborators = async (req, res) => {
  const reqParam = req.body;
  projectCollaboratorsValidation(reqParam, res, async (validate) => {
    if (validate) {
      try {
        const project = await Project.findById(reqParam.projectId);
        const user = await User.findOne({
          $or: [
            { username: reqParam.usernameOrEmail },
            { email: reqParam.usernameOrEmail },
          ],
        });

        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }

        project.collaborators.push({
          user: user._id,
          role: reqParam.role || "viewer",
        });
        await project.save();

        res
          .status(201)
          .json({ message: "Collaborator added successfully.", project });
      } catch (error) {
        res.status(500).json({ message: "Error adding collaborator.", error });
      }
    }
  });

  try {
  } catch (error) {
    res.status(500).json({ message: "Error saving option.", error });
  }
};

/**
 * @description This function is used to get collaborator's projects.
 * @param {*} req
 * @param {*} res
 */
export const collaboratorsProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate(
      "collaborators.user",
      "username email"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ collaborators: project.collaborators });
  } catch (error) {
    res.status(500).json({ message: "Error fetching collaborators.", error });
  }
};

/**
 * @description This function is used to set project permissions.
 * @param {*} req
 * @param {*} res
 */
export const projectPermissions = async (req, res) => {
  const reqParam = req.body;

  try {
    const project = await Project.findById(reqParam.projectId);
    const collaborator = project.collaborators.find(
      (c) => c._id.toString() === reqParam.collaboratorId
    );

    if (!collaborator) {
      return res.status(404).json({ message: "Collaborator not found." });
    }

    collaborator.role = reqParam.role;
    await project.save();

    res.status(200).json({ message: "Permissions updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating permissions.", error });
  }
};

/**
 * @description This function is used to delete collaborator.
 * @param {*} req
 * @param {*} res
 */
export const deleteCollaborator = async (req, res) => {
  const reqParam = req.body;
  try {
    const project = await Project.findById(reqParam.projectId);
    project.collaborators = project.collaborators.filter(
      (c) => c._id.toString() !== reqParam.collaboratorId
    );
    await project.save();
    res.status(200).json({ message: "Collaborator removed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error removing collaborator.", error });
  }
};
