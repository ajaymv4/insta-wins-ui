import { Component, ElementRef, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DashBoardService} from '../../../core/dash-board-service.service';
import * as appConfigJson from '../../../config/app-config.json';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-table-data',
  templateUrl: 'table-data.component.html',
  styleUrls: ['table-data.component.scss']
})
export class TableDataComponent implements AfterViewInit {
 
  dataSource: any;

   //data defined in config/app-config.json
   appConfig: any;

   pageSizes = [2,5,8];

   player:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('dashboard') table: ElementRef;


  constructor(public dashBoardService: DashBoardService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams
              .subscribe(params=>{
                  this.player=params['playerId'];
              });

    var res = this.getPlayerDrawDetails(this.player);
    //this.dataSource = new MatTableDataSource<GameData>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
     //set data defined in config/app-config.json default.pagination.defaultItemsPerPage
     this.appConfig = appConfigJson.default;
  }

  displayedColumns: string[] = ['gameType', 'gameId','token', 'date','position','amount'];
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getColor(balance: number): string{
    return balance > 0 ? "green" : "red";
  }


  getPlayerDrawDetails(playerId:string) {
    this.dashBoardService.getPlayerGameData(playerId).subscribe(
      (data: any) => {
        
        //this.data = data;
        this.dataSource = new MatTableDataSource<any>(data);
       // MatTableUtil.setSortingAndPagination(this.dataSource, this.sort, this.paginator);
        //this.selectedRows = [];
      },
      (err: any) => {  }
    );
    }

    exportAsExcel(){
      const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
      /* save to file */
      XLSX.writeFile(wb, 'DrawDetails.xlsx');
    
    }


    filterDataSource(value:string): void{

      switch(value) { 
        case 'Day': {
          var dateValue = new Date();
          let datePipe: DatePipe = new DatePipe('en-US');
          console.log(datePipe.transform(dateValue, 'dd/MM/yyyy')); 
          var dateStr=datePipe.transform(dateValue, 'dd/MM/yyyy');
          this.dataSource.data = this.dataSource.data.filter((e: { date: string; })=> {
            console.log("Are dates equal"+e.date == dateStr)
            return e.date == dateStr});
         // this.dataSource.filter = dateValue;
           break; 
        } 
        case 'Month': { 
          console.log("Month is pressed");
          var dateValue = new Date();
          let datePipe: DatePipe = new DatePipe('en-US');
          console.log(datePipe.transform(dateValue, 'shortDate')); 
          this.dataSource.data = this.dataSource.data.filter((e: { date: { getMonth: () => number; }; })=> e.date.getMonth() == dateValue.getMonth());
          this.dataSource.filter = dateValue;
           break; 
        }
        
        case 'Year': { 
          console.log("Year is pressed");
          break; 
       }
        
       default: { 
           //statements; 
           break; 
        } 
     } 
    }
    

}



export interface GameData {
  gameType: string;
  gameId: string;
  token: string;
  date: Date,
  position: string;
  amount: string;
}





function exportAsExcel() {
  throw new Error('Function not implemented.');
}

