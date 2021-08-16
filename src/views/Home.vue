<template>
  <div id="home">
    <button v-if="isLoggedIn()" v-on:click="newPostModal()">New Post</button>
    <div v-for="post in posts" :key="post.id">
      <article class="post">
        <header>
          <div class="title">
            <router-link :to="`/posts/${post.id}`">
              <h2>{{ post.title }}</h2>
            </router-link>
          </div>
          <div class="meta">
            <time class="published">{{ post.created_at }}</time>
            <a href="#" class="author">
              <span class="name">{{ post.user.username }}</span>
            </a>
          </div>
        </header>
        <div class="d-flex justify-content-center">
          <VideoJS :src="post.video" />
        </div>
        <p></p>
        <p>
          {{ post.description }}
        </p>
        <footer>
          <ul class="actions">
            <router-link :to="`/posts/${post.id}`">
              <li><a href="single.html" class="button large">View Post</a></li>
            </router-link>
          </ul>
          <ul class="stats">
            <!-- <li><a href="#">General</a></li>
            <li><a href="#" class="icon solid fa-heart">28</a></li> -->
            <li>
              <router-link :to="`/posts/${post.id}`">
                <a href="#" class="icon solid fa-comment">{{ post.comments.length }}</a>
              </router-link>
            </li>
          </ul>
        </footer>
      </article>
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
