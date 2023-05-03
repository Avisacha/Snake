import React, { Component } from 'react';
import './Game.css';
import Snake from '../Snake/Snake';
import Food from '../Food/Food';

const segments = [[380, 360], [380, 380]];

const getRandCoord = () => {
	let x = Math.floor(Math.random() * 39) * 20;
	let y = Math.floor(Math.random() * 39) * 20;
	if (x === segments[0][0] && y === segments[0][1]) {
		getRandCoord();
	}
	return [x,y];
}

const initState = {
	direction: 'right',
	directionInput: 'right',
	pause: false,
	segments: segments,
	speed: 200,
	foodCoord: getRandCoord()
}

const step = 20;

let interval:ReturnType<typeof setInterval>;

export default class Game extends Component {
	state = initState;

	componentDidMount(): void {
		interval = setInterval(this.move, this.state.speed);			
		onkeydown = this.keyEvent;
	}

	componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
		this.checkBorderCollision();
		this.checkFoodEaten();
		this.checkSegmentsCollision();		
	}

	keyEvent = () => {
		window.addEventListener('keydown', (e) => {
			switch (e.code) {
				case 'ArrowUp':
					if (this.state.direction !== 'down') {
						this.setState(this.state.directionInput = 'up');
					}
					break;
				case 'ArrowDown':
					if (this.state.direction !== 'up') {
						this.setState(this.state.directionInput = 'down');
					}
					break;
				case 'ArrowLeft':
					if (this.state.direction !== 'right') {
						this.setState(this.state.directionInput = 'left');
					}
					break;
				case 'ArrowRight':
					if (this.state.direction !== 'left') {
						this.setState(this.state.directionInput = 'right');
					}
					break;
			}
		});
	}

	move = () => {
		let coords = [...this.state.segments];
		let head = coords[coords.length - 1];

		switch (this.state.directionInput) {
			case 'up':
				this.state.direction = 'up';
				this.setState(
					head = [head[0] - step, head[1]]
				)
				break;
			case 'down':
				this.state.direction = 'down';
				this.setState(
					head = [head[0] + step, head[1]]
				)
				break;
			case 'left':
				this.state.direction = 'left';
				this.setState(
					head = [head[0], head[1] - step]
				)
				break;
			case 'right':
				this.state.direction = 'right';
				this.setState(
					head = [head[0], head[1] + step]
				)
				break;
		}
		coords.push(head);
		coords.shift();
		this.setState(this.state.segments = coords);
	}

	checkBorderCollision() {
		const max = this.state.segments.length - 1;
		if(this.state.segments[max][0] >= 780 || this.state.segments[max][0] < 0 || this.state.segments[max][1] >= 780 || this.state.segments[max][1] < 0) {
			this.gameOver();
		}
	}

	checkSegmentsCollision() {
		let segments = [...this.state.segments];
		let head = segments[segments.length - 1];
		segments.pop();

		segments.forEach(seg => {
			if(head[0] === seg[0] && head[1] === seg[1]) {
				this.gameOver();
			}
		});
	}
	
	checkFoodEaten() {
		const max = this.state.segments.length - 1;
		if (this.state.foodCoord[0] === this.state.segments[max][0] && this.state.foodCoord[1] === this.state.segments[max][1]) {		
			this.setState({foodCoord: getRandCoord()});
			this.enlargeSnake();
			this.speedUp();
		}
	}

	speedUp() {
		if (this.state.speed >= 30) {
			this.setState({speed:this.state.speed - (this.state.speed / 10)});
			clearInterval(interval);
			interval = setInterval(this.move, this.state.speed);
			console.log(this.state.speed);
		}
	}

	enlargeSnake() {
		let newSegment = [...this.state.segments];
		newSegment.unshift([]);
		this.setState(this.state.segments = newSegment);
	}

	gameOver() {
		clearInterval(interval);
		interval = setInterval(this.move, this.state.speed);
		setTimeout(() => 
			alert('PERDU'),
			100
		)
		this.setState(initState);
	}

	render() {
		return (
			<div className='Game'>
				<Food foodCoord={this.state.foodCoord} />
				<Snake segments={this.state.segments} />
			</div>
		)
	}
}
