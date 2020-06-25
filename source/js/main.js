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
    if (document.body.classList.contains("no-scroll")) {
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
  var telInput = document.querySelector("input[type=\"tel\"]");
  var errorMsg = document.querySelector(".request-form__error-notice");

  var telValidation = function() {
    var errorStatus = -1;

    if (telInput.value.search((/[^\+?\d]/g)) === -1) {
      errorStatus = 1;
    }
    return errorStatus;

  };

  var showValidErrorMsg = function () {

    telInput.classList.add("request-form__field--error");
    errorMsg.classList.add("request-form__error-notice--visible");

  }

  var sendData = function () {
    var request = new XMLHttpRequest();
    request.open("POST", "https://echo.htmlacademy.ru");
    request.send(new FormData(form));

    request.onload = request.onerror = function() {
      if (this.status == 200) {
        alert( "Ваша заявка принята!" );
      } else {
        alert( "Произошла ошибка при загрузке данных. Пожалуйста, обновите страницу!" );
      }
    };

  }


  telInput.addEventListener("keyup", function(){
    if (telInput.classList.contains("request-form__field--error")) {
      telInput.classList.remove("request-form__field--error");
      errorMsg.classList.remove("request-form__error-notice--visible");
    }
  });


  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(telValidation());
    (telValidation() === 1) ? sendData() : showValidErrorMsg();
  });


  //видео
  var createYTPlayer = function(){
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
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


   //lazy-load
   document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll(".lazy > source"));
    var active = false;

    var lazyLoad = function() {
      if (active === false) {
        active = true;

        setTimeout(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
              lazyImage.srcset = lazyImage.dataset.srcset;
              lazyImage.nextElementSibling.src = lazyImage.nextElementSibling.dataset.src;
              lazyImage.nextElementSibling.srcset = lazyImage.nextElementSibling.dataset.srcset;
              lazyImage.parentElement.classList.remove("lazy");

              lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage;
              });

              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
              }
            }
          });

          active = false;
        }, 200);
      }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  });

})();
