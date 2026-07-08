import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import SELECTED_STUDENT_CHANNEL from '@salesforce/messageChannel/SelectedStudentChannel__c';


// TODO #1: import the getRecord, getFieldValue, and getFieldDisplayValue functions from lightning/uiRecordApi.

// TODO #2: We've imported the name field and placed it into an array for you.
//          To prepare for Lab 1, import the Description, Email, and Phone fields and add them to the array.

import FIELD_NAME from '@salesforce/schema/Contact.Name';
import FIELD_DESCRIPTION from '@salesforce/schema/Contact.Description';
import FIELD_EMAIL from '@salesforce/schema/Contact.Email';
import FIELD_PHONE from '@salesforce/schema/Contact.Phone';
const fields = [FIELD_NAME, FIELD_DESCRIPTION, FIELD_EMAIL,
FIELD_PHONE];


export default class StudentDetail extends LightningElement {
	subscription;

	// TODO #3: locate a valid Contact ID in your scratch org and store it in the studentId property.
	// Example: studentId = '0039I00000U8nKVQAZ';
	studentId;
	@wire(MessageContext) messageContext;
	//TODO #4: use wire service to call getRecord, passing in our studentId and array of fields.
	//		   Store the result in a property named wiredStudent.
	@wire(getRecord, {  recordId: '$studentId', fields })
	wiredStudent;
		
	get name() {
		return this._getDisplayValue(this.wiredStudent.data, FIELD_NAME);
	}
    get phone() {
        return this._getDisplayValue(this.wiredStudent.data, FIELD_PHONE);
    }
    get email() {
        return this._getDisplayValue(this.wiredStudent.data, FIELD_EMAIL);
    }
    get description() {
        return this._getDisplayValue(this.wiredStudent.data, FIELD_DESCRIPTION);
    }


	//TODO #5: We provided a getter for the name field. 
	// 		   To prepare for Lab 1, create getters for the description, phone, and email fields.
	
	//TODO #6: Review the cardTitle getter, and the _getDisplayValue function below.
	
	get cardTitle() {
		let title = "Please select a student";
		if (this.wiredStudent.data) {
			title = this.name;
		} else if (this.wiredStudent.error) {
			title = "Something went wrong..."
		}
		return title;
	}
	
	_getDisplayValue(data, field) {
		return getFieldDisplayValue(data, field) ? getFieldDisplayValue(data, field) : getFieldValue(data, field);
	}
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
	handleStudentChange(message) {
		this.studentId = message.studentId;
	}
	disconnectedCallback() {
		unsubscribe(this.subscription);
		this.subscription = null;
	}
	
}