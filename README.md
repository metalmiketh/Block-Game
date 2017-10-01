# Block-Game
A simple game of blocks

p5js reference here https://p5js.org/reference/


level Array values
  level[c][r][d]
  
  c = column
  r = row
  level[c][r][2] = 0; //NOTE: 0 - Room, 1 - Wall, 2 - Spawn, 3 - Health Pack, 4 - enemy1, 5 - enemy2
  level[c][r][3] = 0; //NOTE: has player
  level[c][r][4] = 0; //NOTE: has enemy1
  level[c][r][5] = 0; //NOTE: has enemy2
  level[c][r][6] = 0; //NOTE: unused
  level[c][r][7] = 0; //NOTE: unused
  level[c][r][8] = 0; //NOTE: unused
  level[c][r][9] = 0; //NOTE: unused
