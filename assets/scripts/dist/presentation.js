export function initializeSlideNavigation() {
    document.addEventListener('DOMContentLoaded', () => {
        // Slide navigation and content elements
        const slideNavs = document.querySelectorAll('.slide-nav');
        const slideTexts = document.querySelectorAll('.slide-text');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const slideContent = document.getElementById('slide-content');
        // Slides data (sample)
        const slidesData = [
            {
                title: 'The Ocean (The Internet)',
                description: 'The internet is an immense and ever-changing landscape, filled with countless websites, social media platforms, and digital content. Just as the sea is vast and deep, the internet is a boundless expanse where opportunities and challenges coexist. Navigating this ocean requires skill, strategy, and the right tools.',
                image: 'https://placehold.co/800x420/2c3e50/ecf0f1?text=The+Ocean'
            },
            {
                title: 'Your Boat (Your Website)',
                description: 'Your website is your boat, a vessel designed to carry you through the digital sea. It is the foundation of your online presence, a place where potential clients can learn about your products or services. However, just like an empty boat, a website without direction or purpose is merely a vessel adrift, waiting to be discovered.',
                image: 'https://placehold.co/800x420/2c3e50/ecf0f1?text=The+Boat'
            },
            {
                title: '🧭 Navigation System (Digital Marketing)',
                description: 'Digital marketing acts as the navigation system for your boat. It provides the direction and strategy needed to reach your target audience. This includes search engine optimization (SEO), content marketing, social media marketing, email marketing, and more. Without a clear navigation plan, your boat (website) may drift aimlessly, failing to reach its destination (clients).',
                image: 'https://placehold.co/800x420/2c3e50/ecf0f1?text=Navigation+System'
            },
            {
                title: 'Sails (Ad Campaigns)',
                description: 'Ad campaigns are like the sails of your boat, harnessing the power of trends and current events to propel you forward. Just as sails capture the wind to move a boat, ad campaigns capture the attention of potential clients by leveraging current trends, popular keywords, and effective messaging. The effectiveness of your sails (ad campaigns) depends on how well they are designed and how well they catch the wind (trends).',
                image: 'https://placehold.co/800x420/2c3e50/ecf0f1?text=Sails'
            },
            {
                title: 'The Wind (Trends)',
                description: 'Trends are the wind that fills your sails. They are the ever-changing currents of popular topics, technologies, and consumer behaviors. Staying attuned to these trends allows your boat to move swiftly and efficiently through the digital sea. Ignoring trends can leave your sails limp, making it difficult to reach your destination.',
                image: 'https://placehold.co/800x420/2c3e50/ecf0f1?text=The+Wind'
            },
            {
                title: '🎣 Fishing Tools (Web Analytics)',
                description: 'Web analytics provides the tools you need to pinpoint and capture your fish (clients). Just as a fisherman uses nets, lines, and hooks to catch fish, web analytics uses data and metrics to understand user behavior, track performance, and optimize your digital marketing efforts. Tools like Google Analytics, heatmaps, and conversion tracking help you identify what\'s working and what\'s not, allowing you to adjust your strategy accordingly.',
                image: 'https://placehold.co/800x420/2c3e50/ecf0f1?text=Fishing+Tools'
            },
            {
                title: 'The Crew (Your Team)',
                description: 'Your team is the crew that operates the boat. They are the experts who manage your website, execute digital marketing strategies, run ad campaigns, and analyze data. A skilled and cohesive crew ensures that your boat runs smoothly and efficiently, maximizing your chances of catching fish.',
                image: 'https://placehold.co/800x420/2c3e50/ecf0f1?text=The+Crew'
            },
            {
                title: '🐟 The Fish (Clients)',
                description: 'Your clients are the fish you are trying to catch. They are the end goal of your digital marketing efforts. Just as a fisherman seeks the right bait and techniques to catch different types of fish, you need to tailor your digital marketing strategies to attract and engage your target audience.',
                image: 'https://placehold.co/800x420/2c3e50/ecf0f1?text=The+Fish'
            },
            {
                title: '🛣️ The Journey',
                description: 'The journey of your boat through the digital sea is ongoing. It requires constant vigilance, adaptation, and improvement. Just as a fisherman adjusts his techniques based on the conditions and the behaviour of the fish, you must continuously refine your digital marketing strategies to stay ahead in the ever-changing landscape of the internet.',
                image: 'https://placehold.co/800x420/2c3e50/ecf0f1?text=The+Journey'
            }
        ];
        // Slide state
        let currentSlideIndex = 0;
        const totalSlides = Math.max(1, slideNavs.length, slidesData.length);
        function updateSlide(index) {
            if (index < 0 || index >= totalSlides)
                return;
            currentSlideIndex = index;
            // Update navs and slide-texts active classes
            slideNavs.forEach((nav, navIndex) => {
                nav.classList.toggle('active', navIndex === currentSlideIndex);
            });
            slideTexts.forEach((text, textIndex) => {
                text.classList.toggle('active', textIndex === currentSlideIndex);
            });
            // Update prev/next buttons if they exist
            if (prevBtn)
                prevBtn.disabled = currentSlideIndex === 0;
            if (nextBtn)
                nextBtn.disabled = currentSlideIndex === totalSlides - 1;
            // Update main slide content if container and data exist
            const data = slidesData[currentSlideIndex];
            if (slideContent && data) {
                slideContent.innerHTML = `
          <div class="col-md-6 col-lg-6 p-4 d-flex flex-column justify-content-center">
              <h1 class="display-4 fw-bold">${escapeHtml(data.title)}</h1>
              <p class="lead">${escapeHtml(data.description)}</p>
              <a href="#" target="_blank" rel="noopener noreferrer" class="cta-button w-50">learn more</a>
              <div class="nav-buttons">
                  <button id="prevBtn" aria-label="Previous slide" type="button" title="Previous" ${prevBtn && prevBtn.disabled ? 'disabled' : ''}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                      </svg>
                  </button>
                  <button id="nextBtn" aria-label="Next slide" type="button" title="Next" ${nextBtn && nextBtn.disabled ? 'disabled' : ''}>
                      <span>Next</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                      </svg>
                  </button>
              </div>
          </div>
          <div class="col-md-6 col-lg-6 p-4 d-flex align-items-center justify-content-center">
              <div class="media-placeholder">
                  <img src="${escapeAttr(data.image)}" alt="Slide image" class="img-fluid rounded">
              </div>
          </div>
        `;
                // Re-bind prev/next buttons inside the newly injected content
                const injectedPrev = slideContent.querySelector('#prevBtn');
                const injectedNext = slideContent.querySelector('#nextBtn');
                if (injectedPrev) {
                    injectedPrev.addEventListener('click', () => {
                        if (currentSlideIndex > 0)
                            updateSlide(currentSlideIndex - 1);
                    });
                }
                if (injectedNext) {
                    injectedNext.addEventListener('click', () => {
                        if (currentSlideIndex < totalSlides - 1)
                            updateSlide(currentSlideIndex + 1);
                    });
                }
            }
        }
        // Bind click and keyboard for slide navs
        slideNavs.forEach((nav, index) => {
            nav.addEventListener('click', () => updateSlide(index));
            nav.tabIndex = nav.tabIndex >= 0 ? nav.tabIndex : 0;
            nav.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateSlide(index);
                }
            });
        });
        // If prev/next buttons exist outside injected content, bind them too
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentSlideIndex < totalSlides - 1)
                    updateSlide(currentSlideIndex + 1);
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentSlideIndex > 0)
                    updateSlide(currentSlideIndex - 1);
            });
        }
        // Keyboard navigation for slides
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight')
                updateSlide(currentSlideIndex + 1);
            if (e.key === 'ArrowLeft')
                updateSlide(currentSlideIndex - 1);
        });
        // Touch/Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                updateSlide(currentSlideIndex + 1);
            }
            if (touchEndX > touchStartX + 50) {
                updateSlide(currentSlideIndex - 1);
            }
        }
        // Initial state on load
        if (slideNavs.length > 0) {
            updateSlide(0);
        }
        // Utility: simple escaping to avoid HTML injection from data
        function escapeHtml(str) {
            return str.replace(/[&<>"']/g, (m) => {
                switch (m) {
                    case '&':
                        return '&amp;';
                    case '<':
                        return '&lt;';
                    case '>':
                        return '&gt;';
                    case '"':
                        return '&quot;';
                    case "'":
                        return '&#39;';
                    default:
                        return m;
                }
            });
        }
        function escapeAttr(str) {
            return escapeHtml(str).replace(/"/g, '&quot;');
        }
    });
}
export function toggleFullscreen() {
    const icon = document.getElementById('fullscreen-icon');
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            icon === null || icon === void 0 ? void 0 : icon.classList.remove('fa-expand');
            icon === null || icon === void 0 ? void 0 : icon.classList.add('fa-compress');
        }).catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(() => {
                icon === null || icon === void 0 ? void 0 : icon.classList.remove('fa-compress');
                icon === null || icon === void 0 ? void 0 : icon.classList.add('fa-expand');
            });
        }
    }
}
//# sourceMappingURL=presentation.js.map