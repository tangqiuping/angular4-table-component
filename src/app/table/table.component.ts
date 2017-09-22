import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [ConfirmationService]
})
export class TableComponent implements OnInit {
	@Input() public columns: any;
	@Input() public values: any;
	@Input() public pagination: any;
  @Input() public scrollHeight: any;
  @Input() public editable: boolean;
  @Input() public multiSelect: boolean;
  @Input() public export: boolean;
  @Input() public detailColumns: any;
	public displayDialog: boolean;
	public newData: boolean;
	public msgs: Array<any>;
	public dataDetail: any;
  public columnOptions: any;
	//@Input() public ;

	constructor(public http: Http, public server: ConfirmationService) { }

	ngOnInit() {

		this.displayDialog = false;
		this.dataDetail = {};
    this.columnOptions = [];
    for(let i = 0; i < this.columns.length; i++) {
          this.columnOptions.push({label: this.columns[i].header, value: this.columns[i]})
    }
	}

	removeItem(data) {

		this.msgs = [];

  		this.server.confirm({
            	message: '你确定想删除这个数据吗?',
            	header: 'Delete Item',
            	icon: 'fa fa-trash',
            	accept: () => {
               		  //const index = this.dataJson.indexOf(data);
  				      //this.dataJson = this.dataJson.filter((val,i) => i!=index);
  				      this.msgs.push({severity:'success', summary:'Remove successfully', detail:`I am ${data.name}`});
            	},
            	reject: () => {
                	  this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            	}
        });
  	}

  	detailItem(data) {

  		this.displayDialog = true;
    	this.newData = false;
  	}

  	showDialogToAdd() {
    	this.newData = true;
  		this.displayDialog = true;
  }

  	onRowSelect(data) {
    	console.log(data)
  }

}