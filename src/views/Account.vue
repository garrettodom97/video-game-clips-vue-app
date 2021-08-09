<template>
  <div>
    <h1>{{ user.username }}'s Page</h1>
    <div v-for="post in posts" :key="post.id">
      <router-link :to="`/posts/${post.id}`">
        <h2>{{ post.title }}</h2>
      </router-link>
      <h3>{{ post.user }}</h3>
      <VideoJS :src="post.video" />
      <p>{{ post.description }}</p>
    </div>
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
  },
};
</script>
