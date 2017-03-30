import { SPHttpClient } from '@microsoft/sp-http';

export interface ISpGroupProps {
    spHttpClient: SPHttpClient;
    siteUrl: string;
    group: string;
    userLoginName: string;
    userId: string;
}