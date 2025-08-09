import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

// Mock Supabase API responses
export const handlers = [
  // Mock student registration insert
  http.post('https://pucrkdrmvjzzbatxpfqz.supabase.co/rest/v1/student_registrations', () => {
    return HttpResponse.json({
      id: 'test-uuid-123',
      created_at: '2024-01-15T10:00:00Z',
      student_name: 'Test Student',
      parent_name: 'Test Parent',
      email: 'test@example.com',
      phone: '9876543210',
      class_grade: '10',
      subjects: ['Mathematics'],
      mode: 'both',
      district: 'Thiruvananthapuram',
      location: 'Test Area',
      time_preference: 'evening',
      monthly_budget: 5000,
      status: 'new'
    }, { status: 201 })
  }),

  // Mock tutor registration insert
  http.post('https://pucrkdrmvjzzbatxpfqz.supabase.co/rest/v1/tutor_registrations', () => {
    return HttpResponse.json({
      id: 'test-tutor-uuid-123',
      created_at: '2024-01-15T10:00:00Z',
      full_name: 'Test Tutor',
      email: 'tutor@example.com',
      phone: '9876543211',
      qualification: 'M.Sc Mathematics',
      experience: 5,
      subjects: ['Mathematics', 'Physics'],
      classes: ['9', '10', '11', '12'],
      district: 'Thiruvananthapuram',
      location: 'Test Area',
      mode: 'both',
      languages: ['English', 'Malayalam'],
      availability: 'evening',
      status: 'new'
    }, { status: 201 })
  }),

  // Mock subjects fetch
  http.get('https://pucrkdrmvjzzbatxpfqz.supabase.co/rest/v1/subjects', () => {
    return HttpResponse.json([
      { id: 1, name: 'Mathematics', category: 'Science' },
      { id: 2, name: 'Physics', category: 'Science' },
      { id: 3, name: 'Chemistry', category: 'Science' },
      { id: 4, name: 'English', category: 'Language' },
    ])
  }),

  // Mock admin notification edge function
  http.post('https://pucrkdrmvjzzbatxpfqz.supabase.co/functions/v1/send-admin-notification', () => {
    return HttpResponse.json({ success: true })
  }),

  // Mock error scenarios
  http.post('https://pucrkdrmvjzzbatxpfqz.supabase.co/rest/v1/student_registrations_error', () => {
    return HttpResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    )
  }),
]

export const server = setupServer(...handlers)