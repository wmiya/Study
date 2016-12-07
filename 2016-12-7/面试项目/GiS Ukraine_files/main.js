	jQuery(document).ready(function($){
	//check media query
	if ($(window).width()>991 && $('.meteo-banner').length > 0){
		var mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, ""),
			//define store some initial variables
			halfWindowH = $(window).height()*0.5,
			halfWindowW = $(window).width()*0.5,
			//define a max rotation value (X and Y axises)
			maxRotationY = 5,
			maxRotationX = 3,
			aspectRatio;
			//detect if hero <img> has been loaded and evaluate its aspect-ratio
			$('.cd-floating-background').find('.backface').each(function() {
				aspectRatio = $(this).width()/$(this).height();
		  		if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) initBackground();
			}).each(function() {
				//check if image was previously load - if yes, trigger load event
		  		if(this.complete) $(this).load();
			});
			
			//detect mouse movement
			$(document).on('mousemove', function(event){
				moveBackground(event);
			});

			//on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
			$(window).on('resize', function(){
				if ($(window).width()>991){
					mediaQuery = window.getComputedStyle(document.querySelector('.cd-background-wrapper'), '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
					if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) {
						window.requestAnimationFrame(function(){
							halfWindowH = $(window).height()*0.5,
							halfWindowW = $(window).width()*0.5;
							initBackground();
						});
					} else {
						$('.cd-background-wrapper').attr('style', '');
						$('.cd-floating-background').attr('style', '').removeClass('is-absolute');
					}
				}
			});

			function initBackground() {
				var wrapperHeight = Math.ceil(halfWindowW*2/aspectRatio), 
					proportions = ( maxRotationY > maxRotationX ) ? 1.1/(Math.sin(Math.PI / 2 - maxRotationY*Math.PI/180)) : 1.1/(Math.sin(Math.PI / 2 - maxRotationX*Math.PI/180)),
					newImageWidth = Math.ceil(halfWindowW*2*proportions),
					newImageHeight = Math.ceil(newImageWidth/aspectRatio),
					newLeft = halfWindowW - newImageWidth/2,
					newTop = (wrapperHeight - newImageHeight)/2,
					mTop = wrapperHeight/2;

				//set an height for the .cd-background-wrapper
				$('.cd-background-wrapper').css({
					'height' : $(window).height(),
					'min-height' : $('.meteo-banner').height()
				});
				//set dimentions and position of the .cd-background-wrapper		
				$('.cd-floating-background').addClass('is-absolute').css({
					'left' : newLeft,
					'top': newTop,
					'height': $('.meteo-banner').height() + (newTop) * - 1 + 20,
					'width' : newImageWidth,
				});
				// $('.cd-floating-background .bg-element').css('margin-top', '-' + $('.cd-floating-background .bg-element').height()/2 + 'px');
			}

			function moveBackground(event) {
				var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
					rotateX = ((event.pageY-halfWindowH)/halfWindowH)*maxRotationX;

				if( rotateY > maxRotationY) rotateY = maxRotationY;
				if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
				if( rotateX > maxRotationX) rotateX = maxRotationX;
				if( rotateX < -maxRotationX ) rotateX = -maxRotationX;
				var transX = (event.pageX/$(window).width()*70) - 35;
				$('.cd-floating-background').css({
					'-moz-transform': ' rotateY(' + rotateY + 'deg' + ') translateX( '+ transX + 'px) translateZ(0)',
				    '-webkit-transform': ' rotateY(' + rotateY + 'deg' + ') translateX( '+ transX + 'px) translateZ(0)',
					'-ms-transform': ' rotateY(' + rotateY + 'deg' + ') translateX( '+ transX + 'px) translateZ(0)',
					'-o-transform': ' rotateY(' + rotateY + 'deg' + ') translateX( '+ transX + 'px) translateZ(0)',
					'transform': ' rotateY(' + rotateY + 'deg' + ') translateX( '+ transX + 'px) translateZ(0)',
				});
			}
		}
	});

	/* 	Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
		https://github.com/Modernizr/Modernizr/issues/762 */
	(function getPerspective(){
	  var element = document.createElement('p'),
	      html = document.getElementsByTagName('html')[0],
	      body = document.getElementsByTagName('body')[0],
	      propertys = {
	        'webkitTransformStyle':'-webkit-transform-style',
	        'MozTransformStyle':'-moz-transform-style',
	        'msTransformStyle':'-ms-transform-style',
	        'transformStyle':'transform-style'
	      };

	    body.insertBefore(element, null);

	    for (var i in propertys) {
	        if (element.style[i] !== undefined) {
	            element.style[i] = "preserve-3d";
	        }
	    }

	    var st = window.getComputedStyle(element, null),
	        transform = st.getPropertyValue("-webkit-transform-style") ||
	                    st.getPropertyValue("-moz-transform-style") ||
	                    st.getPropertyValue("-ms-transform-style") ||
	                    st.getPropertyValue("transform-style");

	    if(transform!=='preserve-3d'){
	      html.className += ' no-preserve-3d';
	    } else {
	    	html.className += ' preserve-3d';
	    }
	    document.body.removeChild(element);

	})();
