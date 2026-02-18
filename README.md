# Personal Internet Archive

A full-stack application that allows users to save, organize, and manage webpages in a personal digital archive. Built with React, Node.js/Express, MongoDB, and a Chrome/Brave extension.

## 🎯 Features

- **Web Page Archiving**: Save complete webpages with screenshots and metadata
- **User Authentication**: Secure login with Google OAuth integration
- **Web Extension**: Browser extension for quick page saving
- **Dashboard**: View and search your archived pages
- **Page Details**: View detailed information about each archived page
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📁 Project Structure

```
personal-internet-archive/
├── backend/              # Node.js/Express API server
│   ├── src/
│   │   ├── config/       # Database and Passport configuration
│   │   ├── controllers/  # Route handlers
│   │   ├── middleware/   # Authentication middleware
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   └── index.js      # Main server file
│   └── package.json
├── frontend/             # React + Vite application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context (Auth)
│   │   ├── api/          # API client setup
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   └── package.json
└── extension/            # Browser extension
    ├── manifest.json     # Extension configuration
    ├── popup.html        # Popup UI
    ├── popup.js          # Popup logic
    ├── contentScript.js  # Content script
    └── background.js     # Background service worker
```

## 🛠 Tech Stack

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with Google OAuth 2.0
- **Security**: Helmet.js, CORS
- **Logging**: Morgan

### Frontend
- **Library**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Icons**: React Icons

### Extension
- **Platform**: Manifest V3 (Chrome/Brave)
- **Communication**: Message passing with backend API

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)
- Google OAuth credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-internet-archive
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CLIENT_URL=http://localhost:5173
   SESSION_SECRET=your_session_secret
   JWT_SECRET=your_jwt_secret
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Extension Setup**
   - Open Chrome/Brave browser
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `extension/` folder

### Running the Application

1. **Start the Backend**
   ```bash
   cd backend
   npm run dev
   # or
   nodemon src/index.js
   ```
   The API will be available at `http://localhost:5000`

2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

3. **Use the Extension**
   - Click the extension icon in your browser
   - Click "Save to Archive" to save the current page
   - View your archive in the dashboard

## 📚 API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/logout` - Logout user

### Pages
- `GET /api/pages` - Get all archived pages
- `POST /api/pages` - Create new archived page
- `GET /api/pages/:id` - Get page details
- `PUT /api/pages/:id` - Update page
- `DELETE /api/pages/:id` - Delete page

## 🎨 Pages

### Login
User authentication page with Google OAuth integration.

### Dashboard
Main page displaying all archived pages with:
- Search functionality
- Page preview
- Quick actions

### Page Details
Detailed view of an archived page including:
- Full content
- Screenshot
- Metadata (date saved, URL, etc.)
- Edit/Delete options

## 🔐 Security

- JWT-based authentication
- Google OAuth 2.0 integration
- CORS configuration
- Helmet.js for HTTP headers protection
- Secured API endpoints with authentication middleware

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```
Output will be in `frontend/dist/`

### Backend
Ensure environment variables are set for production and run:
```bash
cd backend
npm start
```

## 🐛 Troubleshooting

### Backend won't connect to MongoDB
- Verify MongoDB URI in `.env`
- Ensure MongoDB service is running
- Check network connectivity

### Frontend can't reach backend
- Verify backend is running on port 5000
- Check CORS configuration in backend
- Verify `CLIENT_URL` in backend `.env`

### Extension not loading
- Ensure manifest.json is valid
- Check that extension folder contains all required files
- Clear extension cache and reload

## 📝 Development Notes

- Frontend uses React Context API for authentication state
- Backend uses Mongoose models for database operations
- Extension communicates with backend via HTTP requests
- All sensitive data should be stored in `.env` files

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

ISC

## 👤 Author

Created as a personal project for web archiving.

---

For more information or support, please open an issue in the repository.
