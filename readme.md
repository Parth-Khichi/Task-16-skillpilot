Blog Post Manager

A simple, responsive blog management application built using Python Flask, JavaScript, HTML, and CSS. It allows users to create and delete blog posts using REST API endpoints and AJAX requests without reloading the page.

Features
Create Blog Posts: Add new posts with a title and content.
Delete Blog Posts: Remove posts using their unique IDs.
REST API: Flask endpoints handle GET, POST, and DELETE requests.
AJAX Requests: JavaScript fetch() communicates with the backend asynchronously.
Dynamic DOM Updates: Changes appear without a page reload.
Error Handling: Displays success and error messages.
Responsive Design: CSS styling adapts to desktop and mobile screens.
Technologies Used
Frontend: HTML5, CSS3, JavaScript
Backend: Python, Flask
API: REST API
Communication: Fetch API (AJAX)
Data Storage: In-memory Python list
Project Structure
blog-app/
├── app.py
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── script.js
    └── style.css

Installation and Setup
1. Prerequisites

Install Python 3 and ensure that pip is available.

Check your Python installation:

python --version

2. Clone the Repository

If your project is hosted on GitHub:

git clone <your-repository-url>
cd blog-app


Alternatively, navigate to your existing project directory.

3. Create a Virtual Environment (Recommended)
python -m venv venv


Activate it on Windows:

venv\Scripts\activate


Activate it on macOS or Linux:

source venv/bin/activate

4. Install Flask
pip install flask

5. Run the Application
python app.py


Open the following URL in your browser:

http://127.0.0.1:5000

REST API Endpoints
HTTP Method	Endpoint	Description
GET	/api/posts	Retrieve all blog posts
POST	/api/posts	Create a new blog post
DELETE	/api/posts/<id>	Delete a blog post by ID
Create a Blog Post

Request:

POST /api/posts
Content-Type: application/json


Request body:

{
  "title": "My First Blog",
  "content": "This is my first blog post."
}


Success response: 201 Created

{
  "id": 1,
  "title": "My First Blog",
  "content": "This is my first blog post."
}

Retrieve Blog Posts

Request:

GET /api/posts


Returns a JSON array containing all blog posts.

Delete a Blog Post

Request:

DELETE /api/posts/1


Success response: 200 OK

{
  "message": "Post deleted successfully"
}


If the post does not exist, the API returns 404 Not Found.

How It Works
The user enters a title and content in the HTML form.
JavaScript intercepts the form submission.
The Fetch API sends a POST request to the Flask backend.
Flask validates the input and creates a new post.
JavaScript updates the displayed posts without reloading the page.
When the user clicks Delete, JavaScript sends a DELETE request containing the post ID.
Flask removes the matching post and returns a response.
The frontend updates the page and displays a success or error message.
Data Storage

This project currently stores blog posts in an in-memory Python list. All posts are lost when the Flask server restarts.

For persistent storage, the application can be extended to use SQLite, PostgreSQL, or another database.

Future Improvements
Add database integration for persistent storage.
Implement editing and updating of blog posts.
Add user registration and authentication.
Improve input validation and security.
Add pagination and search functionality.
Deploy the application to a production server.
Development Notes

Run Flask's built-in development server only for local development. Before deploying the application, configure a production WSGI server, appropriate security protections, and persistent data storage.

License

This project is available for educational and personal use. Add a formal license file if you intend to distribute it publicly.