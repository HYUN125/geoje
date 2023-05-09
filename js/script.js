$(document).ready(function(){
    // $() = 도큐먼트 안에 내용 불러올때 이것만 쓰면 됨/ 쿼리셀렉트,겟엘리먼트 안써도됨
    // header hide
    $(window).scroll(function(event){
        let st = $(this).scrollTop();
        // st = scroppTop
        console.log(st)
        if(st>386){
            $('.header').addClass('hide')
            $('.mb-bt').addClass('hide')
        }else{
            $('.header').removeClass('hide')
            $('.mb-bt').removeClass('hide')
        }
    })

    // all menu pop-up
    const all_menu = $('.all-menu')
    const all_menu_wrapper = $('.all-menu-wrapper')
    const all_menu_mask = $('.all-menu-mask')
    const all_menu_close = $('.all-menu-close')
    // class 명이라는 말이 앞에 잇음 . 안찍어도됨

    all_menu.click(function(){
        // all_menu_wrapper.ClassList.add('클래스명')
        all_menu_wrapper.addClass('all-menu-wrapper-active')
        all_menu_mask.addClass('all-menu-mask-active')
    })
    // all_menu.addEventListener('click',function()) 똑같음
    all_menu_close.click(function(){
        all_menu_wrapper.removeClass('all-menu-wrapper-active')
        all_menu_mask.removeClass('all-menu-mask-active')
    })

    // 모바일메뉴 기능
    // 모바일메뉴버튼 .mb-bt 저장해서 활용
    $('.mb-bt').click(function(e){
        e.preventDefault();
        // a 태그의 기능을 무시하자 prevent
        $('.mb-bt').toggleClass('mb-bt-open')
        // $(this).toggleClass('mb-bt-open') 이름 똑같으면 this 적으면됨
        // 햄버거 모양 바뀌는 것
        $('.mb-menu-mask').toggleClass('mb-menu-mask-active')
        $('.mb-nav').toggleClass('mb-nav-open')
        $('.mb-menu > li').height(54)
    })
    //매개변수 집어넣자 = e 아무거나 상관없음

    //화면사이즈체크
    $(window).resize(function(){
        let temp = $(window).width();
        if(temp > 1220) {
        $('.mb-bt').removeClass('mb-bt-open')
        $('.mb-menu-mask').removeClass('mb-menu-mask-active')
        $('.mb-nav').removeClass('mb-nav-open')
        } else {
            $('.all-menu-wrapper').removeClass('all-menu-wrapper-active')
            $('.all-menu-mask').removeClass('all-menu-mask-active')
        }
        // console.log(temp)
    })

    //모바일메뉴 펼치기
    // 1. 모바일 메뉴 불러오기
    const mb_mainmenu = $('.mb-mainmenu')
    // 2. 모바일 서브메뉴 불러오기
    const mb_submenu = $('.mb-submenu')
    // 3. 펼쳐진 서브메뉴의 높이값
    let mb_submenu_height = []; //배열
    // 4. 높이값 계산 실행
    // 배열명.foreach(function(item, index){할일}) each, foreach 구분
    $.each(mb_submenu, function(index){
        // 각각의 mb-submenu로 가서 li의 개수 파악
        // this = mb-submenu
        let count = $(this).find('li').length;
        // console.log(count) 숫자 나오는지 확인하기
        // 최종결과 저장 = 51px*count+22(위아래 padding)
        mb_submenu_height[index]=51*count+22;
    })
    let mb_li = $('.mb-menu > li')
    console.log(mb_mainmenu)
    $.each(mb_mainmenu, function(index){
        $(this).click(function(e){
            e.preventDefault();
            // mb-mainmenu-open 있으면 펼치고 없으면 닫기
            // let active = this.contains('')
            $(this).toggleClass('mb-mainmenu-open')
            let active = $(this).hasClass('mb-mainmenu-open')
            if(active){
                // 해당되는(클릭된) li>a(depth1)의 ul의 높이값을 temp에 저장
                let temp = mb_submenu_height[index]
                // 해당요소의 높이 부여. eq=equal
                //             .style.height = `${temp}+54`
                mb_li.eq(index).height(temp+54)
                // 0번째 li = ul 첫번째의 li = submenu의 첫번째 li
            }else{ //클릭이 안된 경우
                mb_li.eq(index).height(54)
            }
        })
    })

    // 모바일 메뉴 배경을 클릭시 사라짐
    const mb_menu_mask = $('.mb-menu-mask')
    mb_menu_mask.click(function(){
        //모바일버튼 기능 초기화
        $('.mb-bt').removeClass('mb-bt-open')
        $('.mb-menu-mask').removeClass('mb-menu-mask-active')
        $('.mb-nav').removeClass('mb-nav-open')
        $('.mb-menu > li').height(54)
        $('.mb-mainmemu').removeClass('mb-mainmenu-open')
    })

    
    new Swiper(".sw-visual", {
        autoplay: true,
        loop: true, 
        speed: 3000,
        effect: "fade",
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
    
        },
      });
        let sw_banner = new Swiper(".sw-banner", {
        slidesPerView: 2,
        spaceBetween: 13,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        }, // false : 자동 슬라이드 중 위치를 마음대로 건드려도 원래 슬라이드 상태로 돌아온다 (자동 슬라이드 됨. 마우스 상호작용 안먹는다)
        loop: true,
        navigation: {
          nextEl: ".banner-forward",
          prevEl: ".banner-back",
        },
        breakpoints: {
            1023: {slidesPerView: 6},
            882: {slidesPerView: 5},
            676: {slidesPerView: 4},
            450: {slidesPerView: 3},
            320: {slidesPerView: 2}
        }
      });

      const banner_back = $('.banner-back')
      const banner_play = $('.banner-play')
      const banner_forward = $('.banner-forward')

      banner_play.click(function(){
        $(this).toggleClass('banner-play-start')
        let temp = $(this).hasClass('banner-play-start')
        if(temp){ // true 안적어도 됨 0아니면 참값
            // 슬라이드 작동 안함 = 플레이 버튼을 누를 수 있다
            sw_banner.autoplay.stop();
        }else{
            // 슬라이드 작동 한다 = stop 버튼 누를 수 있다.
            sw_banner.autoplay.start();
        }
      })
      banner_back.click(function(){
        // 양쪽 클릭시 pause 모양 변경+ autoplay
        let temp = banner_play.hasClass('banner-play-start')
        if(temp==true){
            banner_play.removeClass('banner-play-start')
            sw_banner.autoplay.start()
        } // if 절에서 else 없으면 안 써도 됨
      })
      banner_forward.click(function(){
        let temp = banner_play.hasClass('banner-play-start')
        if(temp==true){
            banner_play.removeClass('banner-play-start')
            sw_banner.autoplay.start()
        } 
      })
      const go_top = $('.gotop')
      go_top.click(function(){
        $('html, body').animate({scrollTop: 0}, 500)
        // 0.5s 동안 animate 작동 gotop버튼 통째로 외우면 편함
      })

})