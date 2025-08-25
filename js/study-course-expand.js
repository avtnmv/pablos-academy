document.addEventListener('DOMContentLoaded', function() {
    const studyCourseLinks = document.querySelectorAll('.study-course__card-link');
    
    studyCourseLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.study-course__card');
            card.classList.toggle('expanded');
            
            // Поворачиваем стрелку
            const arrow = this.querySelector('svg');
            if (card.classList.contains('expanded')) {
                arrow.style.transform = 'rotate(180deg)';
            } else {
                arrow.style.transform = 'rotate(0deg)';
            }
        });
    });
});
