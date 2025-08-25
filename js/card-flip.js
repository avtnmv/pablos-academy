document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.about-us__card');
    
    cards.forEach(card => {
        const closeBtn = card.querySelector('.about-us__card-close');
        
        // Обработчик клика по карточке для переворота
        card.addEventListener('click', function(e) {
            // Предотвращаем переворот если кликнули по ссылке
            if (e.target.closest('.about-us__card-link')) {
                return;
            }
            
            // Переключаем состояние карточки
            card.classList.toggle('flipped');
        });
        
        // Обработчик клика по крестику для закрытия (теперь не нужен, так как клик по карточке переворачивает её)
        // if (closeBtn) {
        //     closeBtn.addEventListener('click', function(e) {
        //         e.stopPropagation();
        //         card.classList.remove('flipped');
        //     });
        // }
    });
    
    // Закрытие карточек при клике вне их
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.about-us__card')) {
            cards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });
    
    // Закрытие карточек при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });
});
