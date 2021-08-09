<template>
  <div>
    <h1>{{ user.username }}'s Page</h1>
    <div v-for="post in posts" :key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
      </router-link>
      <h3>{{ post.user }}</h3>
      <button v-if="checkIfOnMyAccount()" v-on:click="deletePostModal(post)">Delete</button>
      <VideoJS :src="post.video" />
      <p>{{ post.description }}</p>
    </div>
    <dialog id="delete">
      <form method="dialog">
        <h1>Are you sure you want to delete this post?</h1>
        <button v-on:click="deletePost()">Yes</button>
        <button>No</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";
import VideoJS from "../components/VideoJS.vue";

export default {
  components: {
    VideoJS,
  },
  data: function () {
    return {
      posts: [],
      user: {},
      currentPost: {},
    };
  },
  created: function () {
    this.loadUserData();
  },
  methods: {
    loadUserData: function () {
      axios.get("/users/" + this.$route.params.id).then((response) => {
        this.user = response.data;
        this.posts = this.user.posts;
      });
    },
    deletePostModal: function (post) {
      console.log("Deleting Post");
      document.querySelector("#delete").showModal();
      this.currentPost = post;
    },
    deletePost: function () {
      axios.delete("/posts/" + this.currentPost.id).then((response) => {
        console.log(response.data);
        var index = this.posts.indexOf(this.currentPost);
        this.posts.splice(index, 1);
      });
    },
    checkIfOnMyAccount: function () {
      if (this.user.id == localStorage.getItem("user_id")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
