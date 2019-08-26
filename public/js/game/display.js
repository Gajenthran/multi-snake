/**
 * All useful files for the sprites.
 * @const {Object}
 */
var TILES_FILE = {
  "snakes"     : "/public/img/snakes.png",
  "items"      : "/public/img/items.png",
  "background" : "/public/img/background.png",
  "icons"      : "/public/img/icons.png"
};

/**
 * Details of the source image (/public/img/background.png)
 * to draw the snake for the player and the enemies.
 * @const {Object}
 */
var BACKGROUND_IMG_SRC = {
  "image"   : "background",
  "w"       : "50",
  "h"       : "50",
};

/**
 * Details of the source image (/public/img/snakes.png)
 * to draw the snake for the player and the enemies.
 * @const {Object}
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
  "bodyh"             : 70,
  "ud_tailw"          : 52,
  "ud_tailh"          : 59,
  "lr_tailw"          : 68,
  "lr_tailh"          : 59
};
  
/**
 * Details of the source image (/public/img/items.png)
 * to draw the items.
 * @const {Object}
 */
var ITEMS_IMG_SRC = {
  "image"   : "items",
  "coin"    : { "id" : 0, "actualSrc" : 0, "fullSrc" : 1},
  "apple"   : { "id" : 1, "actualSrc" : 0, "fullSrc" : 1},
  "poison"  : { "id" : 2, "actualSrc" : 0, "fullSrc" : 1},
  "w"       : 60,
  "h"       : 60
};

/**
 * The width of the window.
 * @const {number}
 */
var WINDOW_WIDTH = window.innerWidth;

/**
 * The height of the window.
 * @const {number}
 */
var WINDOW_HEIGHT = window.innerHeight;

/**
 * The width of the canvas.
 * @const {number}
 */
var CANVAS_WIDTH = 640;

/**
 * The height of the canvas.
 * @const {number}
 */
var CANVAS_HEIGHT = 480;

/**
 * The id of the canvas (important to create a canvas).
 * @const {number}
 */
var CANVAS_ID = "Canvas_Multi-Snake";

/**
 * Tthe size of a cell (a cell is an item or a player).
 * @const {number}
 */
var CELL_SIZE = 32;

/**
 * The width of the score title.
 * @const {number}
 */
var SCORE_TITLE_WIDTH = 200;

/**
 * The height of the score title.
 * @const {number}
 */
var SCORE_TITLE_HEIGHT = 30;

/**
 * The coordinate x of the score title.
 * @const {number}
 */
var SCORE_TITLE_X = WINDOW_WIDTH / 2 - (CANVAS_WIDTH + SCORE_TITLE_WIDTH + 50) / 2 + CANVAS_WIDTH + 50;

/**
 * The coordinate y of the score title.
 * @const {number}
 */
var SCORE_TITLE_Y = WINDOW_HEIGHT / 2 - CANVAS_HEIGHT / 2 - 50;

/**
 * The coordinate x of the leaderboard title.
 * @const {number}
 */
var LEADERBOARD_TITLE_X = WINDOW_WIDTH / 2 - (CANVAS_WIDTH + SCORE_TITLE_WIDTH + 50) / 2 + CANVAS_WIDTH + 50;

/**
 * The coordinate y of the leaderboard title.
 * @const {number}
 */
var LEADERBOARD_TITLE_Y = WINDOW_HEIGHT / 2 - CANVAS_HEIGHT / 2 + 50;

/**
 * The width of the leaderboard title.
 * @const {number}
 */
var LEADERBOARD_TITLE_WIDTH = 200;

/**
 * The height y of the leaderboard title.
 * @const {number}
 */
var LEADERBOARD_TITLE_HEIGHT = 30;

/**
 * The coordinate x of the scoreboard.
 * @const {number}
 */
var LEADERBOARD_X = WINDOW_WIDTH / 2 - (CANVAS_WIDTH + SCORE_TITLE_WIDTH + 50) / 2 + CANVAS_WIDTH + 50;

/**
 * The coordinate y of the scoreboard.
 * @const {number}
 */
var LEADERBOARD_Y = WINDOW_HEIGHT / 2 - CANVAS_HEIGHT / 2 + 105;

/**
 * The width of the scoreboard.
 * @const {number}
 */
var LEADERBOARD_WIDTH = 190;

/**
 * The height of the scoreboard.
 * @const {number}
 */
var LEADERBOARD_HEIGHT = 300;

/**
 * The coordinate x of the leaderboard.
 * @const {number}
 */
var LEADERBOARD_TEXT_X = 0;

/**
 * The coordinate y of the leaderboard.
 * @const {number}
 */
var LEADERBOARD_TEXT_Y = 50;

/**
 * The number of players (best scores) to show.
 * @const {number}
 */
var TOP_SCORERS = 3;

