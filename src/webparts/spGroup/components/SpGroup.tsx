import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { css, Button, } from 'office-ui-fabric-react';
import styles from './SpGroup.module.scss';
import { ISpGroupProps } from './ISpGroupProps';
import { ISpGroupState } from './ISpGroupState';
import { IListItem } from './IListItem';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IODataWeb } from '@microsoft/sp-odata-types';

export default class SpGroup extends React.Component<ISpGroupProps, ISpGroupState> {
  private listItemEntityTypeName: string = undefined;

  constructor(props: ISpGroupProps, state: ISpGroupState) {
    super(props);
    this.state = {
      status: '',
      listItems: [],
      client: 'client',
      groupName: ''
    };
  }

  public componentWillReceiveProps(nextProps: ISpGroupProps): void {
    this.listItemEntityTypeName = undefined;
    this.setState({
      status: '',
      listItems: [],
      client: 'client',
      groupName: ''
    });
  }

  protected handleGroupNameChange = (event) : void => this.setState({ groupName : event.target.value } as ISpGroupState);
  protected handleClientChange = (event) : void => this.setState({ client : event.target.value } as ISpGroupState);
  protected handleClientSubmit = (event) : void => alert('You chose client ' + this.state.client);


  public render(): React.ReactElement<ISpGroupProps> {

    const items: JSX.Element[] = this.state.listItems.map((item: IListItem, i: number): JSX.Element => {
      return (
        <option value ={item.Title}>{item.Title}</option>
      );
    });

    const disabled: string = this.listNotConfigured(this.props) ? styles.disabled : '';

    return (
      <div className={styles.spGroup}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeSecondary ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">Testing SharePoint here</span>
              <p className="ms-font-l ms-fontColor-white">Hello, {escape(this.props.userId)}!</p>
              <p className="ms-font-l ms-fontColor-white">You are logged in as {escape(this.props.userLoginName)}.</p>
              <p className="ms-font-l ms-fontColor-white">You are at site {escape(this.props.siteUrl)}.</p>
              <p className="ms-font-l ms-fontColor-white">Here you can create a new group to this site.</p>
              <div className={`ms-Grid-row ms-bgColor-themeSecondary ms-fontColor-white ${styles.row}`}>
                <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
                  <a href="#" className={`${styles.button}`} onClick={() => this.readItems()}>
                    <span className={styles.label}>Start creating a new group</span>
                  </a>
                </div>
                <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
                    <select onLoad={() => this.readItems()} value={this.state.client} onChange={this.handleClientChange}>
                      {items}
                    </select>
                    <label>{this.state.status}</label>
                    <input id="groupName" type="string" placeholder="Group name" value={this.state.groupName} onChange={this.handleGroupNameChange}/>
                </div>
              </div>
              <div className={`ms-Grid-row ms-bgColor-themeSecondary ms-fontColor-white ${styles.row}`}>
                  
              </div>
              <div className={`ms-Grid-row ms-bgColor-themeSecondary ms-fontColor-white ${styles.row}`}>
                <p className="ms-font-l ms-fontColor-white">
                Do you want to create a group named {escape(this.state.client)}-{escape(this.state.groupName)}?</p>
              </div>
              <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
                <a href="#" className={`${styles.button}`} onClick={() => this.createItem()}>
                  <span className={styles.label}><b>Create</b></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}

  // READS ALL ITEMS FROM LIST AND DISPLAYS TO DROPDOWN
  private readItems(): void {
    this.setState({
      status: '',
      listItems: [],
      client: '',
      groupName: ''
    });
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
          status: ``,
          listItems: response.value,
          client: '',
          groupName: ''
        });
      }, (error: any): void => {
        this.setState({
          status: 'Loading all items failed with error: ' + error,
          listItems: [],
          client: '',
          groupName: ''
        });
      });
  }

  private listNotConfigured(props: ISpGroupProps): boolean {
    return props.listName === undefined ||
      props.listName === null ||
      props.listName.length === 0;
  }

  // CREATES A GROUP
  private createItem(): void {

    // TRIGGERS AZURE FUNCTION
    this.props.httpClient.get(this.props.createGroupEndpointUrl + '&groupName=' + this.state.client + '-' + this.state.groupName + '&mail=' + this.state.client + '-' + this.state.groupName + '@' + this.props.createGroupEndpointUrl,
    SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json()
        .then((web: IODataWeb) => { 
          console.log(web); 
          alert("You have created a new group named "+ this.state.client + "-" + this.state.groupName);
        })
      })
      .catch(error => console.log(error));
  }
}