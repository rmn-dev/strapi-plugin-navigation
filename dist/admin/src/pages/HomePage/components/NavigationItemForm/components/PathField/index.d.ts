/// <reference types="react" />
import { NavigationItemFormSchema } from '../../utils/form';
import { StrapiContentTypeItemSchema } from 'src/api/validators';
type PathFieldProps = {
    contentTypeItems: StrapiContentTypeItemSchema[] | undefined;
    current: Partial<NavigationItemFormSchema>;
    isSingleSelected: boolean;
};
export declare const PathField: React.FC<PathFieldProps>;
export {};
