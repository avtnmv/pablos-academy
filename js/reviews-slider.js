document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Swiper
    const reviewsSwiper = new Swiper('.reviews__slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        centeredSlides: true,
        
        // Пагинация
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        
        // Брейкпоинты
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

    // Кастомная навигация
    const prevBtn = document.querySelector('.reviews__nav-btn--prev');
    const nextBtn = document.querySelector('.reviews__nav-btn--next');

    // Функция обновления состояния кнопок
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

    // Обработчики кнопок
    prevBtn.addEventListener('click', () => {
        reviewsSwiper.slidePrev();
    });

    nextBtn.addEventListener('click', () => {
        reviewsSwiper.slideNext();
    });

    // Обновляем состояние кнопок при смене слайда
    reviewsSwiper.on('slideChange', updateNavButtons);
    
    // Инициализируем состояние кнопок
    updateNavButtons();

    // Модальное окно для видео
    const videoModal = document.getElementById('videoModal');
    const videoIframe = document.getElementById('videoIframe');
    const closeModalBtn = document.querySelector('.video-modal__close');
    const reviewSlides = document.querySelectorAll('.reviews__slide');

    // Открытие модального окна при клике на слайд
    reviewSlides.forEach(slide => {
        slide.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            
            videoIframe.src = youtubeUrl;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    function closeModal() {
        videoModal.classList.remove('active');
        videoIframe.src = '';
        document.body.style.overflow = '';
    }

    // Закрытие по клику на кнопку
    closeModalBtn.addEventListener('click', closeModal);

    // Закрытие по клику на overlay
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal || e.target.classList.contains('video-modal__overlay')) {
            closeModal();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
});
