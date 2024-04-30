<template>
  <div>
    <Preloader v-if="!loaded"/>
    <div class="wrapper">


      <div>
        <GlassVidget :active="active"/>
        <button @click="activate" class="gradient-btn" :class="active?'active':''">Find out</button>
<!--        <button style="position: absolute; z-index: 5; top:0; left: 0" @click="open_selected_box">-->
<!--          Open-->
<!--        </button>-->

<!--        <button style="position: absolute; z-index: 5;top:0;left: 50px" @click="close_selected_box">-->
<!--          Close-->
<!--        </button>-->
<!--        <button style="position: absolute; z-index: 5; top:30px;" @click="open_selected_shoes">Open-->
<!--          shoes-->
<!--        </button>-->
<!--        <button style="position: absolute; z-index: 5; top:60px;" @click="open_selected_all">Open-->
<!--          all-->
<!--        </button>-->
<!--        <button style="position: absolute; z-index: 5;left: 90px; top:30px"-->
<!--                @click="close_selected_shoes">Close shoes-->
<!--        </button>-->
<!--        <button style="position: absolute; z-index: 5; top:90px;" @click="camera_zoom">Zoom</button>-->
        <canvas ref="canvas"/>
      </div>
    </div>
  </div>
</template>

<script>
import Preloader from "@/components/Preloader";
import GlassVidget from "@/components/GlassVidget";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

import {ref} from "vue";
let initializeDomEvents = require('threex-domevents')
let THREEs = require('three')
let THREEx = {}
initializeDomEvents(THREEs, THREEx)
let camera, scene, renderer;
const loader = new GLTFLoader();
let mixer;
let light2, light3;
const clock = new THREE.Clock()
let models = ref([
  {
    id: 0,
    type: 'room',
    name: 'room',
    loaded: false,
    gltf: null,
    source: 'models/shoes/room1.glb',
    mobile_source: 'models/shoes/room2.glb',
    animation_mixer: null,
    animations_actions: {
      camera: {name: 'CameraAction', action: null}
    },
    animations: []
  },
  {
    id: 1,
    name: 'air_mag_nike',
    type: 'shoes',
    loaded: false,
    gltf: null,
    is_opened: false,
    source: 'models/shoes/airmag12.glb',
    animations_actions: {
      shoes_open: {name: 'ShoesOpen1', action: null},
      shoes_drop: {name: 'ShoesDropDown1', action: null},
      box_open: {name: 'BoxOpen1', action: null},
      box_drop: {name: 'BoxDropDown1', action: null},
    },
    animations: []
  },
  // {
  //   id: 2,
  //   name: 'pink_jordan',
  //   type: 'shoes',
  //   loaded: false,
  //   gltf: null,
  //   is_opened: false,
  //   source: 'models/shoes/pink_jordan/pink_jordan.glb',
  //   animations_actions: {
  //     shoes_open: {name: 'ShoesOpen2', action: null},
  //     shoes_drop: {name: 'ShoesDropDown2', action: null},
  //     box_open: {name: 'BoxOpen2', action: null},
  //     box_drop: {name: 'BoxDropDown2', action: null},
  //   },
  //   animations: []
  // },
])
let draggable_objects = ref([])
let selected_shoes_id = 1

scene = new THREE.Scene();
scene.background = null
mixer = new THREE.AnimationMixer(scene)

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function loadRoom() {
  for (let room_model of models.value.filter((x) => x.type === 'room')) {
    loader.load(window.innerWidth > 1000 ? room_model.source : room_model.mobile_source, (gltf) => {
      let room = models.value.find((x) => x.name === 'room')
      room.loaded = true
      room.gltf = gltf
      console.log('cameras', gltf.cameras)
      camera = gltf.cameras[0]
      room.animations_actions.camera.action = mixer.clipAction(THREE.AnimationClip.findByName(gltf, room.animations_actions.camera.name))
      room.animations = gltf.animations
      console.log('animation', gltf.animations)

      scene.add(gltf.scene)
      gltf.scene.traverse((model) => {
        if (model.isMesh) {
          model.castShadow = true
          model.receiveShadow = true
          if (model.material.map) model.material.map.anisotropy = 16;
        }
      })
    })
  }
}

