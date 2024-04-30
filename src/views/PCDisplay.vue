<template>
  <div ref="pc" class="pc">
    <div v-if="isLoading" class="loading-wrapper">
      <div class="logo">
        <p class="top">Microsoft</p>
        <p class="mid">Windows<span>XP</span></p>
        <p class="bottom">Professional</p>
      </div>
      <div class="container">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
    <div  class="desktop">
      <div class="desktop-icons">
        <div class="desktop-icon" v-for="project in projects" @click="openLink(project.link||project.github)" :key="project.id">
          <img class="desktop-icon-image" :src="project.src" alt=""/>
          <div class="desktop-icon-title">{{project.name}}</div>
        </div>
      </div>
      <div class="taskbar">
        <div class="main-section">
          <input id="start-menu-active" checked type="checkbox">
          <label :class="isStartPanelOpened?'start-button-active':''" class="start-button"
                 for="start-menu-active" @click="toggleStartPanel">
            start
          </label>
          <div v-if="isStartPanelOpened" class="start-menu">
            <div class="start-menu-header">
              <div class="account-image-wrapper">
                <img alt="" src="/images/logo.jpg" style="width: 52px; height: 52px">
              </div>
              <h1 class="account-name">Donya</h1>
            </div>
            <div class="start-menu-body">
              <div class="start-menu-favorites">
                <div class="start-menu-item intent-item" v-for="(item,id) in leftColumnItems" :key="id" @click="item.event">
                  <div class="icon" :style="`background-image:url(${item.icon})`"></div>
                  <div class="label">
                    <div class="intent">{{item.name}}</div>
                    <div class="program">{{item.description}}</div>
                  </div>
                </div>
                <div class="divider"></div>

              </div>
              <div class="start-menu-shortcuts">
                <div class="my-projects start-menu-item my-item" @click="openMyTemplates">
                  <div class="icon"
                       style="background-image:url('/images/images.ico')"></div>
                  <div class="label">My Templates</div>
                </div>
                <div class="my-projects start-menu-item my-item" @click="openMyTemplates">
                  <div class="icon"
                       style="background-image:url('/images/images.ico')"></div>
                  <div class="label">My Templates</div>
                </div>
                <div class="my-projects start-menu-item my-item" @click="openMyTemplates">
                  <div class="icon"
                       style="background-image:url('/images/images.ico')"></div>
                  <div class="label">My Templates</div>
                </div>
                <div class="my-projects start-menu-item my-item" @click="openMyTemplates">
                  <div class="icon"
                       style="background-image:url('/images/images.ico')"></div>
                  <div class="label">My Templates</div>
                </div>
                <div class="my-projects start-menu-item my-item" @click="openMyTemplates">
                  <div class="icon"
                       style="background-image:url('/images/images.ico')"></div>
                  <div class="label">My Templates</div>
                </div>
                <div class="divider"></div>
              </div>
            </div>
            <div class="start-menu-footer">
            </div>
          </div>
        </div>
        <div class="quick-section"></div>
      </div>
    </div>
    <div v-if="isTemplatesOpened" :class="isTemplatesMaximized?'window-fullscreen':''" class="window">
      <div ref="draggable_window" class="title-bar" draggable="true">
        <div class="title-bar-text">
          My Templates
        </div>

        <div class="title-bar-controls">
          <button aria-label="Minimize" @click="toggleMyProjects"></button>
          <button aria-label="Maximize" @click="toggleMaximizeButton"></button>
          <button aria-label="Close" @click="toggleMyProjects"></button>
        </div>
      </div>
      <div class="window-body">
        <div class="help-panel">
          <div class="help-panel-items">
            <div class="help-panel-item">
              <div class="help-panel-item-title">File</div>
              <div class="help-panel-item-options">
                <div class="help-panel-item-option">I</div>
                <div class="help-panel-item-option">don't</div>
                <div class="help-panel-item-option">know</div>
                <div class="help-panel-item-option">what</div>
              </div>
            </div>
            <div class="help-panel-item">
              <div class="help-panel-item-title">Edit</div>
              <div class="help-panel-item-options">
                <div class="help-panel-item-option">should</div>
                <div class="help-panel-item-option">be</div>
                <div class="help-panel-item-option">written</div>
                <div class="help-panel-item-option">here</div>
              </div>
            </div>

          </div>
          <img alt="" class="help-panel-logo" src="images/logo.jpg"/>
        </div>

        <div class="window-body-content">
          <div class="window-body-content-links">


            <div v-for="project in templates" :key="project.id" class="window-body-content-link">

              <div class="title-bar link">
                <div class="title-bar-text">
                  {{ project.name }}
                </div>

              </div>
              <div v-if="project.src" class="link-item" @click="openPreview(project)">
                <div class="link-item-icon"></div>
                <div class="link-item-title">Open preview</div>
              </div>
              <div v-if="project.github" class="link-item" @click="openLink(project.link)">
                <div class="link-item-icon"></div>
                <div class="link-item-title">Github repository</div>
              </div>
              <div v-if="project.link" class="link-item" @click="openLink(project.link)">
                <div class="link-item-icon"></div>
                <div class="link-item-title">Online demo</div>
              </div>

            </div>

          </div>
          <div class="window-body-content-preview">
            <div @click="prevPreview" v-if="openedTemplateId>0" class="left-arrow">
              <img height="30" width="30" src="/images/arrow-left.svg" alt=""/>
            </div>
            <div @click="nextPreview" v-if="openedTemplateId<templates.length-1" class="right-arrow">
              <img height="30" width="30"  src="/images/arrow-right.svg" alt=""/>
            </div>
            <img :src="openedProject.src" alt="" class="window-body-content-preview-image"/>
            <p>{{ openedProject.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "xp.css/dist/XP.css";
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
export default {
  name: "PCDisplay",
  data() {
    return {
      isLoading: true,
      isTemplatesOpened: true,
      isStartPanelOpened: false,
      isTemplatesMaximized: false,
      isTemplatesMinimized: false,
      windowWidth: window.innerWidth,
      openedTemplateId: 0,
    }
  },
  computed: {
    openedProject() {
      return this.templates[this.openedTemplateId]
    },
    mobileDevice() {
      return window.innerWidth < 750
    },
    templatesMaximized() {
      return this.isTemplatesMaximized
    },
    leftColumnItems(){
      return [
        {
          name:'Internet',
          description:'Are you really?',
          icon:'/images/ie.png',
          event:null,
        },
        {
          name:'E-mail',
          description:'Send me email',
          icon:'/images/outlook.png',
          event:this.email,
        },
        {
          name:'Telegram',
          description:'Send me telegram',
          icon:'/images/telegram.webp',
          event:this.openTelegram,
        },
        {
          name:'Instagram',
          description:'Sub me',
          icon:'/images/instagram.png',
          event:this.openInstagram,
        }
      ]
    },
    templates() {
      return [
        {
          id: 0,
          name: 'Sneakers langing',
          link: '/shoes',
          github: null,
          description: 'Template for sneakers shops',
          src: '/images/projects/nike.png'
        },
        // {
        //   id: 1,
        //   name: 'Apartment rental',
        //   link: 'https://aparts.donya.dev',
        //   github: null,
        //   description: 'Template for apartment rentals',
        //   src: '/images/projects/aparts.png'
        // },
        {
          id: 1,
          name: 'Buterbrodnaya',
          link: '/sandwich',
          github: null,
          description: 'Template for Buterbrodnaya',
          src: '/images/projects/buterbrodnaya.png'
        },
      ]
    },
    projects() {
      return [
        {
          id: 0,
          name: 'RANKS Research',
          link: 'https://res.ranksworld.com/',
          github: null,
          description: 'aaaaaa',
          src: '/images/ranks.ico'
        },
        {
          id: 1,
          name: 'RANKS Payment',
          link: 'https://payment.mobile.ranks.pro/',
          github: null,
          description: 'aaaaaaa',
          src: '/images/ranks.ico'
        },
        {
          id: 2,
          name: 'MP4 Player',
          link: 'https://github.com/le5tef/audio-player',
          github: 'https://github.com/le5tef/audio-player',
          description: '',
          src: '/images/mp4.jpg'
        },
        {
          id: 3,
          name: 'Ceezaam CRM',
          link: null,
          github: 'https://github.com/le5tef/CEEZAAM',
          description: 'CRM for Whai-Thai, backend not working, but you can check all code',
          src: '/images/ceezaam.ico'
        },
        {
          id: 4,
          name: 'BioFarma',
          link: null,
          github: 'https://biofarma.ru',
          description: '',
          src: '/images/biofarma.ico'
        },
        {
          id: 5,
          name: 'River-Port',
          link: null,
          github: 'https://river-port.ru',
          description: '',
          src: '/images/river-port.ico'
        },
        {
          id: 6,
          name: 'PSK-Karie',
          link: null,
          github: 'https://github.com/le5tef/psk-karie',
          description: '',
          src: '/images/psk-karie.ico'
        },
      ]
    }
  },
  methods: {
    email() {
      window.open('mailto:donya.withlove@gmail.com')
    },
    openTelegram(){
      this.openLink('https://t.me/work_veselov')
    },
    openInstagram(){
      this.openLink('https://instagram.com/donya.veselov')
    },
    openMyTemplates() {
      this.isTemplatesOpened = true
      this.isStartPanelOpened = false
    },
    openPreview(project) {
      this.openedTemplateId = project.id
    },
    nextPreview(){
        this.openedTemplateId++
    },
    prevPreview(){
      this.openedTemplateId--
    },
    openLink(link) {
      window.open(link, '_blank').focus();
    },
    toggleMyProjects() {
      this.isTemplatesOpened = !this.isTemplatesOpened
      this.isStartPanelOpened = false
    },
    toggleStartPanel() {
      this.isStartPanelOpened = !this.isStartPanelOpened
    },
    toggleMaximizeButton() {
      this.isTemplatesMaximized = !this.isTemplatesMaximized
      this.isStartPanelOpened = false
    },
    toggleMinimizeButton() {
      this.isTemplatesMinimized = !this.isTemplatesMinimized
      this.isStartPanelOpened = false
    },
    turnOff() {
      this.$emit('back')
    }
  },
  mounted() {

    setTimeout(() => {
      this.isLoading = false
      createToast('Press F11 for the best experience', {type: 'default', hideProgressBar: true})
    }, 2500)

  }
}
</script>

<style scoped>


</style>

<style lang="scss">
$medium-blue: #245edb;
$light-blue: #0c8dea;
$main-section-height: 27px;
$help-panel-height: 20px;
$title-bar-height: 27px;
$mobile-width:750px;
.window {
  position: absolute;
  height: 80vh;
  width: 80vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
}

.window-fullscreen {
  width: 100vw;
  height: calc(100% - $main-section-height) !important;
  top: 0 !important;
  left: 0 !important;
  transform: none;
  border-radius: 0;
}

.window-body-content {
  width: 100%;
  height: calc(100% - $help-panel-height) !important;
  display: flex;
}

.left-arrow{
  position: absolute;
  left:5px;
  top:50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.right-arrow{
  position: absolute;
  right:5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.window-body-content-preview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom:8px;
}

.window-body-content-preview-image {
  display: flex;
  flex-direction: column;
  width: 60%;
  min-width: 250px;
  height: auto;
}

.window-body-content-links {
  min-width: 250px;
  width: 40%;
  max-width: $mobile-width;
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(0deg, rgb(85, 106, 217) 0%, rgb(111, 151, 220) 100%);
}

.window-body-content-link {
  padding: 10px;
}

.desktop-icon{
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
}

.desktop-icon:hover{
  filter: invert(32%) sepia(66%) saturate(7479%) hue-rotate(230deg) brightness(90%) contrast(114%);
  background: rgb(100,149,237,0.5);
}

.desktop-icon:target{
  border: 1px blue solid;
}

.desktop-icon-image{
  height: 40px;
  width: 40px;
  margin-bottom: 5px;
}

.desktop-icon-title{
  font-size: 12px;
}


.link-item {
  background: #ece9d8;
  height: 10px;
  padding: 10px;
  cursor: pointer;
}

.link-item:hover {
  text-decoration: underline;
}

.link-item-title {
  color: $medium-blue;
}

.window-body {
  margin: 0;
  padding: 0 4px 0 3px;
  height: calc(100% - $title-bar-height);
}

.help-panel {
  height: $help-panel-height;
  display: flex;
  justify-content: space-between;
}

.help-panel-items {
  display: flex;
}

.help-panel-item {
  padding: 2px 4px;
  position: relative;
  display: flex;
  align-items: center;
}

.help-panel-item:hover {
  background: #dad8c8;
}

.help-panel-item-options {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  background: #dad8c8;
}

.help-panel-item-option {
  padding: 2px 4px;
  width: 80px;
  border: 1px #c5c3b6 solid;
  margin: -1px 0 0 0;
}

.help-panel-item-option:hover {
  background: #c5c3b6;
}


.help-panel-item:hover .help-panel-item-options {
  display: block;
}

.help-panel-logo {
  width: 50px;
  height: $help-panel-height;
  object-fit: cover;
}

.loading-wrapper {
  z-index: 99999;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #000;
  font-family: 'Roboto', sans-serif;
  color: #fff;
}

* {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.taskbar {
  position: absolute;
  display: flex;
  z-index: 100;
  bottom: 0;
  left: 0;
  width: 100%;

  .main-section {
    height: $main-section-height;
    flex-grow: 1;
    background: linear-gradient(to bottom, #{$medium-blue} 0%, #3f8cf3 9%, #{$medium-blue} 18%, #{$medium-blue} 92%, #333 100%) center/cover no-repeat;

    .start-button {
      &::before {
        content: '';
        background: url('/images/xp.png') center/cover no-repeat;
        position: relative;
        border: none;
        overflow: hidden;
        box-shadow: none !important;
        display: inline-block;
        height: 15px;
        width: 15px;
        top: 2px;
        left: 0;
        transform: skewX(3deg);
        -webkit-filter: drop-shadow(1px 1px 1px #333);
      }

      position: relative;
      display: inline-block;
      font-size: 18px;
      margin-left: 0;
      color: white;
      font-style: italic;
      padding: 5px 25px 5px 15px;
      text-shadow: 1px 1px 1px #333;
      border-radius: 0px 10px 15px 0px;
      border: none;
      transform: skewX(-3deg);
      left: -5px;

      box-shadow: 0px 5px 10px #79ce71 inset;
      background: radial-gradient(circle, #5eac56 0%, #3c873c 100%) center/cover no-repeat;
    }

    .start-button-active {
      box-shadow: 0 0 15px #333 inset;
    }

    .start-menu {
      position: absolute;
      background-color: $light-blue;
      min-width: 480px;
      height: 520px;
      left: 0;
      bottom: 200%;
      z-index: -50;
      border-radius: 5px 5px 0px 0px;
      box-shadow: 2px 6px 10px #333,
      -2px 0px 5px rgba(20, 20, 20, 0.6) inset,
      2px 0px 3px #7fbce8 inset;

      //overflow: hidden;
      //letter-spacing:-0.2px;

      .start-menu-header {
        display: flex;
        align-items: center;
        height: 65px;
        box-shadow: 3px 2px 3px #7fbce8 inset;
        background: linear-gradient(to bottom, #{$medium-blue} 0%, #{$light-blue} 100%);
        padding: 8px 0px 7px 8px;

        .account-image-wrapper {
          background-color: white;
          border-radius: 5px;
          padding: 2px;
          height: 52px;
          display: inline-block;
          box-shadow: 2px 2px 4px #333;
        }

        .account-name {
          display: inline-block;
          margin: 0;
          color: white;
          font-size: 18px;
          font-weight: normal;
          margin-left: 10px;
          text-shadow: 0px 0px 3px #555;
        }
      }

      .start-menu-body {
        position: relative;
        display: flex;
        height: calc(100% - 65px - 43px);
        background-color: white;
        border: 1px solid $light-blue;
        margin: 0 1px;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: -7.5px;
          left: 10%;
          width: 80%;
          height: 5px;
          border-radius: 50%;
          box-shadow: 0px 4px 5px #e88f0b;
          z-index: 10;
        }

        .start-menu-item {
          display: flex;
          align-items: center;
          padding: 5px;
          font-size: 11px;

          > * {
            display: inline-block;
          }

          .icon {
            height: 30px;
            width: 30px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          }

          .label {
            margin-left: 5px;

            .intent {
              font-weight: bold;
              color: rgb(55, 55, 56);
            }

            .program {
              color: rgb(128, 128, 128);
            }
          }

          &:hover {
            background-color: rgb(61, 100, 189);
            color: white;

            .label {
              color: white;
            }
          }
        }

        .divider {
          margin: 5px 0px;
          height: 1px;
          background: linear-gradient(to right, white 0%, rgb(211, 211, 200) 50%, white 100%) center/cover no-repeat;
        }

        .start-menu-favorites {
          position: relative;
          display: inline-flex;
          flex-direction: column;
          height: 100%;
          width: 50%;
          padding: 8px;


          .start-menu-item.intent-item {
            .label {
              .intent {
                font-weight: bold;
                color: rgb(55, 55, 56);
              }

              .program {
                color: rgb(128, 128, 128);
              }
            }

            &:hover {
              .label {
                .intent,
                .program {
                  color: inherit;
                }
              }
            }
          }

          .start-menu-item.favorite-item {
            .label {
              color: rgb(55, 55, 56);
            }

            &:hover {
              .label {
                color: white;
              }
            }
          }

        }

        .start-menu-shortcuts {
          display: inline-flex;
          flex-direction: column;
          height: 100%;
          width: 50%;
          padding: 8px;
          background: rgb(211, 229, 250);
          border-left: 1px solid rgb(149, 189, 238);

          .start-menu-item {
            .icon {
              width: 25px;
              height: 25px;
            }

            .label {
              color: #29356c;
              font-size: 10px;
            }

            &:hover {
              .label {
                color: white;
              }
            }
          }

          .start-menu-item.my-item {
            .label {
              font-weight: bold;
            }

            &:hover {
              .label {
                color: white;
              }
            }
          }

          .divider {
            background: linear-gradient(to right, transparent 0%, #aebad6 50%, transparent 100%) center/cover no-repeat;
          }
        }
      }

      .start-menu-footer {
        display: flex;
        padding: 0 10px;
        align-items: center;
        justify-content: flex-end;
        height: 55px;
        background: linear-gradient(to top, #{$medium-blue} 0%, #{$light-blue} 100%);
        box-shadow: -2px -2px 5px rgba(20, 20, 20, 0.6) inset;
      }

      .start-menu-footer-item {
        display: flex;
        color: white;
        align-items: center;
        width: 130px;
        padding: 5px 5px;
        border-radius: 5px;
        justify-content: space-between;

        &:hover {
          background: linear-gradient(to top, #0c8dea 0%, #245edb 100%);
        }
      }

    }

    #start-menu-active {
      display: none;
    }

  }
}


.desktop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://cdn.wallpaperhub.app/cloudcache/6/9/0/e/e/f/690eefe3ba1f553e0ea527f51ee407b604b681b4.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.container {
  width: 150px;
  height: 10px;
  border: 2px solid #b2b2b2;
  border-radius: 7px;
  margin: 0 auto;
  padding: 2px 1px;
  overflow: hidden;
  font-size: 0;
}

.box {
  width: 9px;
  height: 100%;
  background: linear-gradient(to bottom, #2838c7 0%, #5979ef 17%, #869ef3 32%, #869ef3 45%, #5979ef 59%, #2838c7 100%);
  display: inline-block;
  margin-right: 2px;
  animation: loader 2s infinite;
  animation-timing-function: linear;
}

.logo {
  width: 220px;
  margin: 15px auto;
}

.logo p {
  margin: 0;
  padding: 0;
}

.top {
  font-size: 16px;
  font-weight: 300;
  line-height: 16px;
}

.top:after {
  content: "\00a9";
  font-size: 10px;
  position: relative;
  top: -5px;
  margin-left: 2px;
}

.mid {
  font-size: 46px;
  font-weight: 700;
  line-height: 36px;
  display: flex;
}

.mid span {
  font-size: 22px;
  display: inline-block;
  vertical-align: top;
  color: #FF6821;
  margin-top: -8px;
}

.logo .bottom {
  font-size: 30px;
  font-weight: 300;
  line-height: 30px;
  margin-left: 5px;
}

@media screen and (max-width:$mobile-width) {
  .window-body-content {
    flex-direction: column;
  }
  .window-body-content-links {
    display: flex;
    width: 100%;
    align-items: center;
    height: 150px;
  }
  .link {
    width: 210px !important;
  }
  .start-menu {
    min-width: 300px !important;
  }
  .left-arrow,.right-arrow{
    top:95%;
  }
}

@keyframes loader {
  0% {
    transform: translate(-30px);
  }
  100% {
    transform: translate(150px);
  }
}

</style>
