$(function () {
  // 图片轮播
  var swiper = new Swiper(".swiper-container", {
    pagination: {
      el: '.swiper-pagination',
    },
    effect: "coverflow",
    loop: true,
    grabCursor: true,
    slidesPerView: "auto",
    centeredSlides: true, //设置slide居中
    coverflowEffect: {
      rotate: 0, //slide做3d旋转时Y轴的旋转角度。默认50。
      stretch: 100, //每个slide之间的拉伸值（距离），越大slide靠得越紧。 默认0。
      depth: 100, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
      modifier: 1,
      slideShadows: false //开启slide阴影。默认 true。
    }
  });


  //- 视频播放
  $("#videoBtn").click(() => {
    $(".popvideo").show();
    $("#video").css("visibility", "visible");
    $("#video").show();
    $("#video")[0].currentTime = 0;
    $("#video")[0].play();
    $('html,body').addClass('noscroll')
  })
  $(".popvideo-wrap").click(() => {
    $(".popvideo").hide();
    $("#video")[0].pause();
    $("#video").css("visibility", "hidden");
    $("#video").hide();
    $('html,body').removeClass('noscroll')
  })

})