import { IListItem } from './IListItem';

export interface ISpGroupState {
  status: string;
  listItems: IListItem[];
  client: string;
  groupName: string;
}