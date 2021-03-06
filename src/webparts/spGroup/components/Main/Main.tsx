import * as React from 'react';
import styles from '../SpGroup.module.scss';
import SpGroup from '../SpGroup';
import { ISpGroupProps } from '../ISpGroupProps';
import { ISpGroupState } from '../ISpGroupState';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import StepOne from '../StepOne/StepOne';
import StepTwo from '../StepTwo/StepTwo';
import Confirm from '../Confirm/Confirm';

export interface IListItem {
  Title?: string;
}

// MAIN COMPONENT THAT ACTS AS A ROUTER AND INHERITS PROPS TO CHILD COMPONENTS
export default class Main extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            client: '',
            groupName: ''
        };
    }

    public render(): JSX.Element {
        return (
            <div>
                <div className={styles.helloWorld}>  
                    <div className={styles.container}>
                        <div className={`ms-Grid-row ms-bgColor-themeSecondary ms-fontColor-white ${styles.row}`}>
                            <span className="ms-font-xl ms-fontColor-white"><b>Create a group for your client!</b></span>
                            {this.state.step == 1 &&
                            <p>Step 1 -></p>
                            }
                            {this.state.step == 2 &&
                            <p>Step 1 -> Step 2 -></p>
                            }
                            {this.state.step == 3 &&
                            <p>Step 1 -> Step 2 -> Confirm</p>
                            }
                            {this.state.step < 1 &&
                                <p className="ms-font-l ms-fontColor-white">
                                    Here you can create a SharePoint Unified group using a set naming convention.
                                    <br></br>
                                    This helps you keep your work organized! Please click 'NEXT' to begin.
                                </p>
                            }
                            {this.state.step > 0 && this.state.step < 3 &&
                                <p>Group name: {escape(this.state.client)} - {escape(this.state.groupName)}</p>
                            }
                            {this.state.step == 1 &&
                                <StepOne spHttpClient={this.props.spHttpClient}
                                         siteUrl={this.props.siteUrl}
                                         setClientName={this.setClientName.bind(this)}/>
                            }
                            {this.state.step == 2 &&
                                <StepTwo spHttpClient={this.props.spHttpClient}
                                         siteUrl={this.props.siteUrl}
                                         setGroupName={this.setGroupName.bind(this)} />
                            }
                            {this.state.step == 3 &&
                                <Confirm spHttpClient={this.props.spHttpClient}
                                         httpClient={this.props.httpClient}
                                         siteUrl={this.props.siteUrl}
                                         createGroupEndpointUrl={this.props.createGroupEndpointUrl}
                                         client={this.state.client}
                                         groupName={this.state.groupName}
                                         getState={this.getState.bind(this)}/>
                            }
                            <div className="ms-Grid-col ms-u-sm6 ms-u-md8 ms-u-lg8">
                                {this.state.step > 0 &&
                                    <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
                                        <a href="#" className={`${styles.button}`} onClick={() => this.previousStep()}>
                                            <span className={styles.label} >BACK</span>
                                        </a>
                                    </div>
                                }
                            </div>
                            <div className="ms-Grid-col ms-u-sm6 ms-u-md4 ms-u-lg4">
                                {this.state.step < 3 &&
                                    <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
                                        <a href="#" className={`${styles.button}`} onClick={() => this.nextStep()}>
                                            <span className={styles.label} >NEXT</span>
                                        </a>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // CHECKS IF FIELD IS FILLED
    private validateStepSuccess(): boolean {
        return (this.state.step == 1 && this.state.client.length === 0) || (this.state.step == 2 && this.state.groupName.length === 0);
    }

    // IF FIELD IS FILLED GOES TO NEXT STEP
    private nextStep(): void {
        if(!this.validateStepSuccess()) {
    //      if(this.state.step < 3) {
            this.setState({
                step: this.state.step + 1
            });
        }
    }

    // GOES TO PREVIOUS STEP
    private previousStep() : void {
        if (this.state.step > 0) {
            this.setState({
                step: this.state.step - 1
            });
        }
    }

    // GETS THE UPDATED STATE OF ANY PROP
    public getState(): any {
        return this.state;
    }

    // UPDATES THE CLIENT STATE
    public setClientName(name: string) : void {
        this.setState({
            step: this.state.step,
            client: name
        });
    }

    // UPDATES THE GROUPNAME STATE
    public setGroupName(name: string) : void {
        this.setState({
            step: this.state.step,
            groupName: name
        });
    }
}
