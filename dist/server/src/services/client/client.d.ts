import { Core } from '@strapi/strapi';
import { NavigationItemDTO, RFRNavigationItemDTO, RFRPageDTO } from '../../dtos';
import { NavigationItemAdditionalField, NavigationItemCustomField } from '../../schemas';
import { ReadAllInput, RenderChildrenInput, RenderInput, RenderRFRInput, RenderRFRNavInput, RenderRFRPageInput, RenderTreeInput, RenderTypeInput } from './types';
export type ClientService = ReturnType<typeof clientService>;
declare const clientService: (context: {
    strapi: Core.Strapi;
}) => {
    readAll({ locale, orderBy, orderDirection }: ReadAllInput): Promise<{
        name: string;
        id: number;
        documentId: string;
        slug: string;
        locale: string;
        visible: boolean;
        items?: import("../../schemas").NavigationItemDBSchema[] | undefined;
    }[]>;
    renderRFRNavigationItem({ item }: RenderRFRNavInput): RFRNavigationItemDTO;
    renderRFRPage({ item, parent, enabledCustomFieldsNames }: RenderRFRPageInput): RFRPageDTO;
    renderRFR({ items, parent, parentNavItem, contentTypes, enabledCustomFieldsNames, }: RenderRFRInput): {
        pages: {};
        nav: {};
    };
    renderTree({ items, documentId, path, itemParser, }: RenderTreeInput): Promise<NavigationItemDTO[]>;
    getCustomFields(additionalFields: NavigationItemAdditionalField[]): NavigationItemCustomField[];
    renderType({ criteria, filter, itemCriteria, locale, populate, rootPath, type, wrapRelated, status, }: RenderTypeInput): Promise<NavigationItemDTO[] | {
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
        master?: import("../../dtos").NavigationDTO | undefined;
        parent?: NavigationItemDTO | null | undefined;
    }[]>;
    renderChildren({ childUIKey, idOrSlug, locale, menuOnly, type, wrapRelated, status, }: RenderChildrenInput): Promise<NavigationItemDTO[] | {
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
        master?: import("../../dtos").NavigationDTO | undefined;
        parent?: NavigationItemDTO | null | undefined;
    }[]>;
    render({ idOrSlug, locale, menuOnly, populate, rootPath, type, wrapRelated, status, }: RenderInput): Promise<NavigationItemDTO[] | {
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
        master?: import("../../dtos").NavigationDTO | undefined;
        parent?: NavigationItemDTO | null | undefined;
    }[]>;
};
export default clientService;
