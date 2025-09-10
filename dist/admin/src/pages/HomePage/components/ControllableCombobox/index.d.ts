/// <reference types="react" />
import { FormChangeEvent } from 'src/types';
type ControllableComboboxProps = {
    name: string;
    onClear: () => void;
    onChange: (eventOrPath: FormChangeEvent) => void;
    options: {
        key: string;
        value: string;
        label: string;
    }[];
    value: string | undefined;
    disabled: boolean;
};
export declare const ControllableCombobox: React.FC<ControllableComboboxProps>;
export {};
