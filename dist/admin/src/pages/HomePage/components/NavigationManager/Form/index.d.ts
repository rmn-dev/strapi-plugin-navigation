import { Effect } from '../../../../../types';
import { Navigation } from '../types';
interface Props<T extends Partial<Navigation>> {
    navigation: T;
    onChange: Effect<T>;
    isLoading?: boolean;
    alreadyUsedNames?: Array<string>;
}
export declare const Form: <T extends Partial<Navigation>>({ navigation, onChange, alreadyUsedNames, isLoading, }: Props<T>) => import("react/jsx-runtime").JSX.Element;
export {};
