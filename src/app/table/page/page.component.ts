import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})

export class PageComponent {
    @Input() private pagination;
    private pageList:any[];
    private oldCurrentPage:number = 0;
    private oldItemsPerPage:number = 0;
    
    public jumpPageNum:string;
    ngOnInit() {
      this.pagination.pagesLength = parseInt(this.pagination.pagesLength) ? parseInt(this.pagination.pagesLength) : 9;

      if (this.pagination.pagesLength % 2 === 0) {
            this.pagination.pagesLength = this.pagination.pagesLength - 1;
     }
      if (!this.pagination.perPageOptions) {
            this.pagination.perPageOptions = [5, 10, 15, 20];
     }
                    
  }
    changeCurrentPage(item) {

        if (item == '...') 
              return;
        else
              this.pagination.currentPage = item;
      }

    initPageList():void {
      // 当前页码
         this.pagination.currentPage = parseInt(this.pagination.currentPage) ? parseInt(this.pagination.currentPage) : 1;

      // 数据总数
         this.pagination.totalItems = parseInt(this.pagination.totalItems);

      // 总共要显示多少页
         this.pagination.numberOfPages = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
         //console.log(this.pagination.numberOfPages)

      // judge currentPage > scope.numberOfPages
         if (this.pagination.currentPage <= 1) {
                this.pagination.currentPage = 1;
         }

         if (this.pagination.currentPage > this.pagination.numberOfPages) {
                this.pagination.currentPage = this.pagination.numberOfPages;
         }

      // jumpPageNum
         this.jumpPageNum = this.pagination.currentPage;

                        

      // 对选项进行sort
         this.pagination.perPageOptions.sort(function (a, b) { return a - b });

         this.pageList = [];
         if (this.pagination.numberOfPages <= this.pagination.pagesLength) {
      
                for (var i = 1; i <= this.pagination.numberOfPages; i++) {
                              this.pageList.push(i);
                       }
          } else {
                var offset = (this.pagination.pagesLength - 1) / 2;
                if (this.pagination.currentPage <= offset) {
                                // 左边没有...
                        for (var i = 1; i <= offset + 1; i++) {
                              this.pageList.push(i);
                          }
                              this.pageList.push('...');
                              this.pageList.push(this.pagination.numberOfPages);
                } else if (this.pagination.currentPage > this.pagination.numberOfPages - offset) {
                              this.pageList.push(1);
                              this.pageList.push('...');
                              for (var i = offset + 1; i >= 1; i--) {
                                    this.pageList.push(this.pagination.numberOfPages - i);
                              }
                              this.pageList.push(this.pagination.numberOfPages);
                } else {
                                // 最后一种情况，两边都有...
                              this.pageList.push(1);
                              this.pageList.push('...');

                              for (var i = Math.ceil(offset / 2); i >= 1; i--) {
                                    this.pageList.push(this.pagination.currentPage - i);
                              }
                              this.pageList.push(this.pagination.currentPage);
                              for (var i = 1; i <= offset / 2; i++) {
                                    this.pageList.push(this.pagination.currentPage + i);
                              }

                              this.pageList.push('...');
                              this.pageList.push(this.pagination.numberOfPages);
                }
          }

                        if (this.pagination.onChange) {
                            this.pagination.onChange();
                        }

                        console.log(this.pagination.currentPage)
  }


  prevPage():void {
    if(this.pagination.currentPage != 1){
      this.changeCurrentPage(this.pagination.currentPage - 1);
    }
  }

  nextPage():void {
    if(this.pagination.currentPage < this.pagination.numberOfPages){
      this.changeCurrentPage(this.pagination.currentPage + 1);
    }
  }
  

  
  ngDoCheck():void {
    if(this.pagination.currentPage !== this.oldCurrentPage || this.pagination.itemsPerPage !== this.oldItemsPerPage){
      this.initPageList();
      this.oldCurrentPage = this.pagination.currentPage;
      this.oldItemsPerPage = this.pagination.itemsPerPage;
    }
  }

  jumpToPage():void {
      this.jumpPageNum = this.jumpPageNum.replace(/[^0-9]/g, '');
      if (this.jumpPageNum !== '') {
          this.pagination.currentPage = this.jumpPageNum;
    }
  }
}