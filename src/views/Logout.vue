<template>
  <div></div>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    this.logout();
  },
  methods: {
    logout: function () {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      localStorage.removeItem("user_id");
      this.$router.push("/");
    },
  },
};
</script>