$(document).ready(function(){
	"use string";
	heightDetect();
	initSlider();
	videoInit();
	directionVideoBg();
	bgMoveInit();
	countersHeightBlock();
	
	if( $('.white-trigger').css('display') == 'block'){
		headerTrigger();
	}
	$('.main_navigation li.item ul.items-block').each(function(){
		if($(this).find('li').length>3){
			$(this).parents('li.item').addClass('six-menu');
		}
	})
	
	$('.main_navigation .item .items-block').each(function(){
		var $this = $(this);
		if($this.length>0){
			$this.parent().addClass('with-arrow');
		}
	})
	$('.main_navigation .item.with-arrow').find('>a').removeAttr("href");
	popupCall();

	if ($(window).width()>1024){

		videoBG();
		drawingLine();
		bgMouseMove();

	}
	if ($(window).width()>991){
		var cont = $(this);
		if( $('.parallax-container').length > 0 ){
			customParallax();
			cont.enllax();
		}
		$('.projects-block').each(function(){
			var $this = $(this);
			$this.find('.col-sm-4').hover(function(){
				$this.find('.col-sm-4').toggleClass('inactive');
				$(this).toggleClass('inactive');
				$(this).toggleClass('active');

			})
		});
	}
	if ($(window).width()<1024){
		$('.burger-menu .menu-btn').click(function(){

			$(this).toggleClass('active');
			$('header').toggleClass('active');
			return false;

		});
		
		$('li.with-arrow > a').click(function(){
			var flag = $(this).data('flag');
			var $this = $(this);

			if(flag) {
				$this.removeClass('active');
				$this.parent().find('.items-block').hide();
			}	

			if(!flag) {
				$this.addClass('active');
				$this.parent().find('.items-block').show();
			}
			$(this).data('flag', !flag);
			return false;
		})
	}
	if ($(window).width()>767){
		$('.timeline .history-item').each(function(){
			$(this).find('.descr span, .year').removeClass('showed');
		});
		

		
		workAreasInit();
		footerBlocksH();
		$(window).resize(function(){
			$('.custom-carousel').each(function(){
				var ts = $(this),
					ic = $(this).find('.item').length,
					ip = $(this).find('.item'),
					cw = $(this).find('.navigation'),
					cs = $(this).find('.card-slider');
				var c = $('<div class="controls">');
				ts.find('.card-slider').ncs({
					init: function(params){
						
					}
				});
			});	
			footerBlocksH()
		})
		$('.custom-carousel').each(function(){
	
			var ts = $(this),
				ic = $(this).find('.item').length,
				ip = $(this).find('.item'),
				cw = $(this).find('.navigation'),
				cs = $(this).find('.card-slider');
			var c = $('<div class="controls">');

			ts.find('.card-slider').ncs({
				offset: 0,
				indent: 0,
				animationSpeed: 800,
				activeOnClick: true,
				autoHeight: true,
				autoWidth: true,
				resizeAdaptation: true
			});

			for(var i=0;i<ic;i++){
				c.append('<a href="" class="page">'+(i+1)+'</a>');
			}
			cw.append(c)
			ts.find('.alternative-carousel li').first().addClass('active');
			ts.find('.prev-slide').click(function(){
				cs.ncs('prev');
				var si = ts.find('.controls a.active').index();
				if (si < 1) {
					si = 1;
				}
				ts.find('.controls a').removeClass('active');
				ts.find('.controls a').each(function(){
					if ($(this).index() == si - 1) {
						$(this).addClass('active');
					}
				})
				ts.find('.alternative-carousel li').each(function(){
					var $this = $(this);
					var si = ts.find('.controls a.active').index();
					$this.removeClass('active');
					if ($this.index() == si){
						$this.addClass('active')
					}
				});
				return false;
			});
			ts.find('.next-slide').click(function(){
				cs.ncs('next');
				var si = ts.find('.controls a.active').index();

				var ic = ts.find('.controls a').length;

				if (si > ic - 2) {
					si = ic - 2;
				}


				ts.find('.controls a').removeClass('active');
				ts.find('.controls a').each(function(){
					if ($(this).index() == si + 1) {
						$(this).addClass('active');
					}
				})
				ts.find('.alternative-carousel li').each(function(){
					var $this = $(this);
					var si = ts.find('.controls a.active').index();
					$this.removeClass('active');
					if ($this.index() == si){
						$this.addClass('active')
					}
				});
				return false;
			});
			ts.find('.controls a').click(function(){
				var ti = $(this).index() + 1;
				ts.find('.card-slider').ncs('set', ti);
				var rIndex = $(this).index();
				ts.find('.controls a').removeClass('active');
				$(this).addClass('active');
				ts.find('.alternative-carousel li').each(function(){
					var $this = $(this);
					$this.removeClass('active');
					if ($this.index() == rIndex){
						$this.addClass('active')
					}
				});
				TweenMax.staggerTo($(this).find('.title, .text'), 0, {
					className: "+=showed"
				}, .1);
				return false;
			})
			ts.find('.controls a').first().trigger('click');
		})
		$(window).on('resize', function(){
			$('.custom-carousel').each(function(){
				var ts = $(this),
					ic = $(this).find('.item').length,
					ip = $(this).find('.item'),
					cw = $(this).find('.navigation'),
					cs = $(this).find('.card-slider'),
					iw = $(this).find('.img-container').width();
				var c = $('<div class="controls">');
				var ih = ts.find('.item .img-container').outerHeight();
			});
		})
		
		$('.contact-banner .pulse .popup').addClass('animated fadeInUp');

		$('.reactions-entry, .about-banner .banner-title, .description-block .container, .img-block .img-container .img-entry, .anim').css('opacity','0');
		
		$('.about-banner .banner-title').addClass('animated fadeInUp');

		if ($('.video-desktop').is(':in-viewport')) {

			$("#video")[0].src += "&autoplay=1";

		}
		$('header.heading .main_navigation li').hover(function(){
			$('header.heading.active .main-nav .nav .main_navigation li').removeClass('bounceInDown');
		});
		$('.burger-menu .menu-btn').click(function(){
			var flag = $(this).data('flag');

			if(flag) {

				$('.active .top-container .logo-container, header.heading.active .main-nav .main_navigation li').addClass('animated bounceOutUp');
				
				var timeout = setTimeout(function(){
					$('header').removeClass('active');
					$(this).removeClass('active');
				},800);

				var timeoutSec = setTimeout(function(){
					$('.top-container .logo-container, header.heading .main-nav .main_navigation li').each(function(){
						$(this).removeClass('animated bounceOutUp bounceInDown');
					});
					$('.top-container .logo-container').addClass('fadeIn animated');
					$('.languages').show();
				},1000)

			}
			if(!flag) {

				$('.languages').hide();
				$(this).addClass('active');
				$('.top-container .logo-container').removeClass('fadeIn animated');
				TweenMax.staggerTo($('.top-container .logo-container, header.heading .main-nav .main_navigation >li'), 0, {
					className: "+=animated bounceInDown"
				}, .1);

				$('header').addClass('active');

			}
			$(this).data('flag', !flag);
			return false;

		});
		$('.map-entry').each(function(){
			TweenMax.staggerTo($(this).find('.map-item'), 0, {
				className: "+=active"
			}, .07);
		});
		$('.reactions-right-entry').each(function(){
			$(this).height($(this).siblings('.reactions-left-entry').height());
		});
		$(window).on("scroll.custom", function(){ 

			if ($('.video-desktop').is(':in-viewport')) {

				$(window).off("scroll.custom");

				function toggleVideo(state) {

					var div = document.getElementById("desk-vid");
					var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
					div.style.display = state == 'hide' ? 'none' : '';
					func = state == 'hide' ? 'pauseVideo' : 'playVideo';
					iframe.postMessage('{"event":"command","func":"' + func + '","args":""}','*');

				}

				toggleVideo();

			}
			if ($('.counters').is(':in-viewport')) {
				$(window).off("scroll.custom");
				countersHeight();
			}
		})

		$(window).on("scroll", function() {
		   
		});

		$('.timeline .history-item:in-viewport').each(function(){

			TweenMax.staggerTo($(this).find('.year, .descr span'), 0, {
				className: "+=showed"
			}, .15);
			$(this).find('.image-container').addClass('active');

		});
		heightDetect();
		$('.quotes-block:in-viewport(100)').each(function(){

			TweenMax.staggerTo($('blockquote, blockquote span, .quotes-block .author-block, .quotes-block .author-block span'), 0, {
				className: "+=showed"
			}, .15);

		});
		$('.achiv:in-viewport(200)').each(function(){

			TweenMax.staggerTo($('.achiv-text span, .achiv .title, .achiv .about-link'), 0, {
				className: "+=showed"
			}, .15);

			setTimeout(function(){
				$('.counter-container-round').addClass('activated');
			},300);

			setTimeout(function(){
				$('.counter-entry-round').addClass('sec-round');
			},600);

			setTimeout(function(){
				$('.counter-entry').addClass('act-entry');
			},800);

			setTimeout(function(){
				$('.counter-entry-round').addClass('third-round');
			},1000);

			setTimeout(function(){
				$('.counter-container-round').addClass('round-anim');
				counterInit();
			},1200);

		});
		$('.vetryanka:in-viewport(0)').each(function(){

			setTimeout(function(){
				$('.vetryanka-rounds').addClass('activated');
			},600);
			setTimeout(function(){
				$('.vetryanka-rounds').addClass('act-entry');
				counterInit();
			},1000);

		});

		$('.counters:in-viewport').each(function(){
			countersHeight();
		})

		$('.projects-block:in-viewport').each(function(){
			TweenMax.staggerTo($('.projects-block .project-item a .item-title span'), 0, {
				className: "showed"
			}, .15);
		});

		$('.project-launch:in-viewport').each(function(){

			var $this = $(this);
			TweenMax.staggerTo($this.find('.title, .text span'), 0, {
				className: "+=showed"
			}, .15);
			TweenMax.staggerTo($this.find('.circle, .circle-border'), 0, {
				className: "+=animated zoomIn2"
			}, .55);
			setTimeout(function(){
				$this.find('.arrow').addClass('showed');
			},600);
			setTimeout(function(){
				$this.find('.circle-arrow-container').addClass('rotated');
			},1500);

		});
		$('.project-results:in-viewport').each(function(){

			var $this = $(this);
			TweenMax.staggerTo($this.find('.title, .text span'), 0, {
				className: "+=showed"
			}, .15);
			TweenMax.staggerTo($this.find('.circle, .circle-border'), 0, {
				className: "+=animated zoomIn2"
			}, .55);
			setTimeout(function(){
				$this.find('.arrow').addClass('showed');
			},600);
			setTimeout(function(){
				$this.find('.circle-arrow-container').addClass('rotated');
			},1500);

		});

		$('.contacts-form:in-viewport(0)').each(function(){
			$(this).addClass('animated fadeInUp');
		});

		$('.description-block:in-viewport(0)').each(function(){
			$(this).find('.container').addClass('animated fadeInUp');
		});

		$('.img-block .img-container:in-viewport(0)').each(function(){

			$(this).find('#entr-2').addClass('animated fadeInUp');

			setTimeout(function(){
				$('#entr-3').addClass('animated fadeInUp');
			},400);
			setTimeout(function(){
				$('#entr-4').addClass('animated fadeInUp');
			},800);
			setTimeout(function(){
				$('#entr-1').addClass('animated fadeInUp');
			},1200);

		});

		$('.project-target.style-2:in-viewport').each(function(){
			$(this).find('.project-text-block').addClass('animated fadeInUp');
		});

		$('.project-results.style-2:in-viewport').each(function(){
			$(this).find('.title').removeClass('showed');
			$(this).find('.project-text-block').addClass('animated fadeInUp');
		});
		// $('footer:in-viewport').each(function(){
		// 	$(this).addClass('active');
		// });

		$(window).on('scroll', function(){
			$('.timeline .history-item:in-viewport').each(function(){

				TweenMax.staggerTo($(this).find('.year, .descr span'), 0, {
					className: "+=showed"
				}, .15);
				$(this).find('.image-container').addClass('active');

			});
			heightDetect();
			$('.quotes-block:in-viewport(100)').each(function(){

				TweenMax.staggerTo($('blockquote, blockquote span, .quotes-block .author-block, .quotes-block .author-block span'), 0, {
					className: "+=showed"
				}, .15);

			});
			$('.achiv:in-viewport(200)').each(function(){

				TweenMax.staggerTo($('.achiv-text span, .achiv .title, .achiv .about-link'), 0, {
					className: "+=showed"
				}, .15);

				setTimeout(function(){
					$('.counter-container-round').addClass('activated');
				},300);

				setTimeout(function(){
					$('.counter-entry-round').addClass('sec-round');
				},600);

				setTimeout(function(){
					$('.counter-entry').addClass('act-entry');
				},800);

				setTimeout(function(){
					$('.counter-entry-round').addClass('third-round');
				},1000);

				setTimeout(function(){
					$('.counter-container-round').addClass('round-anim');
					counterInit();
				},1200);

			});
			$('.vetryanka:in-viewport(0)').each(function(){

				setTimeout(function(){
					$('.vetryanka-rounds').addClass('activated');
				},600);
				setTimeout(function(){
					$('.vetryanka-rounds').addClass('act-entry');
					counterInit();
				},1000);

			});

			$('.counters:in-viewport').each(function(){
				countersHeight();
			})

			$('.projects-block:in-viewport').each(function(){
				TweenMax.staggerTo($('.projects-block .project-item a .item-title span'), 0, {
					className: "showed"
				}, .15);
			});

			$('.project-launch:in-viewport').each(function(){

				var $this = $(this);
				TweenMax.staggerTo($this.find('.title, .text span'), 0, {
					className: "+=showed"
				}, .15);
				TweenMax.staggerTo($this.find('.circle, .circle-border'), 0, {
					className: "+=animated zoomIn2"
				}, .55);
				setTimeout(function(){
					$this.find('.arrow').addClass('showed');
				},600);
				setTimeout(function(){
					$this.find('.circle-arrow-container').addClass('rotated');
				},1500);

			});
			$('.project-results:in-viewport').each(function(){

				var $this = $(this);
				TweenMax.staggerTo($this.find('.title, .text span'), 0, {
					className: "+=showed"
				}, .15);
				TweenMax.staggerTo($this.find('.circle, .circle-border'), 0, {
					className: "+=animated zoomIn2"
				}, .55);
				setTimeout(function(){
					$this.find('.arrow').addClass('showed');
				},600);
				setTimeout(function(){
					$this.find('.circle-arrow-container').addClass('rotated');
				},1500);

			});

			$('.contacts-form:in-viewport(0)').each(function(){
				$(this).addClass('animated fadeInUp');
			});

			$('.description-block:in-viewport(0)').each(function(){
				$(this).find('.container').addClass('animated fadeInUp');
			});

			$('.img-block .img-container:in-viewport(0)').each(function(){

				$(this).find('#entr-2').addClass('animated fadeInUp');

				setTimeout(function(){
					$('#entr-3').addClass('animated fadeInUp');
				},400);
				setTimeout(function(){
					$('#entr-4').addClass('animated fadeInUp');
				},800);
				setTimeout(function(){
					$('#entr-1').addClass('animated fadeInUp');
				},1200);

			});

			$('.project-target.style-2:in-viewport').each(function(){
				$(this).find('.project-text-block').addClass('animated fadeInUp');
			});

			$('.project-results.style-2:in-viewport').each(function(){
				$(this).find('.title').removeClass('showed');
				$(this).find('.project-text-block').addClass('animated fadeInUp');
			});
			// $('footer:in-viewport').each(function(){
			// 	$(this).addClass('active');
			// });
			
		});
	} else{

		

		$('.areas-listing-mobile li').each(function(){

			var path = $(this).data('path');
			bgBclock = $(this).find('.bg-container');
			bgBclock.css({
				'background-image': 'url(' + path + ')',
				'opacity': '0.2'
			})

		});
		
		$('.video-desktop').remove();


	}
	directionsHeight();
	$('input, textarea').focusin(function(){
		$(this).closest('.input-holder').addClass('focused');
	});

	$('input, textarea').focusout(function(){
		$(this).closest('.input-holder').removeClass('focused');
	});

	$('.photos-carousel').each(function(){

		var owl = $(this);
		owl.owlCarousel({
			items:1,
			addClassActive : true,
			loop: true
		});

	});

	TweenMax.staggerTo($('.about-us .vetryanka .vetryanka-rounds .dot'), 0, {
		className: "dot growanim"
	}, .95);

	$(window).resize(function() {

		heightDetect();
		directionsHeight()
		if( $('.white-trigger').css('display') == 'block'){
			headerTrigger();
		}

	});	
	
	
	$('img.svg').each(function(){
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var $svg = jQuery(data).find('svg');

			// Add replaced image's ID to the new SVG
			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			$svg = $svg.removeAttr('xmlns:a');

			// Replace image with new SVG
			$img.replaceWith($svg);

		}, 'xml');

	});
});

