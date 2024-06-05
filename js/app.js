document.addEventListener("DOMContentLoaded", function () {
  init();

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


document.addEventListener("DOMContentLoaded", function () {
  init();

  function init() {
    observeSlideInElements();  // スライドイン要素の監視
    observeFadeInElements();   // フェードイン要素の監視
  }

  function observeSlideInElements() {
    const slideLeftElements = document.querySelectorAll(".slide-left");
    const slideRightElements = document.querySelectorAll(".slide-right");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("slide-left")) {
            entry.target.classList.add("slide-left-in");  // 実際に左からスライドイン
          } else if (entry.target.classList.contains("slide-right")) {
            entry.target.classList.add("slide-right-in");  // 実際に右からスライドイン
          }
          observer.unobserve(entry.target);  // 一度表示された要素は監視から外す
        }
      });
    });

    slideLeftElements.forEach(element => {
      observer.observe(element);
    });

    slideRightElements.forEach(element => {
      observer.observe(element);
    });
  }

  function observeFadeInElements() {
    const fadeElements = document.querySelectorAll(".fd");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fd-in-visible");  // 実際にフェードイン
          observer.unobserve(entry.target);  // 一度表示された要素は監視から外す
        }
      });
    });

    fadeElements.forEach(element => {
      observer.observe(element);
    });
  }
});
