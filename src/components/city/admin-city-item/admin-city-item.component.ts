import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IAdminCityItem } from './i-admin-city-item';
import { FilterItemsComponent } from '../../filter-items/filter-items.component';

import { NgComponentOutlet } from '@angular/common';
import { PlaceEntity } from '../../../classes/entities/Place';
import { OrderBy } from '../../../classes/OrderBy';

@Component({
  selector: 'app-admin-city-item',
  standalone: true,
  imports: [FilterItemsComponent, NgComponentOutlet, ],
  templateUrl: './admin-city-item.component.html',
  styleUrl: '../admin-item.css'
})
export class AdminCityItemComponent implements OnInit{

  @Input({required:true}) adminItem: IAdminCityItem = <IAdminCityItem>{};  // First One by Initialization

  @Input({required: true}) orderOptions: Array<OrderBy> = [];
  @Input({required: true}) items: Array<any> = [];

  
  ngOnInit(): void {
    console.log("Init from AdminItem... ")
    console.log(this.adminItem)
    this.setFilterOptionSelected = ($event: number) => this.adminItem.setFilterOptionSelected($event);
    this.onClickAddNewItem       = ($event: Event) => this.adminItem.onClickAddNewItem($event);
    this.applyFilter             = () => this.adminItem.applyFilter();
    this.onSubmitItemData        = () => this.adminItem.onSubmitItemData();
    this.onClickEditItem         = (item: any) => this.adminItem.onClickEditItem(item);
    this.chargePage              = (page: number) => this.adminItem.chargePage(page);
    this.chargeNextPage          = () => this.adminItem.chargeNextPage();
    this.chargePreviousPage      = () => this.adminItem.chargePreviousPage();
    this.pages                   = () => this.adminItem.pages();
    this.provideItemRow          = () => this.adminItem.provideItemRow();
    this.provideComponentInputs  = (item: any) => this.adminItem.provideRowInputs(item);
    this.provideFormType         = () => this.adminItem.provideFormType();
    this.provideFormInputs       = () => this.adminItem.provideFormInputs();
    this.count                   = () => this.adminItem.getCount();
    this.page                    = () => this.adminItem.getPage();
    this.limit                   = () => this.adminItem.getLimit();
  }

  setFilterOptionSelected :any; 
  onClickAddNewItem       :any; 
  applyFilter             :any; 
  onSubmitItemData        :any; 
  onClickEditItem         :any; 

  chargePage             : any; 
  chargeNextPage         : any; 
  chargePreviousPage     : any; 
  pages                  : any; 

  provideItemRow         : any; 
  provideComponentInputs : any; 
  provideFormType        : any;
  provideFormInputs      : any;
  count                  : any; 
  page                   : any; 
  limit                  : any; 

  
  

  counter = Array;
}
