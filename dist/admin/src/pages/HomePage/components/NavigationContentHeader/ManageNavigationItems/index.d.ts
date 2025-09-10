/// <reference types="react" />
import { NavigationSchema } from '../../../../../api/validators';
type ManageNavigationItemsProps = {
    currentNavigation: NavigationSchema | undefined;
    setCurrentNavigation: (navigation: NavigationSchema) => void;
    canUpdate: boolean;
    addNewNavigationItem: (event: MouseEvent, viewParentId?: number, isMenuAllowedLevel?: boolean, levelPath?: string, parentAttachedToMenu?: boolean, structureId?: string, maxOrder?: number) => void;
};
export declare const ManageNavigationItems: React.FC<ManageNavigationItemsProps>;
export {};
