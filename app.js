const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

const SECRET_KEY = "your_secret_key"; // Replace with a strong secret key

// Mock user data (you would usually store and retrieve users from a database)
const users = [
  {
    id: 1,
    username: 'testuser',
    password: bcrypt.hashSync('password123', 8), // Hashed password
  }
];

// Route for user login (authentication)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check if password is valid
  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Generate a JWT token valid for 1 hour
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

  // Send token to client
  res.json({ token });
});

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(403); // Forbidden if no token

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token invalid
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  });
}

// Protected route (only accessible to authenticated users)
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted to protected resource', user: req.user });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
