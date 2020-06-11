(function() {
  //мобильное меню
  var navToggler = document.querySelector(".main-nav__toggler-button");
  var navMenu = document.querySelector(".main-nav");

  document.querySelector(".nojs").classList.remove("nojs");

  navToggler.addEventListener("click", function () {
    navMenu.classList.toggle("main-nav--open");
  })

// прокрутка страницы
  $('a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 400, 'swing', function () {
        window.location.hash = target;
    });
  });

  //видео
  var tag = document.createElement("script");
  tag.src = "//www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;

  onYouTubeIframeAPIReady = function () {
      player = new YT.Player("player", {
          height: "100%",
          width: "100%",
          videoId: "_T7NTe3uBN4",
          playerVars: {
              "autoplay": 0,
              "rel": 0,
              "showinfo": 0
          },
          events: {
              "onStateChange": onPlayerStateChange
          }
      });
  }

  var p = document.getElementById ("player");
  $(p).hide();

  onPlayerStateChange = function (event) {
      if (event.data == YT.PlayerState.ENDED) {
          $(".video__button").fadeIn("normal");
      }
  }

  $(document).on("click", ".video__button", function () {
      $(this).hide();
      $("#player").show();
      player.playVideo();
  });
})();
