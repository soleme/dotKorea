/* 시작 */
Game.CHAPTERS.sort((a, b) => a.id - b.id);
(() => {
  let started = false;
  const start = () => { if (!started) { started = true; Game.boot(); } };
  if (document.fonts && document.fonts.load) {
    Promise.all([document.fonts.load('12px Galmuri11'), document.fonts.load('bold 12px Galmuri11')]).then(start, start);
    setTimeout(start, 1500);
  } else start();
})();
