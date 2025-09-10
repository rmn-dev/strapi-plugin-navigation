type Config = {
    allowedContentTypes?: string[];
    restrictedContentTypes?: string[];
    preferCustomContentTypes?: boolean;
    contentTypes?: string[];
};
export declare const isContentTypeEligible: (uid?: string, config?: Config) => boolean;
export declare const resolveGlobalLikeId: (uid?: string) => string;
export declare const waitForServerRestart: (response: any, didShutDownServer?: boolean) => Promise<unknown>;
export {};
