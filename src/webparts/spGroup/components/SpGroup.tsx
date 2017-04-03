import * as React from 'react';
import { css, Button } from 'office-ui-fabric-react';
import injectTapEventPlugin  = require('react-tap-event-plugin');
injectTapEventPlugin();
import styles from './SpGroup.module.scss';
import { ISpGroupProps } from './ISpGroupProps';
import { ISpGroupState } from './ISpGroupState';
import { IUserData } from './IUserData';
import { escape } from '@microsoft/sp-lodash-subset';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient, SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ODataVersion, ISPHttpClientConfiguration, ISPHttpClientOptions, ISPHttpClientBatchOptions, SPHttpClientBatch, ISPHttpClientBatchCreationOptions } from '@microsoft/sp-http';
import { IODataUser, IODataWeb } from '@microsoft/sp-odata-types';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class SpGroup extends React.Component<ISpGroupProps, ISpGroupState> {

  public render(): React.ReactElement<ISpGroupProps> {

    const disabled: string = this.listNotConfigured(this.props) ? styles.disabled: '';
    
    return (
      <div className={styles.spGroup}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Testing SharePoint here</span>
              <p className="ms-font-l ms-fontColor-white">Hello, {escape(this.props.userId)}!</p>
              <p className="ms-font-l ms-fontColor-white">You are logged in as {escape(this.props.userLoginName)}.</p>
              <p className="ms-font-l ms-fontColor-white">Please create a new group.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.createGroupEndpointUrl)}</p>
              <input id="groupName" type="string" placeholder="Group name" value={this.props.groupName}/>
              <p className="ms-font-l ms-fontColor-white">Do you want to create a group named {escape(this.props.groupName)}?</p>
              <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
                <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
                  <a href="#" className={`${styles.button}`} onClick={() => this.createItem()}>
                    <span className={styles.label}>Create groups</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

// CREATES A GROUP

  private createItem(): void {


// GET AZURE FUNCTION


//GET current web info
    this.props.httpClient.get(this.props.createGroupEndpointUrl + '&groupName=' + this.props.groupName, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {

      response.json().then((web: IODataWeb) => {

        console.log(web);
      }).catch(error => console.log(error));
    });

// REST API PUT
/*    const spOpts: ISPHttpClientOptions = {
      
      body: `{ 
        "@odata.type": "#Microsoft.Graph.Group",
        "description": "This group is the best ever",
        "displayName": "SpGroupTest",
        "groupTypes": [
          "Unified"
        ],
        "mailEnabled": true,
        "mailNickname": "SpGroupTest",
        "securityEnabled": true
       }`
    };

    this.props.spHttpClient.post(`${this.props.siteUrl}/_api/SP.AppContextSite(@target)/web/sitegroups?@target='uptimeinternship.sharepoint.com'`, SPHttpClient.configurations.v1, spOpts)
      .then((response: SPHttpClientResponse) => {
        // Access properties of the response object. 
        console.log(`Status code: ${response.status}`);
        console.log(`Status text: ${response.statusText}`);

        //response.json() returns a promise so you get access to the json in the resolve callback.
        response.json().then((responseJSON: JSON) => {
          console.log(responseJSON);
        });
      }); */
  }

  // READS GROUPS

  private readItems(): void {
    this.setState({
      status: 'Loading all items...',
      items: []
    });

  }


  private listNotConfigured(props: ISpGroupProps): boolean {
    return props.groupName === undefined ||
      props.groupName === null ||
      props.groupName.length === 0;
  }

}
