# Running Tests

## Quick Start

To run the automation tests for forms:

```bash
# Install dependencies (if not already done)
npm install

# Run all tests
npm run test

# Run tests in watch mode (recommended for development)
npm run test:watch

# Run specific test files
npm run test PersonalInfoSection
npm run test StudentRegistration
npm run test form-submission

# Run tests with coverage report
npm run test:coverage
```

## Test Commands

```bash
# Basic test run
npm run test

# Watch mode (re-runs tests when files change)
npm run test:watch

# UI mode (visual test runner)
npm run test:ui

# Coverage report
npm run test:coverage
```

## What Gets Tested

### 1. Form Validation
- Email format validation
- Phone number validation  
- Required field validation
- Name format validation (letters only)

### 2. Form Flow
- Multi-step navigation
- Step validation before proceeding
- Back/Next button functionality
- Form state persistence across steps

### 3. Form Submission
- Successful submission to database
- Error handling for failed submissions
- Loading states during submission
- Success message display

### 4. Component Behavior
- Conditional field display (based on class/grade selection)
- Form reset functionality
- User interaction simulation

## Sample Test Output

```
✓ PersonalInfoSection > renders all required form fields
✓ PersonalInfoSection > validates email format  
✓ PersonalInfoSection > shows syllabus field for school grades
✓ StudentRegistration > allows navigation between steps
✓ StudentRegistration > validates required fields
✓ Form Submission > successfully submits student registration
✓ Form Submission > handles submission errors gracefully
```

## Debugging Failed Tests

If tests fail:

1. **Check the error message** - tells you what assertion failed
2. **Run in watch mode** - `npm run test:watch` for faster feedback
3. **Use test debugging** - add `screen.debug()` in tests to see DOM state
4. **Check mock data** - ensure test data matches expected format

## Writing New Tests

When adding new form features, add corresponding tests:

```typescript
// Example test for new validation
it('validates new field format', async () => {
  render(<YourComponent />)
  
  await user.type(screen.getByLabelText(/new field/i), 'invalid-value')
  await user.tab()
  
  expect(screen.getByText(/validation error/i)).toBeInTheDocument()
})
```

## CI/CD Integration

These tests can be integrated into CI/CD pipelines:

```yaml
# GitHub Actions example
- name: Run Tests
  run: npm run test -- --run --coverage
```

The automation testing ensures your forms work correctly before deployment!