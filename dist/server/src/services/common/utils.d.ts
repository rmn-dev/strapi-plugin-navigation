import { NavigationItemType } from '../../schemas';
export interface DuplicateCheckItem {
    items?: DuplicateCheckItem[];
    id?: number;
    title: string;
    path?: string | null;
    type: NavigationItemType;
    removed?: boolean;
}
export declare const checkDuplicatePath: ({ checkData, parentItem, }: {
    parentItem?: DuplicateCheckItem;
    checkData: DuplicateCheckItem[];
}) => Promise<void>;
