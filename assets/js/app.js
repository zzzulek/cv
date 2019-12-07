// document.onmousemove = function(e) {
//   document.body.style.setProperty('--x',(e.clientX)+'px');
//   document.body.style.setProperty('--y',(e.clientY)+'px');
//
// }


// Меню
    var menu = $('.menu');

    $('.header__toggle, .menu__close').click(function (event) {
        event.preventDefault();

        menu.toggleClass('menu_opened');
    });

    $(document).bind('keydown', function(event) {
        if (event.which == 27) {
            menu.removeClass('menu_opened');
        }
    });

    $('.menu__item').click(function () {
        menu.removeClass('menu_opened');
    });

    // Скролл до якоря
    $("a[href*=\\#]:not([data-popup])").click(function(e) {
        e.preventDefault();
        var href = $(e.target).attr('href');

        let top  = 0;
        let url  = $(e.target).attr('href');
        let hash = url.substring(url.indexOf('#')+1);

        if (href != '#') {
            if ($('#' + hash).length) {
                top = $('#' + hash).offset().top;
            }
        }

        $('html, body').animate({
            scrollTop: top,
        }, 500, function () {
            window.location.hash = hash;
        });

    });


//----------------------- cursor

var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),

    init: function() {
        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;

        this.setupEventListeners();
        this.animateDotOutline();
    },

    setupEventListeners: function() {
        var self = this;

        // Anchor hovering
        document.querySelectorAll('a').forEach(function(el) {
            el.addEventListener('mouseover', function() {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function() {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });

        document.querySelectorAll('.header__nav').forEach(function(el){
            el.addEventListener('mouseover', function(){
                self.$outline.style.border = 'none';
            });
            el.addEventListener('mouseout', function(){
                self.$outline.style.border = 'solid 1px #FF0000';
            });
        });

        // Click events
        document.addEventListener('mousedown', function() {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function() {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });


        document.addEventListener('mousemove', function(e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + 'px';
            self.$dot.style.left = self.endX + 'px';
        });

        // Hide/show cursor
        document.addEventListener('mouseenter', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        });

        document.addEventListener('mouseleave', function(e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        });
    },

    animateDotOutline: function() {
        var self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';

        requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function() {
        var self = this;

        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(2)';
            self.$outline.style.border = 'none';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$outline.style.border = 'solid 1px #FF0000';
        }
    },

    toggleCursorVisibility: function() {
        var self = this;

        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    }
}

cursor.init();



//---------------- carousel

var slideshowEls = document.querySelectorAll('.js-slideshow');

for ( var i=0; i < slideshowEls.length; i++ ) {
    var carousel = slideshowEls[i];
    if(i==1){
        initCarouselContainer( carousel, true );
    }else initCarouselContainer( carousel, false );

}

function initCarouselContainer( carousel, direction ) {

    let tickerSpeed = 1;
    let isPaused = false;
    if(direction){
        var flkty = new Flickity( carousel, {
            autoPlay: false,
            prevNextButtons: false,
            pageDots: false,
            draggable: true,
            wrapAround: true,
            selectedAttraction: 0.015,
            friction: 0.25,
            rightToLeft: true,
        });
    }else {
        var flkty = new Flickity( carousel, {
            autoPlay: false,
            prevNextButtons: false,
            pageDots: false,
            draggable: true,
            wrapAround: true,
            selectedAttraction: 0.015,
            friction: 0.25,
            rightToLeft: false,
        });
    }


    flkty.x = 0;

    function update(){
        if (isPaused) return;
        if (flkty.slides) {
            flkty.x = (flkty.x - tickerSpeed) % flkty.slideableWidth;
            flkty.selectedIndex = flkty.dragEndRestingSelect();
            flkty.updateSelectedSlide();
            flkty.settle(flkty.x);
        }
        window.requestAnimationFrame(update);
    };

    const pause = () => {
        isPaused = true;
    };

    const play = () => {
        if (isPaused) {
            isPaused = false;
            window.requestAnimationFrame(update);
        }
    };


    carousel.addEventListener('mouseenter', pause, false);
    carousel.addEventListener('focusin', pause, false);
    carousel.addEventListener('mouseleave', play, false);
    carousel.addEventListener('focusout', play, false);

    flkty.on('dragStart', () => {
        isPaused = true;
    });

    update();
}


//------------- header

$(function() {
    toggleHeader();
    $(window).on("scroll", toggleHeader);
});

function toggleHeader () {
    if($(window).scrollTop() > 50) {
        $(".header").addClass("active");
    } else {
       $(".header").removeClass("active");
    }
}