function loadShoes() {
  for (let shoes_model of models.value.filter((x) => x.type === 'shoes')) {
    loader.load(shoes_model.source, (gltf) => {
      let shoes = models.value.find((x) => x.id === shoes_model.id)
      shoes.loaded = true;
      shoes.gltf = gltf;
      if (shoes.id !== 1)
        gltf.scene.position.set(shoes.id * 2, 1, shoes.id)
      console.log(gltf.animations)
      shoes.animations = gltf.animations
      scene.add(gltf.scene)
      gltf.scene.traverse((model) => {
        if (model.isMesh) {
          model.castShadow = true
          model.receiveShadow = true
          if (model.material.map) model.material.map.anisotropy = 16;
        }
      })
    })
  }
}

let i = 0;

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getDelta()
  if (mixer) {
    mixer.update(elapsedTime)
  }
  i += 0.01
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.render(scene, camera);
  light2.position.x = 5 * Math.cos(i);
  light2.position.z = 5 * Math.sin(i);
  light3.position.x = 5 * Math.cos(i - Math.PI / 2);
  light3.position.z = 5 * Math.sin(i - Math.PI / 2);
}

export default {
  name: "Shoes",
  components: {Preloader, GlassVidget},
  data() {
    return {
      active:false,
    }
  },
  computed: {
    loaded() {
      let loaded = true
      models.value.map((x) => loaded = loaded && x.loaded)
      return loaded
    },
    selected_shoes() {
      return models.value.find((x) => x.id === selected_shoes_id)
    },
    room() {
      return models.value.find((x) => x.name === 'room')
    },
    box_drop() {
      return mixer.clipAction(THREE.AnimationClip.findByName(this.selected_shoes.gltf, 'BoxDropDown' + this.selected_shoes.id))
    },
    box_open() {
      return mixer.clipAction(THREE.AnimationClip.findByName(this.selected_shoes.gltf, 'BoxOpen' + this.selected_shoes.id))
    },
    shoes_open() {
      return mixer.clipAction(THREE.AnimationClip.findByName(this.selected_shoes.gltf, 'ShoesOpen' + this.selected_shoes.id))
    },
    shoes_drop() {
      return mixer.clipAction(THREE.AnimationClip.findByName(this.selected_shoes.gltf, 'ShoesDropDown' + this.selected_shoes.id))
    },

  },
  methods: {
    activate(){
      this.active = true
      this.open_selected_all()
    },
    init() {
      console.log('starting')
      scene.background = 'null';
      renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: this.$refs.canvas});
      renderer.setClearColor(0x000000, 0)
      document.body.appendChild(renderer.domElement);

      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 2;
      renderer.shadowMap.enabled = true;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.type = THREE.BasicShadowMap


      let light1 = new THREE.HemisphereLight(0x14f5c8, 0xFe09ca, 1)
      scene.add(light1)

      light2 = new THREE.PointLight(0x14f5c8, 0.7)
      light2.position.set(3, 2, 0)
      light3 = new THREE.PointLight(0xFe09ca, 0.7)
      light3.position.set(-3, 2, 0)

      scene.add(light2)
      scene.add(light3)


      window.addEventListener('resize', onWindowResize);

    },
    camera_zoom() {
      let zoom = mixer.clipAction(this.room.animations[0])
      console.log(models.value.find((x) => x.name === 'room').animations_actions.camera.action)

      zoom.loop = THREE.LoopOnce
      zoom.clampWhenFinished = true
      zoom.timeScale = 1;
      zoom.play();
    },
    open_selected_all() {
      this.camera_zoom()
      this.open_selected_box();
      this.open_selected_shoes();
    },
    open_selected_box() {
      let box_open = this.box_open
      let box_dropdown = this.box_drop
      box_open.reset()
      box_open.loop = THREE.LoopOnce
      box_open.clampWhenFinished = true
      box_open.timeScale = 1;
      box_open.play()

      box_dropdown.reset()
      box_dropdown.loop = THREE.LoopOnce
      box_dropdown.clampWhenFinished = true
      box_dropdown.timeScale = 1;
      box_dropdown.play()

    },

    close_selected_box() {
      let box_open = this.box_open
      let box_dropdown = this.box_drop

      if (box_open.time === 0) {
        box_open.time = box_open.getClip().duration;
      }
      box_open.paused = false;
      box_open.loop = THREE.LoopOnce
      box_open.timeScale = -1;
      box_open.play();

      if (box_dropdown.time === 0) {
        box_dropdown.time = box_dropdown.getClip().duration;
      }
      box_dropdown.paused = false;
      box_dropdown.loop = THREE.LoopOnce
      box_dropdown.timeScale = -1;
      box_dropdown.play();

    },

    open_selected_shoes() {
      let shoes_open = this.shoes_open
      let shoes_dropdown = this.shoes_drop
      draggable_objects.value.push(this.selected_shoes)


      shoes_open.reset()
      shoes_open.loop = THREE.LoopOnce
      shoes_open.clampWhenFinished = true
      shoes_open.timeScale = 1;
      shoes_open.play()

      shoes_dropdown.reset()
      shoes_dropdown.loop = THREE.LoopOnce
      shoes_dropdown.clampWhenFinished = true
      shoes_dropdown.timeScale = 1;
      shoes_dropdown.play()
    },

    close_selected_shoes() {
      let shoes_open = this.shoes_open
      let shoes_dropdown = this.shoes_drop
      draggable_objects.value = draggable_objects.value.filter((x) => x.id !== this.selected_shoes.id)

      if (shoes_open.time === 0) {
        shoes_open.time = shoes_open.getClip().duration;
      }
      shoes_open.paused = false;
      shoes_open.loop = THREE.LoopOnce
      shoes_open.timeScale = -1;
      shoes_open.play();

      if (shoes_dropdown.time === 0) {
        shoes_dropdown.time = shoes_dropdown.getClip().duration;
      }
      shoes_dropdown.paused = false;
      shoes_dropdown.loop = THREE.LoopOnce
      shoes_dropdown.timeScale = -1;
      shoes_dropdown.play();
    },


  },
  mounted() {
    loadRoom()
    loadShoes()
  },
  watch: {
    loaded() {
      this.init()
      animate()
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Fredoka+One&display=swap');
@import url('https://fonts.googleapis.com/css?family=Sono&display=swap');

$mobile-width: 750px;
.wrapper {
  background-color: #FFDEE9;
  background-image: linear-gradient(245deg, rgba(78, 205, 196, 0.6) 6%, rgba(199, 151, 235, 0.6) 100%);
  width: 100vw;
  height: 100vh;
  background-size: 400% 400%;
  overflow: hidden;
  position: relative;
  animation: gradient 7s ease infinite;
}
@keyframes gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}



canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.buy-button{
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
}

.active{
  animation: 1s active ease-in-out forwards;
}
@keyframes active{
  from {
    top: 70%;
  }
  to {
    top: 120%;
  }
}
.gradient-btn {
  font-size: 22px;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  min-width: 151px;
  height: 49px;
  color: #fff;
  padding: 8px 14px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Sono', sans-serif;
  transition: all 0.3s ease;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: none;
  background-size: 120% auto;
  background-image: linear-gradient(315deg, #4ecdc4 0%, #c797eb 75%);
}

.gradient-btn:hover {
  background-position: right center;
}

.css-button-gradient--1:hover {
  background-position: right center;
}



</style>