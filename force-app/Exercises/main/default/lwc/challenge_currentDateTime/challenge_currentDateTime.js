import { LightningElement } from 'lwc';

export default class Challenge_currentDateTime extends LightningElement {
    ampm = true;
     currentDateTime = new Date();
	handleUpdateDateTime() {
		this.currentDateTime = new Date();
	}
    connectedCallback() {
		setInterval(() => {
			this.currentDateTime = new Date();
		}, 1000);
	}
}