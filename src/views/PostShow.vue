<template>
  <div id="show">
    <h1>{{ post.title }}</h1>
    <p>Posted at: {{ post.created_at }}</p>
    <h3>{{ post.user.username }}</h3>
    <VideoJS :src="post.video" />
    <button v-if="isLoggedIn()" v-on:click="commentModal()">Add Comment</button>
    <div v-for="comment in post.comments" :key="comment.id">
      <h4>{{ comment.user.username }}</h4>
      <p>{{ comment.text }}</p>
    </div>
    <dialog id="comment">
      <form method="dialog">
        <h1>Create a new post!</h1>
        <p>
          Text:
          <input type="text" v-model="newCommentParams.text" />
        </p>
        <button>Close</button>
        <button v-on:click="createComment()">Create Comment</button>
      </form>
    </dialog>
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
      newCommentParams: {},
    };
  },
  created: function () {
    this.postShow();
  },
  methods: {
    isLoggedIn: function () {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
    postShow: function () {
      axios.get("/posts/" + this.$route.params.id).then((response) => {
        this.post = response.data;
        console.log(response.data);
      });
    },
    commentModal: function () {
      console.log("Creating New Comment");
      document.querySelector("#comment").showModal();
    },
    createComment: function () {
      this.newCommentParams.post_id = this.post.id;
      this.newCommentParams.user_id = localStorage.getItem("user_id");
      axios.post("/comments", this.newCommentParams).then((response) => {
        console.log(response.data);
        this.post.comments.push(response.data);
      });
    },
  },
};
</script>
