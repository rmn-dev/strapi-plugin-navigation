import { Core } from '@strapi/strapi';
export declare const configSetup: ({ strapi, forceDefault, }: {
    strapi: Core.Strapi;
    forceDefault?: boolean;
}) => Promise<{
    additionalFields: ("audience" | {
        type: "string" | "boolean";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        type: "media";
        name: string;
        label: string;
        options?: string[] | undefined;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
        multi?: false | undefined;
    } | {
        options: string[];
        type: "select";
        name: string;
        label: string;
        multi: boolean;
        description?: string | undefined;
        placeholder?: string | undefined;
        required?: boolean | undefined;
        enabled?: boolean | undefined;
    })[];
    allowedLevels: number;
    contentTypes: string[];
    contentTypesNameFields: Record<string, string[]>;
    contentTypesPopulate: Record<string, string[]>;
    gql: {
        navigationItemRelated: string[];
    };
    pathDefaultFields: Record<string, any>;
    cascadeMenuAttached: boolean;
    preferCustomContentTypes: boolean;
    defaultContentType?: string | undefined;
    isCacheEnabled?: boolean | undefined;
}>;
