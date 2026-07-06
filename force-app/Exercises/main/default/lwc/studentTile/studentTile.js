import { LightningElement, api } from 'lwc';

export default class StudentTile extends LightningElement {
    @api isSelected = false;
    @api student = {
        Name: 'Mykola Hlynka',
        PhotoUrl: '/services/images/photo/003B0FakePictId'
    };
    get tileSelected() {
        return this.isSelected ? "tile selected" : "tile";
    };
    handleStudentClick(){
        alert(this.student.Name);
    }

}