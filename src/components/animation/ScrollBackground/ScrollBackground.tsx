"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import {
  Color,
  Mesh,
  Program,
  Renderer,
  Triangle,
} from "ogl";

import styles from "./ScrollBackground.module.css";

const VERT = `#version 300 es

in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es

precision highp float;

uniform float uTime;
uniform float uScroll;
uniform float uVelocity;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1 = x0.x > x0.y
    ? vec2(1.0, 0.0)
    : vec2(0.0, 1.0);

  vec4 x12 = x0.xyxy + C.xxzz;

  x12.xy -= i1;

  i = mod(i, 289.0);

  vec3 p = permute(
    permute(
      i.y + vec3(0.0, i1.y, 1.0)
    )
    + i.x
    + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ),
    0.0
  );

  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159
    - 0.85373472095314
    * (a0 * a0 + h * h);

  vec3 g;

  g.x =
    a0.x * x0.x +
    h.x * x0.y;

  g.yz =
    a0.yz * x12.xz +
    h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) { \
  int index = 0; \
  for (int i = 0; i < 2; i++) { \
    ColorStop currentColor = colors[i]; \
    bool isInBetween = currentColor.position <= factor; \
    index = int(mix( \
      float(index), \
      float(i), \
      float(isInBetween) \
    )); \
  } \
  ColorStop currentColor = colors[index]; \
  ColorStop nextColor = colors[index + 1]; \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix( \
    currentColor.color, \
    nextColor.color, \
    lerpFactor \
  ); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  float scrollOffset = uScroll * 0.0007;

  vec2 noiseUv = vec2(
    uv.x * 2.0 + uTime * 0.1 + scrollOffset * 0.45,
    uTime * 0.25 + scrollOffset
  );

  float velocityEffect =
    min(abs(uVelocity) * 0.035, 1.0);

  ColorStop colors[3];

  colors[0] = ColorStop(
    uColorStops[0],
    0.0
  );

  colors[1] = ColorStop(
    uColorStops[1],
    0.5
  );

  colors[2] = ColorStop(
    uColorStops[2],
    1.0
  );

  vec3 rampColor;

  COLOR_RAMP(
    colors,
    uv.x,
    rampColor
  );

  float dynamicAmplitude =
    uAmplitude +
    velocityEffect * 0.55;

  float height = snoise(noiseUv);

  height *= 0.5 * dynamicAmplitude;

  height = exp(height);

  float verticalScroll =
    mod(uScroll * 0.00022, 1.8);

  height =
    uv.y * 2.0 -
    height +
    0.2 +
    verticalScroll;

  float intensity =
    0.6 * height;

  float dynamicBlend =
    uBlend -
    velocityEffect * 0.08;

  float midPoint = 0.20;

  float auroraAlpha = smoothstep(
    midPoint - dynamicBlend * 0.5,
    midPoint + dynamicBlend * 0.5,
    intensity
  );

  vec3 auroraColor =
    intensity * rampColor;

  fragColor = vec4(
    auroraColor * auroraAlpha,
    auroraAlpha
  );
}
`;

const COLORS = [
  "#5DA9FF",
  "#9ACBFF",
  "#5DA9FF",
];

export default function ScrollBackground() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  /*
   * We keep the latest Lenis values in refs,
   * so React doesn't re-render on every scroll event.
   */
  const targetScroll = useRef(0);
  const targetVelocity = useRef(0);

  const currentScroll = useRef(0);
  const currentVelocity = useRef(0);

  /*
   * Current Lenis API exposes scroll + velocity
   * through the scroll callback.
   */
  useLenis((lenis) => {
    targetScroll.current = lenis.scroll;
    targetVelocity.current = lenis.velocity;
  });

  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) {
      return;
    }

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });

    const gl = renderer.gl;

    gl.clearColor(0, 0, 0, 0);

    gl.enable(gl.BLEND);

    gl.blendFunc(
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA
    );

    const geometry =
      new Triangle(gl);

    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const colorStops =
      COLORS.map((hex) => {
        const color = new Color(hex);

        return [
          color.r,
          color.g,
          color.b,
        ];
      });

    const program = new Program(gl, {
      vertex: VERT,

      fragment: FRAG,

      uniforms: {
        uTime: {
          value: 0,
        },

        uScroll: {
          value: 0,
        },

        uVelocity: {
          value: 0,
        },

        uAmplitude: {
          value: 1.65,
        },

        uColorStops: {
          value: colorStops,
        },

        uResolution: {
          value: [
            container.clientWidth,
            container.clientHeight,
          ],
        },

        uBlend: {
          value: 0.28,
        },
      },
    });

    const mesh = new Mesh(gl, {
      geometry,
      program,
    });

    container.appendChild(
      gl.canvas
    );

    const resize = () => {
      const width =
        container.clientWidth;

      const height =
        container.clientHeight;

      if (!width || !height) {
        return;
      }

      renderer.setSize(
        width,
        height
      );

      program.uniforms.uResolution.value =
        [width, height];
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    let animationFrame = 0;

    const animate = (
      time: number
    ) => {
      animationFrame =
        requestAnimationFrame(
          animate
        );

      currentScroll.current +=
        (
          targetScroll.current -
          currentScroll.current
        ) * 0.08;

      currentVelocity.current +=
        (
          targetVelocity.current -
          currentVelocity.current
        ) * 0.12;

      targetVelocity.current *= 0.92;

      program.uniforms.uTime.value =
        time * 0.0001;

      program.uniforms.uScroll.value =
        currentScroll.current;

      program.uniforms.uVelocity.value =
        currentVelocity.current;

      renderer.render({
        scene: mesh,
      });
    };

    animationFrame =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      gl.getExtension(
        "WEBGL_lose_context"
      )?.loseContext();

      if (
        gl.canvas.parentNode ===
        container
      ) {
        container.removeChild(
          gl.canvas
        );
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.background}
      aria-hidden="true"
    />
  );
}