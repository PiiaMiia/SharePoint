import * as React from 'react';
import styles from '../SpGroup.module.scss';
import SpGroup from '../SpGroup';
import { ISpGroupProps } from '../ISpGroupProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IListItem } from '../Main/Main';
import { ISpGroupState } from '../ISpGroupState';
import Main from '../Main/Main';

export default class StepTwo extends React.Component<any, any> {
    private listItemEntityTypeName: string = undefined;

    constructor(props) {
        super(props);
        this.state = {
            groupName: ''
        }
    }

    protected handleGroupNameChange = (event) : void => this.props.setGroupName (event.target.value);

    public render(): JSX.Element {


        return (
            <div>
                <div className={styles.helloWorld}>
                    <div className={styles.container}>
                        <div className={`ms-Grid-row ms-bgColor-themeSecondary ms-fontColor-white ${styles.row}`}>
                            <span className="ms-font-xl ms-fontColor-white">Name your group</span>
                            <input id="groupNamee" type="text" placeholder="Group name" onChange={this.handleGroupNameChange}/>
                        </div>
                    </div>
                </div>
            </div>
        );
  }
}