"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 30;
}
function p3_tileHeight() {
  return 30;
}

function scale(x){
  return (x * 30) / 400;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

function p3_drawBefore() {}

/* 
  Where the tile gets drawn
  - Starter code, uses noise as the fill color
  - Draws a polygon using vertexes w/ the p3_tileWidth and p3_tileHeight
  - Use example code from Tuesday 6/28 lecture
*/
function p3_drawTile(i, j) {
  noStroke();
  let test = noise(i, j) * 255;
  fill(test);

  // Tile Type Values
  let water = 0.4;
  let sand = 0.5;

  // Tyle Types
  let t1 = noise(i, j) > water;
  let t2 = noise(i + 20, j + 20) > sand;

  // 2D Array Coordinates
  let top = noise(i, j - 1);
  let tops = noise(i + 20, j + 20 - 1);
  let right = noise(i + 1, j);
  let bot = noise(i, j + 1);
  let left = noise(i - 1, j);

  if(t1){ // if Water Tile
    fill('#71D9FE'); // Water
    rect(0, 0, tw, th);
    wave();
  }
  else if(t2){
    // bottom left corner w/ water
    if(left > water && bot > water && top <= water && right <= water && noise(i + 1, j - 1) > water && noise(i + 1, j - 1) <= sand){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#D2BB74')); // Sand
      ellipse(11.25, 18.75, 15, 15);
      rect(3.75, 0, 26.25, 18.75);
      rect(11.25, 18.75, 18.75, 7.5);
      fill('#71D9FE');
      rect(26.25, 0, 3.75, 3.75);

    }
    // bottom left corner solid
    else if(left > water && bot > water && top <= water && right <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#D2BB74')); // Sand
      ellipse(11.25, 18.75, 15, 15);
      rect(3.75, 0, 26.25, 18.75);
      rect(11.25, 18.75, 18.75, 7.5);
    }
    // bottom right corner
    else if(left <= water && top <= water && bot > water && right > water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#D2BB74')); // Sand
      ellipse(18.75, 18.75, 15, 15);
      rect(0, 0, 26.25, 18.75);
      rect(0, 18.75, 18.75, 7.5);
    }
    // top left corner
    else if(left > water && top > water && bot <= water && right <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#D2BB74')); // Sand
      ellipse(11.25, 11.25, 15, 15);
      rect(3.75, 11.25, 26.25, 18.75);
      rect(11.25, 3.75, 18.75, 7.5);
    }
    // top right corner
    else if(left <= water && top > water && bot <= water && right > water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#D2BB74')); // Sand
      ellipse(18.75, 11.25, 15, 15);
      rect(0, 11.25, 26.25, 18.75);
      rect(0, 3.75, 18.75, 7.5);
    }
    // left side only
    else if(left > water && right <= water && top <= water && bot <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#D2BB74')); // Sand
      rect(3.75, 0, 26.25, 30);
    }
    // right side only
    else if(left <= water && right > water && top <= water && bot <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#D2BB74')); // Sand
      rect(0, 0, 26.25, 30);
    }
    // top side only
    else if(bot > water && top <= water && left <= water && right <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill('#D2BB74');
      rect(0, 0, 30, 26.25);
    }
    // bottom side only
    else if(bot <= water && top > water && left <= water && right <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill('#D2BB74');
      rect(0, 3.75, 30, 26.25);
    }
    else if(top <= water && bot > water && left > water && right > water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill('#D2BB74');
      ellipse(11.25, 18.75, 15, 15);
      ellipse(18.75, 18.75, 15, 15);
      rect(11.25, 22.5, 7.5, 3.75);
      rect(3.75, 0, 22.5, 18.75);
    }
    else if(top > water && left > water && right > water && bot <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill('#D2BB74');
      ellipse(11.25, 11.25, 15, 15);
      ellipse(18.75, 11.25, 15, 15);
      rect(11.25, 3.75, 7.5, 3.75);
      rect(3.75, 11.25, 22.5, 18.75);
    }
    else if(top > water && left > water && bot > water && right <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill('#D2BB74');
      ellipse(11.25, 11.25, 15, 15);
      ellipse(11.25, 18.75, 15, 15);  
      rect(3.75, 11.25, 3.75, 7.5);
      rect(11.25, 3.75, 18.75, 22.5);
    }
    else if(top > water && right > water && bot > water && left <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill('#D2BB74');
      ellipse(18.75, 11.25, 15, 15);
      ellipse(18.75, 18.75, 15, 15);  
      rect(22.5, 11.25, 3.75, 7.5);
      rect(0, 3.75, 18.75, 22.5);
    }
    // middle verticle
    else if(top <= water && bot <= water && left > water && right > water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill('#D2BB74');
      rect(3.75, 0, 22.75, 30);
    }
    // middle horizontal
    else if(top > water && bot > water && left <= water && right <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill('#D2BB74');
      rect(0, 3.75, 30, 22.75); 
    }
    else if(top <= water && bot <= water && left <= water && right <= water){
      fill(color('#D2BB74')); // Sand
      rect(0, 0, tw, th);
    }
    else{
      // make a different tile
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#D2BB74')); // Sand
      rect(0, 0, tw, th, 5);
    }
  }
  else{
    if(top > water && right > water && bot > water && left <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill('#555B62');
      ellipse(20.625, 9.375, 15, 15);
      ellipse(20.625, 20.625, 15, 15);
      rect(24.375, 9.75, 3.75, 10.5);
      rect(0, 1.875, 20.625, 26.25);
      pebbles();
    }
    else if(top > water && bot > water && left <= water && right <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      rect(0, 1.875, 30, 26.25, 0);
      pebbles();
    }
    else if(top <= water && bot <= water && left > water && right > water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      rect(1.875, 0, 26.25, 30);
      pebbles();
    }
    else if(top > water && left <= water && right <= water && bot <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      rect(0, 1.875, 30, 28.125);
      pebbles();
    }
    else if(top <= water && left <= water && right <= water && bot > water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      rect(0, 0, 30, 28.125);
      pebbles();
    }
    else if(top <= water && left <= water && bot <= water && right > water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      rect(0, 0, 28.125, 30);
      pebbles();
    }
    else if(top <= water && right <= water && bot <= water && left > water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      rect(1.875, 0, 28.125, 30);
      pebbles();
    }
    else if(top > water && right > water && left <= water && bot <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      ellipse(20.625, 9.375, 15, 15);
      rect(0, 9.75, 28.125, 20.25);
      rect(0, 1.875, 20.25, 9.375);
      pebbles();
    }
    else if(top > water && left > water && right <= water && bot <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      ellipse(9.375, 9.375, 15, 15);
      rect(1.875, 9.375, 28.125, 20.625);
      rect(9.375, 1.875, 20.625, 8.5);
      pebbles();
    }
    else if(top <= water && left <= water && right > water && bot > water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      ellipse(20.625, 20.625, 15, 15);
      rect(0, 0, 28.125, 20.25);
      rect(0, 18.75, 20.625, 9.375);
      pebbles();
    }
    else if(top <= water && right <= water && bot > water && left > water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      ellipse(9.375, 20.625, 15, 15);
      rect(1.875, 0, 28.125, 18.75);
      rect(9.375, 18, 20.625, 10.125);
      pebbles();
    }
    else if(top <= water && left > water && right > water && bot > water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      ellipse(9.375, 20.625, 15, 15);
      ellipse(20.625, 20.625, 15, 15);
      rect(1.875, 0, 26.25, 20.25);
      rect(9.375, 24.375, 11.25, 3.75);
      pebbles();
    }
    else if(top > water && left > water && right > water && bot <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      ellipse(9.375, 9.375, 15, 15);
      ellipse(20.625, 9.375, 15, 15);
      rect(1.875, 9.75, 26.25, 20.25);
      rect(9.375, 1.875, 11.25, 3.75);
      pebbles();
    }
    else if(top > water && left > water && bot > water && right <= water){
      fill('#71D9FE'); // Water
      rect(0, 0, tw, th);
      fill(color('#555B62')); // Rock
      ellipse(9.375, 9.375, 15, 15);
      ellipse(9.375, 20.625, 15, 15);
      rect(1.875, 9.375, 3.75, 11.25);
      rect(9.375, 1.875, 20.625, 26.25);
      pebbles();
    }
    else if(top <= water && left <= water && bot <= water && right <= water){
      fill(color('#555B62')); // Rock
      rect(0, 0, tw, th);
      fill('#42474C');
      pebbles();
    }
    else{
    // else default tile
    fill('#71D9FE'); // Water
    rect(0, 0, tw, th);
    fill(color('#555B62')); // Rock
    rect(0, 0, tw, th, 5);
    pebbles();
    }
  }

  push();

  // beginShape();
  // vertex(0, 0);
  // vertex(0, tw);
  // vertex(th, tw);
  // vertex(th, 0);
  // endShape(CLOSE);

  let n = clicks[[i, j]] | 0;
  textSize(16);
  if (n % 2 == 1) {
    if(t1){
      stroke(0);
      strokeWeight(0.2);
      fill('grey');
      arc(15, 24.375, 16.875, 41.25, PI, 0, PIE);
      fill('lightgrey');
      arc(15, 24.375, 13.125, 37.5, PI, 0, PIE);
      fill('white');
      ellipse(8.625, 11.25, 6, 6);
      ellipse(21.375, 11.25, 6, 6);
      fill('black');
      ellipse(8.625, 11.25, 4.5, 4.5);
      ellipse(21.375, 11.25, 4.5, 4.5);
      arc(15, 9.375, 3, 3, 0, PI, PIE);
    }
    else if(t2){
      fill('#796753');
      rect(0 + 13.5, 0 + 1.5, 3.75, 26.25);
      rect(0 + 3.75, 0 + 3.75, 22.5, 18.75);
      textSize(12);
      fill('white');
      text('✖', 0 + 9.75, 0 + 17.25);
    }
    else{
      fill(color('brown'));
      rect(15, 16.875, 1.125, 6);
      rect(17.25, 16.875, 1.125, 6);
      fill(color('white'));
      ellipse(7.5, 9, 8.625, 8.625);
      arc(16.875, 9.375, 18.75, 18.75, 0, PI, PIE);
      fill(color('grey'));
      arc(18.6, 9.375, 13.5, 13.5, 0, PI, PIE);
      fill(color('black'));
      ellipse(7.5, 7.5, 1.5, 1.5);
      fill(color('#FFDD33'));
      triangle(3.75, 7.5, 0.375, 9.375, 6, 9.375);
      fill(color('brown'));
      triangle(12, 22.5, 17.25, 22.5, 15, 24);
      triangle(15.75, 22.5, 21, 22.5, 18.75, 24);
    }
  }

  pop();
}

function pebbles(){
  fill('#42474C');
  rect(3.75, 3.75, 5.625, 5.625);
  rect(9.375, 15, 5.625, 5.625);
  rect(19.5, 21, 4, 4);
  rect(13.125, 7.5, 3.75, 3.75);
  rect(6, 22.5, 3.75, 3.75);
  rect(21, 11.25, 3.75, 3.75);
  rect(3, 15, 1.875, 1.875);
  rect(15, 24.75, 1.875, 1.875);
  rect(24.375, 17.625, 1.875, 1.875);
  rect(22.5, 3.75, 1.875, 1.875);
}

function wave(){
  noFill();
  stroke('#0BBDFE');
  strokeWeight(1.5);
  arc(3.75, 7.5, 3.75, 3.75, 0, HALF_PI);
  arc(7.5, 7.5, 3.75, 3.75, PI / 2, PI);
  arc(12.75, 15, 3.75, 3.75, 0, HALF_PI);
  arc(16.5, 15, 3.75, 3.75, PI / 2, PI);
  arc(12.75, 25, 3.75, 3.75, 0, HALF_PI);
  arc(16.5, 25, 3.75, 3.75, PI / 2, PI);
  arc(22.5, 7.5, 3.75, 3.75, 0, HALF_PI);
  arc(26.25, 7.5, 3.75, 3.75, PI / 2, PI);
  arc(3.75, 22.5, 3.75, 3.75, 0, HALF_PI);
  arc(7.5,22.5, 3.75, 3.75, PI / 2, PI);
  arc(22.5, 22.5, 3.75, 3.75, 0, HALF_PI);
  arc(26.25, 22.5, 3.75, 3.75, PI / 2, PI);
}

// Mouse hover to display coordinates
function p3_drawSelectedTile(i, j) {
  noFill();
  // stroke(0, 255, 0, 128);
  stroke(0);

  // beginShape();
  // vertex(0, 0);
  // vertex(0, tw);
  // vertex(th, tw);
  // vertex(th, 0);
  // endShape(CLOSE);
  rect(0, 0, tw, th);

  noStroke();
  fill(0);
  text("(" + [i, j] + ")", 0, 0);
}

function p3_drawAfter() {}
