/// <reference types="react" />
import { FormChangeEvent } from '../../../../../types';
import { NavigationItemFormSchema } from '../utils/form';
export type NavigationItemFormContextType = {
    values: NavigationItemFormSchema;
    onChange: (eventOrPath: React.ChangeEvent<any> | string, value?: any) => void;
    handleChange: (eventOrPath: FormChangeEvent, value?: any, nativeOnChange?: (eventOrPath: FormChangeEvent, value?: any) => void) => void;
    renderError: (field: string, messageKey?: string) => string | undefined;
    setFormValueItem: (path: string, value: any) => void;
    canUpdate: boolean | undefined;
    isLoading: boolean;
};
export declare const NavigationItemFormContext: import("react").Context<NavigationItemFormContextType>;
export declare const useNavigationItemFormContext: () => NavigationItemFormContextType;
