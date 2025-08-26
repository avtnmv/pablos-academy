
document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);
    
    const mainTitle = document.querySelector('.main__title');
    
    if (!mainTitle) return;
    
    function wrapWordsInSpans() {
        const text = mainTitle.textContent;
        const words = text.split(' ');
        mainTitle.innerHTML = words.map((word, index) => 
            `<span class="word" data-word="${index}">${word}</span>`
        ).join(' ');
        return document.querySelectorAll('.main__title .word');
    }
    
    const wordSpans = wrapWordsInSpans();
    
    gsap.set(wordSpans, { color: "#6C6C6C" });
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: mainTitle,
            start: "top 80%",
            end: "bottom 50%",
            scrub: 1,
            onUpdate: self => {
                const progress = self.progress;
                const totalWords = wordSpans.length;
                const activeWordIndex = Math.floor(progress * totalWords);
                
                wordSpans.forEach((word, index) => {
                    if (index < activeWordIndex) {
                        gsap.set(word, { color: "#FFFFFF" });
                    } else if (index === activeWordIndex) {
                        const wordProgress = (progress * totalWords) - activeWordIndex;
                        gsap.set(word, { 
                            color: `rgb(${Math.round(108 + (255 - 108) * wordProgress)}, ${Math.round(108 + (255 - 108) * wordProgress)}, ${Math.round(108 + (255 - 108) * wordProgress)})`
                        });
                    } else {
                        gsap.set(word, { color: "#6C6C6C" });
                    }
                });
            }
        }
    });
    
    gsap.fromTo(wordSpans, {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });
});