/**
 * The coordinate x of the game title.
 * @const {number}
 */
var GAME_TITLE_X = WINDOW_WIDTH / 2 - (CANVAS_WIDTH + SCORE_TITLE_WIDTH + 50) / 2;

/**
 * The coordinate y of the game title.
 * @const {number}
 */
var GAME_TITLE_Y = WINDOW_HEIGHT / 2 - CANVAS_HEIGHT / 2 - 20;

/**
 * The width of the game title.
 * @const {number}
 */
var GAME_TITLE_WIDTH = CANVAS_WIDTH + 20;

/**
 * The height of the game title.
 * @const {number}
 */
var GAME_TITLE_HEIGHT = 30;

/**
 * The name of the game title.
 * @const {number}
 */
var GAME_TITLE_NAME = "Multiplayer Snake";

/**
 * The name of the leaderboard.
 * @const {number}
 */
var LEADERBOARD_TITLE_NAME = "Leaderboard";

/**
 * The style of the game title (<div>).
 * @const {Object}
 */
var GAME_TITLE_STYLE = {
  "backgroundColor" : "#547436",
  "padding": "10px",
  "textAlign": "center",
  "fontFamily" : "OCR A Std, monospace",
  "fontSize" : "30px",
  "color" : "white"

};

/**
 * The style of the leaderboard title (<div>).
 * @const {Object}
 */
var LEADERBOARD_TITLE_STYLE = {
  "backgroundColor" : "#547436",
  "padding": "20px",
  "fontFamily" : "OCR A Std, monospace",
  "fontSize" : "30px",
  "color" : "white"
};

/**
 * The style of the score title (<div>).
 * @const {Object}
 */
var SCORE_TITLE_STYLE = {
  "backgroundColor" : "#547436",
  "padding": "20px"
};

/**
 * The style of the leaderboard (<ul>).
 * @const {Object}
 */
var LEADERBOARD_STYLE = {
  "backgroundColor" : "#547436",
  "border"          : "5px solid #547F19"
};


/**
 * Style for the element <li> representing the highest scores.
 * @const {number}
 */
var LEADERBOARD_TEXT_STYLE = {
  "backgroundColor" : "#547436",
  "padding": "20px",
  "fontFamily" : "OCR A Std, monospace",
  "fontSize" : "25px",
  "color" : "white"
};

/**
 * The style of the canvas (<canvas>).
 * @const {Object}
 */
var CANVAS_STYLE = {
  "border" : "solid #547436 20px",
  "position" : "absolute",
  "left" : WINDOW_WIDTH / 2 - (CANVAS_WIDTH + SCORE_TITLE_WIDTH + 50) / 2 + "px",
  "top"  : WINDOW_HEIGHT / 2 - CANVAS_HEIGHT / 2 + "px",
};

/**
 * Draw all the images of the game and also the scoreboard on the canvas 
 */
class Display {
  constructor() {
    this.canvas  = null;
    this.context = null;
    this.scoreboard = null;
    this.gTitle = null;
    this.lTitle = null;
    this.sTitle = null;
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
    this.scoreboard = Util.createElement("ul", null, LEADERBOARD_STYLE, 
                                         LEADERBOARD_X, LEADERBOARD_Y,
                                         LEADERBOARD_WIDTH, LEADERBOARD_HEIGHT);

    this.gTitle = Util.createElement("div", null, GAME_TITLE_STYLE, 
                                     GAME_TITLE_X, GAME_TITLE_Y - GAME_TITLE_HEIGHT, 
                                     GAME_TITLE_WIDTH, GAME_TITLE_HEIGHT);
    Util.createText(GAME_TITLE_NAME, this.gTitle);

    this.sTitle = Util.createElement("div", null, SCORE_TITLE_STYLE, 
                                     SCORE_TITLE_X, SCORE_TITLE_Y,
                                     SCORE_TITLE_WIDTH, SCORE_TITLE_HEIGHT);

    this.lTitle = Util.createElement("div", null, LEADERBOARD_TITLE_STYLE, 
                                     LEADERBOARD_TITLE_X, LEADERBOARD_TITLE_Y, 
                                     LEADERBOARD_TITLE_WIDTH, LEADERBOARD_TITLE_HEIGHT);
    Util.createText(LEADERBOARD_TITLE_NAME, this.lTitle);
    this.initIcons();
    this.loadImages();
  }

