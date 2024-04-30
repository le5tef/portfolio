<template>
  <div class="window">
  <div class="glass-wrapper" :class="active?mobile?'dropdown-mobile':'dropdown':''">
    <div class="content">
      <div class="card">
        <div class="glass-effect">

          <p class="card-title">NIKE Air Mag</p>
          <p class="card-text" :class="mobile?'':'mt-6'">Back to the future</p>
          <p class="card-text">39 323.99$</p>


          <button class="gradient-btn buy-button">Buy</button>

        </div>
        <div class="circle-gradient circle-1"></div>
        <div class="circle-gradient circle-2"></div>
        <div class="circle-gradient circle-3"></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "GlassVidget",
  props: {
    active:{
      type: Boolean,
      default: false
    }
  },
  computed:{
    mobile(){
      return window.innerWidth <= 1000
    }
  }
}
</script>

<style scoped>
.dropdown{
  animation: dropdown 2s ease forwards;
}

.dropdown-mobile{
  animation: dropdown-mobile 2s ease forwards;
}

@keyframes dropdown{
  from {
    bottom: -30%;
    left: 120%;
  }
  to {
    bottom: 60%;
    left: 70%;
  }
}

@keyframes dropdown-mobile{
  from {
    bottom: -30%;
    left: 120%;
  }
  to {
    bottom: 35%;
    left: 50%;
  }
}

.gradient-btn {
  font-size: 22px;
  position: absolute;
  top: 100%;
  left: 70%;
  transform: translate(-50%, -50%);
  z-index: 10;
  min-width: 151px;
  height: 49px;
  color: #fff;
  padding: 8px 14px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'Sono', sans-serif !important;
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

.glass-wrapper {
  bottom: -30%;
  left: 70%;
  transform: translateX(-50%);
  position: absolute;
  z-index: 10;
  perspective: 521px;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(9deg) rotateY(336deg);
}



.card {
  position: absolute;
  top: 0;
  left: 0;
  height: 250px;
  width: 400px;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.glass-effect {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(315deg, #4ecdc46e 0%, #c797eb6e 75%);
  border-radius: 16px;
  box-shadow: 0 4px 30px #c797eb1f;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  font-family: 'Sono', sans-serif;
}

.card p {
  color: white;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-left: 30px;
}

.card .card-title {
  font-size: 40px;
  font-weight: bold;
  font-family: 'Fredoka One';
}

.card .card-text {
  font-size: 22px;
  font-family: 'Sono';
}

.mt-6{
  margin-bottom:50px;
}

.circle-gradient {
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  background: linear-gradient(315deg, #4ecdc4 0%, #c797eb 75%);
  opacity: 0.7;
}

.circle-1 {
  transform: translate(-50%, -50%);
  top: 80px;
  width: 100px;
  height: 100px;
  animation: bounce 3s ease infinite;
}


.circle-2 {
  top: 100%;
  transform: translateY(-50%);
  left:150px;
  width: 80px;
  height: 80px;
  animation: bounce 4s linear infinite;
}

.circle-3 {
  transform: translate(-50%, -50%);
  top: 110px;
  left: 100%;
  width: 150px;
  height: 150px;
  animation: bounce 3s ease-in-out infinite;
}


@media screen and (max-width: 1000px) {
  .content{
    transform: none
  }
  .gradient-btn{
    left:50%
  }
  .circle-2 {
    top: 80%;
    transform: translateY(-50%);
    left:90%;
    width: 80px;
    height: 80px;
    animation: bounce 4s linear infinite;
  }
  .card {
    position: absolute;
    top: 0;
    left: 0;
    height: 350px;
    width: 250px;
  }
}
@keyframes bounce {
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%,-25%);
  }
  100% {
    transform: translate(-50%,-50%);
  }
}
</style>