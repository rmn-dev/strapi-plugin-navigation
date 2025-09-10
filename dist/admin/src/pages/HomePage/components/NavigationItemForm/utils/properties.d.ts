import { ConfigFromServerSchema, NavigationItemTypeSchema, StrapiContentTypeItemSchema } from '../../../../../api/validators';
import { NavigationItemFormSchema } from './form';
interface GenerateUiRouterKeyInput {
    slugify: (s: string) => Promise<string>;
    title: string;
    related?: number | string;
    relatedType?: string;
    contentTypeItems?: Array<StrapiContentTypeItemSchema>;
    config?: ConfigFromServerSchema;
}
interface GeneratePreviewPathInput {
    isExternal?: boolean;
    currentPath?: string | null;
    current: Partial<NavigationItemFormSchema>;
    currentType?: NavigationItemTypeSchema;
    currentRelatedType?: string;
    currentRelated?: number | string;
    config?: ConfigFromServerSchema;
    isSingleSelected?: boolean;
    contentTypeItems?: Array<StrapiContentTypeItemSchema>;
}
interface GetDefaultPathInput {
    currentType: NavigationItemTypeSchema;
    currentRelatedType?: string;
    currentRelated?: number | string;
    config?: ConfigFromServerSchema;
    isSingleSelected?: boolean;
    contentTypeItems?: Array<StrapiContentTypeItemSchema>;
}
export declare const generateUiRouterKey: ({ slugify, title, config, related, relatedType, contentTypeItems, }: GenerateUiRouterKeyInput) => Promise<string | undefined>;
export declare const getDefaultPath: ({ currentType, config, contentTypeItems, currentRelated, currentRelatedType, isSingleSelected, }: GetDefaultPathInput) => string;
export declare const generatePreviewPath: ({ currentPath, isExternal, current, currentType, config, contentTypeItems, currentRelated, currentRelatedType, isSingleSelected, }: GeneratePreviewPathInput) => string | undefined;
export {};
