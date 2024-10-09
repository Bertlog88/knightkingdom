const game = {
     player:null,

     initGame:function() {
         this.loadUserData();
         this.setupEventListeners();
         this.updateUI();
     },

     loadUserData:function() {
         const userData = localStorage.getItem('currentUser');
         if (userData) {
             this.player = JSON.parse(userData);
             document.getElementById('signup-form').style.display = 'none';
             document.getElementById('logout-btn').style.display = 'inline-block';
         } else {
             document.getElementById('signup-form').style.display = 'block';
             document.getElementById('logout-btn').style.display = 'none';
         }
     },

     setupEventListeners:function() {
         document.getElementById('signup-button').addEventListener('click', this.signUp.bind(this));
         document.getElementById('logout-btn').addEventListener('click', this.logout.bind(this));

         // Main menu navigation
         document.getElementById('profile-link').addEventListener('click', this.showProfile.bind(this));
         document.getElementById('inventory-link').addEventListener('click', this.showInventory.bind(this));
         document.getElementById('factions-link').addEventListener('click', this.showFactions.bind(this));
         document.getElementById('market-link').addEventListener('click', this.showMarket.bind(this));
         document.getElementById('messages-link').addEventListener('click', this.showMessages.bind(this));
         document.getElementById('leaderboard-link').addEventListener('click', this.showLeaderboard.bind(this));

         // Secondary features
         document.getElementById('property-btn').addEventListener('click', this.showProperty.bind(this));
         document.getElementById('marriage-btn').addEventListener('click', this.showMarriage.bind(this));
         document.getElementById('crime-btn').addEventListener('click', this.showCrime.bind(this));
         document.getElementById('missions-btn').addEventListener('click', this.showMissions.bind(this));
     },

     updateUI:function() {
         const headerUsername = document.getElementById('header-username');
         const headerGold = document.getElementById('header-gold'); // Reference to gold display
         
         if (this.player) {
             headerUsername.textContent = this.player.username;
             headerGold.textContent = `Gold: ${this.player.gold}`; // Update gold display
         } else {
             headerUsername.textContent = 'Guest';
             headerGold.textContent = 'Gold: 0'; // Reset gold display for guest
         }
     },

     signUp:function() {
         const username = document.getElementById('signup-username').value;
         const password = document.getElementById('signup-password').value;
         const email = document.getElementById('signup-email').value;

         if (!username || !password || !email) {
             alert('Please fill in all fields');
             return;
         }

         this.player = {
             username,
             email,
             level: 1,
             xp: 0,
             gold: 100,
             rank:'Squire',
             age:'18',
             property:null,
             maritalStatus:null,
             faction:null
         };

         localStorage.setItem('currentUser', JSON.stringify(this.player));
         this.updateUI();
         document.getElementById('signup-form').style.display = 'none';
         document.getElementById('logout-btn').style.display = 'inline-block';
         this.showProfile();
     },

     logout:function() {
          localStorage.removeItem("currentUser");
          this.player = null;

          this.updateUI();
          document.getElementById("signup-form").style.display = "block";
          document.getElementById("logout-btn").style.display = "none";
          document.getElementById("game-content").innerHTML = "";
      },

      showProfile:function() { // Show user profile function
          if (!this.player) { // Check if user is logged in
              alert("Please log in to view your profile");
              return;}
          
          const content = document.getElementById("game-content");
          content.innerHTML = `
              <
              div id='profile-container'>
                  <
                  div id='profile-header'>
                      <
                      div id='profile-picture-container'>
                          <
                          img src='default-avatar.png' alt='Profile Picture' id='profile-picture'>
                          <
                          input type='file' accept='image/*' style='display:none;'id='profile-picture-upload'>
                          <
                          button type='button' onclick='changePicture()' > Change Picture </ button >
                      </ div >
                      <
                      div id='profile-info'>
                          <
                          h2>${this.player.username}</h2 >
                          <
                          p > Level:${this.player.level}</p >
                          <
                          p > Rank:${this.player.rank}</p >
                          <
                          p > Age:${this.player.age}</p >
                          <
                          p > Gold:${this.player.gold}</p >
                          <
                          p > Property:${this.player.property || "None"}</p >
                          <
                          p > Marital Status:${this.player.maritalStatus || "Single"}</p >
                          <
                          p > Faction:${this.player.faction || "None"}</p >
                      </ div >
                  </ div >

                  <!-- Profile Actions -->
                  <
                  div class='profile-actions'>
                      <!-- Add Friend Button -->
                      <
                      button class='action-button' > Add Friend </ button >

                      <!-- Add Rival Button -->
                      <
                      button class='action-button'>Add Rival </ button >

                      <!-- Send Message Button -->
                      <
                      button class='action-button'>Send Message </ button >

                      <!-- View Stats Button -->
                      <
                      button class='action-button'>View Stats </ button >

                  </ div >

              </ div >
          `;

          // Set up profile picture upload functionality
          function changePicture() { // Change picture function
              const uploadInput =
                  document.getElementById("profile-picture-upload"); // Get upload input

              uploadInput.click(); // Click on it

              uploadInput.addEventListener("change", function (event) { // Event listener for change
                  const file =
                      event.target.files[0]; // Get file from input

                  if (file) { // If file is present
                      const reader =
                          new FileReader(); // Create new file reader
                      
                      reader.onload =
                          function (e) { // On load of reader
                              const profilePicture =
                                  document.getElementById("profile-picture"); // Get profile picture element

                              profilePicture.src =
                                  e.target.result; // Set profile picture source to uploaded image
                              // Here you would typically upload the image to your server
                          };
                      
                      reader.readAsDataURL(file); // Read file as data URL
                  }
              });
          }
      },

      showInventory:function() { // Show inventory function
          document.getElementById("game-content").innerHTML =
              "<h2>Inventory</h2><p>Your inventory items will be displayed here.</p>";
      },

      showProperty:function() { // Show property function
          if (!this.player) { // Check if user is logged in
              alert("Please log in to view properties");
              return;}
          
          const content =
              document.getElementById("game-content"); // Get game content area

          content.innerHTML =
              `
          <
          h2 > Property </ h2 >
          <
          p > Your current gold:${this.player.gold} </ p >
          <
          p > Your current property:${
              this.player.property || "None"
          }</ p >
          <
          h3 > Available Properties:</ h3 >

          <!-- Property List -->
          <
          ul>

              <!-- Humble Cottage Property -->
              <
              li >< strong > Humble Cottage </ strong > - Cost:
                  1000 gold<button onclick='game.buyProperty("Humble Cottage",1000)'>Buy</button></ li >

              <!-- Town House Property -->
              <
              li >< strong > Town House </ strong > - Cost:
                  5000 gold<button onclick='game.buyProperty("Town House",5000)'>Buy</button></ li >

              <!-- Noble Manor Property -->
              <
              li >< strong > Noble Manor </ strong > - Cost:
                  20000 gold<button onclick='game.buyProperty("Noble Manor",20000)'>Buy</button></ li >

          </ ul>`;
      },

      buyProperty:function(propertyName,cost) { // Buy property function
          if (this.player.gold >= cost) { // Check if player has enough gold
              this.player.gold -= cost;

              this.player.property =
                  propertyName;

              localStorage.setItem(
                  "currentUser",
                  JSON.stringify(this.player)
              );

              alert(`Congratulations! You now own a ${propertyName}`);

              this.updateUI();

              this.showProperty(); // Show updated property list
          } else {
              alert("Not enough gold to purchase this property");
          }
      },

      showMarriage:function() { // Show marriage function
           if (!this.player) { // Check if user is logged in
               alert("Please log in to view marriage options");
               return;}
           
           const content =
               document.getElementById("game-content"); 

           content.innerHTML =
               `
           <
           h2 > Marriage </ h2 >
           <
           p > Your current status:${
               this.player.maritalStatus || "Single"
           }</ p >
           <
           h3 > Available Suitors:</ h3 >
           <
           ul >
               <
               li >
                   <
                   strong > Lady Guinevere </ strong >
                   <
                   button onclick='game.propose("Lady Guinevere")' > Propose </ button >
               </ li >

               <
               li >
                   <
                   strong > Sir Lancelot </ strong >
                   <
                   button onclick='game.propose("Sir Lancelot")' > Propose </ button >
               </ li >

           </ ul >
           `;
       },

       propose:function(suitorName) { // Propose marriage function
           if (this.player.maritalStatus) { // Check if already married
               alert("You are already married!");
           } else {
               this.player.maritalStatus =
                   `Married to ${suitorName}`;

               localStorage.setItem(
                   "currentUser",
                   JSON.stringify(this.player)
               );

               alert(`Congratulations! You are now married to ${suitorName}`);
               this.updateUI();
           }
       },

       showCrime:function() { // Show crime options function
           if (!this.player) { // Check if user is logged in
               alert("Please log in to view crime options");
               return;}
           
           const content =
               document
