
function setDeckLoad(){
  //デッキコードからデッキを読み込む
  // フォームのデフォルトの送信動作を防止
  event.preventDefault();
  //入力されたurlを読み込み
  const url = document.getElementById('urlInput').value;

  //serverへの情報取得開始
  fetch('/scrape', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  })
    .then(response => response.json())
    .then(data => {
      //取得結果の解析
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.body, 'text/html');
    })
    .catch(error => {
      document.getElementById('result').innerText = 'エラーが発生しました';
      console.error('Error:', error);
    })
    .finally(() => {
      //目隠しを外す
      loadingDiv.style.display = 'none';
    });
}
