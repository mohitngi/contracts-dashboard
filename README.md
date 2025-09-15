# ContractHub - SaaS Contracts Management Dashboard

A modern, responsive React application for managing and analyzing contracts with AI-powered insights, built as part of a UI/UX Developer assignment.

## 🚀 Live Demo

[View Live Demo](https://contractsdashboard.vercel.app) _(Replace with actual deployment URL)_

## 📋 Features

### Authentication
- Mock authentication system (use any username with password: `test123`)
- JWT token simulation with localStorage persistence
- Protected routes with automatic redirect

### Contracts Dashboard
- **Sidebar Navigation**: Contracts, Insights, Reports, Settings
- **Contract Table** with columns: Name, Parties, Expiry Date, Status, Risk Score
- **Advanced Filtering**: Status (Active, Expired, Renewal Due) and Risk Level (Low, Medium, High)
- **Search Functionality**: Search by contract name or parties
- **Pagination**: 10 contracts per page with navigation controls
- **State Management**: Loading states, empty states, and error handling

### Contract Details
- Complete contract metadata display
- **Clauses Analysis**: AI-extracted clauses with confidence scores
- **Risk Insights**: AI-powered risk assessment with severity indicators
- **Evidence Panel**: Side drawer with document snippets and relevance scores
- Interactive clause exploration with expandable details

### File Upload
- Modal-based upload interface
- Drag & drop file upload simulation
- Upload progress tracking with status indicators
- Support for multiple file formats (PDF, DOC, DOCX)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern functional components with hooks
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling (no Bootstrap or inline CSS)
- **React Router** - Client-side routing and navigation

### State Management
- **React Context API** - Global state management
- Separate contexts for authentication and application state
- Persistent localStorage integration

### Development Tools
- **Vite** - Fast development server and build tool
- **ESLint** - Code linting and quality enforcement
- **PostCSS** - CSS processing with Tailwind

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm (or yarn/pnpm)
- Modern web browser

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/contractai-dashboard.git
   cd contractai-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview  # Preview the build locally
```

## 🔑 Demo Credentials

- **Username**: Any username (e.g., "admin", "john", "demo")
- **Password**: `test123`

## 🎨 Design Decisions

### UI/UX Approach
- **Clean, Modern Design**: Professional dashboard aesthetic suitable for enterprise users
- **Responsive First**: Mobile-first approach with breakpoints for tablet and desktop
- **Color System**: Consistent color palette with semantic meaning (red for high risk, green for active, amber for warnings)
- **Typography**: Clear hierarchy with readable font sizes and proper spacing
- **Micro-interactions**: Smooth hover states and transitions for enhanced user experience

### Technical Choices

#### State Management - React Context API
- **Why Context over Redux**: For this scope, Context API provides sufficient state management without the boilerplate of Redux
- **Separation of Concerns**: Separate contexts for auth and app state to avoid unnecessary re-renders
- **Local Storage Integration**: Seamless persistence of authentication state

#### Styling - Tailwind CSS
- **Utility-First Approach**: Rapid development with consistent design system
- **Responsive Design**: Built-in responsive utilities for all screen sizes
- **Component Composition**: Easy to maintain and scale styling patterns

#### Routing - React Router
- **Client-Side Navigation**: Smooth SPA experience without page refreshes
- **Protected Routes**: Authentication-based route access control
- **URL-Based State**: Shareable URLs for contract details and navigation state

### Mock Data Strategy
- **Local JSON Files**: Simulating real API responses with realistic contract data
- **Error Simulation**: Built-in error states and loading simulations
- **Progressive Enhancement**: Easy to replace with real API calls

## 🔧 API Integration

The application uses mock JSON files to simulate API responses:

- **Contracts List**: `/public/contracts.json`
- **Contract Details**: `/public/contract-details.json`

### API Endpoints (Simulated)
```typescript
GET /contracts          // List all contracts with basic info
GET /contracts/:id      // Detailed contract analysis
POST /upload           // File upload (mocked)
POST /auth/login       // Authentication (mocked)
```

## 📱 Responsive Design

- **Mobile** (< 768px): Collapsible sidebar, optimized touch targets
- **Tablet** (768px - 1024px): Balanced layout with accessible navigation
- **Desktop** (> 1024px): Full sidebar navigation with optimal content width

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically on every push

### Netlify Alternative
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Configure redirects for SPA routing

## 🔮 Future Enhancements

- Real backend API integration
- Advanced contract analytics and reporting
- Document preview functionality
- Team collaboration features
- Advanced search with AI-powered querying
- Contract comparison tools
- Automated renewal notifications
- Integration with document management systems

## 🧪 Testing Strategy

- Component unit testing with React Testing Library
- Integration testing for user workflows
- E2E testing with Playwright or Cypress
- Performance testing and optimization

## 📝 Assumptions Made

1. **Mock Authentication**: Real authentication would integrate with enterprise SSO
2. **File Upload**: Actual implementation would require backend file processing
3. **AI Analysis**: Contract analysis would be powered by real NLP/ML services
4. **Data Persistence**: Production app would use database for contract storage
5. **User Management**: Multi-tenant architecture with role-based access control
6. **Contract Parsing**: Real document parsing would extract structured data from PDFs

---

**Note**: This is a demonstration project showcasing modern React development practices and professional UI/UX design for SaaS applications.