document.addEventListener('DOMContentLoaded', function(){
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile menu
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mainNav');
  btn.addEventListener('click', ()=>{ nav.classList.toggle('open'); });

  // init AOS if available
  if(window.AOS) AOS.init({duration:800, once:true, offset:120});

  // init Swiper (hero)
  if(window.Swiper){
    new Swiper('.hero-swiper', {
      loop:true,
      autoplay:{delay:4500},
      pagination:{el:'.hero-swiper .swiper-pagination', clickable:true}
    });

    new Swiper('.testimonials-swiper', {
      loop:true,
      slidesPerView:1,
      spaceBetween:20,
      autoplay:{delay:5000},
      pagination:{el:'.testimonials-swiper .swiper-pagination', clickable:true}
    });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href === '#' || !href.startsWith('#')) return;
      e.preventDefault();
      const t = document.querySelector(href);
      if(t) t.scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile nav
      if(nav.classList.contains('open')) nav.classList.remove('open');
    });
  });

  // stats counters (animate when visible) - use requestAnimationFrame with easing
  const counters = document.querySelectorAll('.stat-number');
  if(counters.length){
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

    const runCounterRAF = (el, opts = {}) => {
      const target = Math.max(0, +el.getAttribute('data-target') || 0);
      // shorter duration for large numbers so they don't feel slow
      const baseDuration = opts.duration || 1200; // ms
      const startTimeRef = {v: null};

      const step = (ts) => {
        if(!startTimeRef.v) startTimeRef.v = ts;
        const elapsed = ts - startTimeRef.v;
        const progress = Math.min(1, elapsed / baseDuration);
        const eased = easeOutCubic(progress);
        const current = Math.round(eased * target);
        el.textContent = current.toLocaleString('en-US');
        if(progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('en-US');
      };

      requestAnimationFrame(step);
    };

    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const el = e.target;
          if(!el.classList.contains('counted')){
            // make GRADUADOS faster if large
            const tgt = +el.getAttribute('data-target');
            const duration = tgt >= 2000 ? 1000 : 1200;
            runCounterRAF(el, {duration});
            el.classList.add('counted');
          }
        }
      });
    }, {threshold:0.6});

    counters.forEach(c=>obs.observe(c));
  }
});
