<template>
  <div id="app">
    <div class="header">
      <!-- Header -->
      <header id="header">
        <h1><a href="/home">Be Cool! Be Gamer!</a></h1>
        <nav class="links">
        </nav>
        <nav class="main">
          <ul>
            <li class="menu">
              <a class="fa-bars" href="#menu">Menu</a>
            </li>
          </ul>
        </nav>
      </header>
      <div class="menu">
        <section id="menu">
          <!-- Actions -->
          <section>
            <ul class="actions stacked">
              <li><a class="button large fit" href="/home">All Posts</a></li>
              <li v-if="isLoggedIn()">
                <button v-on:click="getUserID()" class="button large fit">My Account</button>
              </li>
              <li v-if="isLoggedIn()"><a href="/logout" class="button large fit">Logout</a></li>
              <li v-if="!isLoggedIn()"><a href="/" class="button large fit">Login</a></li>
            </ul>
          </section>
        </section>
      </div>
    </div>
    <router-view />
    <!-- Menu -->
  </div>
</template>

<script>
/* global breakpoints */
/* global jQuery */
export default {
  data: function () {
    return {
      user_id: "",
    };
  },
  mounted: function () {
    /*
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

    (function ($) {
      var $window = $(window),
        $body = $("body"),
        $menu = $("#menu"),
        $sidebar = $("#sidebar"),
        $main = $("#main");

      // Breakpoints.
      breakpoints({
        xlarge: ["1281px", "1680px"],
        large: ["981px", "1280px"],
        medium: ["737px", "980px"],
        small: ["481px", "736px"],
        xsmall: [null, "480px"],
      });

      // Play initial animations on page load.
      $window.on("load", function () {
        window.setTimeout(function () {
          $body.removeClass("is-preload");
        }, 100);
      });

      // Menu.
      $menu.appendTo($body).panel({
        delay: 500,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        resetForms: true,
        side: "right",
        target: $body,
        visibleClass: "is-menu-visible",
      });

      // Search (header).
      var $search = $("#search"),
        $search_input = $search.find("input");

      $body.on("click", '[href="#search"]', function (event) {
        event.preventDefault();

        // Not visible?
        if (!$search.hasClass("visible")) {
          // Reset form.
          $search[0].reset();

          // Show.
          $search.addClass("visible");

          // Focus input.
          $search_input.focus();
        }
      });

      $search_input
        .on("keydown", function (event) {
          if (event.keyCode == 27) $search_input.blur();
        })
        .on("blur", function () {
          window.setTimeout(function () {
            $search.removeClass("visible");
          }, 100);
        });

      // Intro.
      var $intro = $("#intro");

      // Move to main on <=large, back to sidebar on >large.
      breakpoints.on("<=large", function () {
        $intro.prependTo($main);
      });

      breakpoints.on(">large", function () {
        $intro.prependTo($sidebar);
      });
    })(jQuery);
  },
  methods: {
    getUserID: function () {
      this.user_id = localStorage.getItem("user_id");
      this.$router.push("/users/" + this.user_id);
      this.$router.go();
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
