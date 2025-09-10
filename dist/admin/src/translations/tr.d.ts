declare const tr: {
    plugin: {
        name: string;
        section: {
            name: string;
            item: string;
        };
    };
    header: {
        title: string;
        description: string;
        meta: string;
        action: {
            newItem: string;
            manage: string;
            collapseAll: string;
            expandAll: string;
        };
    };
    submit: {
        cta: {
            cancel: string;
            save: string;
        };
    };
    empty: {
        description: string;
        cta: string;
    };
    popup: {
        navigation: {
            manage: {
                header: {
                    LIST: string;
                    CREATE: string;
                    DELETE: string;
                    ERROR: string;
                    EDIT: string;
                };
                button: {
                    cancel: string;
                    delete: string;
                    save: string;
                    edit: string;
                    create: string;
                    goBack: string;
                    purge: string;
                };
                table: {
                    id: string;
                    name: string;
                    locale: string;
                    visibility: string;
                    hasSelected: string;
                };
                footer: {
                    button: {
                        purge: string;
                    };
                };
                purge: {
                    header: string;
                };
                delete: {
                    header: string;
                };
                error: {
                    header: string;
                    message: string;
                };
                navigation: {
                    visible: string;
                    hidden: string;
                };
            };
            form: {
                name: {
                    label: string;
                    placeholder: string;
                    validation: {
                        name: {
                            required: string;
                            tooShort: string;
                            alreadyUsed: string;
                        };
                        visible: {
                            required: string;
                        };
                    };
                };
                visible: {
                    label: string;
                    toggle: {
                        visible: string;
                        hidden: string;
                    };
                };
            };
        };
        item: {
            header: {
                view: string;
                edit: string;
                new: string;
            };
            form: {
                title: {
                    label: string;
                    autoSync: {
                        label: string;
                    };
                    placeholder: string;
                };
                uiRouterKey: {
                    label: string;
                    placeholder: string;
                };
                uiRouter: {
                    unableToRender: string;
                };
                path: {
                    label: string;
                    placeholder: string;
                    preview: string;
                };
                externalPath: {
                    label: string;
                    placeholder: string;
                    validation: {
                        type: string;
                    };
                };
                menuAttached: {
                    label: string;
                    value: {
                        yes: string;
                        no: string;
                    };
                };
                type: {
                    label: string;
                    internal: {
                        label: string;
                    };
                    external: {
                        label: string;
                        description: string;
                    };
                    wrapper: {
                        label: string;
                    };
                };
                audience: {
                    label: string;
                    placeholder: string;
                    empty: string;
                };
                relatedSection: {
                    label: string;
                };
                relatedType: {
                    label: string;
                    placeholder: string;
                    empty: string;
                };
                related: {
                    label: string;
                    placeholder: string;
                    empty: string;
                };
                i18n: {
                    locale: {
                        label: string;
                        placeholder: string;
                        button: string;
                        error: {
                            generic: string;
                            unavailable: string;
                        };
                    };
                };
                button: {
                    create: string;
                    update: string;
                    restore: string;
                    remove: string;
                    save: string;
                    cancel: string;
                };
            };
        };
    };
    notification: {
        navigation: {
            submit: string;
            error: string;
            item: {
                relation: string;
                status: {
                    draft: string;
                    published: string;
                };
            };
            update: {
                error: string;
            };
        };
        error: {
            common: string;
            customField: {
                type: string;
                media: {
                    missing: string;
                };
            };
            item: {
                relation: string;
                slug: string;
            };
        };
    };
    pages: {
        auth: {
            noAccess: string;
            not: {
                allowed: string;
            };
        };
        main: {
            search: {
                placeholder: string;
                subLabel: string;
            };
            header: {
                localization: {
                    select: {
                        placeholder: string;
                    };
                };
            };
        };
        settings: {
            title: string;
            general: {
                title: string;
            };
            additional: {
                title: string;
            };
            customFields: {
                title: string;
            };
            nameField: {
                title: string;
            };
            restoring: {
                title: string;
            };
            section: {
                title: string;
                subtitle: string;
            };
            header: {
                title: string;
                description: string;
            };
            form: {
                cascadeMenuAttached: {
                    label: string;
                    hint: string;
                };
                preferCustomContentTypes: {
                    label: string;
                    hint: string;
                };
                contentTypes: {
                    label: string;
                    placeholder: string;
                    hint: string;
                };
                defaultContentType: {
                    label: string;
                    placeholder: string;
                    hint: string;
                };
                i18n: {
                    label: string;
                    hint: string;
                    hintMissingDefaultLocale: string;
                };
                allowedLevels: {
                    label: string;
                    placeholder: string;
                    hint: string;
                };
                audience: {
                    label: string;
                    hint: string;
                };
                nameField: {
                    default: string;
                    label: string;
                    placeholder: string;
                    hint: string;
                    empty: string;
                };
                populate: {
                    label: string;
                    placeholder: string;
                    hint: string;
                    empty: string;
                };
                pathDefaultFields: {
                    label: string;
                    placeholder: string;
                    hint: string;
                    empty: string;
                };
                contentTypesSettings: {
                    label: string;
                    tooltip: string;
                    initializationWarning: {
                        title: string;
                        content: string;
                    };
                };
                customFields: {
                    table: {
                        confirmation: {
                            header: string;
                            message: string;
                            confirm: string;
                            error: string;
                        };
                        header: {
                            name: string;
                            label: string;
                            type: string;
                            required: string;
                        };
                        footer: string;
                        edit: string;
                        enable: string;
                        disable: string;
                        remove: string;
                        required: string;
                        notRequired: string;
                    };
                    popup: {
                        header: {
                            edit: string;
                            new: string;
                        };
                        name: {
                            label: string;
                            placeholder: string;
                            description: string;
                            requiredError: string;
                            noSpaceError: string;
                        };
                        label: {
                            label: string;
                            placeholder: string;
                            description: string;
                            requiredError: string;
                        };
                        description: {
                            label: string;
                            placeholder: string;
                            description: string;
                        };
                        placeholder: {
                            label: string;
                            placeholder: string;
                            description: string;
                        };
                        type: {
                            label: string;
                            description: string;
                        };
                        required: {
                            label: string;
                            description: string;
                        };
                        options: {
                            label: string;
                            description: string;
                            requiredError: string;
                        };
                        multi: {
                            label: string;
                            description: string;
                        };
                    };
                };
            };
            actions: {
                submit: string;
                restore: {
                    label: string;
                    confirmation: {
                        header: string;
                        confirm: string;
                        description: string;
                    };
                    description: string;
                };
                restart: {
                    label: string;
                    alert: {
                        title: string;
                        description: string;
                        close: string;
                        cancel: string;
                        reason: {
                            I18N: string;
                            GRAPH_QL: string;
                            I18N_NAVIGATIONS_PRUNE: string;
                        };
                    };
                };
                disableI18n: {
                    confirmation: {
                        header: string;
                        confirm: string;
                        description: {
                            line1: string;
                            line2: string;
                            line3: string;
                        };
                    };
                    prune: {
                        label: string;
                        on: string;
                        off: string;
                    };
                };
            };
            notification: {
                fetch: {
                    error: string;
                };
                submit: {
                    success: string;
                    error: string;
                };
                restore: {
                    success: string;
                    error: string;
                };
                restart: {
                    success: string;
                    error: string;
                };
            };
        };
        view: {
            actions: {
                i18nCopyItems: {
                    confirmation: {
                        header: string;
                        confirm: string;
                        content: string;
                    };
                };
                changeLanguage: {
                    confirmation: {
                        header: string;
                        confirm: string;
                        content: string;
                    };
                };
            };
        };
    };
    components: {
        toggle: {
            enabled: string;
            disabled: string;
        };
        navigationItem: {
            action: {
                newItem: string;
                edit: string;
                view: string;
                restore: string;
                remove: string;
            };
            badge: {
                removed: string;
                draft: string;
                published: string;
            };
            related: {
                localeMissing: string;
            };
        };
        confirmation: {
            dialog: {
                button: {
                    cancel: string;
                    confirm: string;
                };
                description: string;
                header: string;
            };
        };
        notAccessPage: {
            back: string;
        };
    };
    view: {
        i18n: {
            fill: {
                option: string;
                cta: {
                    header: string;
                    button: string;
                };
            };
        };
    };
};
export default tr;
export type TR = typeof tr;
