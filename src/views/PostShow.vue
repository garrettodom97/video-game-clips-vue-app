<template>
  <div id="show">
    <div class="post-image-body">
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
                <span class="name">{{ post.user.username }}</span>
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
        <p></p>
        <button v-if="isLoggedIn()" v-on:click="commentModal()">Add Comment</button>
        <footer>
          <ul class="stats">
            <!-- <li><a href="#">General</a></li> -->
            <li v-if="isLoggedIn()">
              <a v-on:click="like(post)" class="icon solid fa-heart">{{ post.likes.length }}</a>
            </li>
          </ul>
        </footer>
      </article>
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
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
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
  },
};
</script>

<style>
p {
  text-align: center;
}
.post-image-body {
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  flex-direction: column;
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
</style>