var progress = 0;

$(".wpcf7").on('wpcf7:invalid', function(){
	progress = 1.1;
	return progress;
});

[].slice.call( document.querySelectorAll( '.progress-button' ) ).forEach( function( bttn, pos ) {
	new UIProgressButton( bttn, {
		callback : function( instance ) {
			var interval = setInterval( function() {
				progress = Math.min( progress + Math.random() * 0.1, 1 );
				instance.setProgress( progress );

				if( progress === 1 ) {
					instance.stop( pos === 1 || pos === 3 ? -1 : 1 );
					clearInterval( interval );
					progress = 0;
				}
			}, 75 );
		}
	} );
} );

$.fn.isOnScreen = function(){
	
	var win = $(window);
	
	var viewport = {
		top : win.scrollTop(),
		left : win.scrollLeft()
	};
	viewport.right = viewport.left + win.width();
	viewport.bottom = viewport.top + win.height();
	
	var bounds = this.offset();
	bounds.right = bounds.left + this.outerWidth();
	bounds.bottom = bounds.top + this.outerHeight();
	
	return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
	
};


function heightDetect() {

	$(".home-banner, .about-banner, .caise-banner, .meteo-banner").css("height", $(window).height());
	$('.history-item').each(function(){
		var imgh = $(this).find('.image-container').height();
		$(this).find('.history-info-container').height(imgh);
	});

};

