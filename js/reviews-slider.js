document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Swiper
    const reviewsSwiper = new Swiper('.reviews__slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        centeredSlides: false,
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
                centeredSlides: false,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false,
            }
        }
    });

    const prevBtn = document.querySelector('.reviews__nav-btn--prev');
    const nextBtn = document.querySelector('.reviews__nav-btn--next');

    function updateNavButtons() {
        if (reviewsSwiper.isBeginning) {
            prevBtn.disabled = true;
        } else {
            prevBtn.disabled = false;
        }

        if (reviewsSwiper.isEnd) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }

    prevBtn.addEventListener('click', () => {
        reviewsSwiper.slidePrev();
    });

    nextBtn.addEventListener('click', () => {
        reviewsSwiper.slideNext();
    });

    reviewsSwiper.on('slideChange', updateNavButtons);
    
    updateNavButtons();

    const videoModal = document.getElementById('videoModal');
    const videoIframe = document.getElementById('videoIframe');
    const closeModalBtn = document.querySelector('.video-modal__close');
    const reviewSlides = document.querySelectorAll('.reviews__slide');

    reviewSlides.forEach(slide => {
        slide.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            
            videoIframe.src = youtubeUrl;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        videoModal.classList.remove('active');
        videoIframe.src = '';
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', closeModal);

    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal || e.target.classList.contains('video-modal__overlay')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
});
