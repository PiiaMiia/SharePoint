import * as React from 'react';
import styles from './SpGroup.module.scss';
import { ISpGroupProps } from './ISpGroupProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Main from './Main/Main';
import StepOne from './StepOne/StepOne';

export default class SpGroup extends React.Component<ISpGroupProps, void> {
  public render(): JSX.Element {
    return (
      <div>
        <Main httpClient={this.props.httpClient} spHttpClient={this.props.spHttpClient} siteUrl={this.props.siteUrl}/>
      </div>
    );
  }
}
