import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock form data utilities
export const createMockFormData = (data: Record<string, any>) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, String(value))
    }
  })
  return formData
}

// Mock student registration data
export const mockStudentData = {
  studentName: 'John Doe',
  parentName: 'Jane Doe',
  email: 'john@example.com',
  parentPhone: '9876543210',
  class: '10',
  syllabus: 'CBSE',
  district: 'Thiruvananthapuram',
  area: 'Technopark',
  mode: 'both',
  timePreference: 'evening',
  languages: 'English',
}

// Mock tutor registration data
export const mockTutorData = {
  fullName: 'Dr. Smith',
  email: 'smith@example.com',
  phone: '9876543211',
  whatsapp: '9876543211',
  qualification: 'PhD Physics',
  experience: '5',
  district: 'Thiruvananthapuram',
  location: 'Technopark',
  subjects: ['Physics', 'Mathematics'],
  classes: ['11', '12'],
  mode: 'both',
  languages: ['English', 'Malayalam'],
  availability: 'flexible',
}