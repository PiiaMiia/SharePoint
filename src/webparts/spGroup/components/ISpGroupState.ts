import { IListItem } from './Main/Main';

export interface ISpGroupState {
    listItems: IListItem[];
    client: string;
    step: number;
}