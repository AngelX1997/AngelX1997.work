 
$(function(){
	//- 视频播放
	$("#videoBtn").click(()=>{
		$(".popvideo").show();
		$("#video").css("visibility","visible");
		$("#video").show();
		$("#video")[0].currentTime = 0;
		$("#video")[0].play();
		$('html,body').addClass('noscroll')
	})
	$(".popvideo-wrap").click(()=>{
		$(".popvideo").hide();
		$("#video")[0].pause();
		$("#video").css("visibility","hidden");
		$("#video").hide();
		$('html,body').removeClass('noscroll')
	})
	//- 轮播 partner & head
	var swiperPartner = new Swiper('#swiper_partner',{
	    loop : true,
		speed:200,
		autoplayDisableOnInteraction: false,
		loopAdditionalSlides :0,
		onlyExternal:true,
	});
	var swiperHeads = new Swiper('#swiper_heads',{
	    loop : true,
		speed:200,
		autoplay : 5000,
		autoplayDisableOnInteraction: false,
		loopAdditionalSlides :1,
		slidesPerView: 3,
		// centeredSlides:true,
		slideToClickedSlide:true,
		spaceBetween: "2.5%",
        nextButton: '.part-partner-heads-swiper .swiper-button-next',
		prevButton: '.part-partner-heads-swiper .swiper-button-prev',
		onSlideChangeEnd: function(swiper){
			let idx = swiper.realIndex;
			swiperPartner.slideTo((idx+1)%10)
		}
	});
	//- 轮播 pics
	var swiperPics = new Swiper('#swiper_pics', {
		loop : true,
		loopAdditionalSlides :1,
		speed:200,
		autoplay : 5000,
		autoplayDisableOnInteraction: false,
        nextButton: '.part-pics-swiper .swiper-button-next',
		prevButton: '.part-pics-swiper .swiper-button-prev',
	});
	
	//抽奖
	var click = false;
	var luck = {
		index: -1,	//当前转动到哪个位置，起点位置
		count: 7,	//总共有多少个位置
		timer: 0,	//setTimeout的ID，用clearTimeout清除
		speed: 20,	//初始转动速度
		times: 0,	//转动次数
		cycle: 10,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
		prize: -1,	//中奖位置
		init: function (id) {
			if ($("#" + id).find(".luck-unit").length > 0) {
				$luck = $("#" + id);
				$units = $luck.find(".luck-unit");
				this.obj = $luck;
				this.count = $units.length;
				$luck.find(".luck-unit-" + this.index).addClass("active");
			};
		},
		roll: function () {
			var index = this.index;
			var count = this.count;
			var luck = this.obj;
			$(luck).find(".luck-unit-" + index).removeClass("active");
			index += 1;
			if (index > count - 1) {
				index = 0;
			};
			$(luck).find(".luck-unit-" + index).addClass("active");
			this.index = index;
			return false;
		},
		stop: function (index) {
			this.prize = index;
			return false;
		}
	};
	luck.init('J_lottery');
	function roll () {
		luck.times += 1;
		luck.roll();
		if (luck.times > luck.cycle + 10 && luck.prize == luck.index) {
			clearTimeout(luck.timer);
			winningShow(luck.prize);
			// winningShow(4)
			luck.times = 0;
			luck.prize = -1;
			$("#J_cj").removeClass("cj_btn_dom");
			click = false;
		} else {
			if (luck.times < luck.cycle) {
				luck.speed -= 10;
			} else if (luck.times == luck.cycle) {
				var index = Math.random() * (luck.count) | 0;   //中奖物品通过一个随机数生成
				luck.prize = index;
			} else {
				if (luck.times > luck.cycle + 10 && ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index + 1)) {
					luck.speed += 110;
				} else {
					luck.speed += 20;
				}
			}
			if (luck.speed < 40) {
				luck.speed = 40;
			};
			luck.timer = setTimeout(roll, luck.speed); //循环调用
		};
		return false;
	};
	//显示中奖
	function winningShow (id) {
		var t = "";
		switch (id) {
			case 0: t = 'HUAWEI P40 Pro'; break;
			case 1: t = 'Nintendo Switch 国行'; break;
			case 2: t = '霍格沃茨城堡乐高'; break;
			case 3: t = '哈利波特盲盒周边'; break;
			case 4: t = '谢谢参与'; break;
			case 5: t = '50元京东卡'; break;
			case 6: t = '100元京东卡'; break;
			case 7: t = 'HUAWEI 手环 B6'; break;
		};
		if(id === 4) {
			$('#J_prizeImg').attr('src', 'img/lottery/p' + id + '.png');
			$('#J_failing').show().find('#J_prizeName').text(t);
		}else{
			$('#J_prizeImg').attr('src', 'img/lottery/p' + id + '.png');
			$('#J_winning').show().find('#J_prizeName').text(t);
		}
		
		$('.cover').on('click', function () {
			$('#J_winning').hide();
		});
	};
	//关闭
	$('.close').on('click', function () {
		$(this).parents('.winning').hide();
	})
	//点击抽奖按钮
	$('#J_cj').on('click', function () {
		$(this).addClass("cj_btn_dom");
		if (click) {
			return false;
		}
		else {
			luck.speed = 100;
			roll();
			click = true;
			return false;
		}
	});
	
	$('#rule_btn').on('click', function() {
		$('#rule').show()
	})
	$('#rule').on('click', function () {
		$('#rule').hide()
	})
})


	
    