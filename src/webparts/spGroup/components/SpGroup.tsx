import * as React from 'react';
import { css, Button, } from 'office-ui-fabric-react';
import styles from './SpGroup.module.scss';
import { DropdownMenu } from './Dropdown';
import { ISpGroupProps } from './ISpGroupProps';
import injectTapEventPlugin  = require('react-tap-event-plugin');
injectTapEventPlugin();
import { escape } from '@microsoft/sp-lodash-subset';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { HttpClient, SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ODataVersion, ISPHttpClientConfiguration, ISPHttpClientOptions, ISPHttpClientBatchOptions, SPHttpClientBatch, ISPHttpClientBatchCreationOptions } from '@microsoft/sp-http';
import { IODataUser, IODataWeb } from '@microsoft/sp-odata-types';

export interface INewGroup {
  groupName: string;
}

export default class SpGroup extends React.Component<ISpGroupProps, INewGroup> {

  constructor(props) {
    super(props);

    this.state = { 
      groupName: '',
    };
  }

  protected handleGroupNameChange = (event) : void => this.setState({ groupName : event.target.value } as INewGroup);

  public render(): React.ReactElement<ISpGroupProps> {
    
    return (
      <div className={styles.spGroup}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Testing SharePoint here</span>
              <p className="ms-font-l ms-fontColor-white">Hello, {escape(this.props.userId)}!</p>
              <p className="ms-font-l ms-fontColor-white">You are logged in as {escape(this.props.userLoginName)}.</p>
              <p className="ms-font-l ms-fontColor-white">Please create a new group.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.siteUrl)}</p>
              <input id="groupName" type="string" placeholder="Group name" value={this.state.groupName} onChange={this.handleGroupNameChange}/>
              <p className="ms-font-l ms-fontColor-white">Do you want to create a group named {escape(this.state.groupName)}?</p>
              <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
                <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
                  <a href="#" className={`${styles.button}`} onClick={() => this.createItem()}>
                    <span className={styles.label}>Create groups</span>
                  </a>
                </div>
                <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
                <a href="#" className={`${styles.button}`} onClick={() => this.readList()}>
                  <span className={styles.label}>See lists</span>
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // REST API GET CLIENTS LIST
  private readList(): void {

    const spHttpClient: SPHttpClient = this.props.spHttpClient;
    const currentWebUrl: string = this.props.siteUrl;
    
    this.props.spHttpClient.get(currentWebUrl + `/_api/web/lists/GetByTitle('Clients')/`,
    SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        // Access properties of the response object. 
        console.log(`Status code: ${response.status}`);
        console.log(`Status text: ${response.statusText}`);
        //response.json() returns a promise so you get access to the json in the resolve callback.
        response.json().then((responseJSON: JSON) => {
          console.log(response);
        });
      });
  }

  // CREATES A GROUP
  private createItem(): void {

    // GET AZURE FUNCTION
    this.props.httpClient.get(this.props.createGroupEndpointUrl + '&groupName=' + this.state.groupName,
    SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse) => {
      response.json().then((web: IODataWeb) => {
        console.log(web);
      }).catch(error => console.log(error));
    });
  }
}
