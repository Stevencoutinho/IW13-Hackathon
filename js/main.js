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
  for(let i = 0; i < document.getElementsByClassName('slide').length; i++) {
    document.getElementById('page-change').insertAdjacentHTML('beforeend',
      `<option value=${i}>${i + 1}ページ</option>`
    );
  }

  // fullpage.js
  const FULL =   new fullpage("#fullpage", {
    anchors: ['page1', 'page2'],
    controlArrows: false,
    scrollingSpeed: 1000,
    lockAnchors: true,
    loopHorizontal: false,
    scrollHorizontally: true,
    fadingEffect: true,
    css3:true
  });
  let flg = true;

  // 文字を一文字ずつ表示する

  // var i = 0;
  // var char = document.getElementsByClassName('text').innerHTML;
  // document.getElementsByClassName('text').innerHTML = null;
  // function oneChar() {
  //   document.getElementsByClassName('text').innerHTML = char.substring(0, i++);
  //   if(i < char.length) {
  //     setTimeout("oneChar()", 100);
  //   }
  // }

  // window.onload = oneChar();

  Array.from(document.getElementsByClassName('slide')).map(e => {
    e.addEventListener('touchstart', () => {
      if(flg) {
        flg = fadeIn(document.getElementById('pageNav'), 300);
        document.getElementById('pageNav').classList.remove('none');
      }else {
        flg = fadeOut(document.getElementById('pageNav'), 300);
      }
      // console.log(FULL.getActiveSlide());
    });
  });

  // ページ移動
  document.getElementById('page-change').addEventListener('change', e => {
    FULL.moveTo('page1', e.target.value);
    flg = fadeOut(document.getElementById('pageNav'), 300);
  });

  // 最初のページに移る
  document.querySelector('#left').addEventListener('click', () => FULL.moveTo('page1', 0));
  
  // 読んでいた場所に戻る
  Array.from(document.getElementsByClassName('repage')).map(e => {
    e.addEventListener('click', () => FULL.moveTo('page1'));
  });

}



//========== function ==========
// フェードイン
const fadeIn = (node, duration) => {
  // display: noneでないときは何もしない
  if (getComputedStyle(node).display !== 'none') return;
  
  // style属性にdisplay: noneが設定されていたとき
  if (node.style.display === 'none') {
    node.style.display = '';
  } else {
    node.style.display = 'block';
  }
  node.style.opacity = 0;

  let start = performance.now();
  
  requestAnimationFrame(tick = timestamp => {
    // イージング計算式（linear）
    let easing = (timestamp - start) / duration;

    // opacityが1を超えないように
    node.style.opacity = Math.min(easing, 1);

    // opacityが1より小さいとき
    if (easing < 1) {
      requestAnimationFrame(tick);
    } else {
      node.style.opacity = '';
    }
  });

  return false;
};

// フェードアウト
const fadeOut = (node, duration) => {
  node.style.opacity = 1;

  var start = performance.now();
  
  requestAnimationFrame(tick = timestamp => {
    // イージング計算式（linear）
    var easing = (timestamp - start) / duration;

    // opacityが0より小さくならないように
    node.style.opacity = Math.max(1 - easing, 0);
    
    // イージング計算式の値が1より小さいとき
    if (easing < 1) {
      requestAnimationFrame(tick);
    } else {
      node.style.opacity = '';
      node.style.display = 'none';
    }
  });

  return true;
};