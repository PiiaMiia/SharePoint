import * as React from 'react';
import { css, Button } from 'office-ui-fabric-react';
import styles from './SpGroup.module.scss';
import { ISpGroupProps } from './ISpGroupProps';
import { ISpGroupState } from './ISpGroupState';
import { IUserData } from './IUserData';
import { IGroupData } from './IGroupData';
import { escape } from '@microsoft/sp-lodash-subset';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientConfiguration, SPHttpClientResponse, ODataVersion, ISPHttpClientConfiguration, ISPHttpClientOptions, ISPHttpClientBatchOptions, SPHttpClientBatch, ISPHttpClientBatchCreationOptions } from '@microsoft/sp-http';
import { IODataUser, IODataWeb } from '@microsoft/sp-odata-types';

export default class SpGroup extends React.Component<ISpGroupProps, ISpGroupState> {

  
  public render(): React.ReactElement<ISpGroupProps> {

    const disabled: string = this.listNotConfigured(this.props) ? styles.disabled: '';
    
    return (
      <div className={styles.spGroup}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Testing SharePoint here</span>
              <p className="ms-font-l ms-fontColor-white">Lots of buttons & props. Also trying out CRUD methods here.</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.userLoginName)}</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.userId)}</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.group)}</p>
              <p className="ms-font-l ms-fontColor-white">{escape(this.props.siteUrl)}_api/web/sitegroups/?@target=https://uptimeinternship.sharepoint.com</p>
              <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
                <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
                  <a href="#" className={`${styles.button} ${disabled}`} onClick={() => this.createItem()}>
                    <span className={styles.label}>Create group</span>
                  </a>&nbsp;
                  <a href="#" className={`${styles.button}`} onClick={() => this.readItems()}>
                    <span className={styles.label}>See all groups</span>
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

    // Here, 'this' refers to my SPFx webpart which inherits from the BaseClientSideWebPart class.
    // Since I am calling this method from inside the class, I have access to 'this'.
  
    const spOpts: ISPHttpClientOptions = {
      
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
      });
  }

  // READS GROUPS

  private readItems(): void {
    this.setState({
      status: 'Loading all items...',
      items: []
    });

  }


  private listNotConfigured(props: ISpGroupProps): boolean {
    return props.group === undefined ||
      props.group === null ||
      props.group.length === 0;
  }

}
