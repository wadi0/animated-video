document.addEventListener('DOMContentLoaded', () => {
    const manWrapper = document.querySelector('.man-wrapper');
    const manImg = manWrapper.querySelector('img');
    const cards = Array.from(document.querySelectorAll('.card'));

    console.log('Script started. Phase 1 active (CSS).');

    // Initial position for the man (centered)
    const setManCenter = () => {
        manWrapper.style.left = '50%';
        manWrapper.style.transform = 'translateX(-50%)';
    };
    setManCenter();

    // PHASE 2 starts after 5 seconds of "resting"
    // Phase 1 (CSS) takes ~5s, so we wait 5s + 3s = 8s total
    const phase2Delay = 8000; 

    setTimeout(() => {
        console.log('Phase 2 starting...');

        // 1. Fade out scattered cards
        cards.forEach(card => {
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            card.style.opacity = '0';
            card.style.transform = 'scale(0.5)';
        });

        // 2. Move man and prep cards
        setTimeout(() => {
            console.log('Moving man to the right...');
            
            // Move man
            manWrapper.style.transition = 'left 1.5s ease-in-out, transform 1.5s ease-in-out';
            manWrapper.style.left = '85%';
            manWrapper.style.transform = 'translateX(-50%)';

            // Reset card styles for phase 2 (off-screen left)
            cards.forEach(card => {
                card.style.transition = 'none';
                card.style.animation = 'none';
                card.style.opacity = '0';
                card.style.left = '-200px';
                card.style.top = '20%';
            });

            // 3. Fly cards onto man
            setTimeout(() => {
                console.log('Flying cards onto man...');
                
                // Calculate landing spot above man
                const manRect = manWrapper.getBoundingClientRect();
                const landX = manRect.left + (manRect.width / 2) - 140; 

                cards.forEach((card, i) => {
                    setTimeout(() => {
                        card.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        card.style.left = landX + 'px';
                        card.style.top = (manRect.top - 220) + 'px'; // Raised slightly higher
                        card.style.opacity = '1';
                        card.style.transform = `rotate(${(i - 4) * 5}deg)`;
                        card.style.zIndex = 100 + i;

                        // Change man image when the second card starts coming
                        if (i === 1) {
                            manImg.src = 'man-2.png';
                            console.log('Man image changed to man-2.png on second card');
                        }

                    }, i * 600);
                });
            }, 1600); // Wait for man to finish moving

        }, 1000); // Wait for cards to fade out

    }, phase2Delay);
});
