export declare const useConfig: () => import("@tanstack/react-query").UseQueryResult<{
    contentTypes: string[];
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
export declare const useRestart: () => import("@tanstack/react-query").UseMutationResult<import("@tanstack/react-query").QueryObserverResult<import("@strapi/strapi/admin").FetchResponse<any>, Error>, Error, void, unknown>;
export declare const useRestoreConfig: () => import("@tanstack/react-query").UseMutationResult<void, Error, void, unknown>;
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
export declare const useSaveConfig: () => import("@tanstack/react-query").UseMutationResult<void, Error, {
    additionalFields: ("audience" | {
        name: string;
        type: "select";
        label: string;
        options: string[];
        multi: boolean;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        description?: string | undefined;
        enabled?: boolean | undefined;
    } | {
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
    })[];
    allowedLevels: number;
    availableAudience: {
        id: number;
        name: string;
        key: string;
        documentId: string;
    }[];
    contentTypes: string[];
    contentTypesNameFields: {
        key: string;
        fields: string[];
    }[];
    contentTypesPopulate: {
        key: string;
        fields: string[];
    }[];
    gql: {
        navigationItemRelated: string[];
    };
    pathDefaultFields: {
        key: string;
        fields: string[];
    }[];
    cascadeMenuAttached: boolean;
    preferCustomContentTypes: boolean;
    audienceFieldChecked: boolean;
    defaultContentType?: string | undefined;
    isCacheEnabled?: boolean | undefined;
    isCachePluginEnabled?: boolean | undefined;
}, unknown>;
