var Snake = require("./snake.js")

/** Class representing a player. */
class Player extends Snake {
  constructor(id, name, level, x, y, w, h, color) {
    super(x, y, w, h, color);
    Player.nbPlayer = Player.nbPlayer + 1 || 1;
    this.name  = name;
    this.level = level;
    this.id = id;
  }

  /** 
   * @return count the number of players in the game
   */
  static countPlayers() {
    console.log("Number of players : " + Player.nbPlayer);
    return Player.nbPlayer;
  }
}

module.exports = Player;

/* socket pour le client, bonne idée
 * trop de require + Snake qui fonctionne mais console.error
 * relation client serveur + deux fichiers : pour client et serveur
 * plutôt game que je dois prendre pour les changements de décor
 * l'initialisation des coordonnées du joueur au début
 */