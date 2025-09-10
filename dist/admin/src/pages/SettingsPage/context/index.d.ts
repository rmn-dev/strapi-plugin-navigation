/// <reference types="react" />
import { FormChangeEvent } from '../../../types';
import { RestartStatus } from '../types';
import { UiFormSchema } from '../schemas';
export type SettingsContextType = {
    values: UiFormSchema;
    onChange: (eventOrPath: React.ChangeEvent<any> | string, value?: any) => void;
    handleChange: (eventOrPath: FormChangeEvent, value?: any, nativeOnChange?: (eventOrPath: FormChangeEvent, value?: any) => void) => void;
    restartStatus: RestartStatus;
    setRestartStatus: (restartStatus: RestartStatus) => void;
    renderError: (error: string) => string | undefined;
    setFormValueItem: (path: string, value: any) => void;
};
export declare const SettingsContext: import("react").Context<SettingsContextType>;
export declare const useSettingsContext: () => SettingsContextType;
