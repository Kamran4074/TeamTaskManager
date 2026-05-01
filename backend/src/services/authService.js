import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { validateEmail, validatePassword } from '../utils/validators.js';

export const registerUser = async (name, email, password, employeeId, role = 'member') => {
  // Validate input
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }

  if (!validatePassword(password)) {
    throw new Error('Password must be at least 6 characters');
  }

  if (!employeeId) {
    throw new Error('Employee ID is required');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { employeeId }] });
  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error('Email already in use');
    }
    throw new Error('Employee ID already in use');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    employeeId,
    role,
  });

  return user;
};

export const loginUser = async (email, password) => {
  // Validate input
  if (!email || !password) {
    throw new Error('Please provide email and password');
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  if (!user.isActive) {
    throw new Error('User account is inactive');
  }

  const token = generateToken(user._id, user.role);

  return { user, token };
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
