const game = {
    // ... existing game object code ...

    users: [], // Array to store user accounts

    signUp: function(username, password, email) {
        // Check if username already exists
        if (this.users.some(user => user.username === username)) {
            alert('Username already taken. Choose another.');
            return false;
        }

        // Check password length
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return false;
        }

        // Create new user object
        const newUser = {
            username: username,
            password: password, // In a real app, never store passwords in plain text
            email: email,
            level: 1,
            xp: 0,
            xpToNextLevel: 100,
            gold: 50,
            rank: 'Squire'
        };

        // Add user to users array
        this.users.push(newUser);

        // Set current player to new user
        this.player = newUser;

        // Update UI
        this.updateUI();

        alert('Account created successfully! Welcome, ' + username + '!');
        return true;
    }
};

// Event listener for sign-up button
document.getElementById('signup-button').addEventListener('click', function() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const email = document.getElementById('signup-email').value;

    if (game.signUp(username, password, email)) {
        // Hide signup form and show game interface
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('player-info').style.display = 'block';
    }
});
updateUI: function() {
    if (this.player) {
        document.getElementById('player-name').textContent = this.player.username;
        document.getElementById('player-rank').textContent = this.player.rank;
        document.getElementById('player-level').textContent = this.player.level;
        document.getElementById('player-xp').textContent = ${this.player.xp} / ${this.player.xpToNextLevel};
        document.getElementById('player-gold').textContent = this.player.gold;
    }
