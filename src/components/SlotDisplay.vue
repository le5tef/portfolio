<template>
  <div>
    <!--    <button @click="printCameraPosition()">Позиция камеры</button>-->
  </div>
</template>

<script>
// import * as THREE from 'three';
//
// import {AsciiEffect} from 'three/examples/jsm/effects/AsciiEffect.js';
// import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js';
//
//
// // const axesHelper = new THREE.AxesHelper( 5 );
//
// let camera, controls, scene, renderer, effect, sphere;
//
//
// const start = Date.now();
//
// init();
// animate();
//
// function init() {
//   console.log('ass')
//   camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
//   camera.position.x = 600;
//   camera.position.z = 600;
//   camera.position.y = 300;
//
//   scene = new THREE.Scene();
//   scene.background = new THREE.Color(0, 0, 0);
//
//   const pointLight1 = new THREE.PointLight( 0xffffff );
//   pointLight1.position.set( 600, 600, 600 );
//   scene.add( pointLight1 );
//
//   const pointLight2 = new THREE.PointLight( 0xffffff, 1 );
//   pointLight2.position.set(  500,  50, 500 );
//   scene.add( pointLight2 );
//
//
//   var geometry = new THREE.SphereGeometry(400, 20, 10);
//   var texture = new THREE.TextureLoader().load( "textures/supersmallsmile.jpg" );
//   var material = new THREE.MeshPhongMaterial( { flatShading: true, map:texture });
//   sphere = new THREE.Mesh(geometry, material);
//
//   scene.add(sphere);
//
//   renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//
//   effect = new AsciiEffect(renderer, ' .:-+*=%@#', {invert: true});
//   effect.setSize(window.innerWidth, window.innerHeight);
//   effect.domElement.style.color = 'green';
//   effect.domElement.style.backgroundColor = 'black';
//
//   // Special case: append effect.domElement, instead of renderer.domElement.
//   // AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.
//
//   document.body.appendChild(effect.domElement);
//
//   controls = new TrackballControls(camera, effect.domElement);
//
//   //
//
//   window.addEventListener('resize', onWindowResize);
//
// }
//
// function onWindowResize() {
//
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   effect.setSize(window.innerWidth, window.innerHeight);
//
// }
//
// //
//
// function animate() {
//
//   requestAnimationFrame(animate);
//
//   render();
//
// }
//
// function render() {
//
//   const timer = Date.now() - start;
//   sphere.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 150-100;
//   sphere.rotation.y = 5.7;
//   controls.update();
//   effect.render(scene, camera);
//
// }

export default {
  name: "Ascii"
}
</script>

<style scoped>

</style>