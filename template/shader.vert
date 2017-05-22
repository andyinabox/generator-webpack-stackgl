precision highp float;

// attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// shadertoy inputs
uniform vec3 iResolution;
uniform float	iGlobalTime;
uniform float	iTimeDelta;
uniform float	iFrame;
uniform vec4 iMouse;

// camera inputs
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

// texture coordinates
varying vec2 texCoord;

void main() {
  // set gl position osing offset
  gl_Position = projection * view * model * vec4(position, 1);
  texCoord = uv;
}