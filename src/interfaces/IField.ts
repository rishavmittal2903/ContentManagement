export interface IField {
  fieldName: string;
  fieldType: string;
  langauges: Record<string, string | Record<string, any>>;
}

export interface IContentField {
  contentId: string;
  contentDescription?: string;
  fields: Array<IField>;
  updatedBy: string;
  updatedAt: string;
}

export interface IContentState {
  contentData: Array<IContentField>;
}

export interface IFieldLanguage{
    langaugeCode:string;
    languageName:string;
    value:any
}