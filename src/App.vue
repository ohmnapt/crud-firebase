<template>
  <div>
    <div id="app">
      <!--Navbarr -->
      <nav class="navbar fixed-top navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="/"><img src="./assets/rentLogo.svg" width="40" height="40"
            style="margin-top: -10px" alt="egci427 logo" /></a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Rent Official</a>
            </li>
          </ul>
        </div>

        <!--Logout Button on Navbar -->
        <div class="btn-group" role="group" aria-label="Basic example">
          <button class="btn btn-danger" @click="logout"><span class="fas fa-sign-out-alt"></span>
            Logout</button>
          &nbsp;&nbsp;
          <!--Signin Button on Navbar -->
          <router-link to="/signin">
            <button class="btn btn-outline-light my-2 my-sm-0" type="submit"><span class="fas fa-user"></span></button>
          </router-link>
        </div>
      </nav>
      <router-view />

    </div>
  </div>
</template>



<script>
  import firebase from 'firebase'
  export default {
    name: "App",

    methods: {
      //logout button
      logout() {
        console.log('logout')
        firebase.auth().signOut()
          .then(() => {
            console.log("Logout")
            this.$router.replace('/signin')
          })
          .catch((error) => {
            alert(error.message)
          })
      }

    },

  };
</script>


<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: orangered;
    margin-top: 0px;
  }

  .navbar-light .navbar-nav .nav-link {
    color: white;
  }

  .bg-light {
    background-color: black !important;
  }

  .navbar {
    margin-bottom: 40px;
    background-color: #444CF7;
    box-shadow: 0 0px 8px 0 rgba(51, 51, 51, 0.2), 0 0px 20px 0 rgba(73, 73, 73, 0.19);
  }
</style>