Project Name: Angular2024

Overview
Angular2024 is a web application designed for managing and displaying information about a wedding event. It allows users to view event details, register for the event, and interact through comments.

Features
- Public Access: Users can view event details without needing to log in.
- User Authentication: Secure login and registration system for guests.
- User Dashboard: Authenticated users can add and manage their own events.
- Interactive Comments: Users can comment on events and edit or delete their own comments.
- Responsive Design: The site is fully responsive and accessible on both mobile and desktop devices.

Technologies Used
- Angular 16: Utilized for the frontend framework to build a single-page application.
- Firebase: Used for authentication, database (Firestore), and hosting.
- Bootstrap: Provides styling and responsive design through its extensive component library.

Project Structure
src
/app
/components
- nav.component
- header.component
- login.component
- register.component
- dashboard.component
- event-details.component
/services
- auth.service
- user.service
- event.service
/models
- user.model.ts
- event.model.ts
- comment.model.ts
/environments
- environment.ts
- environment.prod.ts
index.html
main.ts
styles.css

Setup and Installation
1. Clone the repository: git clone https://github.com/yourgithub/angular2024.git
2. Navigate into the project directory: cd angular2024
3. Install dependencies: npm install
4. Run the application: ng serve | npm start

Open your browser and go to `http://localhost:4200/`.

Usage
After launching the web application, users can register an account to access personalized features such as adding events and commenting. All users can view public event details.

Contributing
Contributions are welcome! Please fork the repository and submit pull requests to the main branch. For substantial changes, please open an issue first to discuss what you would like to change.

License
[MIT](https://choosealicense.com/licenses/mit/)
