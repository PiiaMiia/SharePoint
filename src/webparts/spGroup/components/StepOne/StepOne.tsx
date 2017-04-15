import * as React from 'react';
import styles from '../SpGroup.module.scss';
import SpGroup from '../SpGroup';
import { ISpGroupProps } from '../ISpGroupProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IListItem } from '../Main/Main';
import { ISpGroupState } from '../ISpGroupState';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import Main from '../Main/Main';
import StepTwo from '../StepTwo/StepTwo';

export default class StepOne extends React.Component<any, any> {
    private listItemEntityTypeName: string = undefined;

    constructor(props) {
        super(props);
        this.state =  {
            listItems: []
        }
        this.readItems();
    }

    public componentWillReceiveProps(nextProps: ISpGroupProps): void {
        this.listItemEntityTypeName = undefined;
        
    }

    protected handleClientChange = (event) : void => this.props.setClientName(event.target.value);

    private readItems(): void {
        this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('Clients')/items?$select=Title`,
        SPHttpClient.configurations.v1,
        {
            headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
            }
        })
        .then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
            return response.json();
        })
        .then((response: { value: IListItem[] }): void => {
            this.setState({
                listItems: response.value
            });
        }, (error: any): void => {
            console.log(error);
        });
    }

    public render(): JSX.Element {
        
        const items: JSX.Element[] = this.state.listItems.map((item: IListItem, i: number): JSX.Element => {
            return (
                <option value={item.Title}>{item.Title}</option>
            );
        });
    
        return (
            <div>
                <div className={styles.helloWorld}>
                    <div className={styles.container}>
                        <div className={`ms-Grid-row ms-bgColor-themeSecondary ms-fontColor-white ${styles.row}`}>
                            <span className="ms-font-xl ms-fontColor-white">Choose a client from list</span>
                            <select onChange={this.handleClientChange}>
                                {items}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
  }
}
