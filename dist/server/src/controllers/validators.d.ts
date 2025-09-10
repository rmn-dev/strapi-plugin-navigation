import * as z from 'zod';
export declare const idSchema: z.ZodString;
export declare const readAllQuerySchema: z.ZodObject<{
    locale: z.ZodOptional<z.ZodString>;
    orderBy: z.ZodOptional<z.ZodString>;
    orderDirection: z.ZodOptional<z.ZodEnum<["DESC", "ASC"]>>;
}, "strip", z.ZodTypeAny, {
    locale?: string | undefined;
    orderBy?: string | undefined;
    orderDirection?: "DESC" | "ASC" | undefined;
}, {
    locale?: string | undefined;
    orderBy?: string | undefined;
    orderDirection?: "DESC" | "ASC" | undefined;
}>;
export declare const renderTypeSchema: z.ZodEnum<["FLAT", "TREE", "RFR"]>;
export declare const statusSchema: z.ZodEnum<["draft", "published"]>;
export declare const populateSchema: z.ZodUnion<[z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">, z.ZodUndefined]>;
export declare const renderQuerySchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["FLAT", "TREE", "RFR"]>>;
    menu: z.ZodOptional<z.ZodEnum<["true", "false"]>>;
    path: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodString>;
    populate: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString, z.ZodArray<z.ZodString, "many">, z.ZodUndefined]>>;
    status: z.ZodOptional<z.ZodEnum<["draft", "published"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "published" | "draft" | undefined;
    path?: string | undefined;
    type?: "FLAT" | "TREE" | "RFR" | undefined;
    locale?: string | undefined;
    populate?: string | boolean | string[] | undefined;
    menu?: "true" | "false" | undefined;
}, {
    status?: "published" | "draft" | undefined;
    path?: string | undefined;
    type?: "FLAT" | "TREE" | "RFR" | undefined;
    locale?: string | undefined;
    populate?: string | boolean | string[] | undefined;
    menu?: "true" | "false" | undefined;
}>;
export declare const renderChildQueryParams: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["FLAT", "TREE", "RFR"]>>;
    menu: z.ZodOptional<z.ZodEnum<["true", "false"]>>;
    locale: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["draft", "published"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "published" | "draft" | undefined;
    type?: "FLAT" | "TREE" | "RFR" | undefined;
    locale?: string | undefined;
    menu?: "true" | "false" | undefined;
}, {
    status?: "published" | "draft" | undefined;
    type?: "FLAT" | "TREE" | "RFR" | undefined;
    locale?: string | undefined;
    menu?: "true" | "false" | undefined;
}>;
export declare const fillFromOtherLocaleParams: z.ZodObject<{
    source: z.ZodString;
    target: z.ZodString;
    documentId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    documentId: string;
    target: string;
    source: string;
}, {
    documentId: string;
    target: string;
    source: string;
}>;
