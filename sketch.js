const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var happy,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var canW;
var canH;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('candy.png');
  rabbit = loadImage('onnom.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  //eat = loadAnimation("eating00.png","eating01.png");//,"eating02.png","eating03.png","eating04.png","eating05.png","eating06.png","eating07.png","eating08.png","eating09.png");
  //sad = loadAnimation("sad00.png","sad01.png","sad02.png","sad03.png","sad04.png","sad05.png","sad06.png","sad07.png","sad08.png","sad09.png");
  happy = loadAnimation('happy00.png','happy01.png','happy02.png','happy03.png','happy04.png','happy05.png','happy06.png','happy07.png','happy08.png','happy09.png');
  
  happy.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
  happy.looping = false; 
}

function setup() 
{
  let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth+80,displayHeight)
  }else{
    canW = windowWidth
    canH = windowHeight
    createCanvas(windowWidth,windowHeight)
  }
 
  
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

   
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

   //botão 2
   button2 = createImg('cut_btn.png');
   button2.position(330,35);
   button2.size(60,60);
   button2.mouseClicked(drop2);
 
   //botão 3
   button3 = createImg('cut_btn.png');
   button3.position(360,200);
   button3.size(60,60);
   button3.mouseClicked(drop3);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});

  ground = new Ground(200,canH,600,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(170,canH-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('happy',happy);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
    bunny.changeAnimation('happy')
  }

  if(fruit!=null && fruit.position.y>=canH)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null;
}


function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}



