document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // parallax
  // Parallax effect for hero section
  gsap.to(".hero", {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Parallax effect for wave section
  gsap.to(".wave", {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".wave",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // Parallax effect for test1 section
  gsap.to(".test1", {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".test1",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // Parallax effect for test2 section
  gsap.to(".test2", {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      trigger: ".test2",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // リサイズ時のScrollTriggerリフレッシュ処理
  function refreshScrollTrigger() {
    ScrollTrigger.update(); // 新しい位置と高さを更新
    ScrollTrigger.refresh(); // ScrollTriggerをリフレッシュ
  }

  // 初期位置と高さを更新し、ScrollTriggerをリフレッシュ
  function initialRefresh() {
    const scrollTop = window.scrollY;
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      refreshScrollTrigger();
      window.scrollTo(0, scrollTop);
    });
  }

  initialRefresh();

  // リサイズ時の処理
  window.addEventListener("resize", function () {
    const scrollTop = window.scrollY;
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      refreshScrollTrigger();
      window.scrollTo(0, scrollTop);
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const shakeItems = document.querySelectorAll(".shake-item");

  function shake(element, delay) {
    gsap.fromTo(
      element,
      { rotation: -5 },
      {
        rotation: 5,
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        onComplete: () => resetRotation(element),
        delay: delay,
      }
    );
  }

  function resetRotation(element) {
    gsap.set(element, { rotation: 0 });
  }

  shakeItems.forEach((item, index) => {
    setInterval(() => {
      shake(item, Math.random() * 2); // ランダムなタイミングで揺れさせる
    }, (index + 1) * 3000); // 各アイテムを異なるタイミングで揺れさせる
  });
});



document.addEventListener("DOMContentLoaded", function() {
  const menuContent = document.querySelector('.menu-content');
  const items = Array.from(menuContent.children);

  // メニューアイテムを複製して無限スクロールを実現
  items.forEach(item => {
    const clone = item.cloneNode(true);
    menuContent.appendChild(clone);
  });

  // Draggableで横スクロールを実現
  gsap.registerPlugin(Draggable);

  Draggable.create(menuContent, {
    type: "x",
    bounds: { minX: -menuContent.scrollWidth / 2, maxX: 0 },
    edgeResistance: 0.65,
    inertia: true,
    onDrag: function() {
      if (this.x < -menuContent.scrollWidth / 2) {
        this.x += menuContent.scrollWidth / 2;
        this.endX += menuContent.scrollWidth / 2;
      } else if (this.x > 0) {
        this.x -= menuContent.scrollWidth / 2;
        this.endX -= menuContent.scrollWidth / 2;
      }
    },
    onThrowUpdate: function() {
      if (this.x < -menuContent.scrollWidth / 2) {
        this.x += menuContent.scrollWidth / 2;
        this.endX += menuContent.scrollWidth / 2;
      } else if (this.x > 0) {
        this.x -= menuContent.scrollWidth / 2;
        this.endX -= menuContent.scrollWidth / 2;
      }
    }
  });
});


