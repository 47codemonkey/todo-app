import { NextResponse, NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import TodoModel from '@/models/todoModel';

export async function PATCH(request: NextRequest, context: unknown) {
  const connected = await connectDB();
  if (!connected) {
    return NextResponse.json(
      { success: false, message: 'Could not connect to MongoDB' },
      { status: 500 }
    );
  }
  try {
    const { id } = await (context as { params: { id: string } }).params;
    const body = await request.json();
    const { title, description, completed } = body;

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    if (!updatedTodo) {
      return NextResponse.json({ success: false, message: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedTodo });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { success: false, error: 'Unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(request: NextRequest, context: unknown) {
  const connected = await connectDB();
  if (!connected) {
    return NextResponse.json(
      { success: false, message: 'Could not connect to MongoDB' },
      { status: 500 }
    );
  }
  try {
    const { id } = await (context as { params: { id: string } }).params;
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      return NextResponse.json({ success: false, message: 'Todo not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: deletedTodo });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { success: false, error: 'Unexpected error occurred' },
        { status: 500 }
      );
    }
  }
}
