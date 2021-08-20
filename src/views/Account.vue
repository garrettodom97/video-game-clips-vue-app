<template>
  <div>
    <p></p>
    <h1>{{ user.username }}'s Page</h1>
    <div class="post-image-body" v-for="post in posts" :key="post.id">
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
              <router-link :to="`/users/${post.user_id}`">
                <span class="name">{{ user.username }}</span>
              </router-link>
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
          <!-- <ul class="stats">
            <li><a href="#">General</a></li>
            <li><a href="#" class="icon solid fa-heart">28</a></li>
            <li>
              <router-link :to="`/posts/${post.id}`">
                <a href="#" class="icon solid fa-comment">{{ post.comments.length }}</a>
              </router-link>
            </li>
          </ul> -->
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

<style>
.post > header .title {
  padding: 0em 0em 0em 0em;
}
.post > header .meta {
  padding: 1.5em 0em 0em 0em;
}
</style>
