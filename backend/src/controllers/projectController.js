import * as projectService from '../services/projectService.js';

export const createProject = async (req, res) => {
  try {
    const { name, description, endDate } = req.body;

    const project = await projectService.createProject(
      { name, description, endDate },
      req.user._id
    );

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await projectService.getProjectById(projectId);

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyProjects = async (req, res) => {
  try {
    const projects = await projectService.getUserProjects(req.user._id);

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, description, status, endDate } = req.body;

    const project = await projectService.updateProject(projectId, {
      name,
      description,
      status,
      endDate,
    });

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    await projectService.deleteProject(projectId);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId, role } = req.body;

    const membership = await projectService.addMemberToProject(projectId, userId, role || 'member');

    res.status(201).json({
      success: true,
      message: 'Member added successfully',
      membership,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeMember = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    await projectService.removeMemberFromProject(projectId, userId);

    res.status(200).json({
      success: true,
      message: 'Member removed successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateMemberRole = async (req, res) => {
  try {
    const { projectId, userId } = req.params;
    const { role } = req.body;

    const membership = await projectService.updateMemberRole(projectId, userId, role);

    res.status(200).json({
      success: true,
      message: 'Member role updated successfully',
      membership,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProjectMembers = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await projectService.getProjectById(projectId);

    res.status(200).json({
      success: true,
      members: project.members || [],
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
