var canvas = document.getElementById("mycanvas");
var gl = canvas.getContext("webgl");

(!gl) ? console.log('WebGL not supported') : console.log('Success! WebGL is supported');

var vertexShaderSource = document.getElementById("vertex-shader").text;
var fragmentShaderSource = document.getElementById("fragment-shader").text;

var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

var program = createProgram(gl, vertexShader, fragmentShader);

var positionAttributeLocation = gl.getAttribLocation(program, "position");
gl.enableVertexAttribArray(positionAttributeLocation);

gl.useProgram(program);

var quadVertexBuffer = gl.createBuffer();
 
var quadVertexBufferData = new Float32Array([
   -1.0, -1.0,
    1.0, -1.0,
   -1.0,  1.0,
   -1.0,  1.0,
    1.0, -1.0,
    1.0,  1.0]);

gl.viewport(0, 0, window.innerWidth, window.innerHeight); 
//size of the viewport we will be rendering
gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT); 
//clear anything previously drawn on the screen
gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer); //activate the buffer
gl.bufferData(gl.ARRAY_BUFFER, quadVertexBufferData, gl.STATIC_DRAW); 
//set vertex data to our vertices
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0); 
//set the pointer
gl.drawArrays(gl.TRIANGLES, 0, 6); //draw!
    
function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source); //tie the shader source code to the shader object
    gl.compileShader(shader); //compile it
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!success) { //a little bit of error handling
      console.log(`An error occurred compiling the ${type} shader: ` + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      console.log(`An error occurred compiling the program: ` + gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
}
   