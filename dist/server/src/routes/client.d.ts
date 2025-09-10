export type NavigationServerRoute = (typeof routes.routes)[number] & {
    info?: {
        pluginName: string;
    };
};
declare const routes: {
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
export default routes;
