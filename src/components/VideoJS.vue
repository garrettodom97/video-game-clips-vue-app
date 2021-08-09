<template>
  <div class="videojs">
    <h1>{{ title }}</h1>
    <div class="video-inner-container">
      <video
        id="vid1"
        controls
        preload="auto"
        width="640"
        height="264"
        class="video-js vjs-default-skin vjs-big-play-centered"
        data-setup='{}'
      >
        <source :src="src" :type="type" />
      </video>
    </div>
  </div>
</template>

<script>
import "../../node_modules/video.js/dist/video-js.min.css";

import "../../node_modules/video.js/dist/video.min.js";

export default {
  name: "VideoJS",

  props: ["title", "src", "type"],
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
