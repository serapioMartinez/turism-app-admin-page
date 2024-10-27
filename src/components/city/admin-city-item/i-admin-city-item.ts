export interface IAdminCityItem {

    setFilterOptionSelected($event: number): void;
    onClickAddNewItem(item: any): void;
    applyFilter($event: void): void;
    onSubmitItemData(): void;
    onClickEditItem(item: any): void;
    chargePage(page: number): void;
    provideItemRow(): any;
    provideRowInputs(item: any): any;
    provideFormType(): any;
    provideFormInputs(): any;
    chargePreviousPage(): void;
    chargeNextPage(): void;
    pages(): number;
    getPage(): number;
    getLimit(): number;
    getCount(): number;
}