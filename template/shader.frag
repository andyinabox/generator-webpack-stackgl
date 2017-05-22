precision highp float;

// shadertoy inputs
uniform vec3 iResolution;
uniform float	iGlobalTime;
uniform float	iTimeDelta;
uniform float	iFrame;
uniform vec4 iMouse;
uniform sampler2D iChannel0;

varying vec2 texCoord;

void main() {
  gl_FragColor = texture2D(iChannel0, texCoord);
}