(function () {
  function initDraggableMiniPlayer() {
    var shell = document.querySelector('.aplayer.aplayer-fixed');
    if (!shell || shell.dataset.dragBound === '1') return;
    shell.dataset.dragBound = '1';

    // 拖动手柄：用可见主体，不拖白壳
    var body = shell.querySelector('.aplayer-body') || shell;
    shell.style.zIndex = '99999';

    var dragging = false;
    var sx = 0, sy = 0, ox = 0, oy = 0;

    function pt(e) {
      return (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]) || e;
    }
    function clamp(v, min, max) {
      return Math.min(Math.max(v, min), max);
    }

    function start(e) {
      var p = pt(e);
      var r = shell.getBoundingClientRect();
      sx = p.clientX; sy = p.clientY; ox = r.left; oy = r.top;
      dragging = true;

      shell.style.setProperty('left', ox + 'px', 'important');
      shell.style.setProperty('top', oy + 'px', 'important');
      shell.style.setProperty('right', 'auto', 'important');
      shell.style.setProperty('bottom', 'auto', 'important');
      if (e.cancelable) e.preventDefault();
    }

    function move(e) {
      if (!dragging) return;
      var p = pt(e);
      var dx = p.clientX - sx, dy = p.clientY - sy;
      var maxL = window.innerWidth - shell.offsetWidth;
      var maxT = window.innerHeight - shell.offsetHeight;
      var nl = clamp(ox + dx, 0, Math.max(0, maxL));
      var nt = clamp(oy + dy, 0, Math.max(0, maxT));

      shell.style.setProperty('left', nl + 'px', 'important');
      shell.style.setProperty('top', nt + 'px', 'important');
      if (e.cancelable) e.preventDefault();
    }

    function end() { dragging = false; }

    body.addEventListener('mousedown', start);
    body.addEventListener('touchstart', start, { passive: false });
    window.addEventListener('mousemove', move, { passive: false });
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);
  }

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(initDraggableMiniPlayer, 600);
  });
  document.addEventListener('pjax:complete', function () {
    setTimeout(initDraggableMiniPlayer, 300);
  });
})();
