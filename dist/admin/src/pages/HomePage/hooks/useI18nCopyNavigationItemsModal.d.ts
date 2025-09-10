/// <reference types="react" />
import { ConfirmEffect } from '../components/I18nCopyNavigationItems';
export declare const useI18nCopyNavigationItemsModal: (onConfirm: ConfirmEffect) => {
    setI18nCopyModalOpened: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    setI18nCopySourceLocale: import("react").Dispatch<import("react").SetStateAction<string | undefined>>;
    i18nCopyItemsModal: import("react/jsx-runtime").JSX.Element | null;
    i18nCopySourceLocale: string | undefined;
};
