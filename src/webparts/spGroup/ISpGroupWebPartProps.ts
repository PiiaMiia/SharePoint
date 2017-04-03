import { HttpClient, SPHttpClient } from '@microsoft/sp-http';

export interface ISpGroupWebPartProps {
    spHttpClient: SPHttpClient;
    httpClient: HttpClient;
    siteUrl: string;
    userLoginName: string;
    userId: string;
    createGroupEndpointUrl: string;
}