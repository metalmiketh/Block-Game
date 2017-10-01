function Renderer() {
    this.menuText;
    this.button1 = createButton();
    this.button2 = createButton();
    this.button3 = createButton();
    this.button4 = createButton();
    this.button1.hide();
    this.button2.hide();
    this.button3.hide();
    this.button4.hide();
    this.mainCanvas = createCanvas(1024, 768); //TODO: Make width & height variables

    this.drawToScreen = function () {
        if (escMenu === 1) {
            this.drawMap(); //NOTE: Draws map beneath the esc menu
            this.drawEscMenu();
        } else if (startScreen === 1) {
            this.drawStartScreen();
        } else {
            this.drawMap();
            this.drawRightPanel();
        }
    }

    this.drawRightPanel = function () {
        if (playMode === 1) {
            push();
            stroke(255);
            strokeWeight(4);
            fill(51);
            rect(750, 0, 750, 768);
            noStroke();
            textSize(20);
            fill(255);
            text("Health", 770, 40);
            text(player.health, 900, 40);
            text("Lives", 770, 70);
            text(player.lives, 900, 70);
            pop();
        }
    }

    this.clearScreen = function () { //NOTE: Hides all buttons
        this.button1.hide();
        this.button2.hide();
        this.button3.hide();
        this.button4.hide();
        //this.menuText.hide(); //TODO: Hide menuText
    }

    this.drawStartScreen = function () {
        push();
        stroke(0);
        textSize(100);
        textAlign(CENTER, CENTER);
        this.menuText = text("Block Game", width / 2, height / 8);

        this.button1 = createButton("Level Editor");
        this.button1.position(300, 250);
        this.button1.mouseReleased(setModeLevelEditor);

        this.button2 = createButton("Play");
        this.button2.position(300, 290);
        this.button2.mouseReleased(setModePlay);

        this.button3 = createButton("Load Level");
        this.button3.position(300, 330);
        this.button3.mouseReleased(loadLevel);
        pop();
    }

    this.drawEscMenu = function () {
        push();
        fill(80);
        rect(width / 4, height / 4, width / 2, height / 2); //TODO: Maybe make full screen with opacity
        //text();
        this.button1 = createButton("Load Level");
        this.button1.position(300, 250);
        this.button1.mouseReleased(loadLevel);

        this.button2 = createButton("Save Level");
        this.button2.position(300, 290);
        this.button2.mouseReleased(saveLevel);

        this.button3 = createButton("Clear Level");
        this.button3.position(300, 330);
        this.button3.mouseReleased(clearLevel);

        if (playMode === 1) { //NOTE: Enables mode switch in game
            this.button4 = createButton("Level Editor");
            this.button4.position(300, 370);
            this.button4.mouseReleased(setModeLevelEditor);
        } else if (levelEditor === 1) {
            this.button4 = createButton("Play");
            this.button4.position(300, 370);
            this.button4.mouseReleased(setModePlay);
        }
        pop();
    }

    this.drawMap = function () {
        push();
        background(0);
        stroke(20);
        strokeWeight(2);
        for (c = 0; c < numberOfCols; c++) {
            for (r = 0; r < numberOfRows; r++) {
                rect(level[c][r][0], level[c][r][1], cellWidth, cellWidth);
                if (playMode === 1) {
                    if (level[c][r][3] === 1) {
                        push();
                        fill(100, 100, 255);
                        textSize(20);
                        textAlign(CENTER, CENTER);
                        text("@", level[c][r][0] + cellWidth / 2, level[c][r][1] + cellWidth / 2);
                        //console.log("Player Drawn");
                        pop();
                    } else if (level[c][r][2] === 1) { //Wall
                        push();
                        fill(80);
                        rect(level[c][r][0], level[c][r][1], cellWidth, cellWidth);
                        pop();
                    }
                } else if (levelEditor === 1) {
                    if (level[c][r][2] === 1) { //Wall
                        push();
                        fill(80);
                        rect(level[c][r][0], level[c][r][1], cellWidth, cellWidth);
                        pop();
                    } else if (level[c][r][2] === 2) { //Player Spawn
                        push();
                        fill(0, 100, 0);
                        textSize(20);
                        textAlign(CENTER, CENTER);
                        text("S", level[c][r][0] + cellWidth / 2, level[c][r][1] + cellWidth / 2);
                        pop();
                    } else if (level[c][r][2] === 0) { //Room
                        push();
                        fill(0, 100, 0);
                        textSize(20);
                        textAlign(CENTER, CENTER);
                        text(" ", level[c][r][0] + cellWidth / 2, level[c][r][1] + cellWidth / 2);
                        pop();
                    } else if (level[c][r][3] === 1) { //Player in Cell
                        push();
                        fill(100, 100, 255);
                        textSize(20);
                        textAlign(CENTER, CENTER);
                        text("@", level[c][r][0] + cellWidth / 2, level[c][r][1] + cellWidth / 2);
                        //console.log("Player Drawn");
                        pop();
                    } else {
                        push();
                        fill(0, 100, 0);
                        textSize(20);
                        textAlign(CENTER, CENTER);
                        text(level[c][r][2], level[c][r][0] + cellWidth / 2, level[c][r][1] + cellWidth / 2);
                        pop();
                    }
                }
            }
        }
        pop();
    }
}
