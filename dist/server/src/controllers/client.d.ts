import { Core } from '@strapi/strapi';
import { Context as KoaContext } from 'koa';
export default function clientController(context: {
    strapi: Core.Strapi;
}): {
    getService(): {
        readAll({ locale, orderBy, orderDirection }: import("../services/client/types").ReadAllInput): Promise<{
            name: string;
            id: number;
            documentId: string;
            slug: string;
            locale: string;
            visible: boolean;
            items?: import("../schemas").NavigationItemDBSchema[] | undefined;
        }[]>;
        renderRFRNavigationItem({ item }: import("../services/client/types").RenderRFRNavInput): import("../dtos").RFRNavigationItemDTO;
        renderRFRPage({ item, parent, enabledCustomFieldsNames }: import("../services/client/types").RenderRFRPageInput): import("../dtos").RFRPageDTO;
        renderRFR({ items, parent, parentNavItem, contentTypes, enabledCustomFieldsNames, }: import("../services/client/types").RenderRFRInput): {
            pages: {};
            nav: {};
        };
        renderTree({ items, documentId, path, itemParser, }: import("../services/client/types").RenderTreeInput): Promise<import("../dtos").NavigationItemDTO[]>;
        getCustomFields(additionalFields: ("audience" | {
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
        })[]): ({
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
        renderType({ criteria, filter, itemCriteria, locale, populate, rootPath, type, wrapRelated, status, }: import("../services/client/types").RenderTypeInput): Promise<import("../dtos").NavigationItemDTO[] | {
            pages: {};
            nav: {};
        } | {
            audience: string[] | undefined;
            title: string;
            related: any;
            items: null;
            additionalFields: {};
            path?: string | null | undefined;
            type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
            id: number;
            documentId: string;
            slug?: string | null | undefined;
            externalPath?: string | null | undefined;
            uiRouterKey: string;
            menuAttached: boolean;
            order: number;
            collapsed: boolean;
            autoSync?: boolean | null | undefined;
            master?: import("../dtos").NavigationDTO | undefined;
            parent?: import("../dtos").NavigationItemDTO | null | undefined;
        }[]>;
        renderChildren({ childUIKey, idOrSlug, locale, menuOnly, type, wrapRelated, status, }: import("../services/client/types").RenderChildrenInput): Promise<import("../dtos").NavigationItemDTO[] | {
            pages: {};
            nav: {};
        } | {
            audience: string[] | undefined;
            title: string;
            related: any;
            items: null;
            additionalFields: {};
            path?: string | null | undefined;
            type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
            id: number;
            documentId: string;
            slug?: string | null | undefined;
            externalPath?: string | null | undefined;
            uiRouterKey: string;
            menuAttached: boolean;
            order: number;
            collapsed: boolean;
            autoSync?: boolean | null | undefined;
            master?: import("../dtos").NavigationDTO | undefined;
            parent?: import("../dtos").NavigationItemDTO | null | undefined;
        }[]>;
        render({ idOrSlug, locale, menuOnly, populate, rootPath, type, wrapRelated, status, }: import("../services/client/types").RenderInput): Promise<import("../dtos").NavigationItemDTO[] | {
            pages: {};
            nav: {};
        } | {
            audience: string[] | undefined;
            title: string;
            related: any;
            items: null;
            additionalFields: {};
            path?: string | null | undefined;
            type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
            id: number;
            documentId: string;
            slug?: string | null | undefined;
            externalPath?: string | null | undefined;
            uiRouterKey: string;
            menuAttached: boolean;
            order: number;
            collapsed: boolean;
            autoSync?: boolean | null | undefined;
            master?: import("../dtos").NavigationDTO | undefined;
            parent?: import("../dtos").NavigationItemDTO | null | undefined;
        }[]>;
    };
    readAll(ctx: KoaContext): Promise<{
        name: string;
        id: number;
        documentId: string;
        slug: string;
        locale: string;
        visible: boolean;
        items?: import("../schemas").NavigationItemDBSchema[] | undefined;
    }[] | KoaContext>;
    render(ctx: KoaContext): Promise<import("../dtos").NavigationItemDTO[] | {
        pages: {};
        nav: {};
    } | {
        audience: string[] | undefined;
        title: string;
        related: any;
        items: null;
        additionalFields: {};
        path?: string | null | undefined;
        type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
        id: number;
        documentId: string;
        slug?: string | null | undefined;
        externalPath?: string | null | undefined;
        uiRouterKey: string;
        menuAttached: boolean;
        order: number;
        collapsed: boolean;
        autoSync?: boolean | null | undefined;
        master?: import("../dtos").NavigationDTO | undefined;
        parent?: import("../dtos").NavigationItemDTO | null | undefined;
    }[]>;
    renderChild(ctx: KoaContext): Promise<import("../dtos").NavigationItemDTO[] | {
        pages: {};
        nav: {};
    } | {
        audience: string[] | undefined;
        title: string;
        related: any;
        items: null;
        additionalFields: {};
        path?: string | null | undefined;
        type: "INTERNAL" | "EXTERNAL" | "WRAPPER";
        id: number;
        documentId: string;
        slug?: string | null | undefined;
        externalPath?: string | null | undefined;
        uiRouterKey: string;
        menuAttached: boolean;
        order: number;
        collapsed: boolean;
        autoSync?: boolean | null | undefined;
        master?: import("../dtos").NavigationDTO | undefined;
        parent?: import("../dtos").NavigationItemDTO | null | undefined;
    }[]>;
};
