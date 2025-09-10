/// <reference types="react" />
import { NavigationItemCustomField } from '../../../../../../../schemas';
export type AdditionalFieldInputProps = {
    name?: string;
    field: NavigationItemCustomField;
    isLoading: boolean;
    onChange: (eventOrPath: React.ChangeEvent<any> | string, value?: any) => void;
    onChangeEnhancer: (eventOrPath: React.ChangeEvent<any> | string, value?: any, nativeOnChange?: (eventOrPath: React.ChangeEvent<any> | string, value?: any) => void) => void;
    value: string | boolean | string[] | object | null;
    disabled: boolean;
};
export declare const AdditionalFieldInput: React.FC<AdditionalFieldInputProps>;
