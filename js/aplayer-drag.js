(function () {
  function initDraggableMiniPlayer() {
    var player = document.querySelector('.aplayer.aplayer-fixed');
    if (!player) return;
    if (player.dataset.dragBound === '1') return;
    player.dataset.dragBound = '1';

    player.style.right = '20px';
    player.style.left = 'auto';
    player.style.bottom = '20px';

    var startX = 0;
    var startY = 0;
    var originLeft = 0;
    var originTop = 0;
    var dragging = false;

    function getPoint(e) {
      if (e.touches && e.touches[0]) return e.touches[0];
      if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0];
      return e;
    }

    function clamp(val, min, max) {
      return Math.min(Math.max(val, min), max);
    }

    function onStart(e) {
      var p = getPoint(e);
      var rect = player.getBoundingClientRect();

      startX = p.clientX;
      startY = p.clientY;
      originLeft = rect.left;
      originTop = rect.top;
      dragging = true;

      player.style.left = originLeft + 'px';
      player.style.top = originTop + 'px';
      player.style.right = 'auto';
      player.style.bottom = 'auto';

      if (e.cancelable) e.preventDefault();
    }

    function onMove(e) {
      if (!dragging) return;
      var p = getPoint(e);
      var dx = p.clientX - startX;
      var dy = p.clientY - startY;

      var maxLeft = window.innerWidth - player.offsetWidth;
      var maxTop = window.innerHeight - player.offsetHeight;

      var nextLeft = clamp(originLeft + dx, 0, Math.max(0, maxLeft));
      var nextTop = clamp(originTop + dy, 0, Math.max(0, maxTop));

      player.style.left = nextLeft + 'px';
      player.style.top = nextTop + 'px';

      if (e.cancelable) e.preventDefault();
    }

    function onEnd() {
      dragging = false;
    }

    player.addEventListener('mousedown', onStart);
    player.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('mousemove', onMove, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchend', onEnd);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(initDraggableMiniPlayer, 600);
  });

  document.addEventListener('pjax:complete', function () {
    setTimeout(initDraggableMiniPlayer, 300);
  });
})();
