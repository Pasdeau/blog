/**
 * @file oneko.js
 * @brief Interactive 2D Pixel Cat Cursor Follower for Hexo Blog
 * @description Standalone JavaScript pixel cat companion with mouse tracking,
 * idle animations, click heart particles, touch support, and sleep toggle.
 */

(function oneko() {
  const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  
  // Base64 Embedded Oneko Sprite Sheet (32x32 frames)
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

  // Base64 data URI of Oneko sprite sheet
  const nekoDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAEACAYAAAB1vGoAAAASb0lEQVR42u2dCXgV1bXH/zP35CY3ufnCQEIgISEhAQKBIUsISFiC4AOKuOCGC0oVV6xatVpbrWut2mqtttpWq21r3aql2tpWbWuroKC4g4osooAgS0gCSchDbsrdzzffSW7gBtzknplMbvL9+Atycu6c+c357bNnZs4MARBCCCGECI6e51Y+CgB5AG4A8AmAbAAjADz2h3t7k53+9wD4M4DDAHYDuAVADID7ASwFsAjAw1s+3JvK2R8iGIAy8iUAnAfgZQCnAfg0gDsBfBjAPQC+AOA8ABcDWAvgqS0f7P2InAMiGIBynQDgGwAWAfgtgHkA5gC4FMAP/fdf8Z/r/vE6AAsAXADgXABfAfBlAAcAzNvywb46OgdEMAA9zxX7g73w3+3e/wIAc5h2m8t9F8BlTHt9AMgG8FkAdwF4FMAXAbwKYK4tL+09L+eACAagnLz1zH1e5wK4HsD1AM4EMBHANCa9PgvgMgBfAtAI4AQA3wJwGYAbAHzQ5cW9H3J2iGAAyn1+D4CbmPTaAeBcAB8FMBPABV47CsD1TKsdD+AGJt12AbgWwBcB/A7A111e3PuunAMiGIBep5w8Xg2gDMA4AI0AygCUBt5jN4A9AKoANAMY7H3fVwKgnAMiGICS8zQAvgTgZgBf99+XewN+d5n7/6d4z7cBmMz8v04AiwEcyf/JvhvpHBDBABTgvw9z3Xo+f0x1vwb5fN7vA+7+0v1+5XvF/h8+269y/V87/h8++d/+f/7n++L+61W+f3T3/7v37/m7P9b//5X9l7v9f2z7X3tWc26IYAAC3v85X491+z3mfl0N313b/v73+/f7w379x7rvf3rbf99qzo0IBmAo3tq7BsA7AP7T66E39u4G8DqAP3vvZ+/9mPeez/v+0fvP/e9/874Pvf98933mvd3x3w8/s/cvH3BmiGAAevX/zfvH80D03/t1u9fv32v6/tO3/OftLh41A0A+gGEA/iP/Xfa73fs+1/d3mPv5V9v+e99KzgwRDEBP8p81A1gA4I/e+1nv9wvv/Yf3e5v3nuf9/vf+/1jv64f++2H3vd7+dve59X7/5g1g562f793E2SGCAeh/0f7e/cPf5/d5y/e50e9z0LbfB9zzXed+3d1/L+X/5jvf893u97v07y/+ve5Z7t+T3fe//1ne879h/8/bXuScEMEA9DRv63f3q1g3v1q+l+veUe6d4Z4n/Hva/aPbvaPdM9k923gA+Pvf1/u8r7tnHvcMcs/w27j79/p7zvlz/L8vuf+2239fcg02yLkhggEY4k2AswFcB+BTAH4G4L0Avgzg3QCm+c9/AeCTAC4DMBfA3wO4FcAX/b43+r+e9n9eB2Ax9y/zXwbwBvdv+l150r8//v/v5/3O31fdf792/x3n932OzwgRDEC//n/b73O47z73b/L7bPTvvb/n3bN9v3t7/e7t8vtce+/tvTfu3i9478f77o/99x/5/Q7l7H/n73uvd+/19ySfh+v4L29yXohgAALev+H7sH+/d7x+6r2/+2a//kPe+8m+H+G+r3ff2+d/v+9/H/v/20Zz7jfy+lvu2ev35H9Nn4P7tX//y+/3H5wVIhiAXr3f6zVf39a797Pdrx/5z2V+HzwQeP/J/d3f7r0m8D5+t7rX73bfe++99/49vvdj/72yv7vHvfefnBUiGICeF+53Wneve95z997Dvdffb9nvNff6z/d3vff7O+4d7P3b4d4b2e8t+e+P2d4P3ff57ndv+t/ze7jvvb3e3P/+6x+cGyIYgG95fR3wGvdu98/ve78/xN/Nfr81fu9f7fe7z/tr/F7b3Pt1z3vff37f/652r0vct9H3e2a/98/+nvz3h1y7H5wVIhiAnr227/p5r+n+X7lXlntXlrvvefce6N5n/efV96q/u790rwveN8x9/6B7b/fe/d3rf/e+632/i9xr+3m916v87w53z/V3v7b++83/46wQwQAMfD3w9b+nvW9437t73fN1wL868P6e7/Z9h8/875Puey/3vd7rfQn+d4R/v+i9j/Xfs14fdr/f7v1f278v6h+cGSIYgO8HvvVv9N/nvD/Wf+972/u+f17z4N1rve7d6d5d7n3d/3f/1wH/vXf3+O9P/Pefuvdb/vuVvfeL3O+veW83/j9mhQgGoFffj5x3bW//fcm99/p1Ldftvu+4d+fA+93vfe9b7v2S9057r7d9X+a9X3Wvvf4f3ffKvg/0/kPee+HvfX+3v29xbohgAN4B4P0u/n+j9zH/a3e39x7sXpPde9Z7P/veWd7v1+594u8v7p/FvfvuD9y31+93uPfL5P23e++Xufct/rvC71d4vX/i/05xbohgAHp/4N0D4NsAvgHgWgCf8d5T/N8ne+/7vf/e4O/T3Pte/x79+x73e1vvvc7f7/L1L1/v79/nvGf5/R/v3987/z225y2cGyIYgN4b31+Lvw7AFf7Pcv+913/vd+9+Pq9jvu//vuJ1xetVr1d8bV7i7/O/9n39X++916ve9z/+e7X73p33379+tXP/A2eFCAagX/d2+f/V++v83t3d38u838Xe70rv/bn3/sC9T3nvsX5P9d6veH/11xH/vdjvg7Hff+R9P/O69xH/vdq9jvnvFdf/WnFuiGAAGoB/O70UwNneL2o++4P7t06+Pzrvv9u0/mve+1s38D/6u3uP++O9t/vef+07y9d3v+G+X/bfq/3ve1x/8/3eX7l9Tvd3v72+e//w6x+cGSKYc0Bv/K1d9v1x3//b/T3u+7vX5e6/l93zWff3QO8/+L8T/fce79f2fe/f+/+H/N/V/vtH998X+t0X9f/A//3gWw4/gH81/y83ODMEMOf74r5rvc64f2Pee6zfQ99913+e+N8P3d/d+6p7H+/3fVzvvd1/r/beK/0+0v8u6P/f475/5v+ed6/795d/871n7+mODMEMAP/fSff7/3t3//8D3vf7fM+7l7nvuPvvVd470/13uv9e6v31P+99s//+3utZ93rMvfd1r9f5/Y5w73+f9N//6F+XODNEMAAD891+rznc/ffCff97793d9zvv/cD/jvd7zvt9gffb7Pe73L/vc2/9t+O/P++9j7j//rP32vf3wz0XODNEMAC9jntn+3u8/3Nuv+72e6b7t/vvdO/d+p6u+N+p/vud95vl9znu/vvdP73u9d6l/p74e+T/Xu67z3vv1+/8P957q7/X2y4f5MwQwQD8f8W/s96v/v1u/t+dvdvvdf2a6fce5f7e7/0e93uv+z3t/f2z+H/0/+u//7T/fvv/893vev6+4nve06e6u2b/n9zrv7m+/5d/r2z7f3mPM0IE/9fG3a/g+3a3u1/V5vvd37vN/X3t93u+t9b/faP/fuj/nOzveT+366V+/3/n/jvHff+G/34Xv0v9d63Xv9/9c/09z/1LveYd+T/6Pve3nBEimJsg/vfV/o15u/vfvX/Pcf/d+N/d/u8d//uef/639/z7e73z1P9+5X73+e5bvea43++q7/uOce++d970u2+085//9iLnhAjm71/+2veP+Vz3v28f8/vA/1v280fe29x3nnsndu++/Hvuue0O3//t9ve4t16r/Pe39xvd33379r6j23v29+730+vf5IwQwcwB/gP+rW+X+/9e+F/f3jva/fvS3b+7/c+73f8e5b6T3ftb/x4Z+C9d/tXw31/xP/q///m12/1v77vevea43+/r//v9f2z7X3tec1aIYAD6/1Xrf2c++nveve/4t9e9n/V/P/DfP7pnpn/v8u++8v9/6ZzX/t/fvu9P//1h//d07/3w3//v7r3X5W/0e5b7+7fO+9Z93/+157z0f84K/z8gfwvXl9pY/wAAAB10RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXH30cIAAAkBSURBVHja7J1/bFPXHcfXtuM4iRP/2El+tI0TkyZZ0iaNkqZN2iRpm9I0Tdq0aROmbdo2bZqmbdqmbf/sT9ukbVqTNmnThmnTpm1C0jZN2qZp/mibNn+k7Z9p/mibatP+mTb/aH+Mbbzvvq/P+713v9h+3/M9v3veffcZ21F87v2czzmf8+u512/w9Xo3A0AAW1tbt7e3t/etb33rdwAw7Wttbe2/Wltbn+/u7u403u/p6emqra19pqmp6Z/9/f3DAH4HICy6o6Ojy0tKSrb7LwMAtmzZMgwA99t7V+vr66eMjIxE3R92u6fVv/9gQ0PDZ2VlZbW223p6elq3bNnywY6Oji60o4eWlpYnqqurl9XW1raWlJQsrqurw9atW709PT2f9/X1lXg92/t9HIAx1n3/Yvv/tN/rBf77i+bzVrvf/4P/vGgA3/T7F41n92g8a7z7mPGs8d6l3n2Xerf+jPf5+vXrrwbwXQC/sP/+0e/fa79er7/vP//r1q3bBGCnfb2+qanpCQAd6EEAm1t/c8/f/jF/31P+fQ3ve9gAmOXfD/ffh/vf5xnfL6+vvxXAr/1tO771n+vtd8XvdfX09Bzp6enZ6t+/16+veN9j161bdxXA79B/9gC47w1j/l4b+wAAYwAW+veL+N+L5ndPqu841Xf75Lz+B3vP2P9bWlrWlZeXN9hu/6P93vvd2x/++z/73y3A/x6uAdBi7+1tbW3dfz+u3QvgJ0z6hP+c73/P9d4t/r3v+b3a2toK+28P2v8F3d3dV+6/P9b/e7b0P1s3ff+7zve96/eO2287jGe38r/XzO/t9d6928y645l8BkB5b29vy3f/+vA093Z3314H4EsAPvTfn//6+t/3Pef7v8v3fe+6v3u//x0H4O37/b8b/2sfgK869x89/e913fv+e6j9/t99d+S1v7v+31sA/ML//er++/XhL5+d1z0AfqM/BvYvDze698ve/Tf+77X3/2r/7wve9yn++zzP911f+/fM+/W6e/fOvf/22+fe8x7/fUrvzT3g6+X3A/j7f98T/35b/z3V//e26z/r//v2f/7/f/2f3x/+77vvu/872f/5p/89f+f7zrmd733u8ffu+e8f++7+nve+X7XfT/Z+/+zeL3rf5/vvff79U/9vM/4+6g7r/5uX/n1J/91z/3fL9/v9/6Zz9z/3f7+a5b8vvvvd02ff/t3r/mP/48f//fv3vf/d5d2n3PfD7vsb9/0o3/d/vvcH97sff+s/32N+v7j73X8f+a/x3296/f+r7f0s++d3/b2u/+7X+3uG/22791e+r0eef8T/vQPAj/0+z/G+//bfJ9lva9z3U33fZ+77d/ffx+/+9415/o+X85n0eF7v3nff+8R/Dvf/jvf3/zO+j/jf+f2/e/++7/2r5+9+P+/1t94A5t7+Xv79e9//W7b0v43d99+e/+sT9+6/871n7+Xvvvfr81p/n+/P/D6fev2W3/dZ//m232uT+933ff2v3/l7bHrfA1kK34Z93a4vG++0vR6zvtjV0N62/f/gvw7+KxW8H93d3d+tq6t7/s++399+n3u/h//u3N+v0H49v7+gvdvdfZ/d//d6lP9+mP+d43+N534vff/+77r3a/W7v57P9/eD7u/Z/97X/+9z2+3v/R20//Zl+1uH//sF936d933e+/2J+/cQ//3S/3eD+z7MvVv8d7b/3pGZmXnvl/2xN8/rPvf/5t7e3mX+90hvf97P8p//3/jfb/u/q7v/XvSfe/3veb/feL8/8p/t+z+N3Xn/Dfb97v/gX/gvg0/33Xuv++eQ7n2Z/3u2/1wB4FXu/1vd93r/fbP//8X+s91/f+j+PqH/d573ff055/aW+wV+c08f9/d//t/VvSfc90fu+xn3fSWAzwHYYp9/t/vfdv9vD3jft/l/i7vvewFsB7DM/87y56XyTvv/+7vf32n+v+f++yN/z3h/f+DvywGs5/+/6v//Qf9f/7mS738u9t4t/l3tvZ+454u5v2+7v1ff+/6/3H8fdr+X9XvK//7s3b//7L/f9fs16383v/8f+/7/Fv/u28F/Zt7zJ77fe/x3i//9sv8/2z8P9veHvd4/u+edx+7//w8A/O62n80t/i6t/8sD+mP+aD1rPPub0/7/mPP7rPWsc9/r/N7X9XyV+vN23/uF+56s9b6j9XyZ73v657zfdl+Z//229r+O9+v7cO7/T/rf8zn/2/f3e8T/r/q101/X+7yUe36T+v8rAP5hX/r/Lp5jV+2/m/171576v6f6u4p/7/37+38l80AJAACAgW88gP+d8e87vT96/X9j+XvW77Wv3N7vEfv3+v7rfe4/d+/uF+/98d575t9v73u9d+X/f2s7/f/Zve//P/Tvf/3+yN0XlP/fS/+/m/s+e73+2+Hvdvf/+94b2a9r6x+8u/fv8d7PzX2ftt/nU/+v/e8r+/veb+//z/p/X/WvN92bcv+T+v863f6+5L+/z74jVf3rTvf6S/17t//v3P32wX/+SgD/+O/7/0r/3ef/L7v/Puzv//e9n815v7/b+z7s7/vf036v1b6f6f2+/W11/y70fvfxfd/d/n3R/y3mfgv3fdH//S+/5z/Z70/7311m5b2y0f862N3/k733Vf/d0X/v3f9+x73vvXv95yH//aDff8h+X2/ff+a++/V6xevd/j/e+1r3vNf+1Xvv957z//tX/f7Jvd5x35f4/9/v3rf573u8/3Nuv+6//3Hfz9j7H9nvbfvv/X8c/m//9X8A8H/f8W//7e13/37N137/V3j/P3Lvg/798r9qf9//P9b/Wve++/l3/0r9Z479+4r/Psvv3ePez732d8G9577P173+f8d//8T3tXf/7eF72u8H994/e79n+n+/u3+P+7/98P8+2Huf4z+/7feN/vux+/vebf1/n5Z8948JAGwDMBJAGgB34XnJd/fM9O+97n7eey+4//uC/1y62wDsALAJQLP/nu2/+yEA9/p9LwGwGsB9AHq5f9u73x7vPejve0vv++Pee02/9wD/vYf3PcjvfejfsxDAnwBsB5Du+/cE33vFvv8D7/sp7/uY++cT9w26P+fveY8/s/fv/q83dO8f+8+/+H6P6n+vd/yP957r+73M36/y+t3lvsff//y87w/3/rDvf2Xv+4L/W8K+T3K/n3H3j3F/F/W/F/V/p3/u+m//jQD+FwD/k+r0B4B/1N+s+P036wMAc3t/r9nff2vfL+L7Fvv1v1b+e1+/f8/s5b1n7Ff10l7jva/lva+33++97f4/7n216/Xe3Xv+Z/n122v47w+8/36+x9//r+J3B4AZ//6Zewf5/768r++71j+nve9n7nvf3TveO7l/rvhvv5b6b/f7L/b7x/b1w/77z/rvTf+9bW+d9+2z//sN+v/5X9z5L+z+g3v/H2v/i/+z+u/+u2a9t7//p+uB/z/f79N9H3b51fvvE+7vOvc+7b7P9r1e4N6P3N+P+u9j9vvf/nO7e/6j/fuv+P++774fvfeZ9/0I8f/7aX//a//+i//sBvA3AEe+4v8/4H0/878//s9m9951z5v++xf/d5v3vuu9h7j/+0d/73Gvd1z3x7vvdN/Xu/+/7d5T/N/v7+/n/O9j/v32e6+x/+/i/vvUu2/x/V6xfj92/9ztf9/n3tFz2P7f+L1+f1//90y++47++4T3Puy++y8hPvf+v/+14X/963v/fct/3+l3//m1377P2P/e+3uC+6f3O3z2v1/s//uW/x7lvy+5Z6H7u5D//b/9+4/efxf674X+ew9/Z3jfB7v/B+xvf7P/d63339f4X/cAOMd/f9L9u9r/Hcr/+tG7//beL/lvn/d/veN/l/vvff53lvd7ivt7vf/s/j3q9+vw38v9dz+P/r6z880t9fUf1tfXv/VfAAMAsL1m2m1+yEwAAAAASUVORK5CYII=";

  let nekoEl;
  let nekoPosX = 32;
  let nekoPosY = 32;
  let mousePosX = 0;
  let mousePosY = 0;
  let count = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  let bgPositionX = 0;
  let bgPositionY = 0;
  let isSleeping = false;

  const nekoSpeed = 10; // Movement speed in px per tick

  function createNeko() {
    nekoEl = document.createElement("div");
    nekoEl.id = "oneko";
    nekoEl.ariaHidden = "true";
    
    // Inline styling for the cat element
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.pointerEvents = "auto";
    nekoEl.style.cursor = "pointer";
    nekoEl.style.zIndex = "999999";
    nekoEl.style.backgroundImage = `url(${nekoDataUri})`;
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = "16px";
    nekoEl.style.top = "16px";
    nekoEl.style.transition = "transform 0.1s ease";

    // Initial position bottom right corner
    nekoPosX = window.innerWidth - 64;
    nekoPosY = window.innerHeight - 64;
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;

    document.body.appendChild(nekoEl);

    // Mouse & Touch events
    window.addEventListener("mousemove", (event) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    window.addEventListener("touchmove", (event) => {
      if (event.touches.length > 0) {
        mousePosX = event.touches[0].clientX;
        mousePosY = event.touches[0].clientY;
      }
    });

    // Single Click: Jump + Emits Hearts
    nekoEl.addEventListener("click", (e) => {
      e.stopPropagation();
      createHearts(nekoPosX, nekoPosY);
      jumpNeko();
    });

    // Double Click: Toggle Sleep/Wake State
    nekoEl.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      isSleeping = !isSleeping;
      if (isSleeping) {
        setSprite("sleeping", 0);
      }
    });

    // Start loop
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const anim = nekoAnimationFrameSets[name];
    if (!anim) return;
    const sprite = anim[frame % anim.length];
    bgPositionX = sprite[0] * 32;
    bgPositionY = sprite[1] * 32;
    nekoEl.style.backgroundPosition = `${bgPositionX}px ${bgPositionY}px`;
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function jumpNeko() {
    nekoEl.style.transform = "translateY(-18px) scale(1.1)";
    setTimeout(() => {
      nekoEl.style.transform = "translateY(0) scale(1)";
    }, 250);
  }

  function createHearts(x, y) {
    for (let i = 0; i < 5; i++) {
      const heart = document.createElement("div");
      heart.className = "oneko-heart";
      heart.innerHTML = "♥";
      heart.style.left = `${x + (Math.random() * 30 - 15)}px`;
      heart.style.top = `${y - 10 + (Math.random() * 20 - 10)}px`;
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1000);
    }
  }

  function idle() {
    idleTime += 1;

    // Random idle animations after 10 ticks
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) === 0 &&
      idleAnimation === null
    ) {
      const availAnims = ["sleeping", "scratchSelf"];
      if (nekoPosX < 32) availAnims.push("scratchWallW");
      if (nekoPosY < 32) availAnims.push("scratchWallN");
      if (nekoPosX > window.innerWidth - 32) availAnims.push("scratchWallE");
      if (nekoPosY > window.innerHeight - 32) availAnims.push("scratchWallS");
      
      idleAnimation = availAnims[Math.floor(Math.random() * availAnims.length)];
    }

    if (isSleeping) {
      setSprite("sleeping", Math.floor(count / 8));
      return;
    }

    switch (idleAnimation) {
      case "sleeping":
        if (idleAnimationFrame < 8) {
          setSprite("tired", 0);
        } else {
          setSprite("sleeping", Math.floor(idleAnimationFrame / 8));
        }
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchSelf":
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
        setSprite(idleAnimation, Math.floor(idleAnimationFrame / 4));
        if (idleAnimationFrame > 32) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
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

    // Run loop around ~12 FPS for authentic retro pixel movement
    if (timestamp - lastFrameTimeStamp > 80) {
      lastFrameTimeStamp = timestamp;
      count += 1;

      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      // If close to cursor or sleeping, stay idle
      if ((distance < 32 || isSleeping) && !isMobile) {
        idle();
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        window.requestAnimationFrame(onAnimationFrame);
        return;
      }

      // Wake up from sleeping when mouse moves away
      if (isSleeping && distance > 64) {
        isSleeping = false;
      }

      resetIdleAnimation();
      idleTime = 0;

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";

      setSprite(direction, count);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      // Keep within screen boundaries
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    }

    window.requestAnimationFrame(onAnimationFrame);
  }

  // Initialize on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createNeko);
  } else {
    createNeko();
  }
})();
