<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!isLoggedIn()" to="/">Login | </router-link>
      <router-link to="/home">Home | </router-link>
      <router-link v-if="isLoggedIn()" to="/logout">Logout | </router-link>
      <button v-if="isLoggedIn()" v-on:click="getUserID()">My Account</button>
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
