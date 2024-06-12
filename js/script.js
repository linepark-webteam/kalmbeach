// ナビゲーションの表示・非表示
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelector('.nav-links');
  const heroSection = document.querySelector('.hero');

  function handleScroll() {
    const heroSectionBottom = heroSection.offsetTop + heroSection.offsetHeight;

    if (window.scrollY > heroSectionBottom) {
      navLinks.style.display = 'block';  // ヒーローセクションの終わりを超えたら表示
    } else {
      navLinks.style.display = 'none';  // ヒーローセクションの範囲内またはそれより上なら非表示
    }
  }

  window.addEventListener('scroll', handleScroll);
});

document.addEventListener("DOMContentLoaded", function () {
  init();

  function init() {
    observeSlideInElements();  // スライドイン要素の監視
    observeFadeInElements();   // フェードイン要素の監視
    setupShakeItems();  // shake-itemのセットアップ
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

  function setupShakeItems() {
    const shakeItems = document.querySelectorAll(".shake-item");
    const menuItems = document.querySelectorAll(".menu-item a");

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

    // マウスホバー時に震えるアニメーションを追加
    shakeItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        shake(item, 0);
      });
    });

    // 対応するメニューアイテムにホバーした際にも対応するshake-itemを震えさせる
    menuItems.forEach(menuItem => {
      const targetId = menuItem.getAttribute('href').slice(1); // IDを取得
      const targetElement = document.querySelector(`.hero-container a[href='#${targetId}'] img`);

      menuItem.addEventListener('mouseenter', () => {
        if (targetElement) {
          shake(targetElement, 0);
        }
      });
    });
  }
});

// 無限スクロールメニュー
document.addEventListener('DOMContentLoaded', function() {
  const menuContent = document.querySelector('.menu-content');
  const items = Array.from(menuContent.children);

  // メニュー項目の複製を追加
  items.forEach(item => {
    const clone = item.cloneNode(true);
    menuContent.appendChild(clone);
  });

  // GSAPを使ってスムーズなスクロールを実現
  const totalWidth = menuContent.scrollWidth / 2;

  function repeatScroll() {
    gsap.fromTo(menuContent, 
      { x: 0 }, 
      {
        x: -totalWidth,
        ease: 'none',
        duration: 30,
        onComplete: repeatScroll
      });
  }

  repeatScroll();
});

// イントロアニメーション
document.addEventListener("DOMContentLoaded", function () {
  const openingAnimation = document.getElementById('opening-animation');
  const body = document.body;

  // 最初にbodyを透明にする
  body.style.opacity = '0';
  body.style.transition = 'opacity 2s';

  openingAnimation.addEventListener('animationend', function (e) {
    if (e.animationName === 'fadeOut') {
      openingAnimation.style.display = 'none';
      body.style.opacity = '1'; // ページ全体をフェードイン
    }
  });
});
