
export interface AEMElement {
  value?: any;
  html?: string;
  json?: any;
  _type?: string;
}

export interface AEMTextElement extends AEMElement {
  value: string;
}

export interface AEMRichTextElement extends AEMElement {
  html?: string;
  json?: any;
}

export interface AEMImageElement extends AEMElement {
  path: string;
  mimeType?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface AEMContentFragmentModel {
  elements: Record<string, AEMElement>;
  model?: string;
  _path?: string;
  fragmentPath?: string;
  [key: string]: any;
}

export interface AEMComponentProps {
  resource: string;
  type: string;
  data: any;
  label?: string;
  filter?: string;
  behavior?: string;
}

export interface CFComponentProps {
  resource: string | null;
  elements: Record<string, any>;
  [key: string]: any;
}

export interface EditorProps {
  "data-aue-resource"?: string | null;
  "data-aue-type"?: string;
  "data-aue-prop"?: string;
  "data-aue-model"?: string;
  "data-aue-label"?: string;
  "data-aue-filter"?: string;
  "data-aue-behavior"?: string;
  "data-aue-component"?: string;
}
