/// <reference types="react" />
import { NavigationItemFormSchema } from '../../utils/form';
import { StrapiContentTypeItemSchema } from '../../../../../../api/validators';
type RelatedTypeFieldProps = {
    contentTypeItems: StrapiContentTypeItemSchema[] | undefined;
    current: Partial<NavigationItemFormSchema>;
    currentRelatedType: string;
    isSingleSelected: boolean;
    setFormValuesItems: (values: any) => void;
    setIsSingleSelected: (isSingle: boolean) => void;
};
export declare const RelatedTypeField: React.FC<RelatedTypeFieldProps>;
export {};
