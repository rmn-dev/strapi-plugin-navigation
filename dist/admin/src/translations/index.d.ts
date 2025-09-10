import { Path } from '@sensinum/strapi-utils';
import type { EN } from './en';
export type TranslationPath = Path<EN>;
declare const trads: {
    en: () => Promise<typeof import("./en")>;
    fr: () => Promise<typeof import("./fr")>;
    ca: () => Promise<typeof import("./ca")>;
};
export declare const getTradId: (msg: string) => string;
export declare const getTrad: (msg: string, defaultMessage?: string) => {
    id: string;
    defaultMessage: string;
};
export default trads;
