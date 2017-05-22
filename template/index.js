
// libs
import createShell from 'gl-now';
import createShader from 'gl-shader';
import createTexture from 'gl-texture2d';
import createOrbitCamera from 'orbit-camera';
import createPlane from 'primitive-plane';
import createMesh from 'gl-mesh';
import glm from 'gl-matrix';

// local dependencies
import './style.scss';
import vert from './shader.vert';
import frag from './shader.frag';
import imageUrl0 from './image.jpg';

const mat4 = glm.mat4;
const shell = createShell();
const image0 = new Image();

let options = {
  zoom: -3,
  planeWidth: 2,
  planeHeight: 1
}

// gl stuff
let camera = createOrbitCamera(
  [0, 0, options.zoom], // eye
  [0, 0, 0], // center
  [0, -1, 0] // up
);
let shader;
let mesh;
let tex0;

// other vars
let frame = 0;
let mouseDown = [null, null];

// events

document.addEventListener('mousedown', evt => mouseDown = [shell.mouseX, shell.mouseY]);
document.addEventListener('mouseup', evt => mouseDown = [null, null]);

shell.on('gl-init', () => {
  const gl = shell.gl;

  // create plane geometry
  const geom = createPlane(options.planeWidth, options.planeHeight);

  // create mesh
  mesh = createMesh(gl, geom.cells, {
    position: geom.positions,
    uv: geom.uvs
  });

  // create shader
  shader = createShader(gl, vert, frag);

  // set load events
  image0.onload = e => { tex0 = createTexture(gl, image0) };

  // start loading image
  image0.src = imageUrl0;

});


shell.on('tick', (t) => {
  // update frame count
  frame++;

  // rotate camera based on mouse
  camera.rotate(
    [shell.mouseX/shell.width, shell.mouseY/shell.height],
    [shell.prevMouseX/shell.width, shell.prevMouseY/shell.height]
  );
});

shell.on('gl-render', (t) => {
	const gl = shell.gl;

  let scratch = mat4.create();
  let projection = mat4.perspective(
        scratch,
        Math.PI/4.0,
        shell.width/shell.height,
        0.1,
        1000.0
      );


  shader.bind();

  // shadertoy uniforms
  shader.uniforms.iResolution = [shell.width, shell.height, 1.0];
  shader.uniforms.iGlobalTime = (new Date()).getTime();
  shader.uniforms.iTimeDelta = t;
  shader.uniforms.iFrame = frame;
  shader.uniforms.iMouse = [shell.mouseX, shell.mouseY, mouseDown[0], mouseDown[1]];

  // camera uniforms
  shader.uniforms.model = scratch;
  shader.uniforms.view = camera.view(scratch);
  shader.uniforms.projection = projection;


  if(tex0) {
    // texture uniform
    shader.uniforms.iChannel0 = tex0.bind(0);
  }

  // draw
  mesh.bind(shader)
  mesh.draw()
  mesh.unbind()
});

shell.on("gl-error", e => { throw new Error("WebGL not supported :(") } );
