import { ListItem } from './list-item';

export interface IModalData {
    item?: ListItem
}

export interface IDataAfterClose {
    isUpgrade: boolean;
}
