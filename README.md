# 🎬 NOVA - Movie Discovery App

A modern, interactive movie discovery application that allows users to search, browse, and save their favorite movies. Built with vanilla JavaScript and integrated with The Movie Database (TMDB) API.

## ✨ Features

### 🔍 **Movie Discovery**
- Browse popular movies with real-time data from TMDB
- View top-rated recommendations
- Advanced movie search functionality
- Detailed movie information (title, year, rating, poster)

### 💾 **Personal Collection**
- Save movies to your personal collection
- Remove movies from saved list
- Persistent storage using localStorage
- Visual feedback with heart-shaped save buttons

### 👤 **User Management**
- Secure login system with credential validation
- User profile management
- Customizable notification settings
- Email preferences management

### 🎨 **Modern UI/UX**
- Clean, intuitive interface
- Smooth animations and transitions
- Toast notifications for user feedback
- Semi-transparent overlays for better visual appeal

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API**: The Movie Database (TMDB) API v3
- **Storage**: Browser localStorage for data persistence
- **Architecture**: Modular JavaScript with separation of concerns

## 📁 Project Structure

```
JS-Final-Project/
├── html/
│   ├── loginpage.html      # User authentication page
│   ├── mainpage.html       # Main movie discovery page
│   └── profile.html        # User profile management
├── js/
│   ├── movieAPI.js         # TMDB API service layer
│   ├── savedMovies.js      # Save/remove movie functionality
│   ├── main.js             # Core application logic
│   ├── login.js            # Authentication logic
│   └── profile.js          # Profile management
├── images/
│   └── loginsample.jpeg    # Login page background
├── styles.css              # Global application styles
└── README.md
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
1. **Browse Popular Movies**: Automatically loaded on the main page
2. **Search Movies**: Use the search bar at the top
3. **View Recommendations**: Scroll down to see top-rated movies

### 💝 **Managing Your Collection**
1. **Save Movies**: Click the "🤍 Save" button on any movie card
2. **View Saved Movies**: Click "Saved Movies" in the navigation
3. **Remove Movies**: Click the "❤️ Saved" button to remove from collection

### ⚙️ **Profile Management**
1. Click "Profile" in the navigation
2. Update email preferences
3. Toggle notification settings

## 🏗️ Architecture & Design Patterns

### **Modular Architecture**
- **Separation of Concerns**: Each JavaScript file handles specific functionality
- **API Service Layer**: Centralized TMDB API interactions
- **Event-Driven Design**: User interactions trigger appropriate handlers

### **Data Flow**
```
User Input → Event Handlers → API Service → DOM Updates → localStorage
```

### **State Management**
- Movie data: Fetched from TMDB API
- User preferences: Stored in localStorage
- Saved movies: Persisted in localStorage with timestamps

## 🌟 Key Features in Detail

### **Movie Search System**
- Real-time search with TMDB API
- Results replace popular movies for better visibility
- Error handling with user-friendly messages
- Automatic fallback to popular movies

### **Save System**
- LocalStorage-based persistence
- Duplicate prevention
- Visual state management (heart icons)
- Smooth removal animations

### **Responsive Design Elements**
- Semi-transparent overlays
- Hover effects and transitions
- Toast notification system
- Dynamic content loading

## 🔄 Future Enhancements

- [ ] Mobile-responsive design
- [ ] Movie details modal/page
- [ ] User ratings and reviews
- [ ] Movie categories and filters
- [ ] Watchlist vs Favorites separation
- [ ] Social sharing features

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
