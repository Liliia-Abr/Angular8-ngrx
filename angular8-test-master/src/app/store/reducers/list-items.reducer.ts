import {ListItem} from '../../models/list-item';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromListItems from '../actions/list-items.actions';
import {getEntitiesFromArray} from '../helpers/getEntityFromArray';

export interface ListItemsState {
    entities: { [id: string]: ListItem };
    loaded?: boolean;
    loading: boolean;
}

export const listItemsState: ListItemsState = {
    entities: {},
    loaded: false,
    loading: false
};

const reducer = createReducer(listItemsState,
    on(fromListItems.getListItems, state => (
            {
                ...state,
                loaded: true,
                loading: true
            }
        )
    ),
    on(fromListItems.getListItemsSuccess, (state, payload) => {
            const {listItems} = payload;
            const entities = getEntitiesFromArray<ListItem>(listItems, {...state.entities});
            return {
                ...state,
                entities,
                loaded: true,
                loading: false
            };
        }
    ),
    on(fromListItems.getListItemsFail, (state, payload) => {
            return {
                ...state,
                loaded: false,
                loading: false
            };
        }
    ),
    on(fromListItems.createListItemsSuccess, fromListItems.updateListItemsSuccess, (state, payload) => {
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [payload.listItem.id]: payload.listItem
                }
            };
        }
    ),
    on(fromListItems.deleteListItemsSuccess, (state, payload) => {
            const {listItem} = payload;
            const {[listItem.id]: removed, ...entities} = state.entities;
            return {
                ...state,
                entities
            };
        }
    ),
);

export const listItemsReducer = (state: ListItemsState | undefined, action: Action) => {
    return reducer(state, action);
};

export const getListItemsEntities = (state: ListItemsState) => {
    return Object.entries(state.entities).map(([_, value]) => {
        return value;
    });
};
export const getListItemsLoading = (state: ListItemsState) => state.loading;
export const getListItemsLoaded = (state: ListItemsState) => state.loaded;

