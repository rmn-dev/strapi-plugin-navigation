export interface MakeActionInput<T> {
    trigger(): void;
    cancel(): void;
    perform(input: T): void;
}
export declare const useLocales: (navigationsData: any, setStructureChanged: (structureChanged: boolean) => void) => {
    localeData: {
        defaultLocale: string;
        restLocale: string[];
    } | undefined;
    currentLocale: string | undefined;
    isChangeLanguageVisible: boolean;
    changeCurrentLocaleAction: {
        perform: (next?: string | undefined) => void;
        trigger: (next: string) => void;
        cancel: () => void;
    };
    availableLocales: string[];
};
