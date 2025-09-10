export declare const renderNavigation: ({ strapi, nexus }: any) => {
    args: {
        navigationIdOrSlug: any;
        type: string;
        menuOnly: any;
        path: any;
        locale: any;
    };
    type: any;
    resolve(_: unknown, { navigationIdOrSlug, type, menuOnly, path: rootPath, locale }: any): Promise<import("../../dtos").NavigationItemDTO[] | {
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
        parent?: import("../../dtos").NavigationItemDTO | null | undefined;
    }[]>;
};
