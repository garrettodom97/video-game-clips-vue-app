<template>
  <div id="home">
    <p></p>
    <button id="new_post" v-if="isLoggedIn()" v-on:click="newPostModal()">New Post</button>
    <p></p>
    <div id="search">
      <input id="search-bar" type="text" placeholder="search" v-model="searchWord" />
    </div>
    <div
      class="post-image-body"
      v-for="post in filterBy(posts, searchWord, 'title', 'user.username', 'description')"
      :key="post.id"
    >
      <article class="post">
        <header>
          <div class="title">
            <router-link :to="`/posts/${post.id}`">
              <h2>{{ post.title }}</h2>
            </router-link>
          </div>
          <div class="meta">
            <time class="published">{{ post.created_at }}</time>
            <a :href="`/users/${post.user_id}`" class="author">
              <span class="name">{{ post.user.username }}</span>
            </a>
          </div>
        </header>
        <div class="post-image-body">
          <VideoJS :src="post.video" />
        </div>
        <p></p>
        <p>
          {{ post.description }}
        </p>
        <footer>
          <ul class="actions">
            <li><a :href="`/posts/${post.id}`" class="button large">View Post</a></li>
          </ul>
          <ul class="stats">
            <!-- <li><a href="#">General</a></li> -->
            <li v-if="isLoggedIn()">
              <a v-on:click="like(post)" class="icon solid fa-heart">{{ post.likes.length }}</a>
            </li>
            <li v-if="isLoggedIn()">
              <a :href="`/posts/${post.id}`" class="icon solid fa-comment">{{ post.comments.length }}</a>
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
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  name: "App",
  components: {
    VideoJS,
  },
  data: function () {
    return {
      posts: [],
      newPostParams: {},
      video: "",
      searchWord: "",
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
    like: function (post) {
      console.log("determining if post is already liked");
      var userLikes = this.filterBy(post.likes, (like) => like.user_id == localStorage.getItem("user_id"));
      console.log(userLikes);
      if (!this.isLoggedIn()) {
        return;
      }
      if (userLikes.length === 0) {
        var likeParams = { user_id: localStorage.getItem("user_id"), post_id: post.id };
        axios.post("/likes", likeParams).then((response) => {
          console.log("Added like", response.data);
          post.likes.push(response.data);
        });
      } else {
        axios.delete("/likes/" + userLikes[0].id).then((response) => {
          console.log("deleting like", response.data);
          var pos = post.likes
            .map(function (e) {
              return e.id;
            })
            .indexOf(userLikes[0].id);
          post.likes.splice(pos, 1);
        });
      }
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
#new_post {
  width: 35%;
  position: sticky;
}
.post {
  width: 85%;
}
#search {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
#search-bar {
  width: 35%;
  text-align: center;
}
.post-image-body {
  display: flex;
  align-items: center;
  padding: 0px;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
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
.post > header .title {
  padding: 0em 0em 0em 0em;
}
.post > header .meta {
  padding: 1.5em 0em 0em 0em;
}
a,
a:active,
a:focus {
  outline: none;
}
.video-js {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
}
.vjs-poster {
  position: absolute !important;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
