import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';
import './button.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nRows : 5,
    nCol : 5,
    prob : 0
  }
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      hasWon : false,
      board : this.createBoard()
    }
    this.newgame = this.newgame.bind(this);

  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for(let y=0;y<this.props.nRows;y++)
    {
      let row = [];
      for(let x=0;x<this.props.nCol;x++)
      {
        let val=Math.random() <= this.props.prob ? true : false;
        row.push(val);
      }
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
   // console.log(coord +" Fliping");
    //let {ncols, nrows} = this.props;
    let ncols=this.props.nCol;
    let nrows=this.props.nRows;
   // console.log(nrows + " " + ncols); 
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    

    function flipCell(y, x) {
    
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {

        board[y][x] = !board[y][x];

      }
    }

    // TODO: flip this cell and the cells around it
     
      //board[y][x] = !board[y][x];
      flipCell(x,y);
      flipCell(y+1,x);
     flipCell(y-1,x);
     flipCell(y,x+1);
     flipCell(y,x-1);
     //flipCell(10,20);
    // win when every cell is turned off
  
    // TODO: determine is the game has been won\
    function haswon()
    {
      for(let i=0;i<nrows;i++)
      {
        for(let j=0;j<ncols;j++)
        {
          if(board[i][j]===true) return false;
        }
      }
      return true;
    }
     
    this.setState({board, hasWon : haswon()});
  }
   

  /** Render game board or winning message. */
  newgame(){
     this.setState({board : this.createBoard() ,hasWon : false});
  }
  render() {
     if(this.state.hasWon)
     {
       return (
         <div>
          <h1 className="neon-blue">Congrats !! You turn off all light</h1>
          <button className="btn-7" onClick={this.newgame}>New Game</button>
          </div>

       )
     }
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
    let mytable=[];
    for(let y=0;y<this.props.nRows;y++)
    {
      let row=[];
      for(let x=0;x<this.props.nCol;x++)
      {
        let k=`${y}-${x}`;
        row.push(<Cell key={k} isLit={this.state.board[y][x]} flipCellsAroundMe={()=>this.flipCellsAround(k)}/>);
      }
      mytable.push(<tr key={y}>{row}</tr> );

    }
    return(
      <div>
        <h1 className="neon-orange"> SHUT THE LIGHTS</h1>
      <table className="Board">
        <tbody>
          {mytable}
        </tbody>
      </table>
      </div>
    )
  }
}


export default Board;
