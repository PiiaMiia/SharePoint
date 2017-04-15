import * as React from 'react';
import styles from '../SpGroup.module.scss';
import Main from '../Main/Main';
import StepTwo from '../StepTwo/StepTwo';
import SpGroup from '../SpGroup';
import { ISpGroupProps } from '../ISpGroupProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IODataWeb } from '@microsoft/sp-odata-types';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Confirm extends React.Component<any, any> {

    private endpointUrl = "https://uptimegroups.azurewebsites.net/api/powershell-group?code=NGpWHLu1872M6QCGmx5824vDukFZXdKqijwxKnkO1LjLK9Iaydg1OA==";

    constructor(props) {
        super(props)
        this.state = {
            client: '',
            groupName: ''
        }
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className={styles.helloWorld}>
                    <div className={styles.container}>
                        <div className={`ms-Grid-row ms-bgColor-themeSecondary ms-fontColor-white ${styles.row}`}>
                            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
                                <a href="#" className={`${styles.button}`} onClick={() => this.createItem()}>
                                <span className={styles.label}><b>Create</b></span>
                                {this.props.client}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    private createItem(): void {

let state: any = this.props.getState();

    // TRIGGERS AZURE FUNCTION
    this.props.httpClient.get(this.endpointUrl + '&groupName=' + state.client + '-' + state.groupName + '&mail=' + state.client + '-' + state.groupName + '@' + this.endpointUrl,
    SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json()
        .then((web: IODataWeb) => { 
          console.log(web); 
          alert("You have created a new group named " + state.client + "-" + state.groupName + ".");
        })
      })
      .catch(error => console.log(error));
  }
}