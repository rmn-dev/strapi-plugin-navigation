import { NavigationSchema } from '../../../api/validators';
import { Effect } from '../../../types';
export declare const useLocale: () => import("@tanstack/react-query").UseQueryResult<{
    defaultLocale: string;
    restLocale: string[];
}, Error>;
export interface UseContentTypeItemsInput {
    uid: string;
    locale?: string;
    query?: string;
}
export declare const useContentTypeItems: (input: UseContentTypeItemsInput) => import("@tanstack/react-query").UseQueryResult<({
    id: number;
    documentId: string;
    locale?: string | null | undefined;
} & Record<string, any>)[], Error>;
export declare const useContentTypes: () => import("@tanstack/react-query").UseQueryResult<{
    kind: "collectionType" | "singleType";
    uid: string;
    info: {
        displayName: string;
        singularName: string;
        pluralName: string;
        description?: string | undefined;
    };
    attributes: Record<string, unknown>;
    isDisplayed: boolean;
    apiID: string;
}[], Error>;
export declare const useResetNavigations: () => () => void;
export declare const useResetContentTypes: () => () => void;
export declare const useInvalidateContentTypeItems: (input: UseContentTypeItemsInput) => () => void;
export declare const useInvalidateNavigations: () => () => void;
export declare const useInvalidateLocale: () => () => Promise<void>;
export declare const useNavigations: () => import("@tanstack/react-query").UseQueryResult<{
    id: number;
    name: string;
    documentId: string;
    items: import("../../../api/validators").NavigationItemSchema[];
    slug: string;
    locale: string;
    visible: boolean;
}[], Error>;
export declare const useHardReset: () => () => void;
export declare const useDeleteNavigations: () => import("@tanstack/react-query").UseMutationResult<import("@strapi/strapi/admin").FetchResponse<any>[], Error, string[], unknown>;
export declare const useCopyNavigationItemI18n: () => import("@tanstack/react-query").UseMutationResult<{
    type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
    title: string;
    uiRouterKey: string;
    path?: string | null | undefined;
    externalPath?: string | null | undefined;
    related?: import("zod").objectOutputType<{
        documentId: import("zod").ZodOptional<import("zod").ZodString>;
        __type: import("zod").ZodString;
    }, import("zod").ZodUnknown, "strip"> | null | undefined;
}, Error, {
    source: string;
    target: string;
    structureId?: string | undefined;
}, unknown>;
export declare const useCopyNavigationI18n: () => import("@tanstack/react-query").UseMutationResult<import("@strapi/strapi/admin").FetchResponse<any>, Error, {
    source: string;
    target: string;
    documentId: string;
}, unknown>;
export declare const useCreateNavigation: () => import("@tanstack/react-query").UseMutationResult<import("@strapi/strapi/admin").FetchResponse<any>, Error, Omit<{
    id: number;
    name: string;
    documentId: string;
    items: import("../../../api/validators").NavigationItemSchema[];
    slug: string;
    locale: string;
    visible: boolean;
}, "id" | "documentId" | "slug">, unknown>;
export declare const useUpdateNavigation: ({ onError, onSuccess, }: {
    onSuccess?: Effect<NavigationSchema>;
    onError?: Effect<unknown>;
}) => import("@tanstack/react-query").UseMutationResult<{
    id: number;
    name: string;
    documentId: string;
    items: import("../../../api/validators").NavigationItemSchema[];
    slug: string;
    locale: string;
    visible: boolean;
}, unknown, {
    id: number;
    name: string;
    documentId: string;
    items: import("../../../api/validators").NavigationItemSchema[];
    slug: string;
    locale: string;
    visible: boolean;
}, unknown>;
export declare const usePurgeNavigation: () => import("@tanstack/react-query").UseMutationResult<unknown, Error, string[] | undefined, unknown>;
export declare const useConfig: () => import("@tanstack/react-query").UseQueryResult<{
    additionalFields: ("audience" | {
        name: string;
        type: "string" | "boolean";
        label: string;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        options?: string[] | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        name: string;
        type: "media";
        label: string;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        options?: string[] | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        name: string;
        type: "select";
        label: string;
        options: string[];
        multi: boolean;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
    })[];
    allowedLevels: number;
    availableAudience: {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }[];
    contentTypes: {
        name: string;
        label: string;
        description: string;
        visible: boolean;
        uid: string;
        draftAndPublish: boolean;
        isSingle: boolean;
        collectionName: string;
        contentTypeName: string;
        labelSingular: string;
        endpoint: string;
        available: boolean;
    }[];
    contentTypesNameFields: Record<string, string[]>;
    contentTypesPopulate: Record<string, string[]>;
    gql: {
        navigationItemRelated: string[];
    };
    pathDefaultFields: Record<string, string[]>;
    cascadeMenuAttached: boolean;
    preferCustomContentTypes: boolean;
    allowedContentTypes: string[];
    restrictedContentTypes: string[];
    defaultContentType?: string | undefined;
    isCacheEnabled?: boolean | undefined;
    isCachePluginEnabled?: boolean | undefined;
}, Error>;
