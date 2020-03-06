import {Action, createAction, props} from '@ngrx/store';
import {ListItem} from '../../models/list-item';

export enum ListItemsActionTypes {
    GetListItems = '[ListItems] Get ListItems',
    GetListItemsSuccess = '[ListItems] Get ListItems Success',
    GetListItemsFail = '[ListItems] Get ListItems Fail',

    CreateListItem = '[ListItems] Create ListItem',
    CreateListItemSuccess = '[ListItems] Create ListItem Success',
    CreateListItemFail = '[ListItems] Create ListItem Fail',

    UpdateListItem = '[ListItems] Update ListItem',
    UpdateListItemSuccess = '[ListItems] Update ListItem Success',
    UpdateListItemFail = '[ListItems] Update ListItem Fail',

    DeleteListItem = '[ListItems] Delete ListItem',
    DeleteListItemSuccess = '[ListItems] Delete ListItem Success',
    DeleteListItemFail = '[ListItems] Delete ListItem Fail'
}

export const getListItems = createAction(ListItemsActionTypes.GetListItems);
export const getListItemsFail = createAction(ListItemsActionTypes.GetListItemsFail, props<{err: any}>());
export const getListItemsSuccess = createAction(ListItemsActionTypes.GetListItemsSuccess, props<{listItems: ListItem[]}>());

export const createListItems = createAction(ListItemsActionTypes.CreateListItem, props<{listItem: ListItem}>());
export const createListItemsFail = createAction(ListItemsActionTypes.CreateListItemFail, props<{err: any}>());
export const createListItemsSuccess = createAction(ListItemsActionTypes.CreateListItemSuccess, props<{listItem: ListItem}>());

export const updateListItems = createAction(ListItemsActionTypes.UpdateListItem, props<{listItem: ListItem}>());
export const updateListItemsFail = createAction(ListItemsActionTypes.UpdateListItemFail, props<{err: any}>());
export const updateListItemsSuccess = createAction(ListItemsActionTypes.UpdateListItemSuccess, props<{listItem: ListItem}>());

export const deleteListItems = createAction(ListItemsActionTypes.DeleteListItem, props<{listItem: ListItem}>());
export const deleteListItemsFail = createAction(ListItemsActionTypes.DeleteListItemFail, props<{err: any}>());
export const deleteListItemsSuccess = createAction(ListItemsActionTypes.DeleteListItemSuccess, props<{listItem: ListItem}>());
