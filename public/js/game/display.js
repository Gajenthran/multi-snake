var TILES_FILE = {
  "apple"          : "/public/img/apple.png", 
  "poison"          : "/public/img/poison.png", 
  "decrease_speed" : "/public/img/decrease_speed.png", 
  "player"         : "/public/img/player.png",
  "enemies"        : "/public/img/enemies.png"
};

var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var CANVAS_ID = "Canvas_Curve-Fever";

var SCOREBOARD_X = CANVAS_WIDTH + 10
var SCOREBOARD_Y = 0;
var SCOREBOARD_WIDTH = 400;
var SCOREBOARD_HEIGHT = 300;

var SCORE_X = 50;
var SCORE_Y = 50;

var TOP_SCORERS = 2;

var PLAYER_TEXT_STYLE = {
  "fontSize"      : "20px",
  "fontFamily"    : "Gill Sans",
  "paddingBottom" : "10px",
  "borderBottom"  : "0.5px solid",
  "listStyleType" : "none"
};

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
   * @param canvasWidth {number} width of the canvas
   * @param canvasHeight {number} height of the canvas
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
   * @param items {Array.<Item>} the items of the game 
   */
  itemOnScreen(items) {
    this.context.beginPath();
    for(let i = 0; i < items.length; i++)
      this.context.drawImage(this.images[items[i].name], items[i].x * 40, items[i].y * 40, 40, 40);
    this.context.closePath();
  }

  /**
   * @method Draw a snake on the canvas.
   *
   * @param imageName {String} name of the image, to know if it is the player or the enemies
   * @param body {Array.<Object>} the body of the snake
   */
  snakeOnScreen(imageName, body) {
    var image = this.images[imageName];
    this.context.beginPath();
    for(let cell = 0; cell < body.length; cell++)
      this.context.drawImage(image, body[cell].x * 40, body[cell].y * 40, 40, 40);
    this.context.closePath();
  }

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

    // Show the top 3 score of the game (enemies)
    for(var i = enemies.length-1, j = 1; i >= 0 && j <= TOP_SCORERS; j++) {
      element = createElement("li", this.scoreboard, ENEMY_TEXT_STYLE, 
                              SCORE_X, SCORE_Y * j + 50);
      text = "#" + j + " Enemy: " + enemies[i]["score"] + " points."
      score = createText(text, element);
      i--;
    } 
  }
}