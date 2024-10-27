import { IAdminCityItem } from "./i-admin-city-item";

export abstract class AbstractAdminCityItems implements IAdminCityItem {

    protected toogleForm(show: boolean) {
        let form = document.getElementById('item-form');
        form?.parentElement?.scrollIntoView()
        show ?
            form?.classList.add('show') :
            form?.classList.remove('show');
    }

    setFilterOptionSelected($event: number): void {
        this.selectedOption = $event;
    }

    applyFilter($event: void): void {
        this.chargePage(1);
    }

    onClickEditItem(item: any): void {
        this.onClickAddNewItem(item);
    }

    chargePreviousPage(): void {
        this.chargePage(this.page - 1);
    }
    chargeNextPage(): void {
        this.chargePage(this.page + 1)
    }

    pages(): number {
        return this.count === 0 ? 0 : this.getMaxPages();
    }
    protected getMaxPages(): number {
        return Math.floor(this.count / this.limit) + (this.count % this.limit > 0 ? 1 : 0)
    }

    getPage(): number {
        return this.page;
    }
    getLimit(): number {
        return this.limit;
    }
    getCount(): number {
        return this.count;
    }
    abstract onClickAddNewItem(item: any): void;
    abstract onSubmitItemData(): void;
    abstract chargePage(page: number): void;
    abstract provideItemRow(): any;
    provideRowInputs(item: any): any{
        return {
            "item": item,
            "onClickEditItem": () => this.onClickEditItem(item)
          }
    }
    abstract provideFormType(): any;
    provideFormInputs(): any{
        return {
            "item": this.item,
            "submitAction": () => this.onSubmitItemData()
          }
    }

    protected page: number = 0;
    protected count: number = 0;
    protected limit: number = 10;
    protected item: any;

    protected selectedOption: number = 0;

}