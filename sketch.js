let cellWidth = 30; //NOTE:varriable for setting cell width
let numberOfEnemies = 40; //NOTE:varriable for number of enemies

let escMenu = 0; //NOTE:is escape menu to be triggered at next frame draw
let startScreen = 1; //NOTE:is start screen to be triggered at next frame draw
let playMode = 0; //NOTE:is play mode active
let levelEditor = 0; //NOTE:is level editor active

let numberOfRows = 25; //NOTE: number of rows on the map
let numberOfCols = 25; //NOTE: number of collumns on tha map 
let level; //NOTE:3d array containg level info (array created below)
let maxU = 10; //NOTE: sets up size of 3rd array in 3d array //TODO: Change name

let player; //NOTE:player container

let renderer; //NOTE:container where all data is written to the screen
let mouseCol; //NOTE:column where mouse is
let mouseRow; //NOTE:row where mouse is               
let levelLoadedFromFile; //NOTE:container for loading map file (Not working yet)

function setup() {
    renderer = new Renderer();
    renderer.drawToScreen();
}

function whereMouse() {
    mouseCol = floor(mouseX / cellWidth);
    mouseRow = floor(mouseY / cellWidth);
}

function triggerFrameDraw() {
    //console.log("Frame Draw Triggered");
    renderer.clearScreen();
    renderer.drawToScreen();
}

//TODO: work on a way to make loading map files work
function loadLevel() {
    levelLoadedFromFile = loadJSON("/levels/test.json");
    console.log("LOADED JSON");
    setupCalc();
    make3dArray(numberOfCols, numberOfRows, 10);
    renderer.clearScreen();
}

function saveLevel() {
    save(level, "/levels/test.json", 1); //NOTE:saves the level array to a JSON file
}

//NOTE:cycles through all possibilities
function updateLevel(mouseCol, mouseRow) {
    if (level[mouseCol][mouseRow][2] === 9) {
        level[mouseCol][mouseRow][2] = 0;
    } else {
        level[mouseCol][mouseRow][2] += 1;
    }
}

function mousePressed() {
    if (playMode === 0 && escMenu === 0 && startScreen === 0) {
        whereMouse();
        console.log("Col = ", mouseCol, "Row = ", mouseRow);
        updateLevel(mouseCol, mouseRow);
        triggerFrameDraw();
    }
}


//TODO: Tidy up keypressed function
//NOTE: Group similar actions
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        player.update(-1, 0);
        triggerFrameDraw();
    } else if (keyCode === RIGHT_ARROW) {
        player.update(1, 0);
        triggerFrameDraw();
    } else if (keyCode === UP_ARROW) {
        player.update(0, -1);
        triggerFrameDraw();
    } else if (keyCode === DOWN_ARROW) {
        player.update(0, 1);
        triggerFrameDraw();
    } else if (key === 'd') {
        shot = new shot(0, 1, player.c, player.r);
        console.log('d pressed');
    } else if (key === 'a') {
        shot = new shot(0, -1, player.c, player.r);
    } else if (key === 'w') {
        shot = new shot(-1, 0, player.c, player.r);
    } else if (key === 's') {
        shot = new shot(1, 0, player.c, player.r);
    } else if (keyCode === ESCAPE) {
        if (escMenu === 1) {
            escMenu = 0;
        } else {
            escMenu = 1;
        }
        console.log("escMenu = ", escMenu);
        triggerFrameDraw();
    } else if (keyCode === SHIFT) { //NOTE:Used to display x y of mouse for UI design
        console.log("mouseX = ", mouseX, "mouseY = ", mouseY);
    }
}


function setupCalc() {
    //NOTE:Not really required if canvas is setup
    //NOTE:Only required once different resolutions are implements
    //cellWidth = width/20;    
    //numberOfRows = floor(height / cellWidth);
    //numberOfCols = floor(width / cellWidth);
    console.log("numberOfCols = ", numberOfCols, "numberOfRows = ", numberOfRows);
}

function setModeLevelEditor() {
    if (startScreen === 1) {
        setupCalc();
        generateMap();
    }
    if (playMode === 1) {
        // clear where play character was
        level[player.c][player.r][3] = 0;
    }
    startScreen = 0;
    levelEditor = 1;
    playMode = 0;
    triggerFrameDraw();
}

function setModePlay() {
    let tempC = -1; //NOTE: Used to set a defualt C to start if not loaded from level data
    let tempR = -1; //NOTE: Used to set a defualt R to start if not loaded from level data
    if (startScreen === 1) {
        setupCalc();
        generateMap();
        console.log("Player", player);
    }

    //NOTE: Checks all cells for a player spawn flag
    for (c = 0; c < numberOfCols; c++) {
        for (r = 0; r < numberOfRows; r++) {
            if (level[c][r][2] === 2) {
                tempC = c;
                tempR = r
            }
        }
    }
    player = new Player(tempC, tempR);
    startScreen = 0;
    playMode = 1;
    levelEditor = 0
    triggerFrameDraw();
}

//function make2dArray(cols, rows) {
//    level = new Array(cols);
//    for (i = 0; i < level.length; i++) {
//        level[i] = new Array(rows);
//    }
//    console.log(level);
//}


//NOTE: creates 3d level array
function make3dArraylevel(cols, rows, variables) {
    level = new Array(cols);
    for (i = 0; i < level.length; i++) {
        level[i] = new Array(rows);
        for (j = 0; j < level[i].length; j++) {
            level[i][j] = new Array(variables);
        }
    }
    console.log("array:level", level);
}

function generateMap() {

    make3dArraylevel(numberOfCols, numberOfRows, maxU);


    for (c = 0; c < numberOfCols; c++) {
        for (r = 0; r < numberOfRows; r++) {
            level[c][r][0] = c * cellWidth; //NOTE: x pos
            level[c][r][1] = r * cellWidth; //NOTE: y pos
            for (u = 2; u < maxU; u++) {
                level[c][r][u] = 0;
                //console.log("c = ", c, "r = ", r, "u = ", u);
            }
            //level[c][r][2] = 0; //NOTE: 0 - Room, 1 - Wall, 2 - Spawn, 3 - Health Pack, 4 - enemy1, 5 - enemy2
            //level[c][r][3] = 0; //NOTE: has player
            //level[c][r][4] = 0; //NOTE: has enemy1
            //level[c][r][5] = 0; //NOTE: has enemy2
            //level[c][r][6] = 0; //NOTE: unused
            //level[c][r][7] = 0; //NOTE: unused
            //level[c][r][8] = 0; //NOTE: unused
            //level[c][r][9] = 0; //NOTE: unused
        }
    }
}

function clearLevel() {
    for (c = 0; c < numberOfCols; c++) {
        for (r = 0; r < numberOfRows; r++) {
            level[c][r][2] = 0;
        }
    }
    triggerFrameDraw();
}

//TODO: Move to renderer
function gameOver() {
    push();
    background(200);
    fill(80);
    textSize(100);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2);
    pop();
    return;
}

//TODO: Probably can be relocated to shot.js
function hitsEnemy() {
    let rd = 0;
    let cd = 0;
    for (i = 0; i < numberOfEnemies; i++) {
        rd = player.r - enemy[i].r;
        cd = player.c - enemy[i].c;
        if (rd == 0 && cd == 0) {
            player.lives--;
        }
    }
}
