import { Footer } from '../Footer';
import { CommonProps, EditState } from '../types';
interface Props extends EditState, CommonProps {
}
export declare const NavigationUpdate: ({ alreadyUsedNames, current, isLoading, navigation: initialValue, setState, }: Props) => import("react/jsx-runtime").JSX.Element;
export declare const NavigationUpdateFooter: Footer;
export {};