function directionVideoBg(){

	$('.projects-block .project-item').each(function(){

		var figure = $(this).hover( hoverVideo, hideVideo );

		function hoverVideo(e) {  
			$('video', this).get(0).play(); 
		}

		function hideVideo(e) {
			$('video', this).get(0).pause(); 
		}
	})

}
function videoBG(){

	$('.project-item .video-bg').each(function(e){
		var $this = $(this);
		var settings ={};
		if ($this.data('settings')) {
			eval('settings=' + $(this).data('settings'));
		}
		$(this).tubular(
			settings
		);
	});

}
function drawingLine(){

	if($('.timeline').length>0){

		var pos = $('.timeline').offset().top - 450;
		$(document).on('scroll', function(e) {
			$('.timeline').isInViewport({ tolerance: 0 }).each(function(){
				$('.timeline .line').css({'height': '' + (document.body.scrollTop - pos + 10) + 'px'});
			});
		});

	}

}
function animationInit(){

	$(".reactions-container").addClass('activated');
	$(".reactions-entry").addClass("animated zoomIn2").css('opacity', '1');

}
function videoInit(){

	$('.pretty-embed').each(function(){
		$().prettyEmbed({ useFitVids: true });
	})

}

function workAreasInit(){
	var listItems = $('.reactions-stystem-holder .areas-listing li .dot'),
		listItemsArray = listItems.toArray();
	listItemsArray.sort(function() {return 0.5-Math.random()});
	TweenMax.staggerTo(listItemsArray, 0, {
						className: "+=active"
					}, 2.75);


	var time = 1000,
		timer;

	function handlerIn() {
		var $this = $(this);
		setTimeout(function(){
			$this.find('.icon').stop(true).addClass('active');
		}, time);
	}

	function handlerOut() {
		clearTimeout(timer);
		var $this = $(this);
		$this.find('.icon').removeClass('active');
	}

	var myTimeOut;
	$(".reactions-stystem-holder .areas-listing li a").mouseenter(function(){
		var $this = $(this);
		myTimeOut = setTimeout(function(){
			$this.find('.icon').addClass('active');
		}, 10);
	});
	$(".reactions-stystem-holder .areas-listing li a").mouseleave(function(){
		clearTimeout(myTimeOut);
		var $this = $(this);
		$this.find('.icon').removeClass('active');
	});
	
}

