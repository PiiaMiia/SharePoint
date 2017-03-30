import { SPHttpClient } from '@microsoft/sp-http';

export interface ISpGroupWebPartProps {
    spHttpClient: SPHttpClient;
    siteUrl: string;
    group: string;
    userLoginName: string;
    userId: string;
}