import checkForWinner from './checkForWinner';
var cloneDeep = require('lodash.clonedeep');

export default class MiniMaxAgent {
  constructor(grid_size, map) {
    this.grid_size = grid_size
    this.parent  = new node(null, map, 'max', null)
    this.gameTree = this.construct_game_tree()
  }

  get_best_move(map) {
    let parent = new node(null, map, 'max');
    this.construct_game_tree(parent, map, 'max', 0);
    this.set_node_values(parent);
    let children = parent.getChildren();
    children = this.shuffle(children);

    let max = children[0];
    for (let i = 0; i < children.length; i++) {
      if (children[i].getValue() > max.getValue()) {
        console.log(children[i].getValue())
        max = children[i];
      }
    }
    return max.get_move();
  }

  construct_game_tree(parent, map, player, depth) {
    let all_moves = this.get_all_moves(map);
    if (all_moves.length == 0 || depth == (this.grid_size ==3 ? 8 : 5)) {
      parent.setValue(0);
      return;
    }
    all_moves = this.shuffle(all_moves);
    depth = depth + 1;
    for (let i = 0; i < (this.grid_size ==3 ? 8 : 7) && i < all_moves.length; i++) {
      let newMap = cloneDeep(map);
      newMap[all_moves[i].x].splice(
        all_moves[i].y,
        1,
        player == 'max' ? 'knots' : 'crosses',
      );
      let n = new node(
        parent,
        newMap,
        player == 'max' ? 'min' : 'max',
        all_moves[i],
      );
      parent.addChild(n);
      if (
        checkForWinner(
          player == 'max' ? 'knots' : 'crosses',
          newMap.length,
          newMap,
        )
      ) {
        n.setValue(player == 'min' ? -1 : 1);
        continue;
      }
      this.construct_game_tree(
        n,
        cloneDeep(newMap),
        player == 'max' ? 'min' : 'max',
        depth,
      );
    }
  }
  shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  get_all_moves(map) {
    let all_moves = [];
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == null) all_moves.push({x: i, y: j});
      }
    }
    return all_moves;
  }
  set_node_values(n) {
    let children = n.getChildren();
    if (children.length == 0) {
      while (n.getParent() != null) {
        let parent = n.getParent();
        if (!parent.getValue()) {
          parent.setValue(n.getValue());
        } else if (
          parent.getPlayer() == 'max' &&
          n.getValue() > parent.getValue()
        ) {
          parent.setValue(n.getValue());
        } else if (
          parent.getPlayer() == 'min' &&
          n.getValue() < parent.getValue()
        ) {
          parent.setValue(n.getValue());
        } 
        n = parent;
      }
      return;
    }

    for (let i = 0; i < children.length; i++) {
      this.set_node_values(children[i]);
    }
  }
}

class node {
  constructor(parent, map, player, move) {
    this.move = move;
    this.parent = parent;
    this.map = map;
    this.player = player;
    this.children = [];
    this.value = null;
  }

  addChild(child) {
    this.children.push(child);
  }
  setValue(val) {
    this.value = val;
  }
  getMap() {
    return this.map;
  }
  getChildren() {
    return this.children;
  }
  getParent() {
    return this.parent;
  }
  getValue() {
    return this.value;
  }
  getPlayer() {
    return this.player;
  }
  get_move() {
    return this.move;
  }
}
