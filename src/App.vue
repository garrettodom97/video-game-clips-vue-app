<template>
  <div id="app">
    <div class="header">
      <!-- Header -->
      <header id="header">
        <h1><a href="/">Be Cool! Be Gamer!</a></h1>
        <nav class="links">
          <ul>
            <li><a href="/">Login</a></li>
            <li><a href="/home">Posts</a></li>
          </ul>
        </nav>
        <nav class="main">
          <ul>
            <li class="menu">
              <a class="fa-bars" href="#menu">Menu</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <!-- Menu -->
    <div class="menu">
      <section id="menu">
        <!-- Actions -->
        <section>
          <ul class="actions stacked">
            <li v-if="isLoggedIn()">
              <a v-on:click="getUserID()" class="button large fit">My Account</a>
            </li>
            <li v-if="!isLoggedIn()"><a href="#" class="button large fit">Logout</a></li>
          </ul>
        </section>
      </section>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      user_id: "",
    };
  },
  methods: {
    getUserID: function () {
      this.user_id = localStorage.getItem("user_id");
      this.$router.push("/users/" + this.user_id);
      this.$router.go();
    },
    isLoggedIn: function () {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
