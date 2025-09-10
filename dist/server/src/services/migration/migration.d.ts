import { Core } from '@strapi/strapi';
export type MigrationService = ReturnType<typeof migrationService>;
declare const migrationService: (context: {
    strapi: Core.Strapi;
}) => {
    migrateRelatedIdToDocumentId(): Promise<void>;
};
export default migrationService;
