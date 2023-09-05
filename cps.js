/**
* CPS カウンターの実装
*/

const cpsCheckerButton = document.querySelector('#cps-checker');
const displayCps = document.querySelector('#display-cps');
const displayMaxCps = document.querySelector('#display-max-cps');

// クリックされた時刻を保存する配列
let clickTimes = [];

// 最大のcpsを保存する変数
let maxCps = 0;

// ボタンクリックのイベントのリスナー
cpsCheckerButton.addEventListener("click", function () {
	const now = Date.now();
	clickTimes = [...clickTimes, now];

	window.requestAnimationFrame(updateCPS);
});

// cpsを更新する関数を定義
function updateCPS() {
	const now = Date.now();
	// 配列から1秒以前にクリックされた要素を削除する
	clickTimes = clickTimes.filter((value) => value >= now - 1000)

	// cpsの表示する
	const cps = clickTimes.length;
	displayCps.textContent = cps;

	// 最大cpsを更新
	maxCps = Math.max(cps, maxCps);
	displayMaxCps.textContent = maxCps;

	if (cps == 0) {
		window.cancelAnimationFrame(updateCPS);
	} else {
		window.requestAnimationFrame(updateCPS);
	}
}