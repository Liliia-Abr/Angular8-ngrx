import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers/list-items.reducer';
import {ListItem} from '../../models/list-item';

export const getState = createFeatureSelector('itemsState');

export const getEntities = createSelector(
    getState,
    fromRoot.getListItemsEntities
);

export const getMaxEntityId = createSelector(
    getEntities,
    (entities: ListItem[]): number => {
        if (entities.length === 0) return 0;
        const entitiesIds: number[] = entities.map((entity) => Number(entity.id));
        return Math.max(...entitiesIds);
    }
);

export const getStatusLoaded = createSelector(
    getState,
    fromRoot.getListItemsLoaded
);

export const getStatusLoading = createSelector(
    getState,
    fromRoot.getListItemsLoading
);

export const getSelectedListItem = createSelector(
    getEntities,
    (entities, params): ListItem => entities[params.id]
);
