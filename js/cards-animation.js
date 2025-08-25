// Target Audience cards animation with GSAP
document.addEventListener('DOMContentLoaded', function() {
    // Регистрируем ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    const targetAudienceCards = gsap.utils.toArray('.target-audience__card');
    const targetAudienceText = document.querySelector('.target-audience__text');
    
    // Функция для создания анимации карточек target-audience
    function animateTargetAudienceCards(cards) {
        if (cards.length === 0) return;
        
        cards.forEach((card, index) => {
            gsap.fromTo(card, 
                {
                    opacity: 0,
                    y: 100,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1, // Анимация синхронизирована со скоростью скролла
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }
    
    // Функция для анимации текста target-audience
    function animateTargetAudienceText(textElement) {
        if (!textElement) return;
        
        gsap.fromTo(textElement, 
            {
                opacity: 0,
                y: 100,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: textElement,
                    start: "top 90%",
                    end: "top 60%",
                    scrub: 1, // Анимация синхронизирована со скоростью скролла
                    toggleActions: "play none none reverse"
                }
            }
        );
    }
    
    // Применяем анимацию к target-audience cards и тексту
    animateTargetAudienceCards(targetAudienceCards);
    animateTargetAudienceText(targetAudienceText);
});
