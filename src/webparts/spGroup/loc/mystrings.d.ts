declare interface ISpGroupStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListNameFieldLabel: string;
}

declare module 'spGroupStrings' {
  const strings: ISpGroupStrings;
  export = strings;
}