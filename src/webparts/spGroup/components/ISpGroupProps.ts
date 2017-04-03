import { HttpClient, SPHttpClient } from '@microsoft/sp-http';

export interface ISpGroupProps {
    spHttpClient: SPHttpClient;
    httpClient: HttpClient;
    siteUrl: string;
    groupName: string;
    userLoginName: string;
    userId: string;
    createGroupEndpointUrl: string;
}