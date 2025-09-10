export declare const renderNavigationChild: ({ strapi, nexus }: any) => {
    type: any;
    args: {
        documentId: any;
        childUiKey: any;
        type: string;
        menuOnly: any;
    };
    resolve(_: any, args: any): Promise<import("../../dtos").NavigationItemDTO[] | {
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
