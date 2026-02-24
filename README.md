# Nova Dance Authentication System

A modern, responsive authentication system built with Node.js, Express, and JWT for Google Cloud Platform deployment.

## Features

- **User Registration**: Secure sign-up with email validation and password strength checking
- **User Login**: JWT-based authentication with remember me functionality
- **Password Security**: bcrypt hashing with salt rounds
- **Modern UI**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Client-side Validation**: Real-time form validation and feedback
- **Dashboard**: Sample dashboard showing authenticated user experience
- **Admin Panel**: Complete product management system for administrators
- **Product Management**: Create, edit, delete, and view products with images
- **Customer View**: Popup modal for product details and purchase

## Tech Stack

**Backend:**
- Node.js
- Express.js
- bcrypt (password hashing)
- jsonwebtoken (JWT authentication)
- CORS (Cross-Origin Resource Sharing)

**Frontend:**
- HTML5
- CSS3 (Modern gradients and animations)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter font family)

**Deployment:**
- Google App Engine (Standard Environment)
- Node.js 18 runtime

## Local Development

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NovaDance
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon (requires dev dependencies)

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/profile` - Get user profile (protected)
- `GET /api/health` - Health check endpoint

### Request/Response Examples

**Sign Up:**
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Sign In:**
```json
POST /api/auth/signin
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Sign in successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Google Cloud Platform Deployment

### Prerequisites

1. Google Cloud account
2. Google Cloud SDK installed
3. Project created in Google Cloud Console

### Deployment Steps

1. **Initialize your GCP project:**
```bash
gcloud init
```

2. **Set your project ID:**
```bash
gcloud config set project YOUR_PROJECT_ID
```

3. **Deploy to App Engine:**
```bash
gcloud app deploy
```

4. **View your deployed application:**
```bash
gcloud app browse
```

### Environment Variables

For production deployment, set the JWT secret:

```bash
gcloud app deploy --set-env-vars JWT_SECRET="your-very-secure-secret-key"
```

### App Engine Configuration

The `app.yaml` file configures:
- Node.js 18 runtime
- Automatic scaling (0-10 instances)
- Static file serving
- Health checks
- Resource limits

## Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Client and server-side validation
- **CORS Protection**: Configured for secure cross-origin requests
- **HTTPS**: Automatic HTTPS in production (App Engine)

## Project Structure

```
NovaDance/
├── index.html          # Main authentication page
├── dashboard.html      # User dashboard with admin access
├── admin.html          # Admin panel for product management
├── styles.css          # CSS styling
├── script.js           # Client-side JavaScript
├── server.js           # Express server
├── package.json        # Dependencies and scripts
├── app.yaml           # GCP App Engine configuration
└── README.md          # This file
```

## Admin Features

### Product Management
- **Create Products**: Add new products with title, price, description, and images
- **Edit Products**: Update existing product information and images
- **Delete Products**: Remove products from the catalog
- **View Products**: Preview products in a customer-facing modal

### Admin Interface
- **Product Grid**: Visual grid layout showing all products
- **Image Upload**: Drag-and-drop image upload with preview
- **Form Validation**: Real-time validation for all product fields
- **Local Storage**: Products stored in browser localStorage (demo version)

### Customer View Modal
- **Product Display**: Full-screen product view with image
- **Price Information**: Clear pricing display
- **Add to Cart**: Customer purchase functionality
- **Success Feedback**: Confirmation messages for purchases

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure Node.js version is compatible
4. Check GCP project configuration for deployment issues

## Notes

- This is a basic authentication system for demonstration purposes
- In production, consider using a database (MongoDB, PostgreSQL, etc.)
- Add rate limiting and additional security measures
- Implement password reset functionality
- Add email verification for user registration
- Consider using environment variables for all configuration