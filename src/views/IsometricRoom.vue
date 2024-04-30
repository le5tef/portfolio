<template>
  <div>
    <Preloader v-if="!loaded"/>
    <SlotDisplay v-if="display==='slot'"/>
    <PCDisplay v-if="display==='pc'" @back="back()"/>
    <button v-if="display" class="back-btn" @click="back()">Back</button>
  </div>
</template>

<script>
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DragControls} from 'three/examples/jsm/controls/DragControls';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import Preloader from "@/components/Preloader";
import {ref} from "vue";
import PCDisplay from "@/views/PCDisplay";
import SlotDisplay from "@/components/SlotDisplay";

let initializeDomEvents = require('threex-domevents')
let THREEs = require('three')
let THREEx = {}
initializeDomEvents(THREEs, THREEx)
let camera, scene, renderer;
let controls;
let bloom_composer;
let render_scene;
let drag_controls;
let drag_objects = [];
let pc_animation;
let slot_animation;
let pc_animation_action;
let slot_animation_action;
let chair_animation_duration = 0;
let chair_rotation = 0
let mixer;
let room, chair, slot, pc;
console.log('slot', slot)
let last_pressed_keys = []
let konamiCode = ['A', 'B', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowUp'];
const clock = new THREE.Clock()
const loader = new GLTFLoader();
let currentDisplay = ref(null);
let dev_mode = false;
let arrows_coords =
    [
      {
        name:'chair',
        x:0.5,
        y: 3.5,
        z:  -1,
        object:null
      },
      {
        name:'slot',
        x: -2.3,
        y: 4.6,
        z: 2.82,
        object:null
      },
      {
        name:'pc',
        x: -2,
        y: 3.5,
        z: 0,
        object:null
      }
    ]

let easter_egg_reward = `









       ..                                             .
       ~&G5Y?!^:.                            .:^~7J5PB#^
       ^@J:~##YPGBPPP5YJ???77!!77777?JY55PGB#&&@@@PJ@@@:
        P@BB@G  J@~^!7G@##&&@@@@&&@@@G5YY&@#77~!@&#B@@5
        :&@!~#PG@@Y:  J@Y   J@G....G@:   #@#?J:JY.!@@G.
         ^#5 ^@@P!?YG&&PBG5G@@P~7??G&G7~G#577#&!  .&B.
          :GB:Y@7   ^@P  :~75&&J!~~:.7@P~    55 .?#P.
            !5B@B^: .#B      P&      :@:   .^BGY##?
              .~JPGGB@@Y77!^~#@Y^^!!!5@GJ5B##BPJ~.
                   :^!7JY5PPPGGGGPPP55YJ?7~^.









                                                               `


window.addEventListener('keydown', (event) => {
  if (event.key !== 'Shift')
    last_pressed_keys.unshift(event.key)
  if (last_pressed_keys.length > 10) last_pressed_keys.pop()
  if (JSON.stringify(last_pressed_keys) === JSON.stringify(konamiCode) && controls) {
    console.log(easter_egg_reward)
    controls.enabled = true
  }
})

function init() {

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);
  scene.add(room.scene, chair.scene, slot.scene, pc.scene)

  renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  renderer.setClearColor(0x000000, 0)
  document.body.appendChild(renderer.domElement);

  // Set current sizes of window

  renderer.setSize(window.innerWidth, window.innerHeight);
  controls = new OrbitControls(camera, renderer.domElement);

  controls.enabled = dev_mode;

  //Arrow renderer

  let arrows = []
  for (let arrow of arrows_coords) {
    loader.load('/models/arrow/arrow.glb', (gltf) => {
      let arrow_object = gltf.scene
      arrow_object.position.set(arrow.x, arrow.y, arrow.z)
      arrow_object.scale.set(0.1, 0.1, 0.1)
      arrow.object=arrow_object
      arrows.push(arrow_object)
      scene.add(arrow_object)
    })
  }

  // Three js event handling
  const domEvents = new THREEx.DomEvents(camera, renderer.domElement)

  domEvents.addEventListener(slot.scene, 'click', function () {
    slot_animation = THREE.AnimationClip.findByName(room.animations, 'Camera.002Action')  //get the animation name by console.log(gltf.animations)
    mixer = new THREE.AnimationMixer(camera)
    slot_animation_action = mixer.clipAction(slot_animation)
    slot_animation_action.reset()
    slot_animation_action.loop = THREE.LoopOnce;
    slot_animation_action.timeScale = 1;
    slot_animation_action.clampWhenFinished = true
    slot_animation_action.play()
    let selectedObject = (arrows_coords.find((x)=>x.name==='slot').object);
    scene.remove( selectedObject );

    mixer.addEventListener('finished', () => {
      console.log(slot_animation_action.time)
      if (slot_animation_action.timeScale === 1) currentDisplay.value = 'slot';
    })
  }, false)

  domEvents.addEventListener(pc.scene, 'click', function () {

    pc_animation = THREE.AnimationClip.findByName(room.animations, 'Camera.002Action.001')  //get the animation name by console.log(gltf.animations)
    mixer = new THREE.AnimationMixer(camera)
    pc_animation_action = mixer.clipAction(pc_animation)
    pc_animation_action.reset()
    pc_animation_action.loop = THREE.LoopOnce;
    pc_animation_action.timeScale = 1;
    pc_animation_action.clampWhenFinished = true
    pc_animation_action.play()
    let selectedObject = (arrows_coords.find((x)=>x.name==='pc').object);
    scene.remove( selectedObject );

    mixer.addEventListener('finished', () => {
      console.log(pc_animation_action.time)
      if (pc_animation_action.timeScale === 1) currentDisplay.value = 'pc';
    })
  }, false)

  // Bloom effect
  render_scene = new RenderPass(scene, camera);
  const bloom_pass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.01,
      0.2,
      1
  );
  bloom_composer = new EffectComposer(renderer);
  bloom_composer.addPass(render_scene);
  bloom_composer.addPass(bloom_pass);
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap

  // Colors edit

  // renderer.toneMapping = THREE.CineonToneMapping;
  renderer.toneMappingExposure = 2;


  const blue_spot_light = new THREE.SpotLight(0x23C9FF, 1.3, 200, 160, 1, 3)
  blue_spot_light.position.set(0, 10, 0)
  blue_spot_light.castShadow = true

  scene.add(blue_spot_light)

  // Chair drag
  drag_controls = new DragControls(drag_objects, camera, renderer.domElement);

  //Randomize chair rotation
  drag_controls.addEventListener('dragstart', () => {
    let selectedObject = (arrows_coords.find((x)=>x.name==='chair').object);
    console.log(selectedObject)
    scene.remove( selectedObject );
    chair_rotation = Math.round(Math.random())
  })
  drag_controls.addEventListener('drag', function (event) {

    let chair = event.object
    let chair_rotating_per_frame

    // Track chair animation duration
    chair_animation_duration++

    //Easter egg if duration is too big
    if (chair_animation_duration === 10000) alert('Ты че дядя ебанутый')


    if (chair_rotation) chair_rotating_per_frame = 0.01
    else chair_rotating_per_frame = -0.01
    chair.rotation.y += chair_rotating_per_frame

    //barriers

    if (chair.position.x > 4.4) {
      chair.position.x = 4.4
    }
    if (chair.position.z > 5.8) {
      chair.position.z = 5.8
    }
    if (chair.position.x < -0.5) {
      chair.position.x = -0.5
    }
    if (chair.position.z < -4) {
      chair.position.z = -4
    }
    if (chair.position.y !== 0) {
      chair.position.y = 0
    }

    //Set properties for another models of chair (Seat, wheels)
    drag_objects.forEach((x) => {
      x.position.x = chair.position.x
      x.position.z = chair.position.z
      x.rotation.y += chair_rotating_per_frame
    })
  });
}





