<template>
  <div>
    <Preloader v-if="!loaded"/>
    <div class="wrapper">


      <div>
        <div :class="loaded?'logos-animation':''" class="logos">
          <div @click="openLink('http://buterbrodnaya.com/')">
            <img alt="buterbrodnaya"
                 height="30" src="images/sandwich/logo/buterbrodnaya.svg"
                 width="30"/>
          </div>


          <div style="font-size: 15px; margin: 0 10px">X</div>
          <div @click="openLink('http://donya.dev/')">
            <img height="30" src="images/logo.png"/>
          </div>
        </div>
        <div :class="loaded?'interface-animation':''" class="interface">
          <div class="buttons" >
            <button @click="cook">Cook</button>
            <button @click="reset">Try another one</button>

          </div>
          <div class="ingridients">

            <div v-for="ingridient in filteredIngridients" :key="ingridient.id" class="ingridient"
                 @click="addToCompound(ingridient.name)">
              <img :src="ingridient.image" alt=""/>

            </div>

          </div>
        </div>

        <canvas ref="canvas"/>
      </div>
    </div>
  </div>
</template>

<script>
import Preloader from "@/components/Preloader";
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import {ref, toRaw} from "vue";

let initializeDomEvents = require('threex-domevents')
let THREEs = require('three')
let THREEx = {}
initializeDomEvents(THREEs, THREEx)
let camera, scene, renderer;
const loader = new GLTFLoader();
let mixer;
let light2, light3;
let controls;
const clock = new THREE.Clock()
let models = ref([
  {
    id: 0,
    name: 'Avacados',
    loaded: false,
    gltf: null,
    image: 'images/sandwich/jpg/avacados.jpg',
    source: 'models/sandwich/avacados.glb',
    mobile_source: 'models/sandwich/avacados.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 1,
    name: 'Bacon',
    loaded: false,
    gltf: null,
    image: 'images/sandwich/jpg/bacon.jpg',
    source: 'models/sandwich/bacon.glb',
    mobile_source: 'models/sandwich/bacon.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 2,
    name: 'Bread',
    loaded: false,
    gltf: null,
    image: 'images/sandwich/jpg/bread.jpg',
    source: 'models/sandwich/bread.glb',
    mobile_source: 'models/sandwich/bread.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 3,
    name: 'Butter',
    loaded: false,
    gltf: null,
    image: 'images/sandwich/jpg/butter.jpg',
    source: 'models/sandwich/butter.glb',
    mobile_source: 'models/sandwich/butter.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 4,
    name: 'Cheese',
    loaded: false,
    gltf: null,
    image: 'images/sandwich/jpg/cheese.jpg',
    source: 'models/sandwich/cheese.glb',
    mobile_source: 'models/sandwich/cheese.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 5,
    name: 'Egg',
    loaded: false,
    gltf: null,
    image: 'images/sandwich/jpg/egg.jpg',
    source: 'models/sandwich/egg.glb',
    mobile_source: 'models/sandwich/egg.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 6,
    name: 'Fish',
    loaded: false,
    gltf: null,
    image: 'images/sandwich/jpg/fish.jpg',
    source: 'models/sandwich/fish.glb',
    mobile_source: 'models/sandwich/fish.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 7,
    name: 'Fresh Cucumbers',
    loaded: false,
    gltf: null,
    image: null,
    source: 'models/sandwich/fresh_cucumber.glb',
    mobile_source: 'models/sandwich/fresh_cucumber.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 8,
    name: 'Ham',
    loaded: false,
    gltf: null,
    image: null,
    source: 'models/sandwich/ham.glb',
    mobile_source: 'models/sandwich/ham.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 9,
    name: 'Mushrooms',
    loaded: false,
    gltf: null,
    image: null,
    source: 'models/sandwich/mushrooms.glb',
    mobile_source: 'models/sandwich/mushrooms.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 10,
    name: 'Onion',
    loaded: false,
    gltf: null,
    image: 'images/sandwich/jpg/onion.jpg',
    source: 'models/sandwich/onion.glb',
    mobile_source: 'models/sandwich/onion.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 11,
    name: 'Lettuce',
    loaded: false,
    gltf: null,
    image: 'images/sandwich/jpg/salad.jpg',
    source: 'models/sandwich/salad.glb',
    mobile_source: 'models/sandwich/salad.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 12,
    name: 'Salmon',
    loaded: false,
    gltf: null,
    image: 'images/sandwich/jpg/salmon.jpg',
    source: 'models/sandwich/salmon.glb',
    mobile_source: 'models/sandwich/salmon.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 13,
    name: 'Shrimps',
    loaded: false,
    gltf: null,
    image: null,
    source: 'models/sandwich/shrimps.glb',
    mobile_source: 'models/sandwich/shrimps.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 14,
    name: 'Steak',
    loaded: false,
    gltf: null,
    image: null,
    source: 'models/sandwich/steak.glb',
    mobile_source: 'models/sandwich/steak.glb',
    animation_mixer: null,
    animations: []
  },
  {
    id: 15,
    name: 'Tomatoes',
    loaded: false,
    gltf: null,
    image: 'images/sandwich/jpg/tomatoes.jpg',
    source: 'models/sandwich/tomatoes.glb',
    mobile_source: 'models/sandwich/tomatoes.glb',
    animation_mixer: null,
    animations: []
  }
])
let compounds = ref([])
console.log(compounds)
scene = new THREE.Scene();
scene.background = null
mixer = new THREE.AnimationMixer(scene)

