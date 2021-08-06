<template>
  <div id="show">
    <h1>{{ post.title }}</h1>
    <!-- <h3>{{ post.user.username }}</h3> -->
    <VideoJS src="https://www.youtube.com/watch?v=094y1Z2wpJg" type="type/youtube" />
    <div v-for="comment in post.comments" :key="comment.id">
      <h4>{{ comment.user.username }}</h4>
      <p>{{ comment.text }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VideoJS from "../components/VideoJS.vue";

export default {
  name: "Show",
  components: {
    VideoJS,
  },
  data: function () {
    return {
      post: {},
      url: "https://www.youtube.com/watch?v=094y1Z2wpJg",
    };
  },
  created: function () {
    this.postShow();
  },
  methods: {
    postShow: function () {
      axios.get("http://localhost:3000/posts/" + this.$route.params.id).then((response) => {
        this.post = response.data;
        console.log(response.data);
      });
    },
  },
};
</script>
