import express from 'express';
import {
  createProject,
  getProject,
  getMyProjects,
  getAllProjects,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
  updateMemberRole,
  getProjectMembers,
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { checkProjectAccess, checkProjectAdmin } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Protect all routes
router.use(protect);

// Project CRUD
router.post('/', createProject);
router.get('/my-projects', getMyProjects);
router.get('/all-projects', getAllProjects);
router.get('/:projectId', checkProjectAccess, getProject);
router.get('/:projectId/members', checkProjectAccess, getProjectMembers);
router.put('/:projectId', checkProjectAdmin, updateProject);
router.delete('/:projectId', checkProjectAdmin, deleteProject);

// Member management
router.post('/:projectId/members', checkProjectAdmin, addMember);
router.delete('/:projectId/members/:userId', checkProjectAdmin, removeMember);
router.put('/:projectId/members/:userId/role', checkProjectAdmin, updateMemberRole);

export default router;
