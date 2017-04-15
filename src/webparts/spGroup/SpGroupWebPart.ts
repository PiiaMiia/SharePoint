import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

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
        siteUrl:  this.context.pageContext.web.absoluteUrl,
        createGroupEndpointUrl: this.properties.createGroupEndpointUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
