<template>
  <div class="landingPage">
    <p></p>
    <h1>Welcome to</h1>
    <h1>{{ name }}</h1>
    <form class="d-flex justify-content-center" v-on:submit.prevent="login()">
      <h2>Login</h2>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div id="login-div">
        <label>Username:</label>
        <div class="d-flex justify-content-center">
          <input id="login" type="text" v-model="newSessionParams.username" />
        </div>
        <p></p>
      </div>
      <div id="login-div">
        <label>Password:</label>
        <input id="login" type="password" v-model="newSessionParams.password" />
      </div>
      <p></p>
      <input type="submit" value="Submit" />
    </form>
    <p>
      Don't have an account? Click
      <button v-on:click="signupModal()">here</button>
      to signup!
    </p>
    <dialog id="signup">
      <form method="dialog">
        <h1>Signup!</h1>
        <p>
          Username:
          <input type="text" v-model="newUserParams.username" />
        </p>
        <p>
          Password:
          <input type="password" v-model="newUserParams.password" />
        </p>
        <p>
          Password Confirmation:
          <input type="password" v-model="newUserParams.password_confirmation" />
        </p>
        <button>Close</button>
        <button v-on:click="signup()">Create Account</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      name: "Be Cool! Be Gamer!",
      newSessionParams: {},
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    login: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          console.log(response.data);
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password"];
        });
    },
    signupModal: function () {
      console.log("Signing Up");
      document.querySelector("#signup").showModal();
    },
    signup: function () {
      axios.post("/users", this.newUserParams).then((response) => {
        console.log(response.data);
      });
    },
  },
};
</script>

<style>
#login {
  width: 100%;
  text-align: center;
}
#login-div {
  text-align: center;
  width: 30%;
  justify-content: center;
}
</style>