function startAnimation() {
  pc_animation = THREE.AnimationClip.findByName(room.animations, 'Camera.002Action.002')  //get the animation name by console.log(gltf.animations)
  mixer = new THREE.AnimationMixer(camera)
  pc_animation_action = mixer.clipAction(pc_animation)
  pc_animation_action.reset()
  pc_animation_action.loop = THREE.LoopOnce;
  pc_animation_action.timeScale = 1;
  pc_animation_action.clampWhenFinished = true
  pc_animation_action.play()

  mixer.addEventListener('finished', () => {

  })
}

function animate() {
  const elapsedTime = clock.getDelta()
  requestAnimationFrame(animate);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  render_scene.camera = camera;
  if (mixer) {
    mixer.update(elapsedTime)
  }
  bloom_composer.render();
}

export default {
  name: "IsometricRoom",
  components: {Preloader, PCDisplay, SlotDisplay},
  data() {
    return {
      chairLoaded: false,
      pcLoaded: false,
      roomLoaded: false,
      slotLoaded: false,
    }
  },
  computed: {
    loaded() {
      return this.chairLoaded && this.pcLoaded && this.roomLoaded && this.slotLoaded
    },
    display() {
      return currentDisplay.value
    },

  },
  methods: {
    back() {
      if (currentDisplay.value === 'pc') {
        if (pc_animation_action.time === 0) {
          pc_animation_action.time = pc_animation_action.getClip().duration;
        }
        pc_animation_action.paused = false;
        pc_animation_action.loop = THREE.LoopOnce
        pc_animation_action.timeScale = -1;
        pc_animation_action.play();
      }
      if (currentDisplay.value === 'slot') {
        if (slot_animation_action.time === 0) {
          slot_animation_action.time = slot_animation_action.getClip().duration;
        }
        slot_animation_action.paused = false;
        slot_animation_action.loop = THREE.LoopOnce
        slot_animation_action.timeScale = -1;
        slot_animation_action.play();
      }
      currentDisplay.value = null
    },
    slotLoad() {
      loader.load(
          'models/isometric_room_arcade/slot.glb',
          (gltf) => {
            this.slotLoaded = true
            gltf.scene.position.set(-2.3, 0, 2.82)
            gltf.scene.traverse(function (object) {
              if (object.isMesh) {
                object.castShadow = true
                object.receiveShadow = true
              }
            });
            slot = gltf;
          },
          function (xhr) {
            console.log('chair' + (xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (error) {
            console.log('An error happened', error);
          }
      )
    },

    chairLoad() {
      loader.load(
          'models/isometric_room_arcade/chair.glb',
          (gltf) => {
            this.chairLoaded = true
            drag_objects.push(...gltf.scene.children[0].children)
            console.log('chair', gltf.scene)
            gltf.scene.traverse(function (object) {
              if (object.isMesh) {
                object.castShadow = true
                object.receiveShadow = true
              }
            });
            chair = gltf;
          },
          function (xhr) {
            console.log('chair' + (xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (error) {
            console.log('An error happened', error);
          }
      )
    },

    pcLoad() {
      loader.load(
          'models/isometric_room_arcade/testpc2.glb',
          (gltf) => {
            this.pcLoaded = true
            gltf.scene.traverse(function (object) {
              if (object.isMesh) {
                object.castShadow = true
                object.receiveShadow = true
              }
            });
            pc = gltf;
          },
          function (xhr) {
            console.log('chair' + (xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (error) {
            console.log('An error happened', error);
          }
      )
    },

    roomLoad() {
      loader.load(
          'models/isometric_room_arcade/testroom3.glb',
          (gltf) => {
            // for longer preloader
            setTimeout(() => {
              this.roomLoaded = true
              console.log('all cameras', gltf.cameras)
              camera = gltf.cameras[0]
              camera.fov = 50
              console.log('animations', gltf.animations)
              room = gltf;
              room.scene.traverse(function (object) {
                if (object.isMesh) {
                  object.castShadow = true
                  object.receiveShadow = true
                }
              });
            }, 700)

          },
          function (xhr) {
            console.log('room' + (xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (error) {
            console.log('An error happened', error);
          }
      );
    }
  },
  mounted() {
    this.chairLoad()
    this.pcLoad()
    this.roomLoad()
    this.slotLoad()
  },
  watch: {
    loaded() {
      init();
      animate();
      startAnimation();
    }
  }
}
</script>

<style scoped>
.back-btn {
  position: absolute;
  z-index: 999;
  left: 20px;
  top: 20px;
}
</style>