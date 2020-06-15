(function() {
  //мобильное меню
  var navToggler = document.querySelector(".main-nav__toggler-button");
  var navMenu = document.querySelector(".main-nav");
  var navList = document.querySelector(".main-nav__list");

  document.querySelector(".nojs").classList.remove("nojs");

  navToggler.addEventListener("click", function () {
    menuStateChange();
  })

  navList.onclick = function(e) {
    e.preventDefault();
    var target = e.target;

    if (target.tagName != "A") return;
    menuStateChange();
    var hash = target.href.replace(/[^#]*(.*)/, '$1');
    pageScroll(hash);
  }


  var menuStateChange= function() {
    navMenu.classList.toggle("main-nav--open");
  }

//скроллинг страницы
  var pageScroll = function(anchor) {
    var destination = document.querySelector(anchor);
    var start = null;
    var distance = destination.getBoundingClientRect().top;
    var v = 0.5;
    requestAnimationFrame(step);


    function step(t) {
      if (!start) start = t;

      var progress = t - start;
      var r = Math.min(progress/v, distance);

      console.log(r);
      window.scrollTo(0,r);

      if (r != distance) {
          requestAnimationFrame(step)
      }
    }

  }


  //видео
  var createYTPlayer = function(){
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
              'onReady': onPlayerReady,
            }
        });
    }

    function onPlayerReady(event) {
      event.target.playVideo();
    }
  }

  var playButton = document.querySelector(".video__button");

  playButton.addEventListener("click", function(e) {
    e.preventDefault();
    createYTPlayer();
    playButton.hidden = true;

   })

})();
