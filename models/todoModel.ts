import { Schema, models, model, Document } from 'mongoose';

interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, collection: 'todolist' }
);

const TodoModel = models.todolist || model<ITodo>('todolist', todoSchema);

export default TodoModel;
