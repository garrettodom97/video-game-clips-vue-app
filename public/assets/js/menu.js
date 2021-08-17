function getUserId() {
  this.user_id = localStorage.getItem("user_id");
  this.$router.push("/users/" + this.user_id);
  this.$router.go();
}
function isLoggedIn() {
  if (localStorage.getItem("jwt")) {
    return true;
  } else {
    return false;
  }
}
