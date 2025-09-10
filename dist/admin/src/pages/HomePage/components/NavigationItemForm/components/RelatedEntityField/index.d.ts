/// <reference types="react" />
import { ContentTypeEntity } from '../../types';
import { StrapiContentTypeItemSchema } from '../../../../../../api/validators';
import { NavigationInternalItemFormSchema } from '../../utils/form';
type RelatedEntityFieldProps = {
    appendLabelPublicationStatus: (label: string, entity: ContentTypeEntity, _: boolean) => string;
    contentTypeItems: StrapiContentTypeItemSchema[] | undefined;
    isSingleSelected: boolean;
    values: NavigationInternalItemFormSchema;
    setFormValuesItems: (values: any) => void;
};
export declare const RelatedEntityField: React.FC<RelatedEntityFieldProps>;
export {};
