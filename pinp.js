/**
* Document Picture-in-Picture APIを使って#mainをピクチャーインピクチャーする。
*/

const pinpButton = document.querySelector('#pinp');
const main = document.querySelector('#main');

pinpButton.addEventListener('click', async () => {
	// ピクチャーインピクチャーのウインドウが表示されているかどうかを判定
	if (window.documentPictureInPicture.window) {
		// 表示されている場合は、ウインドウを閉じる
		window.documentPictureInPicture.window.close();
	} else {
		// 表示されていない場合は、ウインドウを表示
		const pinpWindow = await documentPictureInPicture.requestWindow({
			width: main.clientWidth, 
			height: main.clientHeight, 
		});
		// CSSをコピーする
		[...document.styleSheets].forEach((styleSheet) => {
			try {
			  const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
			  const style = document.createElement('style');
		
			  style.textContent = cssRules;
			  pinpWindow.document.head.appendChild(style);
			} catch (e) {
			  const link = document.createElement('link');
		
			  link.rel = 'stylesheet';
			  link.type = styleSheet.type;
			  link.media = styleSheet.media;
			  link.href = styleSheet.href;
			  pinpWindow.document.head.appendChild(link);
			}
		  });

		// ウインドウに要素を追加
		pinpWindow.document.body.classList.add("pinp-window");
		pinpWindow.document.body.append(main);

		// ウインドウが閉じられたとき
		pinpWindow.addEventListener("unload", (event) => {
			const pipMain = event.target.querySelector("#main");
			document.querySelector("#pinp-container").append(pipMain);
		});
	}
});