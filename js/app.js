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

// 初期化関数
function init() {
  setupCanvas();  // キャンバス設定
  window.addEventListener('resize', setupCanvas);  // リサイズ時のキャンバス再設定
  window.addEventListener('scroll', handleScroll);  // スクロールイベントの処理
  observeFadeInElements();  // フェードイン要素の監視
  setupCollapseIconChanges();  // 折りたたみアイコンの動作設定
  addEventListeners();  // 追加のイベントリスナーを設定
  positionMobileSocialIconsAboveFooterAndBottomButton();  // フッターの高さに基づくSNSアイコンの位置調整
}

// フェードイン要素の監視 ビューポートに入る度にアニメーションを実行
function observeFadeInElements() {
  const fadeElements = document.querySelectorAll(".fd");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 要素がビューポートに入るときにクラスを追加
        entry.target.classList.add("fd-in");
        // 一度表示された要素は監視から外す
        observer.unobserve(entry.target);
      }
    });
  });

  fadeElements.forEach(element => {
    observer.observe(element);
  });
}
