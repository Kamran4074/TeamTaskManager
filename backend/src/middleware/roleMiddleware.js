import Membership from '../models/Membership.js';
import Project from '../models/Project.js';

export const checkProjectAccess = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check if user is project owner
    if (project.owner.toString() === userId.toString()) {
      req.userRole = 'admin';
      return next();
    }

    // Check membership
    const membership = await Membership.findOne({ user: userId, project: projectId });

    if (!membership) {
      return res.status(403).json({ success: false, message: 'You do not have access to this project' });
    }

    req.userRole = membership.role;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkProjectAdmin = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = req.user._id;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check if user is project owner
    if (project.owner.toString() === userId.toString()) {
      return next();
    }

    // Check if user is admin in project
    const membership = await Membership.findOne({ user: userId, project: projectId, role: 'admin' });

    if (!membership) {
      return res.status(403).json({ success: false, message: 'You do not have admin access to this project' });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
