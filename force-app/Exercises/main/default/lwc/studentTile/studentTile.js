import { LightningElement, api } from 'lwc';

export default class StudentTile extends LightningElement {
    @api selectedStudentId = '';
    @api student = {
        Name: 'Mykola Hlynka',
        PhotoUrl: '/services/images/photo/003B0FakePictId'
    };
    get tileSelected() {
        return (this.selectedStudentId === this.student.Id) ? "tile selected" : "tile";
    }

    handleStudentClick(){
        const evt = new CustomEvent('studentselected', {
            detail: { studentId: this.student.Id }
        });
        this.dispatchEvent(evt);
    }


}