<template>
  <div id="home">
    <button v-on:click="newPostModal()">New Post</button>
    <h1>Posts</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <h3>{{ post.user.username }}</h3>
      <img :src="`https://img.youtube.com/vi/${getVideoID(post.video)}/0.jpg`" alt="" />
      <p>{{ post.description }}</p>
      <div v-for="comment in post.comments" :key="comment.id">
        <small>{{ comment.user.username }}: {{ comment.text }}</small>
      </div>
    </div>
    <dialog id="new">
      <form method="dialog">
        <h1>Create a new post!</h1>
        <p>
          Title:
          <input type="text" v-model="newPostParams.title" />
        </p>
        <p>
          Description:
          <input type="text" v-model="newPostParams.description" />
        </p>
        <p>
          Video URL:
          <input type="text" v-model="newPostParams.video" />
        </p>
        <button>Close</button>
        <button v-on:click="createPost()">Create Post</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data: function () {
    return {
      posts: [],
      newPostParams: {},
    };
  },
  created: function () {
    this.postsIndex();
  },
  methods: {
    postsIndex: function () {
      axios.get("http://localhost:3000/posts").then((response) => {
        console.log(response.data);
        this.posts = response.data;
      });
    },
    newPostModal: function () {
      console.log("Creating New Post");
      document.querySelector("#new").showModal();
    },
    createPost: function () {
      this.newPostParams.user_id = localStorage.getItem("user_id");
      axios.post("http://localhost:3000/posts", this.newPostParams).then((response) => {
        console.log(response.data);
        this.posts.unshift(response.data);
      });
    },
    getVideoID: function (url) {
      var toggle = false;
      var videoID = "";
      for (let c = 0; c < url.length; c++) {
        if (toggle) {
          videoID += url.charAt(c);
        }
        if (url.charAt(c) === "=") {
          toggle = true;
        }
      }
      console.log(videoID);
      return videoID;
    },
  },
};
</script>
