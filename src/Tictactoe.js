import React, { useState } from 'react';
import { Box, Button, Center, Grid, GridItem, Text } from "@chakra-ui/react";

function Tictactoe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = (index) => {
    if (calculateWinner(board) || board[index]) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };
  const renderSquare = (index) => {
    return (
      <Button
        size="lg"
        fontSize="2xl"
        fontWeight="bold"
        borderRadius="lg"
        colorScheme="teal"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </Button>
    );
  };
  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every((square) => square !== null)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }
  return (
      <Center h="80vh" border={"2px"} borderColor={"tomato"} w='90vh' ml='450px' mt='100px'>
        <Box>
          <Text fontSize="3xl" fontWeight="bold" mb={4}>
            Tic Tac Toe
          </Text>
          <Text fontSize="xl" fontWeight="semibold" mb={2}>
            {status}
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={2} mt={4}>
            {board.map((square, index) => (
              <GridItem key={index} colSpan={1} >
                {renderSquare(index)}
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Center>
 
  );
}

export default Tictactoe;

// Function to determine the winner
function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
