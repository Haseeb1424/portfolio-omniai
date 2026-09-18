'use client';
import { useEffect, useRef } from 'react';

export default function NetworkCursor() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const coarse = matchMedia('(pointer: coarse)').matches;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse && !reduced) return;
    const ctx = c.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2);
    let W, H, nodes, N = 50, raf, running = true, last = 0, slow = 0;
    const LINK = 130, MLINK = 190, mouse = { x: -9999, y: -9999 };
    const resize = () => {
      W = c.width = innerWidth * dpr; H = c.height = innerHeight * dpr;
      nodes = Array.from({ length: N }, () => { const x = Math.random()*W, y = Math.random()*H; return { x, y, hx: x, hy: y, vx: (Math.random()-.5)*.22*dpr, vy: (Math.random()-.5)*.22*dpr }; });
    };
    resize();
    const drawStatic = () => {
      ctx.clearRect(0,0,W,H); ctx.fillStyle = 'rgba(0,229,255,.3)';
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x, n.y, 1.4*dpr, 0, 7); ctx.fill(); });
    };
    const onMove = e => { mouse.x = e.clientX*dpr; mouse.y = e.clientY*dpr; };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const onVis = () => { running = !document.hidden; if (running) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    function tick(t) {
      if (!running) return;
      const dt = t - last; last = t;
      if (dt > 50) { if (++slow > 60 && N > 24) { N = 24; resize(); slow = 0; } } else if (slow) slow--;
      ctx.clearRect(0,0,W,H);
      for (const n of nodes) {
        n.hx += n.vx; n.hy += n.vy;
        if (n.hx < 0 || n.hx > W) n.vx *= -1;
        if (n.hy < 0 || n.hy > H) n.vy *= -1;
        let tx = n.hx, ty = n.hy;
        const dx = mouse.x - n.hx, dy = mouse.y - n.hy;
        if (Math.hypot(dx, dy) < MLINK*1.6*dpr) { tx += dx*.18; ty += dy*.18; }
        n.x += (tx - n.x)*.072; n.y += (ty - n.y)*.072;
      }
      ctx.lineWidth = dpr;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x-nodes[j].x, nodes[i].y-nodes[j].y);
          if (d < LINK*dpr) { ctx.strokeStyle = `rgba(0,229,255,${(1-d/(LINK*dpr))*.15})`; ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(nodes[j].x,nodes[j].y); ctx.stroke(); }
        }
        const dm = Math.hypot(nodes[i].x-mouse.x, nodes[i].y-mouse.y);
        if (dm < MLINK*dpr) { ctx.strokeStyle = `rgba(0,229,255,${(1-dm/(MLINK*dpr))*.28})`; ctx.beginPath(); ctx.moveTo(nodes[i].x,nodes[i].y); ctx.lineTo(mouse.x,mouse.y); ctx.stroke(); }
      }
      ctx.fillStyle = 'rgba(0,229,255,.38)';
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x, n.y, 1.5*dpr, 0, 7); ctx.fill(); });
      raf = requestAnimationFrame(tick);
    }
    addEventListener('resize', resize);
    if (reduced) { drawStatic(); return () => removeEventListener('resize', resize); }
    addEventListener('mousemove', onMove, { passive: true });
    addEventListener('mouseleave', onLeave);
    document.addEventListener('visibilitychange', onVis);
    raf = requestAnimationFrame(t => { last = t; tick(t); });
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); removeEventListener('mousemove', onMove); removeEventListener('mouseleave', onLeave); document.removeEventListener('visibilitychange', onVis); };
  }, []);
  return <canvas ref={ref} aria-hidden style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -1 }} />;
}
