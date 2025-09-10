declare const _default: {
    schema: {
        collectionName: string;
        info: {
            singularName: string;
            pluralName: string;
            displayName: string;
            name: string;
        };
        options: {
            increments: boolean;
            comment: string;
        };
        attributes: {
            name: {
                type: string;
                required: boolean;
            };
            key: {
                type: string;
                targetField: string;
            };
        };
    };
};
export default _default;
