import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pagination: any;
  public columns: any;
  public values: any;
  public scrollHeight: string;
  public editable: boolean
  public multiSelect: boolean; 
  public export: boolean;
  public detailColumns: any;
  constructor(public http: Http) { }
  ngOnInit() {
    let that = this;
    this.scrollHeight = '355px';
    this.editable = true;
    this.multiSelect = true;
    this.export = true;
    this.pagination = {
            currentPage: 1,
            totalItems: 100,//总页数
            itemsPerPage: 10,//每页显示的条数
            pagesLength: 7,//分页的长度
            perPageOptions: [10,20,30,40,50],//选择每页显示的条数
            rememberPerPage: 'perPageItems',
            onChange: function () {
                that.getData(that.pagination);
            }
    }

    this.columns = [
        {
            field:'name',
            header:'Name',
            sortable:true,
            editable:false,
            style:{'text-align':'center'}
        },
        {
            field:'email',
            header:'Email',
            sortable:false,
            editable:true,
            style:{'text-align':'center','overflow':'hidden','text-overflow':'ellipsis'}
        },
        {
            field:'city',
            header:'City',
            sortable:true,
            editable:true,
            style:{'text-align':'center'}
        },
        {
            field:'age',
            header:'Age',
            sortable:false,
            editable:true,
            style:{'text-align':'right'}
        },
        {
            field:'age',
            header:'Age',
            sortable:false,
            editable:false,
            style:{'text-align':'right'}
        }


    ]

    this.detailColumns = [
        {
            label:'name',
            value:'name',
            type:'text',
            controlType:'textbox',
            required:[
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(8),
            ]
                
            
        },
        {
            label:'city',
            value:'value',
            type:'text',
            controlType:'dropdown',
            required:[
              Validators.required
            ],
            options:[
                'china','Bruderheim'
            ]
        },
        {
            label:'email',
            value:'email',
            type:'email',
            controlType:'textbox',
            required:[
              Validators.email,
              Validators.required
            ]
        },
        {
            label:'age',
            value:12,
            type:'number',
            controlType:'textbox',
            required:[
              Validators.required
            ]
        },
    ]
  }

  getData(parameters) {
      this.http.get('assets/datatable.json')
            .subscribe((data) => {
                    this.pagination.totalItems = data.json().length;
                    this.values = data.json().splice((parameters.currentPage-1)*parameters.itemsPerPage,parameters.itemsPerPage);
            });

  }

}



class PrimeData {
    
    constructor(public name?, public email?, public city?, public age?) {}
}