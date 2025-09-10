declare const routes: {
    admin: {
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
    'content-api': {
        type: string;
        routes: {
            method: string;
            path: string;
            handler: string;
            config: {
                policies: never[];
            };
        }[];
    };
};
export default routes;
