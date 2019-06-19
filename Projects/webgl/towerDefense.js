

var vertexShaderText =
[
'precision mediump float;',
'',
'attribute vec3 vertexPosition;',
'attribute vec3 color;',
'varying vec3 fragColor;',
'uniform mat4 mWorld;',
'uniform mat4 mView;',
'uniform mat4 mProj;',
'',
'void main()',
'{',
'  fragColor = color;',
'  gl_Position = mProj * mView * mWorld * vec4(vertexPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'',
'precision mediump float;',
'',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor, 1.0);',
'}',
'',
''
].join('\n');


var initDemo = function main() {
  const canvas = document.querySelector("#glCanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  if (!gl){
    alert('using experimental WebGL');
    gl = canvas.getContext('experimetal-webgl');
  }

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
  }


  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);


  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
    console.error('ERROR compiling vertex shader: ', gl.getShaderInfoLog(vertexShader));
    return;  
  }

  gl.compileShader(fragmentShader);
  if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
    console.error('ERROR compiling fragment shader: ', gl.getShaderInfoLog(fragmentShader));
    return;  
  }

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.error('ERROR linking shader program: ', gl.getProgramInfoLog(program));
    return;
  }

  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
    console.error('ERROR validating shader program', gl.getProgramInfoLog(program));
    return;
  }



  var boxVertices = 
  [ // X, Y, Z           R, G, B
    // Top
    -1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
    -1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
    1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
    1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

    // Left
    -1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
    -1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
    -1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
    -1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

    // Right
    1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
    1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
    1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
    1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

    // Front
    1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
    1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
    -1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
    -1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

    // Back
    1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
    1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
    -1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
    -1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

    // Bottom
    -1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
    -1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
    1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
    1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
  ];

  var boxIndices =
  [
    // Top
    0, 1, 2,
    0, 2, 3,

    // Left
    5, 4, 6,
    6, 4, 7,

    // Right
    8, 9, 10,
    8, 10, 11,

    // Front
    13, 12, 14,
    15, 14, 12,

    // Back
    16, 17, 18,
    16, 18, 19,

    // Bottom
    21, 20, 22,
    22, 20, 23
  ];




  var boxVBO = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, boxVBO);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

  var boxIBO = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIBO);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);

  var positionAttribLocation = gl.getAttribLocation(program, 'vertexPosition');
  gl.vertexAttribPointer(
      positionAttribLocation, // attribute location in shader
      3, // number of elements per attribute
      gl.FLOAT, // type of elements
      gl.FALSE, // normalized
      6 * Float32Array.BYTES_PER_ELEMENT, // size of indevidual vertex
      0 // offset from the beginning of a single vertex to this attribute
    );
  gl.enableVertexAttribArray(positionAttribLocation);


  var colorAttribLocation = gl.getAttribLocation(program, 'color');
  gl.vertexAttribPointer(
      colorAttribLocation, // attribute location in shader
      3, // number of elements per attribute
      gl.FLOAT, // type of elements
      gl.FALSE, // normalized
      6 * Float32Array.BYTES_PER_ELEMENT, // size of indevidual vertex
      3 * Float32Array.BYTES_PER_ELEMENT // offset from the beginning of a single vertex to this attribute
    );
  gl.enableVertexAttribArray(colorAttribLocation);

  gl.useProgram(program);

  var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
  var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
  var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

  var worldMatrix = new Float32Array(16);
  var viewMatrix = new Float32Array(16);
  var projMatrix = new Float32Array(16);

  glMatrix.mat4.identity(worldMatrix);
  glMatrix.mat4.lookAt(viewMatrix, [0, 0, -5]/*eye pos*/, [0, 0, 0]/*view dir*/, [0, 1, 0]/*up*/);
  glMatrix.mat4.perspective(projMatrix, Math.PI / 4, canvas.width / canvas.height, 0.1, 1000);

  gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
  gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);


  // main render loop

  gl.useProgram(program);


  var xRotationMatrix = new Float32Array(16);
  var yRotationMatrix = new Float32Array(16);


  var identityMatrix = new Float32Array(16);
  glMatrix.mat4.identity(identityMatrix);
  var angle = 0;
  var loop = function () {
    angle = performance.now() / 1000 / 6 * 2 * Math.PI;
    
    glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
    glMatrix.mat4.rotate(xRotationMatrix, identityMatrix, angle/3, [1, 0, 0]);

    glMatrix.mat4.mul(worldMatrix, xRotationMatrix, yRotationMatrix);

    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

};






initDemo();