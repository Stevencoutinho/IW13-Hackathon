// 画面が読み込まれた時、is-slideを外し、アニメーションさせる
window.onload = document.body.classList.remove('is-slide');

const anker = Array.from(document.getElementsByTagName('a'));

anker.map(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const url = a.attributes[0].value;

    if(url !== '') {
      document.body.classList.add('is-slide-in');

      setTimeout(() => {
        window.location = url;
      }, 1000);
    }

    return false;
  });
});

// 現在表示されているhtmlファイル名
const  str = window.location.href.split('/').pop();

if(str === 'index.html') {

}
else if(str === 'book.html') {
// fullpage.js
new fullpage("#fullpage", {
  controlArrows: false,
  scrollingSpeed: 1000,
  lockAnchors: true,
  loopHorizontal: false,
  scrollHorizontally: true,
  fadingEffect: true,
  css3:true,
  slidesNavigation: true
});
}
