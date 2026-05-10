import { LightningElement, wire } from 'lwc';

import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';
import { NavigationMixin } from 'lightning/navigation';

import FIELD_NAME from '@salesforce/schema/Contact.Name';
import FIELD_DESCRIPTION from '@salesforce/schema/Contact.Description';
import FIELD_EMAIL from '@salesforce/schema/Contact.Email';
import FIELD_PHONE from '@salesforce/schema/Contact.Phone';
const fields = [FIELD_NAME, FIELD_DESCRIPTION, FIELD_EMAIL, FIELD_PHONE];

export default class StudentDetail extends NavigationMixin(LightningElement) {

	studentId;
	subscription;

	@wire(MessageContext) messageContext;

	@wire(getRecord, { recordId: '$studentId', fields })
	wiredStudent;
	
	connectedCallback() {
		if(this.subscription){
			return;
		}
		this.subscription = subscribe(
			this.messageContext, 
			SELECTED_STUDENT_CHANNEL,
			(message) => {
				this.handleStudentChange(message)
			}
		);
	}

	disconnectedCallback() {
		unsubscribe(this.subscription);
		this.subscription = null;
	}

	get name() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_NAME);
	}
	get description() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_DESCRIPTION);
	}
	get phone() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_PHONE);
	}
	get email() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_EMAIL);
	}
	
	get cardTitle() {
		let title = "Please select a student";
		if (this.wiredStudent.data) {
			title = this.name;
		} else if (this.wiredStudent.error) {
			title = "Something went wrong..."
		}
		return title;
	}

	handleStudentChange(message) {
		this.studentId = message.studentId;
	}

	handleGoToRecord(evt) {
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: this.studentId,
				actionName: 'view'
			},
		});
	}
	
	_getDisplayValue(data, field) {
		return getFieldDisplayValue(data, field) ? getFieldDisplayValue(data, field) : getFieldValue(data, field);
	}
	
}