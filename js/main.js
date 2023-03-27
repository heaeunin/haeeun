$(document).ready(function(){
//풀페이지
  $('#fullpage').fullpage({
      //options here
      anchors: ['home', 'about', 'skills', 'publishin', 'javascript'],
      licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
      autoScrolling:true,
      scrollHorizontally: true,
      menu: "header nav ul",
      onLeave: function(origin, destination, direction) {
        // 빠른전환으로 이벤트중복시 fullpage와 swiper전환시점 분리막기
        $('#fullpage').on('scroll touchmove mousewheel', function(event) {                    
          event.preventDefault();
          event.stopPropagation();
          return false;
        });
        swiper.mousewheel.disable();
      },
      afterLoad: function(anchorLink, index) {      
        // 전환이 끝난후 이벤트풀기                               
        $('#fullpage').off('scroll mousewheel');      
        if(!$(".fp-completely .swiper-container").length > 0) $('#fullpage').off('touchmove'); // 모바일분기
        if(swiper) swiper.mousewheel.enable();    
        if(!$(".sec5").hasClass("active")) $.fn.fullpage.setAllowScrolling(true); // 슬라이드 섹션을 벗어나면 휠풀어주기
      }
    });           
  


  // swiper
  var length = $(".sec-5 .swiper-slide").length;
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 0,
    freeMode: false,
    speed: 1000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    mousewheel: true,
    on: {
      slideChange: function(){        
        var idx = this.activeIndex;
        // 처음과 마지막 슬라이드가 아닐경우 fullpage전환 막기
        if(this.activeIndex != 0 && idx != length) $.fn.fullpage.setAllowScrolling(false);
        if(length == 2 && idx == 0) $.fn.fullpage.setAllowScrolling(false) //슬라이드가 2개밖에 없을때
        // console.log('즉시 : ' + idx);
      },  
      slideChangeTransitionEnd: function(){
        var idx = this.activeIndex;
        // 처음과 마지막 슬라이드일 경우 fullpage전환 풀기
        if(idx == 0 || idx >= length-1) $.fn.fullpage.setAllowScrolling(true);
        // console.log('전환후 : ' + idx);     
      },
      touchMove: function(e) {        
        var startY = e.touches.startY;
        setTimeout(function(){
          if(startY > e.touches.currentY) swiper.slideNext();  
          else swiper.slidePrev();
        },100);        
      },
    }, 
  });            


  // 슬라이드바
  $('.slide-nav').on('click', function (e) {
    e.preventDefault();
    // get current slide
    let current = $('.flex-active').data('slide'),
      // get button data-slide
      next = $(this).data('slide');
    $('.slide-nav').removeClass('active');
    $(this).addClass('active');
    if (current === next) {
      return false;
    } else {
      $('.slide-warpper').find('.flex-container[data-slide=' + next + ']').addClass('flex--preStart');
      $('.flex-active').addClass('animate--end');
      setTimeout(function () {
        $('.flex--preStart').removeClass('animate--start flex--preStart').addClass('flex-active');
        $('.animate--end').addClass('animate--start').removeClass('animate--end flex-active');
      }, 800);
    }
  });

   /* 紐⑤컮�� �꾨쾭嫄� */
   $(".hamburger").click(function(){
    $(this).toggleClass("is-active");
    $(".ham_menu").toggleClass("on");
  });
  $(".ham_menu li a").click(function(){
    $(".ham_menu").removeClass("on");
    $(".hamburger").removeClass("is-active");
  });
}); //end


