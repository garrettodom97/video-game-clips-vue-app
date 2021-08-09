<template>
  <div id="home">
    <button v-on:click="newPostModal()">New Post</button>
    <h1>Posts</h1>
    <div v-for="post in posts" :key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
      </router-link>
      <router-link :to="`/users/${post.user_id}`">
        <h3>{{ post.user.username }}</h3>
      </router-link>
      <VideoJS :src="post.video" />
      <p>{{ post.description }}</p>
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
          Video:
          <input type="file" v-on:change="setFile($event)" ref="fileInput" />
        </p>
        <button>Close</button>
        <button v-on:click="createPost()">Create Post</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";
import VideoJS from "../components/VideoJS.vue";

export default {
  name: "App",
  components: {
    VideoJS,
  },
  data: function () {
    return {
      posts: [],
      newPostParams: {},
      video: "",
    };
  },
  created: function () {
    this.postsIndex();
  },
  methods: {
    setFile: function (event) {
      if (event.target.files.length > 0) {
        console.log("this works");
        this.video = event.target.files[0];
        console.log(this.video);
      }
    },
    postsIndex: function () {
      axios.get("/posts").then((response) => {
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
      var formData = new FormData();
      formData.append("title", this.newPostParams.title);
      formData.append("description", this.newPostParams.description);
      formData.append("video", this.video);
      console.log("here it is:", formData);

      let config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post("/posts", formData, config).then((response) => {
        console.log(this.video);
        console.log(response.data);
        this.posts.unshift(response.data);
        this.$refs.fileInput.value = "";
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