let last_pressed_keys = []
let konamiCode = ['A', 'B', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowDown', 'ArrowUp', 'ArrowUp'];
window.addEventListener('keydown', (event) => {
  if (event.key !== 'Shift')
    last_pressed_keys.unshift(event.key)
  if (last_pressed_keys.length > 10) last_pressed_keys.pop()
  if (JSON.stringify(last_pressed_keys) === JSON.stringify(konamiCode) && controls) {
    controls.enabled = true
  }
})

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


function loadModels() {
  for (let model of models.value) {
    loader.load(window.innerWidth > 1000 ? model.source : model.mobile_source, (gltf) => {
      model.loaded = true
      model.gltf = gltf
      model.gltf.scene.position.set(0, 0.7, 0)
      console.log('cameras', gltf.cameras)
      // camera = gltf.cameras[0]
      // model.animations_actions.camera.action = mixer.clipAction(THREE.AnimationClip.findByName(gltf, room.animations_actions.camera.name))
      // model.animations = gltf.animations
      console.log('animation', gltf.animations)

      // scene.add(gltf.scene)
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
  controls.update()
  renderer.render(scene, camera);
  light2.position.x = 5 * Math.cos(i);
  light2.position.z = 5 * Math.sin(i);
  light3.position.x = 5 * Math.cos(i - Math.PI / 2);
  light3.position.z = 5 * Math.sin(i - Math.PI / 2);
}

export default {
  name: "Sandwich",
  components: {Preloader},
  data() {
    return {
      active: false,
    }
  },
  computed: {
    mobileDevice() {
      return window.innerWidth < 415
    },
    loaded() {
      let loaded = true
      models.value.map((x) => loaded = loaded && x.loaded)
      return loaded
    },
    ingridients() {
      return models.value.map((x) => x.name)
    },
    compounds() {
      return compounds.value
    },
    filteredIngridients() {
      return models.value.filter((x) => x.image)
    }
  },
  methods: {
    openLink(url) {
      window.open(url, '_blank')
    },
    init() {
      console.log('starting')
      scene.background = 'null';
      renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: this.$refs.canvas});
      renderer.setClearColor(0x000000, 0)
      document.body.appendChild(renderer.domElement);
      camera = new THREE.PerspectiveCamera()
      camera.position.set(1.1, 1.1, 1.1)
      camera.fov = 25
      renderer.shadowMap.enabled = true;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.type = THREE.BasicShadowMap
      renderer.setPixelRatio(0.4)
      controls = new OrbitControls(camera, this.$refs.canvas);
      controls.enabled = false
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
    addToCompound(ingridient) {
      if (compounds.value.length <= 8) {
        // if (compounds.value.find((x) => x.name === ingridient)) {
        console.log(ingridient, 'already in compound')
        let clone_scene = models.value.find((x) => x.name === ingridient).gltf.scene.clone()
        console.log('clone_scene', clone_scene)
        let model = models.value.find((x) => x.name === ingridient)
        compounds.value.unshift({name: model.name, gltf: clone_scene})
        console.log('clone_scene_2', compounds.value[0].gltf)

        scene.add(toRaw(compounds.value[0].gltf))
        compounds.value[0].gltf.position.set(0, 0.7, 0)
        // }
        gsap.to(compounds.value[0].gltf.position, {
          duration: 1,
          x: 0,
          y: 0.01 * compounds.value.length + (this.mobileDevice?(0.15):(0.05)),
          z: 0
        })

      } else {
        createToast('You can add only 9 ingridients', {type: 'warning', hideProgressBar: true})
      }
    },
    cook() {
      createToast('Sorry, no luck', {type: 'default', hideProgressBar: true})
    },
    reset() {
      console.log('reset_scene')
      compounds.value.forEach((x) => {
        scene.remove(toRaw(x.gltf))
      })
      compounds.value = []
    },


  },
  mounted() {
    loadModels()
  },
  watch: {
    loaded() {
      this.init()
      animate()
    },
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Fredoka+One&display=swap');
@import url('https://fonts.googleapis.com/css?family=Sono&display=swap');

$mobile-width: 750px;
.wrapper {
  background-color: #841a1a;
  user-select: none;
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
  image-rendering: pixelated;
}

.interface {
  position: absolute;
  z-index: 5;
  left: 50%;
  transform: translateX(-50%);
  bottom:100px;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.ingridients {
  display: flex;
  flex-wrap: wrap;
  max-width: 300px;
  width: 100%;
  gap: 2px;
  justify-content: center;
  margin: 0 auto;

}

.interface-animation {
  animation: 2s interface ease-in-out forwards;
}

.ingridient {
  height: 48px;
  width: 48px;
  cursor: pointer;
  border: 1px solid #fff;
}

.logos {
  position: absolute;
  z-index: 5;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  color: white;
  bottom: 100%;
  padding: 10px;
  font-family: 'Sono', sans-serif;
}


.logos img{
  cursor: pointer;
}

.logos-animation {
  animation: 1s logo ease-out forwards;
}

.buttons{
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  margin: 0 1px;
  width: 128px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  background: transparent;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border: 1px solid #fff;
}

button:hover {
  background-color: #330401;
}

button:active {
  top: 2px;
}


@keyframes logo {
  0% {
    bottom: 100%;
  }
  100% {
    bottom: 90%;
  }

}

@keyframes interface {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }

}
@media screen and (max-width: 1000px) {
  button{
    width: 154px;
  }

  .ingridients {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 2px;
    justify-content: center;
    margin: 0 auto;

  }

  .buttons{
    flex-direction: column;
  }


}

</style>