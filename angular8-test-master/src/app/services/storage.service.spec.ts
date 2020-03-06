import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { ListItem } from '../models/list-item';

describe('StorageService', () => {
  let service: StorageService;
  const mockData: ListItem = { id: "test", title: '', description: '', date: new Date() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.get(StorageService);

    let store = {
      'test-list': JSON.stringify([mockData, {...mockData, id: "test2"}])
    };
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = { 'test-list': JSON.stringify([]) };
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get items list from local storage', () => {
    const listItems = service.getList();
    expect(listItems.length).toBe(2);
  });

  it('should load list to the local storage', () => {
    const newList: [ListItem] = [mockData] ;
    const listItems = service.setList(newList);
    const updatedList = service.getList(); 
    expect(updatedList.length).toBe(1);
  });

  it('should create list item', () => {
    const newCurrDate = new Date();
    const newListItem = {id: "imId", title: "Im the title", date: newCurrDate, description: "description"};
    const previousItemList = service.getList();
    expect(previousItemList.length).toBe(2);
    service.createListItem(newListItem);
    const newItemList = service.getList();
    expect(newItemList.length).toBe(3);
    expect(JSON.stringify(newItemList[2])).toEqual(JSON.stringify(newListItem));
  });

  it('should delete list item', () => {
    const currListItem = service.getList();
    const itemToRemove = currListItem[0];
    const itemToLeave = currListItem[1];
    expect(currListItem.length).toBe(2);
    expect(JSON.stringify(itemToRemove)).toEqual(JSON.stringify(currListItem[0]));
    service.deleteListItem(currListItem[0]);
    expect(currListItem.length).toBe(1);
    expect(JSON.stringify(itemToLeave)).toEqual(JSON.stringify(currListItem[0]));
  });

  it('should update list item', () => {
    const currListItem = service.getList();
    const itemToUpdate = currListItem[0];
    const updatedItem = {...itemToUpdate, title: "Im changed!"};
    expect(currListItem.length).toBe(2);
    expect(JSON.stringify(itemToUpdate)).toEqual(JSON.stringify(currListItem[0]));
    service.updateListItem(updatedItem);
    expect(currListItem.length).toBe(2);
    expect(JSON.stringify(updatedItem)).toEqual(JSON.stringify(currListItem[0]));
  });

});
