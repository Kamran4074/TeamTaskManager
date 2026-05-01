import Project from '../models/Project.js';
import Membership from '../models/Membership.js';
import { validateProjectData } from '../utils/validators.js';

export const createProject = async (projectData, userId) => {
  // Validate data
  const errors = validateProjectData(projectData);
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  // Create project
  const project = await Project.create({
    ...projectData,
    owner: userId,
    members: [userId],
  });

  // Create membership for owner as admin
  await Membership.create({
    user: userId,
    project: project._id,
    role: 'admin',
  });

  return project;
};

export const getProjectById = async (projectId) => {
  const project = await Project.findById(projectId)
    .populate('owner', 'name email')
    .populate('members', 'name email role');

  if (!project) {
    throw new Error('Project not found');
  }

  return project;
};

export const getUserProjects = async (userId) => {
  // Get projects where user is owner
  const ownedProjects = await Project.find({ owner: userId }).populate('owner', 'name email');

  // Get projects where user is member
  const memberships = await Membership.find({ user: userId }).populate('project');
  const memberProjects = memberships.map((m) => m.project);

  // Combine and remove duplicates
  const allProjects = [...ownedProjects, ...memberProjects];
  const uniqueProjects = Array.from(new Map(allProjects.map((p) => [p._id.toString(), p])).values());

  return uniqueProjects;
};

export const getAllProjects = async () => {
  const projects = await Project.find()
    .populate('owner', 'name email')
    .populate('members', 'name email')
    .sort({ createdAt: -1 });

  return projects;
};

export const updateProject = async (projectId, updateData) => {
  const errors = validateProjectData(updateData);
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  const project = await Project.findByIdAndUpdate(projectId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    throw new Error('Project not found');
  }

  return project;
};

export const deleteProject = async (projectId) => {
  const project = await Project.findByIdAndDelete(projectId);

  if (!project) {
    throw new Error('Project not found');
  }

  // Delete all memberships
  await Membership.deleteMany({ project: projectId });

  return project;
};

export const addMemberToProject = async (projectId, userId, role = 'member') => {
  // Check if user already a member
  const existingMembership = await Membership.findOne({ user: userId, project: projectId });

  if (existingMembership) {
    throw new Error('User is already a member of this project');
  }

  // Add to members array
  await Project.findByIdAndUpdate(projectId, { $push: { members: userId } });

  // Create membership
  const membership = await Membership.create({
    user: userId,
    project: projectId,
    role,
  });

  return membership;
};

export const removeMemberFromProject = async (projectId, userId) => {
  // Remove from members array
  await Project.findByIdAndUpdate(projectId, { $pull: { members: userId } });

  // Delete membership
  await Membership.deleteOne({ user: userId, project: projectId });
};

export const updateMemberRole = async (projectId, userId, newRole) => {
  const membership = await Membership.findOneAndUpdate(
    { user: userId, project: projectId },
    { role: newRole },
    { new: true }
  );

  if (!membership) {
    throw new Error('Membership not found');
  }

  return membership;
};

export const getProjectMembers = async (projectId) => {
  const project = await Project.findById(projectId).populate('members', 'name email role');

  if (!project) {
    throw new Error('Project not found');
  }

  return project.members || [];
};
