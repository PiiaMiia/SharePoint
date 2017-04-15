import { HttpClient, SPHttpClient } from '@microsoft/sp-http';

export interface ISpGroupProps {
    spHttpClient: SPHttpClient;
    httpClient: HttpClient;
    siteUrl: string;
    createGroupEndpointUrl: string;
}
