/*
 * @const {Object} TILES_FILE: all useful files for the sprites
 */
var TILES_FILE = {
  "snakes"     : "/public/img/snakes.png",
  "items"      : "/public/img/items.png",
  "background" : "/public/img/background.png"
};

/*
 * @const {Object} SNAKES_IMG_SRC: details of the source image (/public/img/snakes.png)
 * to draw the snake for the player and the enemies
 */
var SNAKES_IMG_SRC = {
  "image"             : "snakes",
  "player"            : 0,
  "enemies"           : 1,
  "up"                : 0,
  "left"              : 1,
  "right"             : 2,
  "down"              : 3,
  "ndir"              : 4,
  "headw"             : 65, 
  "headh"             : 65,
  "lr_body"           : 0,
  "ud_body"           : 1,
  "ul_body"           : 2,
  "ur_body"           : 3,
  "dr_body"           : 4,
  "dl_body"           : 5,
  "bodyw"             : 70,
  "bodyh"             : 70
};
  
/*
 * @const {Object} ITEMS_IMG_SRC: details of the source image (/public/img/items.png)
 * to draw the items.
 */
var ITEMS_IMG_SRC = {
  "image"   : "items",
  "coin"    : { "id" : 0, "actualSrc" : 0, "fullSrc" : 10},
  "apple"   : { "id" : 1, "actualSrc" : 0, "fullSrc" : 1},
  "poison"  : { "id" : 2, "actualSrc" : 0, "fullSrc" : 1},
  "w"       : 60,
  "h"       : 60
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
 * @const {number} CELL_SIZE: the size of a cell (a cell is an item or a player)
 */
var CELL_SIZE = 30;

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
var TOP_SCORERS = 3;

/*
 * @const {Object} CANVAS_STYLE: the style of the canvas (<canvas>)
 */
var CANVAS_STYLE = {
  "border" : "solid #d3d3d3"
};

/*
 * @const {Object} SCOREBOARD_STYLE: the style of the scoreboard (<ul>)
 */
var SCOREBOARD_STYLE = {
  "border" : "solid #d3d3d3"
};

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
    this.images  = [];
    this.camera = {"x" : 0, "y" : 0};
  }

  /**
   * @method Initialize the canvas and load all the images.
   *
   * @param {number} canvasWidth: width of the canvas
   * @param {number} canvasHeight: height of the canvas
   */
  init() {
    this.canvas = Util.createElement("canvas", null, CANVAS_STYLE);
    this.canvas.id = CANVAS_ID;     
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.context = this.canvas.getContext("2d");
    this.scoreboard = Util.createElement("ul", null, SCOREBOARD_STYLE, 
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

  setCamera(player) {
    this.camera.x = Math.max(0, player.x * CELL_SIZE - CANVAS_WIDTH/2);
    this.camera.y = Math.max(0, player.y * CELL_SIZE - CANVAS_HEIGHT/2);
  }

  /**
   * @method Clear the canvas.
   */
  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * @method Draw the background on the canvas.
   */
  background() {
    var image = this.images["background"];
    this.context.beginPath();
    for(let r = 0; r < Math.floor(CANVAS_WIDTH/CELL_SIZE); r++) {
      for(let c = 0; c < Math.floor(CANVAS_HEIGHT/CELL_SIZE); c++) {
        this.context.drawImage(image,
                               r * CELL_SIZE, c * CELL_SIZE, 
                               CELL_SIZE, CELL_SIZE);
      }
    }
    this.context.closePath();
  }

  /**
   * @method Draw all the items on the canvas.
   *
   * @param {Array.<Item>} items: the items of the game 
   */
  itemOnScreen(items) {
    var image = this.images[ITEMS_IMG_SRC["image"]]
    var sw = ITEMS_IMG_SRC["w"];
    var sh = ITEMS_IMG_SRC["h"];
    var sy, sx;
    this.context.beginPath();
    for(let i = 0; i < items.length; i++) {
      sy = ITEMS_IMG_SRC[items[i].name].id * sh;
      ITEMS_IMG_SRC[items[i].name].actualSrc = (ITEMS_IMG_SRC[items[i].name].actualSrc + 1) % ITEMS_IMG_SRC[items[i].name].fullSrc;
      sx = ITEMS_IMG_SRC[items[i].name].actualSrc;
      this.context.drawImage(image, 
                             sx, sy, 
                             sw, sh,
                             items[i].x * CELL_SIZE - this.camera.x, items[i].y * CELL_SIZE - this.camera.y, 
                             CELL_SIZE, CELL_SIZE);
    }
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
    var sw, sh, sy, sx;
    this.context.beginPath();
    for(let cell = 0; cell < player.body.length; cell++) {
      // Draw the head
      if(cell == 0) {
        sw = SNAKES_IMG_SRC["headw"];
        sh = SNAKES_IMG_SRC["headh"];
        sx = SNAKES_IMG_SRC[player.dir[cell]] * sw;
        sy = 0;
      }
      
      // Draw the tail/body
      else {
        sw = SNAKES_IMG_SRC["bodyw"];
        sh = SNAKES_IMG_SRC["bodyh"];
        sx = player.dir[cell] * sw;
        sy = SNAKES_IMG_SRC["headh"];
      }

      this.context.drawImage(image, 
                             sx, sy, 
                             sw, sh, 
                             player.body[cell].x * CELL_SIZE - this.camera.x, player.body[cell].y * CELL_SIZE - this.camera.y, 
                             CELL_SIZE, CELL_SIZE);
    }
    this.context.closePath();
  }

  /**
   * @method Drawn the score of the player (client) and the highest scores
   * of the ennemies in the scoreboard (<ul>).
   *
   * @param {Player} player: the player (client)
   * @param {Object} enemies: the enemies (other players) 
   */
  playersOnScoreboard(player, enemies) {
    // Remove the scoreboard
    while (this.scoreboard.firstChild)
      this.scoreboard.removeChild(this.scoreboard.firstChild);
    
    enemies.sort(Util.compare);
    var element, text, score;

    // Show the score of the player (client)
    element = Util.createElement("li", this.scoreboard, PLAYER_TEXT_STYLE, 
                            SCORE_X, SCORE_Y);
    text = "Your snake : " + player["score"] + " points."
    score = Util.createText(text, element);  

    // Show the highest scores of the game (enemies)
    for(var i = enemies.length-1, j = 1; i >= 0 && j <= TOP_SCORERS; j++) {
      element = Util.createElement("li", this.scoreboard, ENEMY_TEXT_STYLE, 
                              SCORE_X, SCORE_Y * j + 50);
      text = "#" + j + " Enemy: " + enemies[i]["score"] + " points."
      score = Util.createText(text, element);
      i--;
    } 
  }
}