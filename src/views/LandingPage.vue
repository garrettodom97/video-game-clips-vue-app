<template>
  <div class="landingPage">
    <p></p>
    <h1 class="welcome">Welcome to</h1>
    <h1 class="gradient-text">{{ name }}</h1>
    <h3>{{ description }}</h3>
    <form class="post-image-body" v-on:submit.prevent="login()">
      <h2>Login</h2>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div id="login-div" class="d-flex">
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
      description: "A video game clips blog site",
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
.post-image-body {
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  flex-direction: column;
}
.post-image-body * {
  flex: 1 1 auto;
  text-align: center;
  margin: 5px;
}
.flex-down {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}
.flex-down * {
  margin: 10px;
}

.welcome {
  margin: 0;
}

.gradient-text {
  font-size: 40px;
  background: -webkit-linear-gradient(left, #A82DE2, #E22DCC, #2DE2D2, #2DE29E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}
</style>