function counterInit(){

	$('.count').each(function () {

		$(this).prop('Counter',0).animate({
			Counter: $(this).data('count')
		}, {
			duration: 2000,
			easing: 'swing',
			step: function (now) {
				$(this).text(Math.ceil(now));
			}
		});

	});

}

function countersHeightBlock(){
	var maxHeight = 0;
	
	$('.counter-item').each(function(){

		var item = $(this);
		var itemH = $(this).data('height');
		var itemW = $(this).data('mwidth');

		if($(window).width() > 520){
			if (itemH > maxHeight){
				maxHeight = itemH;
			}
			item.closest('.counters-container').height(maxHeight);
		} else {
			item.find('.counter-item-entry').css('width', itemW + '%');
		}

	});
}

function countersHeight(){

	var time = 500;
	

	var c = jQuery.makeArray($('.counter-item'));
	c.sort(function(a,b){
		a = $(a).data('height');
		b = $(b).data('height');
		return b - a
	});
	$.each(c,function(){
		var $this = $(this);
		var itemH = $this.data('height');
		var itemW = $(this).data('mwidth');

		if($(window).width() > 520){

			setTimeout( function(){
				$this.find('.counter-entry').css('height', itemH + 'px');
				setTimeout( function(){
					counterInit();
					TweenMax.staggerTo($this.find('.more, .count, .text'), 0, {
						className: "+=showed"
					}, .35);
					// item.find('.count').addClass('showed');
				}, 800);
			}, time);
		}
		else {
			$this.find('.counter-item-entry').css('width', itemW + '%');
		}
		time += 500;
	});
}
function directionsHeight(){

	$('.sub-directions').each(function(){

		var container = $('.direction-container');
		if ($(window).width()>767){
			container.children('.direction-column-4,.direction-column-8,.direction-column-3').height($('.sub-directions').height()/2);
			container.children('.direction-column-4.full, .direction-column-3.full, .direction-column-8.full').height($('.sub-directions').height());
			container.find('.direction-column-8.full .column').height($('.sub-directions').height()/2);
		}
		if ($(window).width()<767){
			$('.sub-directions').height(container.height())
		}

	})



}
function popupCall(){

	var time;

	$('.popup-btn').click(function() {
		var popup_id = $('#' + $(this).attr("rel"));
		var offset = $('.sub-directions').offset().top;
		$('.popup').removeClass('animated inactive fadeOut');
		$(popup_id).addClass('active animated zoomIn2');
		$('header').addClass('disabled');
		$('.sub-directions').css({'z-index': '99'});
		$(this).closest('.direction-container').addClass('disabled');
		$('html, body').animate({scrollTop: offset + 'px'});
		if ($(window).width()<769){

			var entryH = $(popup_id).find('.popup_content').outerHeight() + 180;
			$('.sub-directions').css('min-height', entryH + 'px');
			$(popup_id).find('.popup_content').css('padding', '90px 0');
			$('.sub-directions').find('video').css('height', $('.sub-directions').height())
		}
		clearTimeout(time);
		return false
	});

	$('.popup .close').click(function() {
		$('.sub-directions').css({'min-height': '', 'z-index': '2'});
		$('.popup.active').removeClass('animated zoomIn2');
		$('.popup.active').addClass('inactive animated fadeOut');
		time = setTimeout(function(){
			$('.popup').removeClass('active');
		},600);
		$('header').removeClass('disabled');
		$('.direction-container').removeClass('disabled');
		return false
	});
	if ($(window).width()<769){
		$('.popup .close').click(function() {
			$('.sub-directions').find('video').css('height', $('.sub-directions').height())
			$('.sub-directions').css('height', $('.direction-container').height());
			return false
		});
	}
	if ($(window).width()>767){
		$('body').click(function(e){
			if (!$(e.target).closest('.mobile-popup').hasClass('active')){
				// $('header').removeClass('disabled');
				// $('.popup').removeClass('active animated zoomIn2');
				// $('.direction-container').removeClass('disabled');
			}
			// return false;
		});
	}
	

	$(document).keydown(function(e) {
		// ESCAPE key pressed
		if (e.keyCode == 27) {
			$('.sub-directions').css('min-height', 'auto');
			$('.popup').removeClass('active animated zoomIn2');
			$('.direction-container').removeClass('disabled');
		}
	});
}
function bgMouseMove(){

	// var bglayer = $('.bgmove');
	var bglayer2 = $('.foreground');
	var overlay = $('.banner-entry, .banner-entry .banner-title');
}
function initSlider(){

	if($('.simple-slider-holder.style-1').length>0) {
		$('.simple-slider-holder.style-1 .simple-carousel').each(function(){
			var width = $('.simple-slider-holder.style-1').width();
			var jcarousel_simple = $('.simple-slider-holder.style-1 .simple-carousel');
			jcarousel_simple.on('jcarousel:reload jcarousel:create', function () {
				$(this).jcarousel('items').css('width', width + 'px');
			})
			.on('jcarousel:targetin', 'li', function() {
				$(this).addClass('active');
				TweenMax.staggerTo($(this).find('.number, .title, .text'), 0, {
					className: "+=showed"
				}, .45);
			})
			.on('jcarousel:targetout', 'li', function() {
				$(this).removeClass('active');
				 TweenMax.staggerTo($(this).find('.number, .title, .text'), 0, {
					className: "-=showed"
				}, .45);
			})
			.jcarousel({
				wrap: 'circular',
				animation: {
					duration: 0,
				}
			});
			$('.simple-slider-holder.style-1 .jcarousel-pagination')
			.on('jcarouselpagination:active', 'a', function() {
				$(this).addClass('active');
			})
			.on('jcarouselpagination:inactive', 'a', function() {
				$(this).removeClass('active');
			}).jcarouselPagination({
				item: function(page) {
					return '<a><span>' + page + '</span></a>';
				}
			});
		})

	}

	if($('.simple-slider-holder.style-2').length>0) {

		$('.simple-slider-holder.style-2 .simple-carousel').each(function(){

			var width = $('.simple-slider-holder.style-2 .simple-carousel').width();

			var jcarousel_simple = $('.simple-slider-holder.style-2 .simple-carousel');

			var left_content = $('.left-slider');

			jcarousel_simple.on('jcarousel:reload jcarousel:create', function () {
				$(this).jcarousel('items').css('width', width + 'px');
			})
			.on('jcarousel:targetin', 'li', function() {
				$(this).addClass('active');
				var rIndex = $(this).index();
			})
			.on('jcarousel:targetout', 'li', function() {
				$(this).removeClass('active');
				 TweenMax.staggerTo($(this).find('.img-container, .title, .text'), 0, {
					className: "-=showed"
				}, .1);
			})
			.jcarousel({
				wrap: 'circular'
			});
			$('.simple-slider-holder.style-2 .jcarousel-pagination')
			.on('jcarouselpagination:active', 'a', function() {
				$(this).addClass('active');
			})
			.on('jcarouselpagination:inactive', 'a', function() {
				$(this).removeClass('active');
			}).jcarouselPagination({
				item: function(page) {
					return '<a href="#' + page + '"><span>' + page + '</span></a>';
				}
			});
			$('.simple-slider-holder.style-2 .prev-slide').on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.jcarouselControl({
				target: '-=1'
			});

			$('.simple-slider-holder.style-2 .next-slide').on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.jcarouselControl({
				target: '+=1'
			});
		})

	}

	if($('.simple-slider-holder.style-3').length>0) {

		$('.simple-slider-holder.style-3 .simple-carousel').each(function(){
			var width = $('.simple-slider-holder.style-3').width();
			var jcarousel_simple = $('.simple-slider-holder.style-3 .simple-carousel');
			jcarousel_simple.on('jcarousel:reload jcarousel:create', function () {
				$(this).jcarousel('items').css('width', width + 'px');
			})
			.on('jcarousel:targetin', 'li', function() {
				$(this).addClass('active');
				$(this).find('.img-container').addClass('showed')
				TweenMax.staggerTo($(this).find('.title, .text, .more-link'), 0, {
					className: "+=showed"
				}, .1);
			})
			.on('jcarousel:targetout', 'li', function() {
				$(this).removeClass('active');
				 TweenMax.staggerTo($(this).find('.title, .text, .img-container, .more-link'), 0, {
					className: "-=showed"
				}, .1);
			})
			.jcarousel({
				wrap: 'circular',
				animation: {
					duration: 0,
				}
			});
			$('.simple-slider-holder.style-3 .jcarousel-pagination')
			.on('jcarouselpagination:active', 'a', function() {
				$(this).addClass('active');
			})
			.on('jcarouselpagination:inactive', 'a', function() {
				$(this).removeClass('active');
			}).jcarouselPagination({
			   item: function(page) {
				return '<a href="#' + page + '"><span>' + page + '</span></a>';
				}
			});
			$('.simple-slider-holder.style-3 .prev-slide').on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.jcarouselControl({
				target: '-=1'
			});

			$('.simple-slider-holder.style-3 .next-slide').on('jcarouselcontrol:inactive', function() {
				$(this).addClass('inactive');
			})
			.on('jcarouselcontrol:active', function() {
				$(this).removeClass('inactive');
			})
			.jcarouselControl({
				target: '+=1'
			});
		})
	}
}
function customParallax(){
	if ($('.our-history').length>0){
		var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

		var tween1 = new TimelineMax ()
		.add([
			TweenMax.fromTo(".history-item#item-1 .image-container img", 1, {top: -60}, {top: 60, ease: Linear.easeNone})
		]);
		var tween2 = new TimelineMax ()
		.add([
			TweenMax.fromTo(".history-item#item-2 .image-container img", 1, {top: -60}, {top: 60, ease: Linear.easeNone})
		]);
		var tween3 = new TimelineMax ()
		.add([
			TweenMax.fromTo(".history-item#item-3 .image-container img", 1, {top: -60}, {top: 60, ease: Linear.easeNone})
		]);
		var tween4 = new TimelineMax ()
		.add([
			TweenMax.fromTo(".history-item#item-4 .image-container img", 1, {top: -60}, {top: 60, ease: Linear.easeNone})
		]);
		var tween5 = new TimelineMax ()
		.add([
			TweenMax.fromTo(".history-item#item-5 .image-container img", 1, {top: -60}, {top: 60, ease: Linear.easeNone})
		]);
		var tween6 = new TimelineMax ()
		.add([
			TweenMax.fromTo(".history-item#item-6 .image-container img", 1, {top: -60}, {top: 60, ease: Linear.easeNone})
		]);
		var tween7 = new TimelineMax ()
		.add([
			TweenMax.fromTo(".history-item#item-7 .image-container img", 1, {top: -60}, {top: 60, ease: Linear.easeNone})
		]);
		var tween8 = new TimelineMax ()
		.add([
			TweenMax.fromTo(".history-item#item-8 .image-container img", 1, {top: -60}, {top: 60, ease: Linear.easeNone})
		]);

		new ScrollMagic.Scene({triggerElement: ".history-item#item-1"})
			.setTween(tween1)	
			// .addIndicators()
			.addTo(controller);

		new ScrollMagic.Scene({triggerElement: ".history-item#item-2"})
			.setTween(tween2)
			// .addIndicators()
			.addTo(controller);	

		new ScrollMagic.Scene({triggerElement: ".history-item#item-3"})
			.setTween(tween3)
			// .addIndicators()
			.addTo(controller);
		new ScrollMagic.Scene({triggerElement: ".history-item#item-4"})
			.setTween(tween4)
			// .addIndicators()
			.addTo(controller);
		new ScrollMagic.Scene({triggerElement: ".history-item#item-5"})
			.setTween(tween5)
			// .addIndicators()
			.addTo(controller);
		new ScrollMagic.Scene({triggerElement: ".history-item#item-6"})
			.setTween(tween6)
			// .addIndicators()
			.addTo(controller);
		new ScrollMagic.Scene({triggerElement: ".history-item#item-7"})
			.setTween(tween7)
			// .addIndicators()
			.addTo(controller);
		new ScrollMagic.Scene({triggerElement: ".history-item#item-8"})
			.setTween(tween8)
			// .addIndicators()
			.addTo(controller);
	}
}
function headerTrigger(){
	if ($('.white-trigger').length>0){
		setTimeout(function(){
			var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0.1", duration: $('.white-trigger').outerHeight()}});
			if($('.white-trigger').hasClass('about-us')){
				controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0.1", duration: $('.white-trigger').outerHeight()}});
			}
			
			new ScrollMagic.Scene({triggerElement: ".white-trigger"})
				.setClassToggle("header", "inversed") // add class toggle
				// .addIndicators() // add indicators (requires plugin)
				.addTo(controller);
		},600)
	}
}
function footerBlocksH(){
	var maxHeight = -1;
	$('.footer').each(function(){
		$(this).find('.single-contact-item').each(function(){
			maxHeight = maxHeight > $(this).find('.descr').height() + 54 ? maxHeight : $(this).find('.descr').height() + 54;
			$(this).height(maxHeight)
		})
	});
}
function bgMoveInit(){
	var card = $(".meteo-banner .entry");
}
