/**
 * header.htmlを読み込み、指定の場所に挿入する
 */
async function loadHeader() {
  const containerId = 'header-placeholder';
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Error: Element with id "${containerId}" not found.`);
    return;
  }

  try {
    const response = await fetch('https://testie-c.github.io/header/');
    if (!response.ok) {
      throw new Error(`Failed to load header.html: ${response.statusText}`);
    }
    const headerHtml = await response.text();
    container.innerHTML = headerHtml;
    setupHamburgerMenu(); // ヘッダー読み込み後にイベントリスナーを設定
  } catch (error) {
    console.error('Failed to load header:', error);
  }
}

/**
 * ハンバーガーメニューの開閉機能を設定する
 */
function setupHamburgerMenu() {
  const hamburgerButton = document.querySelector('.hamburger-button');
  const navMenu = document.querySelector('.main-nav');

  if (hamburgerButton && navMenu) {
    hamburgerButton.addEventListener('click', () => {
      const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
      hamburgerButton.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('is-open');
    });

    // メニュー外をクリックで閉じる
    document.addEventListener('click', (event) => {
      const isClickInsideMenu = hamburgerButton.contains(event.target) || navMenu.contains(event.target);
      if (!isClickInsideMenu && navMenu.classList.contains('is-open')) {
        hamburgerButton.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });
  }
}

// ページの読み込みが完了したら関数を実行
document.addEventListener('DOMContentLoaded', loadHeader);
