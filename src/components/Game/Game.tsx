import React, { Component } from 'react';
import './Game.css';
import Snake from '../Snake/Snake';
import Food from '../Food/Food';
import Modal from '../Modal/Modal';

const width = 600;
const height = 600;
const step = 20;

const segments = [[(width/2)-step, (height/2)-(step*2)], [(width/2)-step, (height/2)-step]];

const getRandCoord = () => {
	let _width = width - step;
	let _height = height - step;

	let x = Math.floor(Math.random() * (_width/step)) * step;
	let y = Math.floor(Math.random() * (_height/step)) * step;
	
	if (x === segments[0][0] && y === segments[0][1]) {
		getRandCoord();
	}
	return [x, y];
}

const initState = {
	direction: 'right',
	directionInput: 'right',
	pause: false,
	segments: segments,
	speed: 200,
	foodCoord: getRandCoord(),
	step: 20,
	width: width,
	height: height
}

const initModal = {
	popup: false,
	msg: ""
}

let interval: ReturnType<typeof setInterval>;

export default class Game extends Component {
	state = initState;
	modal = initModal;

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
						this.setState({directionInput: 'up'})
					}
					break;
				case 'ArrowDown':
					if (this.state.direction !== 'up') {
						this.setState({directionInput: 'down'})
					}
					break;
				case 'ArrowLeft':
					if (this.state.direction !== 'right') {
						this.setState({directionInput: 'left'})
					}
					break;
				case 'ArrowRight':
					if (this.state.direction !== 'left') {
						this.setState({directionInput: 'right'})
					}
					break;
			}
		});
	}

	move = () => {
		let coords = [...this.state.segments];
		let firstSeg = coords[coords.length - 1];

		switch (this.state.directionInput) {
			case 'up':
				this.setState({direction: 'up'});
				this.setState(
					firstSeg = [firstSeg[0] - step, firstSeg[1]]
				)
				break;
			case 'down':
				this.setState({direction: 'down'});
				this.setState(
					firstSeg = [firstSeg[0] + step, firstSeg[1]]
				)
				break;
			case 'left':
				this.setState({direction: 'left'});
				this.setState(
					firstSeg = [firstSeg[0], firstSeg[1] - step]
				)
				break;
			case 'right':
				this.setState({direction: 'right'});
				this.setState(
					firstSeg = [firstSeg[0], firstSeg[1] + step]
				)
				break;
		}
		coords.push(firstSeg);
		coords.shift();

		this.setState({segments: coords})
	}

	checkBorderCollision() {
		const max = this.state.segments.length - 1;
		if (this.state.segments[max][0] > height-step || this.state.segments[max][0] < 0 || this.state.segments[max][1] > width-step || this.state.segments[max][1] < 0) {
			this.gameOver();
		}
	}

	checkSegmentsCollision() {
		let segments = [...this.state.segments];
		let firstSeg = segments[segments.length - 1];
		segments.pop();

		segments.forEach(seg => {
			if (firstSeg[0] === seg[0] && firstSeg[1] === seg[1]) {
				this.gameOver();
			}
		});
	}

	checkFoodEaten() {
		const max = this.state.segments.length - 1;
		if (this.state.foodCoord[0] === this.state.segments[max][0] && this.state.foodCoord[1] === this.state.segments[max][1]) {
			this.setState({ foodCoord: getRandCoord() });
			this.enlargeSnake();
			this.speedUp();
		}
	}

	speedUp() {
		if (this.state.speed >= 30) {
			this.setState({ speed: this.state.speed - (this.state.speed / 10) });
			clearInterval(interval);
			interval = setInterval(this.move, this.state.speed);
		}
	}

	enlargeSnake() {
		let newSegment = [...this.state.segments];
		newSegment.unshift([]);
		this.setState({segments: newSegment});
	}

	gameOver() {
		this.modal.msg = (this.state.segments.length - 2).toString();
		this.modal.popup = true;
		this.setState(initState);
		clearInterval(interval);
	}

	getModalClose = (data: boolean) => {
		interval = setInterval(this.move, this.state.speed);
	}

	render() {
		return (
			<div style={{height: `${this.state.height}px`, width: `${this.state.width}px`}} className='Game'>
				<Food foodCoord={this.state.foodCoord} />
				<Snake segments={this.state.segments} />
				<Modal modal={this.modal} getModalClose={this.getModalClose}/>
			</div>
		)
	}
}
