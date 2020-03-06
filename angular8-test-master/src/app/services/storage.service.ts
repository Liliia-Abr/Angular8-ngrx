import {Injectable} from '@angular/core';
import {ListItem} from '../models/list-item';
import {Observable, of} from 'rxjs';
import {log} from 'util';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private listItems: ListItem[] = [];

    private getIndexById(id: string): number {
        return this.listItems.findIndex(item => item.id === id);
    }

    public getList(): ListItem[] {
        this.listItems = JSON.parse(localStorage.getItem('test-list')) as ListItem[] || [];
        return this.listItems;
    }

    public setList(list: ListItem[]): void {
        localStorage.setItem('test-list', JSON.stringify(list));
    }

    public createListItem(newListItem: ListItem): ListItem {
        this.listItems.push(newListItem);
        this.setList(this.listItems);
        return newListItem;
    }

    public updateListItem(newListItem: ListItem): ListItem {
        this.listItems[this.getIndexById(newListItem.id)] = newListItem;
        this.setList(this.listItems);
        return newListItem;
    }

    public deleteListItem(removedListItem: ListItem): ListItem {
        try {
            this.listItems.splice(this.getIndexById(removedListItem.id), 1);
            this.setList(this.listItems);
            return removedListItem;
        } catch (e) {
            console.log(e);
        }
    }

}
