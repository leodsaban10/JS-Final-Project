# 🎬 NOVA - Movie Discovery App

A modern, interactive movie discovery application that allows users to search, browse, and save their favorite movies. Built with vanilla JavaScript and integrated with The Movie Database (TMDB) API.

## ✨ Features

### 🔍 **Movie Discovery**
- Browse popular movies with real-time data from TMDB
- View top-rated movie recommendations
- Advanced movie search functionality with real-time results
- Detailed movie information (title, year, rating, poster)
- Professional carousel displays with Swiper.js integration

### 💾 **Personal Collection**
- Save movies to your personal collection with instant feedback
- Dedicated saved movies page with grid layout
- Remove movies from saved list with confirmation dialogs
- Persistent storage using localStorage with timestamps
- Visual feedback with heart-shaped save/remove buttons

### 👤 **User Management**
- Secure login system with credential validation
- User profile management with customizable settings
- Email preferences and notification controls
- Session management across pages

### 🎨 **Modern UI/UX**
- **Fully responsive design** - Mobile-first approach with 4 breakpoints
- **Interactive carousels** - Swiper.js integration with touch gestures
- **Smooth animations** - Hover effects, transitions, and loading states
- **Toast notifications** - Real-time user feedback system
- **Mobile hamburger menu** - Collapsible navigation for mobile devices
- **Professional styling** - Semi-transparent overlays and modern card designs

### 🌐 **Multi-Page Application**
- **Login Page** - User authentication with form validation
- **Main Page** - Movie discovery with search and browsing
- **Saved Movies Page** - Dedicated collection management
- **Profile Page** - User settings and preferences

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API**: The Movie Database (TMDB) API v3 with real-time data
- **Storage**: Browser localStorage for data persistence and user preferences
- **External Libraries**: Swiper.js v11 for professional carousel functionality
- **Architecture**: Modular JavaScript with separation of concerns
- **Responsive Design**: Mobile-first CSS with 4 breakpoint system
- **Version Control**: Git repository with organized commit history

## 📁 Project Structure

```
JS-Final-Project/
├── html/
│   ├── loginpage.html      # User authentication page
│   ├── mainpage.html       # Main movie discovery page with carousels
│   ├── profile.html        # User profile management
│   └── savedMovies.html    # Dedicated saved movies collection page
├── js/
│   ├── movieAPI.js         # TMDB API service layer with error handling
│   ├── savedMovies.js      # Save/remove movie functionality & page logic
│   ├── main.js             # Core application logic & Swiper integration
│   ├── login.js            # Authentication logic and form validation
│   └── profile.js          # Profile management and settings
├── images/
│   └── loginsample.jpeg    # Login page background image
├── styles.css              # Global responsive styles with mobile-first design
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls
- Local web server (for CORS compliance)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/leodsaban10/JS-Final-Project.git
   cd JS-Final-Project
   ```

2. **Start a local web server**
   
   **Option A: Using Python**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option B: Using Node.js**
   ```bash
   npx http-server
   ```
   
   **Option C: Using VS Code Live Server**
   - Install Live Server extension
   - Right-click on `html/loginpage.html`
   - Select "Open with Live Server"

3. **Access the application**
   - Open your browser and navigate to `http://localhost:8000/html/loginpage.html`

### API Configuration
The app uses TMDB API with a pre-configured API key. For production use, you should:
1. Get your own API key from [TMDB](https://www.themoviedb.org/settings/api)
2. Replace the API key in `js/movieAPI.js`

## 📖 Usage Guide

### 🔐 **Login**
1. Navigate to the login page
2. Enter any username and password (demo credentials work)
3. Click "Login" to access the main application

### 🎬 **Discovering Movies**
1. **Browse Popular Movies**: Automatically loaded in responsive Swiper carousels
2. **Search Movies**: Use the search functionality to find specific titles
3. **View Recommendations**: Browse top-rated movies in dedicated carousel
4. **Interactive Navigation**: Use carousel arrows, pagination dots, or touch gestures

### 💝 **Managing Your Collection**
1. **Save Movies**: Click the "🤍 Save" button on any movie card
2. **View Saved Movies**: Click "Saved Movies" in navigation to visit dedicated page
3. **Remove Movies**: Click the "🗑️ Remove" button on saved movies page
4. **Collection Management**: Automatic grid layout with responsive design

### ⚙️ **Profile Management**
1. Click "Profile" in the navigation menu
2. Update email preferences and notification settings
3. Customize your user experience
4. Manage account information

## 🏗️ Architecture & Design Patterns

### **Modular Architecture**
- **Separation of Concerns**: Each JavaScript file handles specific functionality
- **API Service Layer**: Centralized TMDB API interactions with error handling
- **Event-Driven Design**: User interactions trigger appropriate handlers
- **Component-Based Structure**: Reusable movie card components

### **Data Flow**
```
User Input → Event Handlers → API Service → DOM Updates → localStorage
```

### **State Management**
- Movie data: Fetched from TMDB API with caching
- User preferences: Stored in localStorage with validation
- Saved movies: Persisted in localStorage with timestamps
- UI state: Managed through DOM manipulation and CSS classes

### **Responsive Design Implementation**
- **Mobile-First CSS**: 4 breakpoints (480px, 481px, 769px, 1200px)
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive designs
- **Touch-Friendly**: Swiper.js integration for mobile gestures
- **Progressive Enhancement**: Works on all device sizes

## 🌟 Key Features in Detail

### **Advanced Movie Search System**
- Real-time search with TMDB API integration
- Results replace popular movies section for better visibility
- Comprehensive error handling with user-friendly messages
- Automatic fallback to popular movies on search completion

### **Professional Carousel System**
- **Swiper.js v11 Integration**: Industry-standard carousel library
- **Touch Gestures**: Swipe support for mobile devices
- **Navigation Controls**: Arrow buttons and pagination dots
- **Responsive Breakpoints**: Optimized spacing for all screen sizes
- **Auto-sizing**: Dynamic slide width based on content

### **Intelligent Save System**
- **Dedicated Saved Movies Page**: Separate page for collection management
- **Grid Layout**: Responsive CSS Grid for optimal movie display
- **LocalStorage Persistence**: Data survives browser sessions
- **Duplicate Prevention**: Smart checking to avoid duplicate saves
- **Visual State Management**: Heart icons and color-coded buttons
- **Smooth Animations**: Fade-out effects for removal operations

### **Mobile-First Responsive Design**
- **Hamburger Menu**: Collapsible navigation for mobile devices
- **4-Breakpoint System**: Optimized for mobile, tablet, desktop, and large screens
- **Touch-Friendly Controls**: Properly sized buttons and interactive elements
- **Flexible Layouts**: CSS Grid and Flexbox for adaptive designs
- **Performance Optimized**: Efficient CSS and JavaScript for mobile devices

## 🔄 Future Enhancements

- [ ] Movie details modal with trailers and cast information
- [ ] User ratings and reviews system
- [ ] Movie categories and advanced filtering
- [ ] Watchlist vs Favorites separation
- [ ] Social sharing features and user recommendations
- [ ] Offline mode with cached movie data
- [ ] Dark/Light theme toggle
- [ ] Advanced search filters (genre, year, rating)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- Design inspiration from modern streaming platforms
- Icons and visual elements from various open-source resources

---

**Created by Leo Saban** | [GitHub](https://github.com/leodsaban10) | Final JavaScript Project
