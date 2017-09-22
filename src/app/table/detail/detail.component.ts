import { Component, Input, OnInit, EventEmitter, SimpleChange, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})

export class DetailComponent {
	private msgs: Array<any>;
	private user: any;
	@Input() newData: boolean;
	@Input("detail")  public dataDetail;
	@Input() public displayDialog;
	@Input() public detailColumns;
	@Output() visibility = new EventEmitter<boolean>();
	constructor(private fb: FormBuilder) { 

		//this.user = this.fb.group({
		//	'name': ['name', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
		//	'email': ['aa@mail.com', Validators.email],
		//	'city': ['city', Validators.required],
		//	'age': [12, Validators.required]
		//})
		

	}

	ngOnInit() {
		this.user = this.formGroup()
	}

	save() {
		this.msgs = [];
    	if(this.newData) {
        this.msgs.push({severity:'success', summary:'Add successfully', detail:`I am Add`});
    }
    	else {
        this.msgs.push({severity:'success', summary:'modify successfully', detail:`I am modify`});
    }
        this.displayDialog = false;
		this.visibility.emit(this.displayDialog);
	}

	cancel() {
		this.displayDialog = false;
		this.visibility.emit(this.displayDialog);
	}

	formGroup() {
		let group = {};
		this.detailColumns.forEach(data => {
			group[data.label] = data.required ? new FormControl(data.value || '', this.requiredArray(data.required))
											  : new FormControl(data.value || '')

		})
		console.log(group)
		return new FormGroup(group);
	}

	requiredArray(datas) {
		let arr = [];
		datas.forEach(data => {
			arr.push(data)
		})
		return arr;
	}

}