import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import TodoModel from '@/models/todoModel';

export async function GET() {
  const connected = await connectDB();
  if (!connected) {
    return NextResponse.json(
      { success: false, message: 'Could not connect to MongoDB' },
      { status: 500 }
    );
  }

  try {
    const todos = await TodoModel.find({}).lean();
    const plainTodos = todos.map((todo) => ({
      ...todo,
      _id: String(todo._id),
    }));
    return NextResponse.json({ success: true, data: plainTodos });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching todos:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error fetching todos:', error);
      return NextResponse.json(
        { success: false, error: 'Unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: NextRequest) {
  const connected = await connectDB();
  if (!connected) {
    return NextResponse.json(
      { success: false, message: 'Could not connect to MongoDB' },
      { status: 500 }
    );
  }
  try {
    const body = await request.json();
    const { title, description, completed } = body;
    const newTodo = await TodoModel.create({ title, description, completed });
    return NextResponse.json({ success: true, data: newTodo });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating todo:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error creating todo:', error);
      return NextResponse.json(
        { success: false, error: 'Unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}

// export async function GET(request: NextRequest) {
//   const { searchParams } = new URL(request.url);
//   const skip = parseInt(searchParams.get('skip') || '0');
//   const limit = parseInt(searchParams.get('limit') || '10');

//   const connected = await connectDB();
//   if (!connected) {
//     return NextResponse.json(
//       { success: false, message: 'Could not connect to MongoDB' },
//       { status: 500 }
//     );
//   }
//   try {
//     const todos = await TodoModel.find({}).skip(skip).limit(limit);
//     return NextResponse.json({ success: true, data: todos });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error fetching todos:', error);
//       return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//     } else {
//       console.error('Unexpected error fetching todos:', error);
//       return NextResponse.json(
//         { success: false, error: 'Unexpected error occurred' },
//         { status: 500 }
//       );
//     }
//   }
// }
