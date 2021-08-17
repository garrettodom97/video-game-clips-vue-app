<template>
  <div id="show">
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
      <p></p>
      <h2>Comments</h2>
      <div v-for="comment in post.comments" :key="comment.id">
        <section>
          <ul class="posts">
            <li>
              <article>
                <header>
                  <h3>{{ comment.user.username }}</h3>
                  <time class="published">{{ comment.created_at }}</time>
                  <p>{{ comment.text }}</p>
                </header>
              </article>
            </li>
          </ul>
        </section>
      </div>
    </article>
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

<style>
p {
  text-align: center;
}
</style>
