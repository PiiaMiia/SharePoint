import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import { IODataUser } from '@microsoft/sp-odata-types';


import * as strings from 'spGroupStrings';
import SpGroup from './components/SpGroup';
import { ISpGroupProps } from './components/ISpGroupProps';
import { ISpGroupWebPartProps } from './ISpGroupWebPartProps';

export default class SpGroupWebPart extends BaseClientSideWebPart<ISpGroupWebPartProps> {

  public render(): void {

    const element: React.ReactElement<ISpGroupProps > = React.createElement(
      SpGroup,
      {
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        group: this.properties.group,
        userLoginName: this.context.pageContext.user.loginName,
        userId: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
              PropertyPaneTextField('group', {
                label: 'Group name'
              }),
            ]
          }
        ]
      }
    ]
    };
  }
}