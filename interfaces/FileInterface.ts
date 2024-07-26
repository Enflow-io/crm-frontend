export interface IFileInterface {
    id:             number;
    name:           string;
    url:            string;
    waterMarkedUrl: string;
    key:            string;
    entityId:       number;
    entityType:     string;
    order:          number;
    isDoc:          boolean;
    isPlan:         boolean;
    width:          string;
    height:         string;
    isResized:      boolean;
    createdAt:      Date;
}