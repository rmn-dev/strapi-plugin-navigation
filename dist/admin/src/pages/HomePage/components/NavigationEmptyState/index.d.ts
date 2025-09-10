/// <reference types="react" />
import { NavigationSchema } from '../../../../api/validators';
type NavigationEmptyStateProps = {
    canUpdate: boolean;
    addNewNavigationItem: any;
    availableLocale: string[];
    availableNavigations: NavigationSchema[];
    currentNavigation: NavigationSchema | undefined;
    setCurrentNavigation: (navigation: NavigationSchema) => void;
};
export declare const NavigationEmptyState: React.FC<NavigationEmptyStateProps>;
export {};
