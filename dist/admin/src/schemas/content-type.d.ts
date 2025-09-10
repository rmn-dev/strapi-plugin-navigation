import { z } from 'zod';
export type StrapiContentTypeSchema = z.infer<typeof strapiContentTypeSchema>;
export declare const strapiContentTypeSchema: z.ZodObject<{
    uid: z.ZodString;
    isDisplayed: z.ZodBoolean;
    apiID: z.ZodString;
    kind: z.ZodEnum<["collectionType", "singleType"]>;
    info: z.ZodObject<{
        singularName: z.ZodString;
        pluralName: z.ZodString;
        displayName: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        displayName: string;
        singularName: string;
        pluralName: string;
        description?: string | undefined;
    }, {
        displayName: string;
        singularName: string;
        pluralName: string;
        description?: string | undefined;
    }>;
    attributes: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
}>;
