<template>
  <div class="videojs">
    <p>{{ src }}</p>
    <div class="video-inner-container">
      <video
        id="vid1"
        controls
        preload="auto"
        width="640"
        height="264"
        class="video-js vjs-fluid vjs-default-skin vjs-big-play-centered"
        data-setup="{}"
      >
        <source :src="src" :type="type" />
      </video>
    </div>
  </div>
</template>

<script>
import "../../node_modules/videojs-youtube/dist/Youtube.min.js";

import "../../node_modules/video.js/dist/video-js.min.css";

import "../../node_modules/video.js/dist/video.min.js";

export default {
  name: "VideoJS",

  props: ["src", "type"],
};
</script>

<style>
.video-inner-container {
  height: 300px;
}
#vid1 {
  height: 300px;
  width: 450px;
  justify-content: center;
}
</style>