  /**
   * @method Initialize all icons of the game.
   */
  initIcons() {
    var img, score, bestScore, style;

    style = {
      "src" : TILES_FILE["icons"],
      "objectFit" : "cover",
      "objectPosition": "100% 0",
    };

    img = Util.createElement("IMG", this.sTitle, style, 0, 15, 40, 40);
    img.setAttribute("src", TILES_FILE["icons"]);

    style.objectPosition = "0% 0";
    img = Util.createElement("IMG", this.sTitle, style, 50, 15, 40, 40);
    img.setAttribute("src", TILES_FILE["icons"]);
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
  * @method Set the camera (viewport) on a selected player
  *
  * @param {Player} player: player
  */
  setCamera(player) {
    this.camera.x = Math.max(0, player.x * CELL_SIZE - CANVAS_WIDTH/2);
    this.camera.y = Math.max(0, player.y * CELL_SIZE - CANVAS_HEIGHT/2);
  }

  /**
   * @method Clear the canvas.
   */
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * @method Draw the background on the canvas.
   */
  background() {
    var w = Math.floor(CANVAS_WIDTH/CELL_SIZE), h = Math.floor(CANVAS_HEIGHT/CELL_SIZE);
    var image = this.images[BACKGROUND_IMG_SRC["image"]]
    var sw = BACKGROUND_IMG_SRC["w"], sh = BACKGROUND_IMG_SRC["h"];
    var sy = 0, sx;
    this.context.beginPath();
    for(let r = 0; r < w; r++) {
      for(let c = 0; c < h; c++) {
        sx = (r * h + c) & 1 ? 0 : sw;
        this.context.drawImage(image, 
                               sx, sy, 
                               sw, sh,
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
  item(items) {
    var image = this.images[ITEMS_IMG_SRC["image"]]
    var sw = ITEMS_IMG_SRC["w"], sh = ITEMS_IMG_SRC["h"];
    var sy, sx;
    this.context.beginPath();
    for(let i = 0; i < items.length; i++) {
      sy = ITEMS_IMG_SRC[items[i].name].id * sh;
      sx = ITEMS_IMG_SRC[items[i].name].actualSrc;
      this.context.drawImage(image, 
                             sx, sy, 
                             sw, sh,
                             items[i].x * CELL_SIZE /* - this.camera.x */, items[i].y * CELL_SIZE /* - this.camera.y */, 
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
  snake(imageName, player) {
    var image = this.images[SNAKES_IMG_SRC["image"]];
    var sw, sh, sy, sx;
    this.context.beginPath();
    for(let cell = 0; cell < player.body.length; cell++) {
      // Draw the head
      if(cell == 0) {
        sw = SNAKES_IMG_SRC["headw"];
        sh = SNAKES_IMG_SRC["headh"];
        sx = SNAKES_IMG_SRC[player.body[cell].dir] * sw;
        sy = SNAKES_IMG_SRC[imageName] * (SNAKES_IMG_SRC["headh"] + SNAKES_IMG_SRC["bodyh"] + SNAKES_IMG_SRC["ud_tailh"]);
      } else if(cell == player.body.length-1) { // Draw the tail
        if(SNAKES_IMG_SRC[player.body[cell-1].dir] ==  SNAKES_IMG_SRC["left"] ||
           SNAKES_IMG_SRC[player.body[cell-1].dir] ==  SNAKES_IMG_SRC["right"]) {
          sw = SNAKES_IMG_SRC["lr_tailw"];
          sh = SNAKES_IMG_SRC["lr_tailh"];
          sx = SNAKES_IMG_SRC[player.body[cell-1].dir] == SNAKES_IMG_SRC["left"] ? SNAKES_IMG_SRC["ud_tailw"] : 
                                                                                 SNAKES_IMG_SRC["ud_tailw"] + SNAKES_IMG_SRC["lr_tailw"];
        } else {
          sw = SNAKES_IMG_SRC["ud_tailw"];
          sh = SNAKES_IMG_SRC["ud_tailh"];
          sx = SNAKES_IMG_SRC[player.body[cell-1].dir] == SNAKES_IMG_SRC["up"] ? 0 : SNAKES_IMG_SRC["ud_tailw"] + SNAKES_IMG_SRC["lr_tailw"] * 2;
        }
        sy = SNAKES_IMG_SRC[imageName] * (SNAKES_IMG_SRC["headh"] + SNAKES_IMG_SRC["bodyh"] + SNAKES_IMG_SRC["ud_tailh"]) + SNAKES_IMG_SRC["headh"] + SNAKES_IMG_SRC["bodyh"];
      } else { // Draw the body
        sw = SNAKES_IMG_SRC["bodyw"];
        sh = SNAKES_IMG_SRC["bodyh"];

        var currentDir = player.body[cell].dir, nextDir = player.body[cell-1].dir, x;
        if(currentDir == nextDir) {
          if(SNAKES_IMG_SRC[currentDir] == SNAKES_IMG_SRC["left"] ||
             SNAKES_IMG_SRC[currentDir] == SNAKES_IMG_SRC["right"])
            x = SNAKES_IMG_SRC["lr_body"];
          else
            x = SNAKES_IMG_SRC["ud_body"];
        } else {
          if(this.checkDirections(currentDir, nextDir, "left",  "down"))       x = SNAKES_IMG_SRC["ul_body"];
          else if(this.checkDirections(currentDir, nextDir, "left",  "up"))    x = SNAKES_IMG_SRC["dr_body"];
          else if(this.checkDirections(currentDir, nextDir, "right", "up"))    x = SNAKES_IMG_SRC["dl_body"];
          else if(this.checkDirections(currentDir, nextDir, "right", "down"))  x = SNAKES_IMG_SRC["ur_body"];
          else if(this.checkDirections(currentDir, nextDir, "up",    "right")) x = SNAKES_IMG_SRC["ul_body"];
          else if(this.checkDirections(currentDir, nextDir, "up",    "left"))  x = SNAKES_IMG_SRC["ur_body"];
          else if(this.checkDirections(currentDir, nextDir, "down",  "right")) x = SNAKES_IMG_SRC["dr_body"];
          else if(this.checkDirections(currentDir, nextDir, "down",  "left"))  x = SNAKES_IMG_SRC["dl_body"];
        }
        sx = x * sw; 
        sy = SNAKES_IMG_SRC[imageName] * (SNAKES_IMG_SRC["headh"] + SNAKES_IMG_SRC["bodyh"] + SNAKES_IMG_SRC["ud_tailh"]) + SNAKES_IMG_SRC["headh"];
      }

      this.context.drawImage(image, 
                             sx, sy, 
                             sw, sh, 
                             player.body[cell].x * CELL_SIZE /* - this.camera.x */, player.body[cell].y * CELL_SIZE /* - this.camera.y */, 
                             CELL_SIZE, CELL_SIZE);
    }
    this.context.closePath();
  }

  /**
   * @method Drawn the score of the player.
   *
   * @param {Player} player: the player (client)
   * @param {Object} enemies: the enemies (other players) 
   */
  score(player, enemies) {
    while(this.sTitle.firstChild)
      this.sTitle.removeChild(this.sTitle.firstChild);

    var img, score, bestScore;

    var style = {
      "src" : TILES_FILE["icons"],
      "objectFit" : "cover",
      "objectPosition": "100% 0",
    };

    img = Util.createElement("IMG", this.sTitle, style, 10, 15, 40, 40);
    img.setAttribute("src", TILES_FILE["icons"]);

    style.objectPosition = "0% 0";
    img = Util.createElement("IMG", this.sTitle, style, 140, 15, 40, 40);
    img.setAttribute("src", TILES_FILE["icons"]);

    var pstyle = {
      "fontFamily" : "OCR A Std, monospace",
      "fontSize" : "30px",
      "color" : "white"
    };

    var p = Util.createElement("p", this.sTitle, pstyle, 60, -10);
    var text = player["score"];
    score = Util.createText(text, p);

    var players = [...enemies];
    players.push(player);
    players.sort(Util.compare);
    var p1 = Util.createElement("p", this.sTitle, pstyle, 190, -10);
    var text = players[players.length-1]["score"];
    console.log(text);
    score = Util.createText(text, p1);
  }

  /**
   * @method Draw the highest scores in the scoreboard (<ul>).
   *
   * @param {Player} player: the player (client)
   * @param {Object} enemies: the enemies (other players) 
   */
  leaderboard(player, enemies) {
    while(this.scoreboard.firstChild)
      this.scoreboard.removeChild(this.scoreboard.firstChild);
    
    var players = [...enemies];
    players.push(player);
    players.sort(Util.compare);
    var element, text, score, high = 0;

    // Show the highest scores of the game
    for(var i = players.length-1, j = 1; i >= 0 && j <= TOP_SCORERS; j++) {
      element = Util.createElement("li", this.scoreboard, LEADERBOARD_TEXT_STYLE, 
                              LEADERBOARD_TEXT_X, LEADERBOARD_TEXT_Y * (j - 1));
      text = "User0" + j + " : " + players[i]["score"];
      score = Util.createText(text, element);
      i--;
    }
  }

  /**
   * @method Check if the directions of the snake are equal to the expected directions.
   *
   * @param {number} currentDir: the current direction of the snake
   * @param {number} nextDir: the next direction of the snake
   * @param {number} expectedCurrentDir: the expected current direction of the snake
   * @param {number} expectedNextDir: the expected next direction of the snake
   * @return {boolean} True if the expected directions are equal to the directions 
   * of the snake, else otherwise.
   */
  checkDirections(currentDir, nextDir, expectedCurrentDir, expectedNextDir) {
    if(SNAKES_IMG_SRC[currentDir] == SNAKES_IMG_SRC[expectedCurrentDir] &&
       SNAKES_IMG_SRC[nextDir] == SNAKES_IMG_SRC[expectedNextDir])
      return true;
    return false;
  }
}