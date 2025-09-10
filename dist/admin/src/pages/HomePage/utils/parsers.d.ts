import { ConfigFromServerSchema, NavigationItemSchema, NavigationItemTypeSchema, StrapiContentTypeItemSchema } from '../../../api/validators';
import { NavigationItemFormSchema } from '../components/NavigationItemForm';
export declare const transformItemToViewPayload: (payload: NavigationItemFormSchema, items: ({
    title: string;
    uiRouterKey: string;
    menuAttached: boolean;
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    id: number;
    order: number;
    documentId: string;
    collapsed: boolean;
    path?: string | null | undefined;
    externalPath?: string | null | undefined;
    audience?: {
        name: string;
        id: number;
        key: string;
        documentId: string;
    }[] | null | undefined;
    related?: import("zod").objectOutputType<{
        documentId: import("zod").ZodOptional<import("zod").ZodString>;
        __type: import("zod").ZodString;
    }, import("zod").ZodUnknown, "strip"> | null | undefined;
    autoSync?: boolean | null | undefined;
    removed?: boolean | undefined;
    additionalFields?: Record<string, unknown> | null | undefined;
    viewId?: number | undefined;
    viewParentId?: number | undefined;
    structureId?: string | undefined;
    isSearchActive?: boolean | undefined;
    updated?: boolean | undefined;
} & {
    items?: NavigationItemSchema[] | null | undefined;
} & {
    viewId?: number | undefined;
})[] | undefined, config: ConfigFromServerSchema) => Array<NavigationItemSchema & {
    viewId?: number;
}>;
export declare const extractRelatedItemLabel: (item: StrapiContentTypeItemSchema, config?: ConfigFromServerSchema) => any;
export declare const isRelationCorrect: (item: Partial<NavigationItemFormSchema>) => boolean | undefined;
export declare const isRelationPublished: ({ relatedRef, relatedType, type, isCollection, }: {
    relatedRef: StrapiContentTypeItemSchema;
    relatedType?: {
        available?: boolean;
    };
    type: NavigationItemTypeSchema;
    isCollection: boolean;
}) => any;
export declare const mapServerNavigationItem: (item: NavigationItemSchema, stopAtFirstLevel?: boolean) => NavigationItemFormSchema;
