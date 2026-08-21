export default {
  schema: "implicit.js/0.1.0",
  name: "jardinero cloud-pruned topiary",
  params: {
    wild: {
      type: "number",
      label: "Overgrowth",
      min: 0,
      max: 1,
      default: 0.15,
      step: 0.01,
    },
    lush: {
      type: "number",
      label: "Lushness",
      min: 0,
      max: 1,
      default: 1,
      step: 0.01,
    },
  },
  animations: {
    prune: {
      label: "Prune",
      duration: 6,
      update({ progress, set }) {
        // wild growth in the first half, clipped back to form in the second
        const wave = Math.sin(progress * Math.PI);
        set("wild", wave);
        set("lush", 0.55 + wave * 0.45);
      },
    },
  },
  render: { steps: 256, epsilon: 0.003 },
  glsl: `
// one billowing foliage mass: a core sphere with lumps smooth-unioned on
float pad(vec3 p, vec3 c, float r, float seed) {
  float d = implicit_sphere(p, c, r);
  for (int i = 0; i < 4; i++) {
    float fi = float(i) + seed;
    vec3 off = vec3(sin(fi * 2.3), cos(fi * 1.7) * 0.55, cos(fi * 3.1));
    vec3 lc = c + off * r * (0.62 + 0.22 * wild);
    float lr = r * (0.42 + 0.16 * sin(fi * 5.0)) * (0.75 + 0.55 * lush);
    d = implicit_union_round(d, implicit_sphere(p, lc, lr), r * 0.45);
  }
  // untended shoots pushing out of the silhouette
  if (wild > 0.01) {
    for (int i = 0; i < 3; i++) {
      float fi = float(i) + seed * 2.0;
      vec3 dir = normalize(vec3(sin(fi * 4.1), 0.75, cos(fi * 2.9)));
      vec3 a = c + dir * r * 0.7;
      vec3 b = c + dir * r * (1.0 + 1.15 * wild);
      d = implicit_union_round(d, implicit_capsule(p, a, b, r * 0.13), r * 0.3);
    }
  }
  return d;
}

float sdf(vec3 p) {
  p = p.xzy; // model is authored Y-up; CAD space is Z-up
  // terracotta planter
  float pot = implicit_cone_capped(p, vec3(0.0, -34.0, 0.0), vec3(0.0, -14.0, 0.0), 11.0, 14.0);
  float rim = implicit_cylinder_capped(p, vec3(0.0, -16.5, 0.0), vec3(0.0, -13.0, 0.0), 15.2);
  pot = implicit_union_round(pot, rim, 1.2);

  // curving trunk
  float trunk = implicit_cone_capsule(p, vec3(0.0, -14.0, 0.0), vec3(2.5, 6.0, -1.0), 3.4, 2.2);
  trunk = implicit_union_round(trunk, implicit_cone_capsule(p, vec3(2.5, 6.0, -1.0), vec3(-1.5, 20.0, 2.0), 2.2, 1.5), 2.0);
  // two side branches
  trunk = implicit_union_round(trunk, implicit_cone_capsule(p, vec3(1.6, 2.0, -0.6), vec3(-11.0, 9.0, 3.0), 2.0, 1.2), 2.0);
  trunk = implicit_union_round(trunk, implicit_cone_capsule(p, vec3(2.2, 11.0, -0.8), vec3(13.0, 16.0, -3.0), 1.9, 1.1), 2.0);

  // cloud-pruned foliage masses
  float f = pad(p, vec3(-13.0, 11.0, 3.0), 8.2, 0.0);
  f = min(f, pad(p, vec3(15.0, 18.5, -3.0), 7.4, 1.0));
  f = min(f, pad(p, vec3(-2.0, 24.0, 2.0), 9.6, 2.0));
  f = min(f, pad(p, vec3(6.5, 30.5, 1.0), 6.4, 3.0));
  f = min(f, pad(p, vec3(-8.0, 32.0, -2.0), 5.2, 4.0));

  float plant = implicit_union_round(trunk, f, 2.2);
  return min(pot, plant);
}

vec3 color(vec3 p, vec3 normal) {
  p = p.xzy;
  normal = normal.xzy;
  // planter: terracotta
  if (p.y < -13.0) {
    return mix(vec3(0.58, 0.31, 0.20), vec3(0.72, 0.44, 0.30), smoothstep(-34.0, -14.0, p.y));
  }
  // trunk: weathered cedar where the surface faces sideways and sits low
  float woody = smoothstep(0.55, 0.05, abs(normal.y)) * smoothstep(14.0, 2.0, p.y);
  vec3 bark = vec3(0.36, 0.27, 0.18);

  // foliage: sunlit top, deep shade beneath
  float lit = clamp(normal.y * 0.5 + 0.5, 0.0, 1.0);
  vec3 shade = vec3(0.09, 0.22, 0.12);
  vec3 mid = vec3(0.20, 0.42, 0.22);
  vec3 sun = vec3(0.47, 0.68, 0.32);
  vec3 leaf = mix(shade, mid, smoothstep(0.15, 0.6, lit));
  leaf = mix(leaf, sun, smoothstep(0.62, 1.0, lit));

  // fresh-cut pale green on the clipped silhouette when tended
  leaf = mix(leaf, vec3(0.62, 0.78, 0.42), (1.0 - wild) * smoothstep(0.72, 1.0, lit) * 0.35);

  return mix(leaf, bark, woody);
}
`,
};
