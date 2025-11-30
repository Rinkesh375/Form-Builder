# MatBook Assignment - Dynamic Form Builder System

A full-stack dynamic form builder application for Employee Onboarding with real-time validation, server-side pagination, and sorting capabilities.

## 📸 Screenshots

### 1. Form Schema Page
![Dynamic Form Page](https://raw.githubusercontent.com/Rinkesh375/Form-Builder/refs/heads/main/Employee-form-schema.png)
*Displays all required field types from different schemas accepted by our JSON database*

### 2. Form Validation & Error States
![Form Validation](https://github.com/Rinkesh375/Form-Builder/blob/main/form-validation.png?raw=true)
*Real-time inline validation showing error messages for invalid inputs and server-side validation when adding data to JSON database*

### 3. Submissions Table with Pagination
![Submissions Table](https://github.com/Rinkesh375/Form-Builder/blob/main/Submission-table-page.png?raw=true)
*Paginated table showing all submissions with sorting and items-per-page selector*

### 4. View Submission Details
![View Submission Modal](https://github.com/Rinkesh375/Form-Builder/blob/main/Employee-details.png?raw=true)
*Modal/drawer showing detailed view of a selected submission*

### 5. Loading State

<img src="https://github.com/Rinkesh375/Form-Builder/blob/main/Screenshot%202025-11-30%20190937.png?raw=true" width="100%" />

*Loading indicators during data fetching*


### 6. Error State
![Error State](https://github.com/Rinkesh375/Form-Builder/blob/main/Screenshot%202025-11-30%20190851.png?raw=true)
*Error state messages for failed operations*

---

## 🎯 Assignment Completion Status

### Milestone 1 - Frontend Development ✅
- [x] Dynamic Form Page
  - [x] Form schema fetching with TanStack Query
  - [x] Loading and error states
  - [x] Dynamic rendering of field types
  - [x] TanStack Form integration
  - [x] Inline validation with error messages
  - [x] Validation rules implemented
  - [x] Form submission with feedback
  - [x] Auto-navigation to submissions page
- [x] Submissions Table Page
  - [x] TanStack Table implementation
  - [x] Server-side pagination
  - [x] Server-side sorting by createdAt
  - [x] Items per page selector (10/20/50)
  - [x] View submission modal/drawer
  - [x] Loading, error, and empty states
  - [x] Total submissions count and page info

### Milestone 2 - Backend Development ✅
- [x] GET /api/form-schema
  - [x] Returns Employee Onboarding schema
  - [x] Includes all field types and validations
- [x] POST /api/submissions
  - [x] Schema validation
  - [x] Unique ID generation
  - [x] Timestamp creation
  - [x] Proper error handling (400/201)
- [x] GET /api/submissions
  - [x] Server-side pagination
  - [x] Sorting by createdAt (asc/desc)
  - [x] Total count and pages calculation
  - [x] Query parameter validation

### Bonus Features Implemented ✅
- [x] CSV export
- [x] Edit submission
- [x] Delete submission
- [x] Search/filter functionality
- [x] Dark mode
- [x] URL state synchronization

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **TanStack Query** - Server state management
- **TanStack Form** - Form state management
- **TanStack Table** - Table functionality
- **Tailwind CSS** - Styling
- **ShadCN UI** - Component library

### Backend
- **Node.js with Express** - Backend framework
- **JSON File** - Database storage
- **CORS** - Cross-origin resource sharing

---

## 🚀 Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Configure your environment variables
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API endpoint:
```bash
# Update the API base URL in your .env file
# e.g., NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend application will run on `http://localhost:3000`.

---

## 🌐 Live Deployment

- **Frontend**: <a href="https://task-management-eta-three.vercel.app" target="_blank">https://task-management-eta-three.vercel.app</a>
- **Backend**: <a href="https://form-builder-9fnn.onrender.com" target="_blank">https://form-builder-9fnn.onrender.com</a>


---

## 📋 Backend API Reference

This section documents the backend REST API endpoints implemented in `backend/src/controllers` and wired in `backend/src/routes`.

### GET /api/form-schema
```http
GET /api/form-schema
```
**Description**: Returns the JSON schema used to render the dynamic form.

**Success Response (200)**:
```json
{
  "title": "Employee Onboarding",
  "nameSchema": "onboarding",
  "fields": [
    {
      "name": "firstName",
      "type": "text",
      "label": "First Name",
      "required": true
    },
    {
      "name": "age",
      "type": "number",
      "label": "Age",
      "required": true
    }
    more...
  ]
}
```

---

### GET /api/submissions
```http
GET /api/submissions?page=1&limit=10&sortBy=createdAt&sortOrder=desc&search=&department=
```
**Description**: Returns a paginated list of submissions.

**Query Parameters**:
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `sortBy` (string, default: `createdAt`)
- `sortOrder` (`asc` or `desc`, default: `desc`)
- `search` (string, optional)
- `department` (string, optional)

**Success Response (200)**:
```json
{
  "data": [
    {
      "id": "abc123",
      "firstName": "Alice",
      "age": 30,
      "department": "Engineering",
      "createdAt": "2025-11-30T12:00:00.000Z"
    }
  ],
  "page": 1,
  "limit": 10,
  "totalItems": 1,
  "totalPages": 1
}
```

---

### GET /api/submissions/csv
```http
GET /api/submissions/csv
```
**Description**: Returns all submissions as a CSV download.

**Success Response (200)**:
- Headers:
  - `Content-Type: text/csv`
  - `Content-Disposition: attachment; filename=submissions.csv`
- Body: CSV text representing all submissions

---

### GET /api/submissions/:id
```http
GET /api/submissions/:id
```
**Description**: Retrieve a single submission by ID.

**Success Response (200)**:
```json
{
  "success": true,
  "submission": {
    "id": "abc123",
    "firstName": "Bob",
    "age": 25,
    "department": "Design",
    "createdAt": "2025-11-30T12:00:00.000Z"
  }
}
```

**Error Response (404)**:
```json
{
  "success": false,
  "message": "Submission not found"
}
```

---

### POST /api/submissions
```http
POST /api/submissions
Content-Type: application/json

{
  "firstName": "John",
  "age": 28,
  "department": "Sales"
}
```
**Description**: Create a new submission. The payload is validated against the form schema.

**Success Response (201)**:
```json
{
  "success": true,
  "id": "new-id-123",
  "createdAt": "2025-11-30T12:00:00.000Z"
}
```

**Validation Error (400)**:
```json
{
  "success": false,
  "errors": {
    "email": "Invalid email format",
    "firstName": "First name is required"
  }
}
```

---

### PUT /api/submissions/:id
```http
PUT /api/submissions/:id
Content-Type: application/json

{
  "firstName": "Jane",
  "age": 29
}
```
**Description**: Update an existing submission. Request body is validated against the form schema.

**Success Response (200)**:
```json
{
  "success": true,
  "submission": {
    "id": "abc123",
    "firstName": "Jane",
    "age": 29,
    "createdAt": "2025-11-30T12:00:00.000Z"
  }
}
```

**Error Response (404)**:
```json
{
  "success": false,
  "message": "Submission not found"
}
```

---

### DELETE /api/submissions/:id
```http
DELETE /api/submissions/:id
```
**Description**: Delete a submission by ID.

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Submission deleted"
}
```

**Error Response (404)**:
```json
{
  "success": false,
  "message": "Submission not found"
}
```


## ✨ Key Features

### Form Field Types Supported
1. **Text** - Single-line text input with min/max length validation
2. **Number** - Numeric input with min/max value validation
3. **Select** - Single selection dropdown
4. **Date** - Date picker with minimum date validation
5. **Textarea** - Multi-line text input
6. **Switch** - Boolean toggle input

### Validation Rules
- Required field validation
- Min/Max length for text fields
- Min/Max value for number fields
- Regex pattern matching
- Minimum date validation
- Min/Max selected items for multi-select
- Real-time inline error messages

### Table Features
- Server-side pagination with configurable page sizes
- Sorting by creation date (ascending/descending)
- Detailed submission view in modal/drawer
- Loading skeletons and error states
- Empty state handling
- Total count and page information

---

## 🔍 Technical Highlights

### Frontend Architecture
- **Component-based design** with reusable UI components
- **Type-safe** development with TypeScript interfaces
- **Optimistic updates** with TanStack Query
- **Form state management** with TanStack Form
- **Automatic query invalidation** after submissions
- **Responsive design** with Tailwind CSS

### Backend Architecture
- **RESTful API** design principles
- **Input validation** middleware (`backend/src/services/validation.service.js`)
- **Error handling** with proper HTTP status codes
- **CORS configuration** for cross-origin requests
- **Data persistence** with JSON file storage
- **Clean code structure** with separation of concerns

---

## 🐛 Known Issues

*No known issues at this time.*

---

## 📝 Assumptions

- Form schema is static and defined in the backend
- Submission IDs are generated server-side using unique identifiers
- Dates are stored in ISO 8601 format
- All submissions are persistently stored in a JSON file
- CSV export includes all submissions without pagination

---

## 🧪 Testing

### Running Tests

**Backend:**
```bash
cd backend
npm test
```

**Frontend:**
```bash
cd frontend
npm test
```

---

## 🚀 Bonus Features Implemented

- [x] CSV export functionality
- [x] Edit and delete submissions
- [x] Advanced search and filtering
- [x] Dark mode support
- [ ] Form builder UI for creating custom forms
- [x] Real-time validation

---

## 🔮 Future Enhancements

- [ ] Debouncing for search functionality
- [ ] Multi-step forms
- [ ] Form analytics and reporting
- [ ] File upload support
- [ ] Dynamic skill selection based on selected department (e.g., Engineering → Development, AI/ML, App Development)
- [ ] URL state synchronization for table filters

---

## 👨‍💻 Development

### Code Quality
- ESLint configured for code linting
- Prettier for code formatting
- TypeScript for type safety
- Component documentation with JSDoc


```


## 📧 Contact

**Resume**: <a href="https://drive.google.com/file/d/1ov5L11cxM2SkcXlStwXTVEC1sWlATVY9/view?usp=sharing" target="_blank">View Resume</a>


---
