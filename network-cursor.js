// Site-wide constellation cursor layer for Team OmniAI
(function () {
  if (window.__omniNet) return; window.__omniNet = true;
  var coarse = window.matchMedia && matchMedia('(pointer: coarse)').matches;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (coarse && !reduced) return; // skip entirely on touch devices

  var c = document.createElement('canvas');
  c.setAttribute('aria-hidden', 'true');
  c.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:-1;';
  function mount() { document.body.appendChild(c); }
  document.body ? mount() : addEventListener('DOMContentLoaded', mount);

  var ctx = c.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2);
  var W, H, nodes, mouse = { x: -9999, y: -9999 };
  var N = 50, LINK = 130, MLINK = 190, PULL = 0.018;

  function resize() {
    W = c.width = innerWidth * dpr; H = c.height = innerHeight * dpr;
    nodes = [];
    for (var i = 0; i < N; i++) nodes.push({
      x: Math.random() * W, y: Math.random() * H,
      hx: 0, hy: 0,
      vx: (Math.random() - .5) * .22 * dpr, vy: (Math.random() - .5) * .22 * dpr
    });
    nodes.forEach(function (n) { n.hx = n.x; n.hy = n.y; });
  }
  resize();
  addEventListener('resize', resize);

  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(0,229,255,.30)';
    for (var i = 0; i < nodes.length; i++) { ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, 1.4 * dpr, 0, 7); ctx.fill(); }
    for (var a = 0; a < nodes.length; a++) for (var b = a + 1; b < nodes.length; b++) {
      var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y, d = Math.hypot(dx, dy);
      if (d < LINK * dpr) {
        ctx.strokeStyle = 'rgba(0,229,255,' + ((1 - d / (LINK * dpr)) * .10) + ')';
        ctx.lineWidth = dpr; ctx.beginPath(); ctx.moveTo(nodes[a].x, nodes[a].y); ctx.lineTo(nodes[b].x, nodes[b].y); ctx.stroke();
      }
    }
  }
  if (reduced) { drawStatic(); addEventListener('resize', drawStatic); return; }

  addEventListener('mousemove', function (e) { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; }, { passive: true });
  addEventListener('mouseleave', function () { mouse.x = mouse.y = -9999; });

  var running = true, last = 0, slowFrames = 0;
  document.addEventListener('visibilitychange', function () {
    running = !document.hidden;
    if (running) { last = performance.now(); requestAnimationFrame(tick); }
  });

  function tick(t) {
    if (!running) return;
    var dt = t - last; last = t;
    // throttle on sustained slow frames (low-end devices)
    if (dt > 50) { if (++slowFrames > 60 && N > 24) { N = 24; resize(); slowFrames = 0; } } else if (slowFrames) slowFrames--;
    ctx.clearRect(0, 0, W, H);
    var i, j, n, dx, dy, d;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      n.hx += n.vx; n.hy += n.vy;
      if (n.hx < 0 || n.hx > W) n.vx *= -1;
      if (n.hy < 0 || n.hy > H) n.vy *= -1;
      var tx = n.hx, ty = n.hy;
      dx = mouse.x - n.hx; dy = mouse.y - n.hy; d = Math.hypot(dx, dy);
      if (d < MLINK * 1.6 * dpr) { tx += dx * .18; ty += dy * .18; }
      n.x += (tx - n.x) * PULL * (dt / 16.7 || 1) * 4;
      n.y += (ty - n.y) * PULL * (dt / 16.7 || 1) * 4;
    }
    ctx.lineWidth = dpr;
    for (i = 0; i < nodes.length; i++) {
      for (j = i + 1; j < nodes.length; j++) {
        dx = nodes[i].x - nodes[j].x; dy = nodes[i].y - nodes[j].y; d = Math.hypot(dx, dy);
        if (d < LINK * dpr) {
          ctx.strokeStyle = 'rgba(0,229,255,' + ((1 - d / (LINK * dpr)) * .15) + ')';
          ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
        }
      }
      dx = nodes[i].x - mouse.x; dy = nodes[i].y - mouse.y; d = Math.hypot(dx, dy);
      if (d < MLINK * dpr) {
        ctx.strokeStyle = 'rgba(0,229,255,' + ((1 - d / (MLINK * dpr)) * .28) + ')';
        ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    ctx.fillStyle = 'rgba(0,229,255,.38)';
    for (i = 0; i < nodes.length; i++) { ctx.beginPath(); ctx.arc(nodes[i].x, nodes[i].y, 1.5 * dpr, 0, 7); ctx.fill(); }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(function (t) { last = t; tick(t); });
})();
