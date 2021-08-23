<template>
  <div id="account">
    <p></p>
    <h1>{{ user.username }}'s Page</h1>
    <div class="post-image-body" v-for="post in orderBy(posts, 'created_at', -1)" :key="post.id">
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
              <span class="name">{{ user.username }}</span>
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
            <li v-if="checkIfOnMyAccount()">
              <button v-on:click="deletePostModal(post)" class="button large">Delete Post</button>
            </li>
          </ul>
          <ul class="stats">
            <!-- <li><a href="#">General</a></li> -->
            <li>
              <a v-on:click="like(post)" class="icon solid fa-heart">{{ post.likes.length }}</a>
            </li>
            <li>
              <router-link :to="`/posts/${post.id}`">
                <a href="#" class="icon solid fa-comment">{{ post.comments.length }}</a>
              </router-link>
            </li>
          </ul>
        </footer>
      </article>
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
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  name: "account",
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
    like: function (post) {
      console.log("determining if post is already liked");
      var userLikes = this.filterBy(post.likes, localStorage.getItem("user_id"), "user_id");
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
.post > header .title {
  padding: 0em 0em 0em 0em;
}
.post > header .meta {
  padding: 1.5em 0em 0em 0em;
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
