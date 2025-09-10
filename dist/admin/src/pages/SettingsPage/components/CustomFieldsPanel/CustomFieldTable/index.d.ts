/// <reference types="react" />
import { NavigationItemCustomField } from '../../../../../schemas';
import { Effect } from '../../../../../types';
interface ICustomFieldTableProps {
    data: (NavigationItemCustomField | string)[];
    onOpenModal: (field: NavigationItemCustomField | null) => void;
    onRemoveCustomField: Effect<NavigationItemCustomField>;
    onToggleCustomField: Effect<NavigationItemCustomField>;
}
declare const CustomFieldTable: React.FC<ICustomFieldTableProps>;
export default CustomFieldTable;
