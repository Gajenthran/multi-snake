/*
 * @const {Object} TILES_FILE: all useful files for the sprites
 */
var TILES_FILE = {
  "apple"  : "/public/img/apple.png", 
  "poison" : "/public/img/poison.png", 
  "snakes" : "/public/img/snakes.png"
};

/*
 * @const {Object} SNAKES_IMG_SRC: details of the source image (/public/img/snakes.png
 * to draw the snake for the player and the enemies
 */
var SNAKES_IMG_SRC = {
  "image"   : "snakes",
  "player"  : 0,
  "enemies" : 1,
  "up"      : 0,
  "left"    : 1,
  "right"   : 2,
  "down"    : 3,
  "ndir"    : 4,
  "w"       : 50, 
  "h"       : 50
};
  
var ITEMS_IMG_SRC = {
  "coin"   : {"id" : 0, "actualSrc" : 0, "fullSrc" : 6},
  "apple"  : 1,
  "poison" : 2,
  "w"      : 60,
  "h"      : 60
};

/*
 * @const {number} CANVAS_WIDTH: the width of the canvas
 */
var CANVAS_WIDTH = 800;

/*
 * @const {number} CANVAS_HEIGHT: the height of the canvas
 */
var CANVAS_HEIGHT = 600;

/*
 * @const {number} CANVAS_ID: the id of the canvas (important to create a canvas)
 */
var CANVAS_ID = "Canvas_Curve-Fever";

/*
 * @const {number} SCOREBOARD_X: the coordinate x of the scoreboard
 */
var SCOREBOARD_X = CANVAS_WIDTH + 10

/*
 * @const {number} SCOREBOARD_Y: the coordinate y of the scoreboard
 */
var SCOREBOARD_Y = 0;

/*
 * @const {number} SCOREBOARD_WIDTH: the width of the scoreboard
 */
var SCOREBOARD_WIDTH = 400;

/*
 * @const {number} SCOREBOARD_HEIGHT: the height of the scoreboard
 */
var SCOREBOARD_HEIGHT = 300;

/*
 * @const {number} SCORE_X: the coordinate x of the score
 */
var SCORE_X = 50;

/*
 * @const {number} SCORE_Y: the coordinate y of the score
 */
var SCORE_Y = 50;

/*
 * @const {number} TOP_SCORERS: the number of players (best scores) to show
 */
var TOP_SCORERS = 2;

/*
 * @const {number} PLAYER_TEXT_STYLE: style for the element <li> representing
 * the player's score). We do that using a css file but we choose this method
 */
var PLAYER_TEXT_STYLE = {
  "fontSize"      : "20px",
  "fontFamily"    : "Gill Sans",
  "paddingBottom" : "10px",
  "borderBottom"  : "0.5px solid",
  "listStyleType" : "none"
};

/*
 * @const {number} ENEMY_TEXT_STYLE: style for the element <li> representing 
 * the enemies' score
 */
var ENEMY_TEXT_STYLE = {
  "fontSize"      : "20px",
  "fontFamily"    : "Gill Sans",
  "listStyleType" : "none"
};

/**
 * Draw all the images of the game and also the scoreboard on the canvas 
 */
class Display {
  constructor() {
    this.canvas  = null;
    this.context = null;
    this.scoreboard = null;
    this.images  = {};
  }

  /**
   * @method Initialize the canvas and load all the images.
   *
   * @param {number} canvasWidth: width of the canvas
   * @param {number} canvasHeight: height of the canvas
   */
  init() {
    this.canvas = createElement("canvas", null, { "borderStyle" : "solid"});
    this.canvas.id = CANVAS_ID;     
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.context = this.canvas.getContext("2d");
    this.scoreboard = createElement("ul", null, { "borderStyle" : "solid" }, 
                                    SCOREBOARD_X, SCOREBOARD_Y,
                                    SCOREBOARD_WIDTH, SCOREBOARD_HEIGHT);
    this.loadImages();
  }
  
  /**
   * @method Load all images and put them in a list.
   */
  loadImages() {
    for(let tile in TILES_FILE) {
      if(TILES_FILE.hasOwnProperty(tile)) {
        this.images[tile] = new Image();
        this.images[tile].src = TILES_FILE[tile];
      }
    }
  }

  /**
   * @method Clear the canvas.
   */
  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * @method Draw all the items on the canvas.
   *
   * @param {Array.<Item>} items: the items of the game 
   */
  itemOnScreen(items) {
    this.context.beginPath();
    for(let i = 0; i < items.length; i++)
      this.context.drawImage(this.images[items[i].name], items[i].x * 20, items[i].y * 20, 20, 20);
    this.context.closePath();
  }

  /**
   * @method Draw a snake on the canvas.
   *
   * @param {String} imageName: name of the image, to know if it is the player or the enemies
   * @param {Array.<Object>} body: the body of the snake
   */
  snakeOnScreen(imageName, player) {
    var image = this.images[SNAKES_IMG_SRC["image"]];
    var sw = SNAKES_IMG_SRC["w"];
    var sh = SNAKES_IMG_SRC["h"];
    var sy = SNAKES_IMG_SRC[imageName] * sh;
    var sx = SNAKES_IMG_SRC[player.dir];
    this.context.beginPath();
    for(let cell = 0; cell < player.body.length; cell++)
      if(cell == 0)
        this.context.drawImage(image, sx * sw, sy, sw, sh, player.body[cell].x * 20, player.body[cell].y * 20, 20, 20);
      else
        this.context.drawImage(image, SNAKES_IMG_SRC["ndir"] * sw, sy, sw, sh, player.body[cell].x * 20, player.body[cell].y * 20, 20, 20);
    this.context.closePath();
  }

  /**
   * @method Drawn the score of the player (client) and the highest scores
   * of the ennemies in the scoreboard (<ul>).
   *
   * @method {Player} player: the player (client)
   * @method {Object} enemies: the ennemies (other players) 
   */
  playersOnScoreboard(player, enemies) {
    while (this.scoreboard.firstChild)
      this.scoreboard.removeChild(this.scoreboard.firstChild);
    
    enemies.sort(compare);
    var element, text, score;

    // Show the score of the player (client)
    element = createElement("li", this.scoreboard, PLAYER_TEXT_STYLE, 
                            SCORE_X, SCORE_Y);
    text = "Your snake : " + player["score"] + " points."
    score = createText(text, element);  

    // Show the highest scores of the game (enemies)
    for(var i = enemies.length-1, j = 1; i >= 0 && j <= TOP_SCORERS; j++) {
      element = createElement("li", this.scoreboard, ENEMY_TEXT_STYLE, 
                              SCORE_X, SCORE_Y * j + 50);
      text = "#" + j + " Enemy: " + enemies[i]["score"] + " points."
      score = createText(text, element);
      i--;
    } 
  }
}