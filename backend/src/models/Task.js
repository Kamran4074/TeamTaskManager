import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignedToId: {
      type: Number,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'completed'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
    },
    isOverdue: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Middleware to check if task is overdue
taskSchema.pre('save', function (next) {
  if (this.dueDate && this.status !== 'completed') {
    this.isOverdue = new Date() > this.dueDate;
  } else {
    this.isOverdue = false;
  }
  next();
});

export default mongoose.model('Task', taskSchema);
