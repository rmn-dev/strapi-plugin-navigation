import type { Core } from '@strapi/strapi';
declare const bootstrap: (context: {
    strapi: Core.Strapi;
}) => Promise<void>;
export default bootstrap;
