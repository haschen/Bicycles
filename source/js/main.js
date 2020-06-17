(function() {
  //мобильное меню
  var navToggler = document.querySelector(".main-nav__toggler-button");
  var navMenu = document.querySelector(".main-nav");
  var navList = document.querySelector(".main-nav__list");

  document.querySelector(".nojs").classList.remove("nojs");

  navToggler.addEventListener("click", function () {
    menuStateChange();
    document.body.classList.toggle("no-scroll");
  })

  navList.onclick = function(e) {
    e.preventDefault();
    var target = e.target;

    if (target.tagName != "A") return;
    if (document.body.classList.contain("no-scroll")) {
      document.body.classList.remove("no-scroll")
    };
    menuStateChange();
    var hash = target.href.replace(/[^#]*(.*)/, "$1");
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
      window.scrollTo(0,r);

      if (r != distance) {
          requestAnimationFrame(step)
      }
    }

  }

  //форма
  var form = document.querySelector(".request-form");
  var telInput = document.querySelector("input[type=\"tel\"]")
  var errorMsg = document.querySelector(".request-form__error-notice");
  var errorStatus = -1;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (telInput.value.search(/[^\d]/g) === -1) {
      console.log(telInput.value.search(/[\d]/));
      var request = new XMLHttpRequest();
      request.open("POST", "/");
      request.send(new FormData(this));
    } else {
      telInput.classList.add("request-form__field--error");
      errorMsg.classList.add("request-form__error-notice--visible");
      errorStatus = 1;
    }

  });

  telInput.addEventListener("keyup", function(){
    if (errorStatus > -1) {
      telInput.classList.remove("request-form__field--error");
      errorMsg.classList.remove("request-form__error-notice--visible");
      errorStatus = -1;
    }
  });

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
              "onReady": onPlayerReady,
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
