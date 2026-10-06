/**
 * The hero: a fragment shader, not a video. Smoke rises off a pit, sparks lift
 * out of it, the cursor pushes the plume, and as the page scrolls the whole
 * thing cools from ash and ember into melted cacao. No library: one triangle,
 * one program. Without WebGL (or under reduced motion) the poster stays.
 */
const canvas = document.querySelector('[data-smoke]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const gl = canvas && !reduced ? canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' }) : null;

if (gl) {
  const vert = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const frag = `
precision mediump float;
uniform vec2 uRes, uMouse; uniform float uTime, uMix;
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 5; i++){ v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= .5; } return v; }
float sparks(vec2 uv, float t){
  float r = 0.;
  for (int i = 0; i < 3; i++){
    float fi = float(i);
    vec2 g = uv * vec2(16. + fi * 10., 9. + fi * 5.);
    g.y -= t * (.7 + fi * .4);
    vec2 id = floor(g), f = fract(g) - .5;
    float h = hash(id + fi * 17.);
    f.x += (h - .5) * .6 + sin(t * 2. + h * 6.283) * .18;
    r += smoothstep(.09, 0., length(f)) * step(.84, h) * (.5 + .5 * sin(t * 7. + h * 40.));
  }
  return r;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - .5 * uRes) / uRes.y;
  float t = uTime * .11;
  vec2 m = (uMouse - .5) * vec2(uRes.x / uRes.y, 1.);
  vec2 q = p * 1.5; q.y -= t * 1.6;
  q += .38 * vec2(fbm(q * 1.4 + vec2(0., t)), fbm(q * 1.4 + vec2(5.2, 1.3 - t)));
  float push = exp(-length(p - m) * 2.4);
  q += (p - m) * .45 * push;
  float s = fbm(q * 1.8 + vec2(0., -t * 2.));
  float plume = smoothstep(.2, .95, s) * smoothstep(1.25, -.1, abs(p.x) + .35 * uv.y);
  plume *= mix(1., .55, uv.y);

  vec3 ground = mix(vec3(.06, .035, .026), vec3(.17, .082, .05), uMix);
  vec3 smoke  = mix(vec3(.70, .64, .58), vec3(.47, .25, .14), uMix);
  float flick = .75 + .25 * fbm(vec2(p.x * 3., uTime * .6));
  vec3 glow = vec3(1., .36, .09) * pow(1. - uv.y, 3.2) * flick * (.62 - .5 * uMix);
  vec3 col = ground + glow + smoke * plume * (.55 + .25 * uMix);
  col += vec3(1., .55, .2) * sparks(uv, uTime * .25) * (1. - uv.y) * (1. - uMix * .6);
  // cacao sheen: a slow glossy band that only exists once it has cooled
  col += vec3(.9, .6, .35) * uMix * .08 * smoothstep(.55, .9, fbm(q * 3.5));
  col *= 1. - .55 * dot(uv - .5, uv - .5) * 2.;
  gl_FragColor = vec4(pow(col, vec3(.92)), 1.);
}`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);

  if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n) => gl.getUniformLocation(prog, n);
    const uRes = u('uRes'), uMouse = u('uMouse'), uTime = u('uTime'), uMix = u('uMix');

    // ponytail: fixed render scale; adaptive resolution if low-end phones stutter
    const scale = innerWidth < 768 ? 0.45 : 0.7;
    const fit = () => {
      canvas.width = Math.round(canvas.clientWidth * scale);
      canvas.height = Math.round(canvas.clientHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    fit();
    addEventListener('resize', fit);

    let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5, mix = 0, visible = true, raf = 0;
    addEventListener('pointermove', (e) => { tx = e.clientX / innerWidth; ty = 1 - e.clientY / innerHeight; }, { passive: true });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame); }).observe(canvas);

    const t0 = performance.now();
    const frame = (now) => {
      raf = 0;
      if (!visible || document.hidden) return;
      mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
      mix += (Math.min(1, scrollY / (innerHeight * 0.9)) - mix) * 0.08;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uTime, (now - t0) / 1000);
      gl.uniform1f(uMix, mix);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    document.addEventListener('visibilitychange', () => { if (!document.hidden && !raf) raf = requestAnimationFrame(frame); });
    raf = requestAnimationFrame((n) => { frame(n); canvas.classList.add('is-live'); });
  }
}
