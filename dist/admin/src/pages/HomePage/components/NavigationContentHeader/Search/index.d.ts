import { Effect } from '../../../../../types';
interface Props {
    value: string;
    setValue: Effect<{
        value: string;
        index: number;
    }>;
    initialIndex?: number;
}
export declare const Search: ({ value, setValue, initialIndex }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
