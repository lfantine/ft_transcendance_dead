"use client";

import React, { useEffect } from "react";
import * as setting_game from './setting_game';
import { useRef } from 'react';

const PLAYER_HEIGHT = 100;
const PLAYER_WIDTH = 5;

export default function Game() {

  useEffect(() => {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    if (!canvas) {
      console.log("canva is null");
      return ;
    }
    let context = canvas.getContext('2d');
    let game = {
        player: {
            y: setting_game.canvas_height / 2 - PLAYER_HEIGHT / 2
        },
        computer: {
            y: setting_game.canvas_height / 2 - PLAYER_HEIGHT / 2
        },
        ball: {
            x: setting_game.canvas_width / 2,
            y: setting_game.canvas_height / 2,
            r: 5,
            speed: {
                x: 2,
                y: 2,
            }
        }
    };
    canvas.addEventListener('mousemove', playerMove);
    function play() {
      game.ball.x += game.ball.speed.x;
      game.ball.y += game.ball.speed.y;
      draw();
      computerMove();
      ballMove();
      requestAnimationFrame(play);
    }
    
    
    function playerMove(event:any) {
      // Get the mouse location in the canvas
      if (!canvas)
        return ;
      var canvasLocation = canvas.getBoundingClientRect();
      var mouseLocation = event.clientY - canvasLocation.y;
      game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
      if (mouseLocation < PLAYER_HEIGHT / 2) {
        game.player.y = 0;
    } else if (mouseLocation > setting_game.canvas_height - PLAYER_HEIGHT / 2) {
        game.player.y = setting_game.canvas_height - PLAYER_HEIGHT;
    } else {
        game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
    }
  }
    function ballMove() {
        if (game.ball.y > setting_game.canvas_height || game.ball.y < 0) {
            game.ball.speed.y *= -1;
        }
        if (game.ball.x > setting_game.canvas_width - PLAYER_WIDTH) {
            collide(game.computer);
        } else if (game.ball.x < PLAYER_WIDTH) {
            collide(game.player);
        }
        game.ball.x += game.ball.speed.x;
        game.ball.y += game.ball.speed.y;
    }
    function collide(player:any) {
        // The player does not hit the ball
        if (game.ball.y < player.y || game.ball.y > player.y + PLAYER_HEIGHT) {
            // Set ball and players to the center
            game.ball.x = setting_game.canvas_width / 2;
            game.ball.y = setting_game.canvas_height / 2;
            game.player.y = setting_game.canvas_height / 2 - PLAYER_HEIGHT / 2;
            game.computer.y = setting_game.canvas_height / 2 - PLAYER_HEIGHT / 2;
            
            // Reset speed
            game.ball.speed.x = 2;
        } else {
            // Increase speed and change direction
            game.ball.speed.x *= -1.2;
            changeDirection(player.y);
        }
    }
    function computerMove() {
        game.computer.y += game.ball.speed.y * 1.5;
    }
    function changeDirection(playerPosition:any) {
        var impact = game.ball.y - playerPosition - PLAYER_HEIGHT / 2;
        var ratio = 100 / (PLAYER_HEIGHT / 2);
        // Get a value between 0 and 10
        game.ball.speed.y = Math.round(impact * ratio / 10);
    }

    function draw() {
      if (!context) {
        console.log('context is null');
        return ;
      }
      context.fillStyle = 'black';
      context.fillRect(0, 0, setting_game.canvas_width, setting_game.canvas_height);

      context.strokeStyle = 'white';
      context.beginPath();
      context.moveTo(setting_game.canvas_width / 2, 0);
      context.lineTo(setting_game.canvas_width / 2, setting_game.canvas_height);
      context.stroke();

      context.fillStyle = 'white';
      context.fillRect(0, game.player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
      context.fillRect(setting_game.canvas_width - PLAYER_WIDTH, game.computer.y, PLAYER_WIDTH, PLAYER_HEIGHT);

      context.beginPath();
      context.fillStyle = 'white';
      context.arc(game.ball.x, game.ball.y, game.ball.r, 0, Math.PI * 2, false);
      context.fill();
    };
    game.ball.x += 2;
    game.ball.y += 2;
    draw();
    play();
  }, []);
  

  return (
    <>
      <h1>Pong</h1>
      <main>
        <canvas id="canvas" width="640" height="480"></canvas>
      </main>
    </>
  );
}