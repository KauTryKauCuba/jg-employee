import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate a database fetch
  const data = {
    status: 'success',
    message: 'Welcome to the Employer API',
    stats: {
      totalEmployees: 124,
      activeProjects: 12,
      pendingTasks: 8,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(data);
}
