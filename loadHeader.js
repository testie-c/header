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
    // URLを絶対パスに修正
    const headerUrl = 'https://testie-c.github.io/header/index.html'; // 💡 ここを修正
    const response = await fetch(headerUrl);
    
    // HTTPエラーが発生した場合
    if (!response.ok) {
      throw new Error(`Failed to load header.html: ${response.statusText}`);
    }
    
    const headerHtml = await response.text();
    
    // 取得したHTMLをコンテナに挿入
    container.innerHTML = headerHtml;
  } catch (error) {
    console.error('Failed to load header:', error);
  }
}

// ページの読み込みが完了したら関数を実行
document.addEventListener('DOMContentLoaded', loadHeader);
