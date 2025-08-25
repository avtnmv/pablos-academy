document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    const body = document.body;

    // Функция открытия/закрытия меню
    function toggleMenu() {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Управление sticky позиционированием хедера
        const header = document.querySelector('.header');
        console.log('Header found:', header);
        console.log('Mobile menu active:', mobileMenu.classList.contains('active'));
        
        if (mobileMenu.classList.contains('active')) {
            header.style.setProperty('position', 'static', 'important');
            console.log('Setting header position to static');
        } else {
            header.style.setProperty('position', 'sticky', 'important');
            console.log('Setting header position to sticky');
        }
    }

    // Обработчик клика по бургеру
    burger.addEventListener('click', toggleMenu);

    // Закрытие меню при клике на ссылку
    const mobileLinks = document.querySelectorAll('.header__mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Восстанавливаем sticky позиционирование
            const header = document.querySelector('.header');
            header.style.position = 'sticky';
        });
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Восстанавливаем sticky позиционирование
            const header = document.querySelector('.header');
            header.style.position = 'sticky';
        }
    });

    // Закрытие меню при изменении размера экрана
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968) {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            
            // Восстанавливаем sticky позиционирование
            const header = document.querySelector('.header');
            header.style.position = 'sticky';
        }
    });


});
