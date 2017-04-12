import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import SpGroup from './components/SpGroup';
import { ISpGroupProps } from './components/ISpGroupProps';
import { ISpGroupWebPartProps } from './ISpGroupWebPartProps';

export default class SpGroupWebPart extends BaseClientSideWebPart<ISpGroupWebPartProps> {

  public render(): void {

    const element: React.ReactElement<ISpGroupProps > = React.createElement(
      SpGroup,
      {
        spHttpClient: this.context.spHttpClient,
        httpClient: this.context.httpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        userLoginName: this.context.pageContext.user.loginName,
        userId: this.context.pageContext.user.displayName,
        listName: this.properties.listName,
        createGroupEndpointUrl: this.properties.createGroupEndpointUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }
}