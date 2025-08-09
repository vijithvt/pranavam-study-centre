# Testing Guide

This project includes comprehensive automation testing for forms and user interactions.

## Testing Stack

- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **JSdom** - DOM environment for testing
- **MSW (Mock Service Worker)** - API mocking
- **User Event** - User interaction simulation

## Test Structure

```
src/test/
├── __tests__/
│   ├── components/          # Component tests
│   ├── integration/         # Integration tests
│   └── e2e/                # End-to-end test placeholders
├── mocks/
│   └── server.ts           # MSW server setup
├── utils/
│   └── test-utils.tsx      # Testing utilities
├── setup.ts                # Test environment setup
└── types/
    └── vitest.d.ts         # Type definitions
```

## Running Tests

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Categories

### 1. Unit Tests
Test individual components and functions in isolation.

**Example: PersonalInfoSection.test.tsx**
```typescript
it('validates email format', async () => {
  render(<PersonalInfoSectionWrapper />)
  
  const emailInput = screen.getByLabelText(/email/i)
  await user.type(emailInput, 'invalid-email')
  
  expect(emailInput).toBeInvalid()
})
```

### 2. Integration Tests
Test form submission flows with mocked APIs.

**Example: form-submission.test.tsx**
```typescript
it('successfully submits student registration', async () => {
  render(<StudentRegistration />)
  
  // Fill form...
  await user.click(submitButton)
  
  await waitFor(() => {
    expect(screen.getByText('Registration Complete!')).toBeInTheDocument()
  })
})
```

### 3. Component Tests
Test component behavior and interactions.

**Example: StudentRegistration.test.tsx**
```typescript
describe('Form validation', () => {
  it('validates required fields on first step', async () => {
    render(<StudentRegistration />)
    
    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)
    
    expect(screen.getByText('Please select a class/grade')).toBeInTheDocument()
  })
})
```

## API Mocking

Tests use MSW to mock Supabase API calls:

```typescript
// Mock successful registration
http.post('*/student_registrations', () => {
  return HttpResponse.json({ id: 'test-uuid' }, { status: 201 })
})

// Mock error response
http.post('*/student_registrations', () => {
  return HttpResponse.json(
    { error: 'Database error' },
    { status: 500 }
  )
})
```

## Form Testing Patterns

### 1. Form Validation Testing
```typescript
it('validates email format', async () => {
  render(<Component />)
  
  await user.type(screen.getByLabelText(/email/i), 'invalid-email')
  await user.tab() // Trigger validation
  
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
})
```

### 2. Multi-Step Form Testing
```typescript
it('allows navigation between steps', async () => {
  render(<StudentRegistration />)
  
  // Fill step 1
  await fillStep1()
  await user.click(screen.getByRole('button', { name: /next/i }))
  
  expect(screen.getByText('Step 2 of 4')).toBeInTheDocument()
})
```

### 3. Form Submission Testing
```typescript
it('submits form with valid data', async () => {
  render(<Component />)
  
  await fillCompleteForm()
  await user.click(screen.getByRole('button', { name: /submit/i }))
  
  await waitFor(() => {
    expect(mockSubmitFunction).toHaveBeenCalledWith(expectedData)
  })
})
```

## Testing Best Practices

### 1. Use User-Centric Queries
```typescript
// ✅ Good - finds elements like users would
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email address/i)

// ❌ Avoid - implementation details
screen.getByTestId('submit-button')
screen.getByClassName('email-input')
```

### 2. Test User Interactions
```typescript
// ✅ Good - simulates real user actions
await user.type(input, 'text')
await user.click(button)
await user.selectOptions(select, 'option')

// ❌ Avoid - direct DOM manipulation
fireEvent.change(input, { target: { value: 'text' } })
```

### 3. Use Async Utilities
```typescript
// ✅ Good - waits for changes
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument()
})

// ❌ Avoid - synchronous assertions for async changes
expect(screen.getByText('Success')).toBeInTheDocument()
```

## Custom Testing Utilities

### Form Data Creation
```typescript
const mockFormData = createMockFormData({
  studentName: 'John Doe',
  email: 'john@example.com',
  subjects: ['Math', 'Physics']
})
```

### Component Rendering with Providers
```typescript
// Automatically includes Router, Query Client, and Toaster
render(<MyComponent />)
```

## E2E Testing (Future Enhancement)

For comprehensive E2E testing, consider adding:

- **Playwright** or **Cypress** for browser automation
- Full user journey testing
- Cross-browser compatibility testing
- Visual regression testing

## Debugging Tests

### Run Specific Tests
```bash
# Run specific test file
npm run test PersonalInfoSection

# Run tests matching pattern
npm run test -- --grep "validation"
```

### Debug Mode
```bash
# Run with debugging
npm run test:ui
```

### Verbose Output
```typescript
// Add debugging in tests
screen.debug() // Prints current DOM
console.log(screen.getByRole('button').outerHTML)
```

## Coverage Reports

Tests generate coverage reports showing:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

View coverage with:
```bash
npm run test:coverage
```

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Test both happy path and error cases
3. Include accessibility testing
4. Mock external dependencies
5. Use descriptive test names

Example test naming:
```typescript
describe('StudentRegistration', () => {
  describe('when user fills invalid email', () => {
    it('should show email validation error', () => {
      // Test implementation
    })
  })
})
```