import { NavigationItemDTO } from '../../dtos';
import { StrapiContentTypeFullSchema } from '../../types';
import { NestedPath } from './types';
export declare const composeItemTitle: (item: NavigationItemDTO, fields?: Record<string, string[]>, contentTypes?: StrapiContentTypeFullSchema[]) => string | undefined;
export declare const extractItemRelationTitle: (relatedItem: any, fields?: Record<string, string[]>, contentTypes?: StrapiContentTypeFullSchema[]) => any;
export declare const filterByPath: <T extends Pick<NavigationItemDTO, "path" | "documentId" | "parent">>(items: T[], path?: string) => {
    root?: NestedPath;
    items: T[];
};
export declare const buildNestedPaths: <T extends Pick<NavigationItemDTO, "path" | "documentId" | "parent">>(items: T[], documentId?: string, parentPath?: string | null) => NestedPath[];
export declare const compareArraysOfNumbers: (arrA: number[], arrB: number[]) => number;
