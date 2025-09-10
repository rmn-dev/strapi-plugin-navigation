import { Core } from '@strapi/strapi';
declare const permissions: {
    render: (uid: string) => string;
    navigation: {
        read: string;
        update: string;
        settings: string;
    };
};
export declare const setupPermissions: ({ strapi }: {
    strapi: Core.Strapi;
}) => Promise<void>;
export default permissions;
