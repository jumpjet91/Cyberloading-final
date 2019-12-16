// particle animation for canvas practice
// based off this pen as reference https://codepen.io/ace/pen/ICtHK

// high dpi canvas
// https://www.html5rocks.com/en/tutorials/canvas/hidpi/

// MDN canvas resources
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

class smokeParticle {
  constructor() {
    this.init();
  }
  
  init() {
    this.particlesQuantity = 300;
    this.velocity = 0.5;
    this.maxRadius = 2;
    
    this.imgQuantity = 150;
    this.maxSize = 600;
    this.imgVelocity = 0.5;
    this.smokeOne = new Image();
    this.smokeTwo = new Image();
    this.smokeOne.src = 'smoke.png';
    this.smokeTwo.src = 'smoke-2.png';
    
    this.canvas = document.getElementById('fumo');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.smoke = [];
    
    this.ratio = 1;
    
    this.bindHandlers();
    this.buildParticles();
    this.buildImg();
    this.resizeCanvas();
    this.retinaScreen();
    this.animateParticles();
  }
  
  bindHandlers() {
    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
  }
  
  buildImg(){
    var smokeImages = [this.smokeOne, this.smokeTwo];

    var maxSize;
    
    for (var i=0; i < this.imgQuantity; i++) {
     var img = smokeImages[Math.floor(Math.random() * smokeImages.length)];
       
      maxSize = Math.round(Math.random() * this.maxSize);
      
      this.smoke.push({
        x: Math.round(Math.random() * window.innerWidth) - maxSize / 2,
        y: Math.round(Math.random() * window.innerHeight) - maxSize / 2,
        velx: Math.random() * this.imgVelocity * 2 - this.imgVelocity,
        vely: Math.random() * this.imgVelocity * 2 - this.imgVelocity,
        size: maxSize,
        img: img
      });
    }
  }
  
  buildParticles() {
    for (var i=0; i < this.particlesQuantity; i++) {
      // use this for an array of colors
      // var colors = ['#60CAA0', '#BEE1EF', '#FF6F6F'];
      // var color = colors[Math.floor(Math.random() * colors.length)];
      
      this.particles.push({
        x: Math.round(Math.random() * window.innerWidth),
        y: Math.round(Math.random() * window.innerHeight),
        velx: Math.random() * this.velocity * 2 - this.velocity,
        vely: Math.random() * this.velocity * 2 - this.velocity,
        radius: Math.round(Math.random() * this.maxRadius),
        color: ColorWawe
      });
    }
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.retinaScreen();
  }
  
  retinaScreen() {    
    var devicePixelRatio = window.devicePixelRatio || 1,
        backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                            this.ctx.mozBackingStorePixelRatio ||
                            this.ctx.msBackingStorePixelRatio ||
                            this.ctx.oBackingStorePixelRatio ||
                            this.ctx.backingStorePixelRatio || 1;
    this.ratio = devicePixelRatio / backingStoreRatio;
    
    if (devicePixelRatio !== backingStoreRatio) {
        var oldWidth = this.canvas.width;
        var oldHeight = this.canvas.height;

        this.canvas.width = oldWidth * this.ratio;
        this.canvas.height = oldHeight * this.ratio;

        this.canvas.style.width = oldWidth + 'px';
        this.canvas.style.height = oldHeight + 'px';

        this.ctx.scale(this.ratio, this.ratio);
    } else {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }
  
  animateParticles() {
    window.requestAnimationFrame(this.animateParticles.bind(this));
    this.render();
  }
  
  render() {

    // clear the canvas in-between each animation frame
    this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

    
    var particle,
        particleLength = this.particles.length;
    
    for(var i = 0; i < particleLength; i++) {
      particle = this.particles[i];
      
      // create bounds if particle reaches the edge of the canvas       
      if (particle.x < 0) {
          particle.velx = this.velocity + Math.random();
        } else if (particle.x > window.innerWidth) {
          particle.velx = -this.velocity - Math.random();
        } 
        
        if (particle.y < 0) {
          particle.vely = this.velocity + Math.random();
        } else if (particle.y > window.innerHeight) {
          particle.vely = -this.velocity - Math.random();
        }
      
      particle.x += particle.velx;
      particle.y += particle.vely;
      
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle. radius, 0, Math. PI*2, true);
      this.ctx.closePath();
      this.ctx.fill();
    }
    
    var img,
        smokeLength = this.smoke.length;
    
    for(var i = 0; i < smokeLength; i++) {
      img = this.smoke[i];
      
      // Create bounds that are 0.5 the size of the canvas    
      if (img.x < (window.innerWidth * -0.5)) {
        img.velx = this.imgVelocity + Math.random();
      } else if (img.x > (window.innerWidth - img.size) * 2) {
        img.velx = -this.imgVelocity - Math.random();
      } 
        
      if (img.y < (window.innerHeight * -0.5)) {
        img.vely = this.imgVelocity + Math.random();
      } else if (img.y > (window.innerHeight - img.size) * 2) {
        img.vely = -this.imgVelocity - Math.random();
      }
      
      img.x += img.velx;
      img.y += img.vely;
      
      this.ctx.drawImage(img.img, img.x, img.y, img.size, img.size);
    }
    this.ctx.restore();  
  }
}

if(UseSmoke){ new smokeParticle(); }
