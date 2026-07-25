/**
 * @file oneko.js
 * @brief Interactive 2D Pixel Dog Cursor Follower for Hexo Blog
 */

(function oneko() {
  const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  
  const nekoAnimationFrameSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [[-5, -4], [-6, -4], [-7, -4]],
    scratchWallN: [[0, -2], [0, -3]],
    scratchWallS: [[-7, -1], [-6, -2]],
    scratchWallE: [[-2, -2], [-2, -3]],
    scratchWallW: [[-4, -2], [-4, -3]],
    tired: [[-3, -2]],
    sleeping: [[-2, -0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    NE: [[0, -0], [0, -1]],
    E: [[-3, -0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S: [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W: [[-4, -0], [-4, -1]],
    NW: [[-1, -0], [-1, -1]],
  };

  const nekoDataUri = 'data:image/gif;base64,' + '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';

  let nekoEl;
  let nekoPosX = window.innerWidth - 64;
  let nekoPosY = window.innerHeight - 64;
  let mousePosX = window.innerWidth - 64;
  let mousePosY = window.innerHeight - 64;
  let count = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  let bgPositionX = 0;
  let bgPositionY = 0;
  let isSleeping = false;

  const nekoSpeed = 10;

  function createNeko() {
    nekoEl = document.createElement('div');
    nekoEl.id = 'oneko';
    nekoEl.ariaHidden = 'true';
    
    nekoEl.style.width = '32px';
    nekoEl.style.height = '32px';
    nekoEl.style.position = 'fixed';
    nekoEl.style.pointerEvents = 'auto';
    nekoEl.style.cursor = 'pointer';
    nekoEl.style.zIndex = '999999';
    nekoEl.style.backgroundImage = 'url(/images/oneko.gif), url(' + nekoDataUri + ')';
    nekoEl.style.imageRendering = 'pixelated';
    nekoEl.style.left = (nekoPosX - 16) + 'px';
    nekoEl.style.top = (nekoPosY - 16) + 'px';
    nekoEl.style.transition = 'transform 0.1s ease';

    document.body.appendChild(nekoEl);

    window.addEventListener('mousemove', (event) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    window.addEventListener('touchmove', (event) => {
      if (event.touches.length > 0) {
        mousePosX = event.touches[0].clientX;
        mousePosY = event.touches[0].clientY;
      }
    });

    nekoEl.addEventListener('click', (e) => {
      e.stopPropagation();
      createHearts(nekoPosX, nekoPosY);
      jumpNeko();
    });

    nekoEl.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      isSleeping = !isSleeping;
      if (isSleeping) {
        setSprite('sleeping', 0);
      }
    });

    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const anim = nekoAnimationFrameSets[name];
    if (!anim) return;
    const sprite = anim[frame % anim.length];
    bgPositionX = sprite[0] * 32;
    bgPositionY = sprite[1] * 32;
    nekoEl.style.backgroundPosition = (bgPositionX) + 'px ' + (bgPositionY) + 'px';
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function jumpNeko() {
    nekoEl.style.transform = 'translateY(-18px) scale(1.1)';
    setTimeout(() => {
      nekoEl.style.transform = 'translateY(0) scale(1)';
    }, 250);
  }

  function createHearts(x, y) {
    for (let i = 0; i < 5; i++) {
      const heart = document.createElement('div');
      heart.className = 'oneko-heart';
      heart.innerHTML = '♥';
      heart.style.left = (x + (Math.random() * 30 - 15)) + 'px';
      heart.style.top = (y - 10 + (Math.random() * 20 - 10)) + 'px';
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1000);
    }
  }

  function idle() {
    idleTime += 1;

    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) === 0 &&
      idleAnimation === null
    ) {
      const availAnims = ['sleeping', 'scratchSelf'];
      if (nekoPosX < 32) availAnims.push('scratchWallW');
      if (nekoPosY < 32) availAnims.push('scratchWallN');
      if (nekoPosX > window.innerWidth - 32) availAnims.push('scratchWallE');
      if (nekoPosY > window.innerHeight - 32) availAnims.push('scratchWallS');
      
      idleAnimation = availAnims[Math.floor(Math.random() * availAnims.length)];
    }

    if (isSleeping) {
      setSprite('sleeping', Math.floor(count / 8));
      return;
    }

    switch (idleAnimation) {
      case 'sleeping':
        if (idleAnimationFrame < 8) {
          setSprite('tired', 0);
        } else {
          setSprite('sleeping', Math.floor(idleAnimationFrame / 8));
        }
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case 'scratchSelf':
      case 'scratchWallN':
      case 'scratchWallS':
      case 'scratchWallE':
      case 'scratchWallW':
        setSprite(idleAnimation, Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 32) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite('idle', 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  let lastFrameTimeStamp;

  function onAnimationFrame(timestamp) {
    if (!nekoEl) return;

    if (!lastFrameTimeStamp) {
      lastFrameTimeStamp = timestamp;
    }

    if (timestamp - lastFrameTimeStamp > 80) {
      lastFrameTimeStamp = timestamp;
      count += 1;

      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if ((distance < 32 || isSleeping) && !isMobile) {
        idle();
        nekoEl.style.left = (nekoPosX - 16) + 'px';
        nekoEl.style.top = (nekoPosY - 16) + 'px';
        window.requestAnimationFrame(onAnimationFrame);
        return;
      }

      if (isSleeping && distance > 64) {
        isSleeping = false;
      }

      resetIdleAnimation();
      idleTime = 0;

      let direction = '';
      direction += diffY / distance > 0.5 ? 'N' : '';
      direction += diffY / distance < -0.5 ? 'S' : '';
      direction += diffX / distance > 0.5 ? 'W' : '';
      direction += diffX / distance < -0.5 ? 'E' : '';

      setSprite(direction, count);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = (nekoPosX - 16) + 'px';
      nekoEl.style.top = (nekoPosY - 16) + 'px';
    }

    window.requestAnimationFrame(onAnimationFrame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createNeko);
  } else {
    createNeko();
  }
})();
