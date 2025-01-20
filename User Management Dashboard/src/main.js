import './style.css';

/**
 * UserManagement class handles all user-related operations and UI management
 * for the application.
 */
class UserManagement {
  /**
   * Initializes the UserManagement instance with empty users array,
   * sets up the base URL for API calls, and starts the application.
   */
  constructor() {
    this.users = [];
    this.currentUserId = null;
    this.baseUrl = 'https://jsonplaceholder.typicode.com/users';
    this.initializeApp();
  }

  /**
   * Initializes the application by setting up the container,
   * rendering the initial UI, fetching users, and setting up event listeners.
   */
  initializeApp() {
    this.container = document.querySelector('#app');
    this.renderApp();
    this.fetchUsers();
    this.setupEventListeners();
  }

  /**
   * Renders the main application UI including the user form and table.
   * Creates the basic structure of the application interface.
   */
  renderApp() {
    this.container.innerHTML = `
      <div class="container">
        <h1>User Management System</h1>
        <button id="addUserBtn" class="btn btn-primary">Add New User</button>
        
        <div id="errorMessage" class="error-message"></div>
        <div id="successMessage" class="success-message"></div>
        
        <form id="userForm" class="user-form">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" required>
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label for="department">Department</label>
            <input type="text" id="department" required>
          </div>
          <button type="submit" class="btn btn-primary">Save User</button>
          <button type="button" class="btn btn-secondary" id="cancelBtn">Cancel</button>
        </form>

        <table class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="userTableBody"></tbody>
        </table>
      </div>
    `;
  }

  /**
   * Sets up event listeners for the Add User button, form submission,
   * and cancel button to handle user interactions.
   */
  setupEventListeners() {
    const addUserBtn = document.getElementById('addUserBtn');
    const userForm = document.getElementById('userForm');
    const cancelBtn = document.getElementById('cancelBtn');

    addUserBtn.addEventListener('click', () => this.showUserForm());
    userForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
    cancelBtn.addEventListener('click', () => this.hideUserForm());
  }

  /**
   * Fetches users from the API and updates the UI.
   * Handles errors if the API request fails.
   */
  async fetchUsers() {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) throw new Error('Failed to fetch users');
      this.users = await response.json();
      this.renderUsers();
    } catch (error) {
      this.showError('Error fetching users: ' + error.message);
    }
  }

  /**
   * Renders the users table with the current list of users.
   * Displays user information and action buttons for each user.
   */
  renderUsers() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = this.users.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${user.name.split(' ')[0]}</td>
        <td>${user.name.split(' ')[1] || ''}</td>
        <td>${user.email}</td>
        <td>${user.company?.name || 'N/A'}</td>
        <td>
          <button class="btn btn-secondary" onclick="userManagement.editUser(${user.id})">Edit</button>
          <button class="btn btn-danger" onclick="userManagement.deleteUser(${user.id})">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  /**
   * Shows the user form for adding or editing a user.
   * If userId is provided, populates the form with user data for editing.
   * @param {number|null} userId - The ID of the user to edit, or null for adding new user
   */
  showUserForm(userId = null) {
    const form = document.getElementById('userForm');
    const user = this.users.find(u => u.id === userId);
    
    if (user) {
      const [firstName, ...lastNameParts] = user.name.split(' ');
      document.getElementById('firstName').value = firstName;
      document.getElementById('lastName').value = lastNameParts.join(' ');
      document.getElementById('email').value = user.email;
      document.getElementById('department').value = user.company?.name || '';
      this.currentUserId = userId;
    } else {
      form.reset();
      this.currentUserId = null;
    }
    
    form.classList.add('active');
  }

  /**
   * Hides the user form and resets its contents.
   * Clears the currentUserId to prepare for next operation.
   */
  hideUserForm() {
    const form = document.getElementById('userForm');
    form.classList.remove('active');
    form.reset();
    this.currentUserId = null;
  }

  /**
   * Handles form submission for both creating and updating users.
   * Collects form data and calls appropriate method based on currentUserId.
   * @param {Event} event - The form submission event
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
      name: `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`,
      email: document.getElementById('email').value,
      company: {
        name: document.getElementById('department').value
      }
    };

    try {
      if (this.currentUserId) {
        await this.updateUser(this.currentUserId, formData);
      } else {
        await this.createUser(formData);
      }
    } catch (error) {
      this.showError('Error saving user: ' + error.message);
    }
  }

  /**
   * Creates a new user by sending a POST request to the API.
   * Updates the UI and shows success message on completion.
   * @param {Object} userData - The user data to be created
   */
  async createUser(userData) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Failed to create user');
      
      const newUser = await response.json();
      this.users.push(newUser);
      this.renderUsers();
      this.hideUserForm();
      this.showSuccess('User created successfully');
    } catch (error) {
      this.showError('Error creating user: ' + error.message);
    }
  }

  /**
   * Updates an existing user by sending a PUT request to the API.
   * Updates the UI and shows success message on completion.
   * @param {number} userId - The ID of the user to update
   * @param {Object} userData - The updated user data
   */
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${this.baseUrl}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Failed to update user');
      
      const updatedUser = await response.json();
      this.users = this.users.map(user => 
        user.id === userId ? { ...user, ...updatedUser } : user
      );
      this.renderUsers();
      this.hideUserForm();
      this.showSuccess('User updated successfully');
    } catch (error) {
      this.showError('Error updating user: ' + error.message);
    }
  }

  /**
   * Deletes a user after confirmation by sending a DELETE request to the API.
   * Updates the UI and shows success message on completion.
   * @param {number} userId - The ID of the user to delete
   */
  async deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`${this.baseUrl}/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete user');
      
      this.users = this.users.filter(user => user.id !== userId);
      this.renderUsers();
      this.showSuccess('User deleted successfully');
    } catch (error) {
      this.showError('Error deleting user: ' + error.message);
    }
  }

  /**
   * Displays an error message to the user for 5 seconds.
   * @param {string} message - The error message to display
   */
  showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000);
  }

  /**
   * Displays a success message to the user for 5 seconds.
   * @param {string} message - The success message to display
   */
  showSuccess(message) {
    const successElement = document.getElementById('successMessage');
    successElement.textContent = message;
    successElement.style.display = 'block';
    setTimeout(() => {
      successElement.style.display = 'none';
    }, 5000);
  }

  /**
   * Initiates the edit process for a user by showing the form with user data.
   * @param {number} userId - The ID of the user to edit
   */
  editUser(userId) {
    this.showUserForm(userId);
  }
}

// Initialize the application
window.userManagement = new UserManagement();