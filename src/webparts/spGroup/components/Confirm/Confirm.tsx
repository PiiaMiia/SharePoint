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
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className={`ms-Grid-row ms-bgColor-themeSecondary ms-fontColor-white ${styles.row}`}>
                    <div className='ms-Grid-col ms-u-lg12 ms-u-xl12'>
                        <span className='ms-font-xl ms-fontColor-white'>You are about to create a group named</span>
                        <br></br>
                        <span className='ms-font-xl ms-fontColor-white'><b><i>{escape(this.props.client)} - {escape(this.props.groupName)}</i></b></span>
                        <br></br>
                        <br></br>
                        <span className='ms-font-xl ms-fontColor-white'>Press "Create" to confirm.</span>
                        <br></br>
                    </div>
                    <div className='ms-Grid-col ms-u-lg12 ms-u-xl12'>
                        <a href="#" className={`${styles.button}`} onClick={() => this.createItem()}>
                        <span className={styles.label}><b>Create</b></span>
                        </a>
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
            if (response.status === 200) {
                response.json()
                .then((web: IODataWeb) => { 
                console.log(web);
                console.log(response.status)
                alert("You have created a new group named " + state.client + "-" + state.groupName + ".");
                })
            }
            else {
                console.log()
                alert("You got error " + response.status + ". Please try again.")
            }
        })
        .catch(error => console.log(error));
    }
}