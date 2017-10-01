function Player(c, r) {
    //NOTE: If -1 is still set, then sets spawn point to 0,0
    if (c === -1) {
        this.c = 0;
        //console.log("No Spawnpoint Provided");
    } else {
        this.c = c;
    }
    if (r === -1) {
        this.r = 0;
        //console.log("No Spawnpoint Provided");
    } else {
        this.r = r;
    }
    this.lives = 5; //TODO: Implement lives
    this.health = 100;

    level[this.c][this.r][3] = 1; //NOTE: Sets cell as having a player character

    this.update = function (c, r) { //NOTE: c and r values between -1 and 1
        //console.log("           ");
        this.cLast = this.c;
        this.rLast = this.r;
        this.c += c;
        this.r += r;

        this.checkPosition();

        level[this.cLast][this.rLast][3] = 0; //undraw previous cell
        level[this.c][this.r][3] = 1;           //draw new cell

        //console.log("Player C = ", this.c, "Player R = ", this.r);
    }

    this.checkPosition = function () { //NOTE: Fuction for checking players moves are valid
        this.checkMapEdge();
        this.checkWall();
    }

    this.checkWall = function () {
        if (level[this.c][this.r][2] === 1) {
            //console.log("OOOPS WALL");
            this.c = this.cLast;
            this.r = this.rLast;
        }
    }

    this.checkMapEdge = function () {
        if (this.c < 0) {
            this.c = 0;
            //console.log("OOOPS < C");
        } else if (this.c > numberOfCols - 1) {
            this.c = numberOfCols - 1;
            //console.log("OOOPS > C");
        }
        if (this.r < 0) {
            this.r = 0;
            //console.log("OOOPS < R");
        } else if (this.r > numberOfRows - 1) {
            this.r = numberOfRows - 1;
            //console.log("OOOPS > R");
        }
    }
}
