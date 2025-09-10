declare const routes: {
    type: string;
    routes: ({
        method: string;
        path: string;
        handler: string;
        config: {
            policies: {
                name: string;
                config: {
                    actions: string[];
                };
            }[];
        };
    } | {
        method: string;
        path: string;
        handler: string;
        config: {
            policies: string[];
        };
    })[];
};
export default routes;
