"use strict";
const ___default = require("lodash");
const z = require("zod");
const fp = require("lodash/fp");
const require$$1 = require("crypto");
const require$$0$1 = require("child_process");
const has = require("lodash/has");
const mapValues = require("lodash/mapValues");
const snakeCase = require("lodash/snakeCase");
const camelCase = require("lodash/camelCase");
const mapKeys = require("lodash/mapKeys");
const require$$0$2 = require("os");
const require$$0$4 = require("path");
const require$$0$3 = require("fs");
const require$$0$5 = require("assert");
const require$$2 = require("events");
const require$$0$7 = require("buffer");
const require$$0$6 = require("stream");
const require$$2$1 = require("util");
const require$$0$8 = require("constants");
require("node:stream");
const slugify = require("@sindresorhus/slugify");
const z$1 = require("zod/v4");
const pluralize = require("pluralize");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const ___default__default = /* @__PURE__ */ _interopDefault(___default);
const z__namespace = /* @__PURE__ */ _interopNamespace(z);
const require$$1__default = /* @__PURE__ */ _interopDefault(require$$1);
const require$$0__default = /* @__PURE__ */ _interopDefault(require$$0$1);
const has__default = /* @__PURE__ */ _interopDefault(has);
const mapValues__default = /* @__PURE__ */ _interopDefault(mapValues);
const snakeCase__default = /* @__PURE__ */ _interopDefault(snakeCase);
const camelCase__default = /* @__PURE__ */ _interopDefault(camelCase);
const mapKeys__default = /* @__PURE__ */ _interopDefault(mapKeys);
const require$$0__default$1 = /* @__PURE__ */ _interopDefault(require$$0$2);
const require$$0__default$3 = /* @__PURE__ */ _interopDefault(require$$0$4);
const require$$0__default$2 = /* @__PURE__ */ _interopDefault(require$$0$3);
const require$$0__default$4 = /* @__PURE__ */ _interopDefault(require$$0$5);
const require$$2__default = /* @__PURE__ */ _interopDefault(require$$2);
const require$$0__default$6 = /* @__PURE__ */ _interopDefault(require$$0$7);
const require$$0__default$5 = /* @__PURE__ */ _interopDefault(require$$0$6);
const require$$2__default$1 = /* @__PURE__ */ _interopDefault(require$$2$1);
const require$$0__default$7 = /* @__PURE__ */ _interopDefault(require$$0$8);
const slugify__default = /* @__PURE__ */ _interopDefault(slugify);
const z__namespace$1 = /* @__PURE__ */ _interopNamespace(z$1);
const pluralize__default = /* @__PURE__ */ _interopDefault(pluralize);
const navigationCustomFieldBase = z__namespace.object({
  name: z__namespace.string({ required_error: "requiredError" }).nonempty("requiredError").refine((current) => !current.includes(" "), { message: "noSpaceError" }),
  label: z__namespace.string({ required_error: "requiredError" }).nonempty("requiredError"),
  description: z__namespace.string().optional(),
  placeholder: z__namespace.string().optional(),
  required: z__namespace.boolean().optional(),
  enabled: z__namespace.boolean().optional()
});
const navigationItemCustomFieldSelect = navigationCustomFieldBase.extend({
  type: z__namespace.literal("select"),
  multi: z__namespace.boolean(),
  options: z__namespace.array(z__namespace.string(), { required_error: "requiredError" }).min(1, { message: "requiredError" })
});
const navigationItemCustomFieldPrimitive = navigationCustomFieldBase.extend({
  type: z__namespace.enum(["boolean", "string"]),
  multi: z__namespace.literal(false).optional(),
  options: z__namespace.array(z__namespace.string()).max(0).optional()
});
const navigationItemCustomFieldMedia = navigationCustomFieldBase.extend({
  type: z__namespace.literal("media"),
  multi: z__namespace.literal(false).optional(),
  options: z__namespace.array(z__namespace.string()).max(0).optional()
});
const navigationItemCustomField$1 = z__namespace.discriminatedUnion("type", [
  navigationItemCustomFieldPrimitive,
  navigationItemCustomFieldMedia,
  navigationItemCustomFieldSelect
]);
const navigationItemAdditionalField$1 = z__namespace.union([
  z__namespace.literal("audience"),
  navigationItemCustomField$1
]);
const configSchema$1 = z__namespace.object({
  additionalFields: z__namespace.array(navigationItemAdditionalField$1),
  allowedLevels: z__namespace.number(),
  contentTypes: z__namespace.array(z__namespace.string()),
  defaultContentType: z__namespace.string().optional(),
  contentTypesNameFields: z__namespace.record(z__namespace.string(), z__namespace.array(z__namespace.string())),
  contentTypesPopulate: z__namespace.record(z__namespace.string(), z__namespace.array(z__namespace.string())),
  gql: z__namespace.object({
    navigationItemRelated: z__namespace.array(z__namespace.string())
  }),
  pathDefaultFields: z__namespace.record(z__namespace.string(), z__namespace.any()),
  cascadeMenuAttached: z__namespace.boolean(),
  preferCustomContentTypes: z__namespace.boolean(),
  isCacheEnabled: z__namespace.boolean().optional()
});
const audienceDBSchema = z__namespace.object({
  id: z__namespace.number(),
  documentId: z__namespace.string(),
  name: z__namespace.string(),
  key: z__namespace.string()
});
const navigationItemType$1 = z__namespace.enum(["INTERNAL", "EXTERNAL", "WRAPPER"]);
const navigationItemDBBaseSchema = z__namespace.object({
  id: z__namespace.number(),
  documentId: z__namespace.string(),
  title: z__namespace.string(),
  type: navigationItemType$1,
  path: z__namespace.string().or(z__namespace.null()).optional(),
  slug: z__namespace.string().or(z__namespace.null()).optional(),
  externalPath: z__namespace.string().or(z__namespace.null()).optional(),
  uiRouterKey: z__namespace.string(),
  menuAttached: z__namespace.boolean(),
  order: z__namespace.number().int(),
  collapsed: z__namespace.boolean(),
  related: z__namespace.object({ documentId: z__namespace.string().optional(), __type: z__namespace.string() }).catchall(z__namespace.unknown()).nullish().optional(),
  additionalFields: z__namespace.record(z__namespace.string(), z__namespace.unknown()).or(z__namespace.null()).optional(),
  audience: z__namespace.array(audienceDBSchema).or(z__namespace.null()).optional(),
  autoSync: z__namespace.boolean().or(z__namespace.null()).optional()
});
const readNavigationItemFromLocaleSchema = navigationItemDBBaseSchema.omit({
  related: true
}).pick({
  path: true,
  type: true,
  uiRouterKey: true,
  title: true,
  externalPath: true
}).extend({ related: z__namespace.unknown().optional() });
const navigationItemDBSchema = navigationItemDBBaseSchema.extend({
  parent: z__namespace.lazy(() => navigationItemDBSchema.or(z__namespace.null())).optional(),
  items: z__namespace.lazy(() => navigationItemDBSchema.array()).optional(),
  master: z__namespace.lazy(() => navigationDBSchema(false)).optional()
});
const navigationItemsDBSchema = z__namespace.array(navigationItemDBSchema);
const navigationDBSchema = (withItems) => z__namespace.object({
  id: z__namespace.number(),
  documentId: z__namespace.string(),
  name: z__namespace.string(),
  slug: z__namespace.string(),
  locale: z__namespace.string(),
  visible: z__namespace.boolean(),
  items: withItems ? z__namespace.array(navigationItemDBSchema) : navigationItemDBSchema.array().optional()
});
const createNavigationSchema$1 = navigationDBSchema(false).omit({
  items: true,
  id: true,
  documentId: true,
  slug: true,
  locale: true
}).extend({
  documentId: z__namespace.string().optional(),
  id: z__namespace.undefined().optional()
});
const updateNavigationItemSchema = navigationItemDBBaseSchema.omit({ id: true, documentId: true }).extend({
  id: z__namespace.number().optional(),
  documentId: z__namespace.string().optional(),
  items: z__namespace.lazy(() => updateNavigationItemsSchema).or(z__namespace.null()).optional(),
  updated: z__namespace.boolean().optional(),
  removed: z__namespace.boolean().optional()
});
const updateNavigationItemsSchema = z__namespace.array(updateNavigationItemSchema);
const updateNavigationSchema$1 = navigationDBSchema(false).extend({
  items: updateNavigationItemsSchema
}).partial().required({
  id: true,
  documentId: true
});
const contentType = z__namespace.enum(["collectionType", "singleType"]);
const contentTypeInfo = z__namespace.object({
  singularName: z__namespace.string(),
  pluralName: z__namespace.string(),
  displayName: z__namespace.string(),
  description: z__namespace.string().optional(),
  name: z__namespace.string().optional()
});
const contentTypeAttributeValidator = z__namespace.object({
  required: z__namespace.boolean().optional(),
  max: z__namespace.number().optional(),
  min: z__namespace.number().optional(),
  minLength: z__namespace.number().optional(),
  maxLength: z__namespace.number().optional(),
  private: z__namespace.boolean().optional(),
  configurable: z__namespace.boolean().optional(),
  default: z__namespace.any().optional()
});
const contentTypeFieldTypeSchema = z__namespace.enum([
  "string",
  "text",
  "richtext",
  "blocks",
  "email",
  "password",
  "date",
  "time",
  "datetime",
  "timestamp",
  "boolean",
  "integer",
  "biginteger",
  "float",
  "decimal",
  "json",
  "relation",
  "media"
]);
const simpleContentTypeAttribute = contentTypeAttributeValidator.extend({
  type: contentTypeFieldTypeSchema
});
const contentTypeEnumerationAttribute = contentTypeAttributeValidator.extend({
  type: z__namespace.literal("enumeration"),
  enum: z__namespace.string().array()
});
const contentTypeComponentAttribute = z__namespace.object({
  type: z__namespace.literal("component"),
  component: z__namespace.string(),
  repeatable: z__namespace.boolean().optional()
});
const contentTypeDynamicZoneAttribute = z__namespace.object({
  type: z__namespace.literal("dynamiczone"),
  components: z__namespace.string().array()
});
const contentTypeUidAttribute = z__namespace.object({
  type: z__namespace.literal("uid")
});
const contentTypeMediaAttribute = z__namespace.object({
  type: z__namespace.literal("media"),
  allowedTypes: z__namespace.enum(["images", "videos", "audios", "files"]).array(),
  required: z__namespace.boolean().optional()
});
const contentTypeRelationType = z__namespace.enum([
  "oneToOne",
  "oneToMany",
  "manyToOne",
  "manyToMany",
  "morphToMany",
  "manyToMorph"
]);
const contentTypeRelationAttribute = z__namespace.object({
  type: z__namespace.literal("relation"),
  relation: contentTypeRelationType,
  target: z__namespace.string(),
  mappedBy: z__namespace.string().optional(),
  inversedBy: z__namespace.string().optional()
});
const contentTypeAttributes = z__namespace.record(
  z__namespace.string(),
  z__namespace.union([
    simpleContentTypeAttribute,
    contentTypeEnumerationAttribute,
    contentTypeComponentAttribute,
    contentTypeDynamicZoneAttribute,
    contentTypeRelationAttribute,
    contentTypeMediaAttribute,
    contentTypeUidAttribute
  ])
);
const contentTypeFullSchema = z__namespace.object({
  kind: contentType,
  collectionName: z__namespace.string(),
  info: contentTypeInfo,
  options: z__namespace.object({
    draftAndPublish: z__namespace.boolean().optional(),
    hidden: z__namespace.boolean().optional(),
    templateName: z__namespace.string().optional()
  }).optional(),
  attributes: contentTypeAttributes,
  actions: z__namespace.record(z__namespace.string(), z__namespace.any()).optional(),
  lifecycles: z__namespace.record(z__namespace.string(), z__namespace.any()).optional(),
  uid: z__namespace.string(),
  apiName: z__namespace.string().optional(),
  // TODO?: remove
  associations: z__namespace.object({
    model: z__namespace.string(),
    alias: z__namespace.string()
  }).array().optional(),
  modelName: z__namespace.string().optional(),
  plugin: z__namespace.string().optional(),
  pluginOptions: z__namespace.record(z__namespace.string(), z__namespace.any()).optional(),
  isSingle: z__namespace.boolean().optional()
});
contentTypeFullSchema.pick({
  info: true,
  kind: true,
  attributes: true,
  options: true
});
const applySchemaRefineHigher = (baseGetter, updater) => (modifier) => {
  updater(modifier(baseGetter()));
};
let configSchema = configSchema$1;
const updateConfigSchema = applySchemaRefineHigher(
  () => configSchema,
  (next) => {
    configSchema = next;
  }
);
let navigationItemAdditionalField = navigationItemAdditionalField$1;
const updateNavigationItemAdditionalField = applySchemaRefineHigher(
  () => navigationItemAdditionalField,
  (next) => {
    navigationItemAdditionalField = next;
  }
);
let navigationItemCustomField = navigationItemCustomField$1;
const updateNavigationItemCustomField = applySchemaRefineHigher(
  () => navigationItemCustomField,
  (next) => {
    navigationItemCustomField = next;
  }
);
let createNavigationSchema = createNavigationSchema$1;
const updateCreateNavigationSchema = applySchemaRefineHigher(
  () => createNavigationSchema,
  (next) => {
    createNavigationSchema = next;
  }
);
let updateNavigationSchema = updateNavigationSchema$1;
const updateUpdateNavigationSchema = applySchemaRefineHigher(
  () => updateNavigationSchema,
  (next) => {
    updateNavigationSchema = next;
  }
);
const DynamicSchemas = {
  get configSchema() {
    return configSchema;
  },
  get navigationItemAdditionalField() {
    return navigationItemAdditionalField;
  },
  get navigationItemCustomField() {
    return navigationItemCustomField;
  },
  get createNavigationSchema() {
    return createNavigationSchema;
  },
  get updateNavigationSchema() {
    return updateNavigationSchema;
  }
};
const UID_REGEX = /^(?<type>[a-z0-9-]+)\:{2}(?<api>[a-z0-9-]+)\.{1}(?<contentType>[a-z0-9-]+)$/i;
const allLifecycleHooks = [
  "beforeCreate",
  "beforeCreateMany",
  "afterCreate",
  "afterCreateMany",
  "beforeUpdate",
  "beforeUpdateMany",
  "afterUpdate",
  "afterUpdateMany",
  "beforeDelete",
  "beforeDeleteMany",
  "afterDelete",
  "afterDeleteMany",
  "beforeCount",
  "afterCount",
  "beforeFindOne",
  "afterFindOne",
  "beforeFindMany",
  "afterFindMany"
];
const RELATED_ITEM_SEPARATOR = "$";
const ALLOWED_CONTENT_TYPES = ["api::", "plugin::"];
const RESTRICTED_CONTENT_TYPES = [
  "admin::",
  "plugin::content-releases",
  "plugin::i18n.locale",
  "plugin::navigation",
  "plugin::review-workflows",
  "plugin::users-permissions",
  "plugin::upload.folder"
];
const CONTENT_TYPES_NAME_FIELDS_DEFAULTS = ["title", "subject", "name"];
const KIND_TYPES = { SINGLE: "singleType" };
const FORBIDDEN_CUSTOM_FIELD_NAMES = [
  "title",
  "type",
  "path",
  "externalPath",
  "uiRouterKey",
  "menuAttached",
  "order",
  "collapsed",
  "related",
  "parent",
  "master",
  "audience",
  "additionalFields"
];
const getCustomFields = (additionalFields) => additionalFields.filter((field) => field !== "audience");
const validateAdditionalFields = (additionalFields) => {
  const customFields = getCustomFields(additionalFields);
  if (customFields.length !== ___default.uniqBy(customFields, "name").length) {
    throw new Error("All names of custom fields must be unique.");
  }
  if (!___default.isNil(
    ___default.find(
      customFields,
      (field) => typeof field === "object" && ___default.includes(FORBIDDEN_CUSTOM_FIELD_NAMES, field.name)
    )
  )) {
    throw new Error(
      `Name of custom field cannot be one of: ${FORBIDDEN_CUSTOM_FIELD_NAMES.join(", ")}`
    );
  }
};
const assertNotEmpty = (value, customError) => {
  if (value !== void 0 && value !== null) {
    return;
  }
  throw customError ?? new Error("Non-empty value expected, empty given");
};
const resolveGlobalLikeId = (uid = "") => {
  const parse2 = (str2) => str2.split("-").map((_) => ___default.capitalize(_)).join("");
  const [type2, scope, contentTypeName] = splitTypeUid(uid);
  if (type2 === "api") {
    return parse2(contentTypeName);
  }
  return `${parse2(scope)}${parse2(contentTypeName)}`;
};
const splitTypeUid = (uid = "") => {
  return uid.split(UID_REGEX).filter((s) => s && s.length > 0);
};
const buildHookListener = (contentTypeName, context) => (hookName) => [
  hookName,
  async (event) => {
    await getPluginService(context, "common").runLifeCycleHook({
      contentTypeName,
      hookName,
      event
    });
  }
];
const buildAllHookListeners = (contentTypeName, context) => Object.fromEntries(allLifecycleHooks.map(buildHookListener(contentTypeName, context)));
const getPluginModels = ({
  strapi: strapi2
}) => {
  const plugin = strapi2.plugin("navigation");
  return {
    masterModel: plugin.contentType("navigation"),
    itemModel: plugin.contentType("navigation-item"),
    relatedModel: plugin.contentType("navigations-items-related"),
    audienceModel: plugin.contentType("audience")
  };
};
function getPluginService({ strapi: strapi2 }, name) {
  return strapi2.plugin("navigation").service(name);
}
const parsePopulateQuery = (populate2) => {
  if (populate2 === "*") {
    return "*";
  } else if (typeof populate2 === "string") {
    return [populate2];
  } else if (populate2 === false) {
    return [];
  } else if (populate2 === true) {
    return "*";
  } else {
    return populate2;
  }
};
const isContentTypeEligible = (uid = "") => {
  const isOneOfAllowedType = !!ALLOWED_CONTENT_TYPES.find((_) => uid.includes(_));
  const isNoneOfRestricted = !RESTRICTED_CONTENT_TYPES.find((_) => uid.includes(_) || uid === _);
  return !!uid && isOneOfAllowedType && isNoneOfRestricted;
};
const singularize = (value = "") => {
  return ___default.last(value) === "s" ? value.substr(0, value.length - 1) : value;
};
const configSetup = async ({
  strapi: strapi2,
  forceDefault = false
}) => {
  const pluginStore = strapi2.store({
    type: "plugin",
    name: "navigation"
  });
  const getFromPluginDefaults = await strapi2.plugin("navigation").config;
  const configRaw = forceDefault ? {} : {
    ...config.default,
    ...await pluginStore.get({
      key: "config"
    }) ?? config.default
  };
  let config$1 = ___default.isEmpty(configRaw) ? configRaw : DynamicSchemas.configSchema.parse(configRaw);
  const getWithFallback = getWithFallbackFactory(config$1, getFromPluginDefaults);
  config$1 = {
    additionalFields: getWithFallback("additionalFields"),
    contentTypes: getWithFallback("contentTypes"),
    contentTypesNameFields: getWithFallback("contentTypesNameFields"),
    contentTypesPopulate: getWithFallback("contentTypesPopulate"),
    defaultContentType: getWithFallback("defaultContentType"),
    allowedLevels: getWithFallback("allowedLevels"),
    gql: getWithFallback("gql"),
    pathDefaultFields: getWithFallback("pathDefaultFields"),
    cascadeMenuAttached: getWithFallback("cascadeMenuAttached"),
    preferCustomContentTypes: getWithFallback("preferCustomContentTypes"),
    isCacheEnabled: getWithFallback("isCacheEnabled")
  };
  handleDeletedContentTypes(config$1, { strapi: strapi2 });
  validateAdditionalFields(config$1.additionalFields);
  await pluginStore.set({
    key: "config",
    value: config$1
  });
  return config$1;
};
const getWithFallbackFactory = (config2, fallback) => (key) => {
  const value = config2?.[key] ?? fallback(key);
  assertNotEmpty(value, new Error(`[Navigation] Config "${key}" is undefined`));
  return value;
};
const handleDeletedContentTypes = (config2, { strapi: strapi2 }) => {
  const notAvailableContentTypes = config2.contentTypes.filter(
    (contentType2) => !strapi2.contentTypes[contentType2]
  );
  if (notAvailableContentTypes.length === 0) {
    return;
  }
  const notAvailableContentTypesGraphQL = notAvailableContentTypes.map(resolveGlobalLikeId);
  config2.contentTypes = config2.contentTypes.filter(
    (contentType2) => !notAvailableContentTypes.includes(contentType2)
  );
  config2.contentTypesNameFields = Object.fromEntries(
    Object.entries(config2.contentTypesNameFields).filter(
      ([contentType2]) => !notAvailableContentTypes.includes(contentType2)
    )
  );
  config2.gql.navigationItemRelated = config2.gql.navigationItemRelated.filter(
    (contentType2) => !notAvailableContentTypesGraphQL.includes(contentType2)
  );
};
const config = {
  default: {
    additionalFields: [],
    allowedLevels: 2,
    contentTypes: [],
    defaultContentType: "",
    contentTypesNameFields: {},
    contentTypesPopulate: {},
    gql: {
      navigationItemRelated: []
    },
    pathDefaultFields: {},
    pruneObsoleteI18nNavigations: false,
    cascadeMenuAttached: true,
    preferCustomContentTypes: false,
    isCacheEnabled: false
  }
};
const getAudienceRepository = ___default.once((context) => ({
  find(where, limit) {
    const {
      audienceModel: { uid }
    } = getPluginModels(context);
    return context.strapi.query(uid).findMany({ where, limit }).then(audienceDBSchema.array().parse);
  }
}));
const getGenericRepository = (context, uid) => ({
  findFirst(populate2, status2, extra = {}) {
    return context.strapi.documents(uid).findFirst({ populate: parsePopulateQuery(populate2), status: status2, ...extra });
  },
  findById(documentId, populate2, status2, extra = {}) {
    return context.strapi.documents(uid).findOne({ documentId, populate: parsePopulateQuery(populate2), status: status2, ...extra });
  },
  findManyById(documentIds, populate2, status2) {
    return context.strapi.documents(uid).findMany({
      where: { documentId: { $in: documentIds } },
      populate: parsePopulateQuery(populate2),
      status: status2
    });
  },
  findMany(where, populate2, status2, locale2) {
    return context.strapi.documents(uid).findMany({ where, populate: parsePopulateQuery(populate2), status: status2, locale: locale2 });
  },
  count(where, status2) {
    return context.strapi.documents(uid).count({
      where,
      status: status2
    });
  }
});
const getNavigationItemRepository = ___default.once((context) => ({
  async save({ item, locale: locale2 }) {
    const { itemModel } = getPluginModels(context);
    const { __type, documentId } = item?.related ?? {};
    const repository = __type ? getGenericRepository(context, __type) : void 0;
    const related = __type && repository ? documentId ? await repository.findById(documentId, void 0, void 0, { locale: locale2 }) : await repository.findFirst(void 0, void 0, { locale: locale2 }) : void 0;
    if (typeof item.documentId === "string") {
      const { documentId: documentId2, ...rest } = item;
      return context.strapi.documents(itemModel.uid).update({
        documentId: item.documentId,
        data: {
          ...rest,
          related: related ? { ...related, __type } : void 0
        },
        locale: locale2
      });
    } else {
      return context.strapi.documents(itemModel.uid).create({
        data: {
          ...item,
          related: related ? { ...related, __type } : void 0
        },
        locale: locale2
      });
    }
  },
  find({ filters: filters2, locale: locale2, limit, order, populate: populate2 }) {
    const { itemModel } = getPluginModels(context);
    return context.strapi.documents(itemModel.uid).findMany({ filters: filters2, locale: locale2, limit, populate: populate2, orderBy: order }).then((items) => items.map(flattenRelated)).then(navigationItemsDBSchema.parse).then((items) => items.map(removeSensitiveFields));
  },
  findV4({ filters: filters2, locale: locale2, limit, order, populate: populate2 }) {
    const { itemModel } = getPluginModels(context);
    return context.strapi.documents(itemModel.uid).findMany({ filters: filters2, locale: locale2, limit, populate: populate2, orderBy: order });
  },
  count(where) {
    const { itemModel } = getPluginModels(context);
    return context.strapi.query(itemModel.uid).count({ where });
  },
  remove(item) {
    const { itemModel } = getPluginModels(context);
    return context.strapi.documents(itemModel.uid).delete({
      documentId: item.documentId,
      populate: "*"
    });
  },
  removeForIds(ids) {
    const { itemModel } = getPluginModels(context);
    return ids.map(
      (id) => context.strapi.documents(itemModel.uid).delete({ documentId: id, populate: "*" })
    );
  },
  findForMasterIds(ids) {
    const { itemModel } = getPluginModels(context);
    return context.strapi.query(itemModel.uid).findMany({
      where: {
        $or: ids.map((id) => ({ master: id }))
      },
      limit: Number.MAX_SAFE_INTEGER
    }).then(navigationItemsDBSchema.parse);
  }
}));
const sensitiveFields = ["id", "publishedAt", "createdAt", "updatedAt", "locale"];
const removeSensitiveFields = ({
  related,
  items = [],
  ...item
}) => ({
  ...item,
  items: items.map(removeSensitiveFields),
  related: related ? ___default.omit(related, sensitiveFields) : void 0
});
const flattenRelated = ({ related, ...item }) => ({
  ...item,
  related: related?.[0]
});
class NavigationError extends Error {
  constructor(message, additionalInfo) {
    super(message);
    this.additionalInfo = additionalInfo;
    this.type = "NavigationError";
  }
}
class FillNavigationError extends NavigationError {
  constructor() {
    super(...arguments);
    this.type = "FillNavigationError";
  }
}
class InvalidParamNavigationError extends NavigationError {
  constructor() {
    super(...arguments);
    this.type = "InvalidParamNavigationError";
  }
}
const calculateItemsRequirement = (populate2) => {
  return populate2 === true ? true : Array.isArray(populate2) ? populate2.includes("items") : false;
};
const getNavigationRepository = ___default.once((context) => ({
  find({ filters: filters2, locale: locale2, limit, orderBy, populate: populate2 }) {
    const { masterModel } = getPluginModels(context);
    return context.strapi.documents(masterModel.uid).findMany({ filters: filters2, locale: locale2, limit, populate: populate2, orderBy }).then(
      (data) => data.map(({ items, ...navigation2 }) => ({
        ...navigation2,
        items: items?.map(flattenRelated)
      }))
    ).then(
      (data) => data.map(({ items, ...navigation2 }) => ({
        ...navigation2,
        items: items?.map(removeSensitiveFields)
      }))
    ).then((data) => {
      return navigationDBSchema(calculateItemsRequirement(populate2)).array().parse(data);
    });
  },
  findOne({ locale: locale2, filters: filters2, populate: populate2 }) {
    const { masterModel } = getPluginModels(context);
    return context.strapi.documents(masterModel.uid).findOne({ documentId: filters2.documentId, locale: locale2, populate: populate2 }).then((data) => data ? { ...data, items: data.items?.map(flattenRelated) } : data).then((data) => {
      return navigationDBSchema(calculateItemsRequirement(populate2)).parse(data);
    }).then((navigation2) => ({
      ...navigation2,
      items: navigation2.items?.map(removeSensitiveFields)
    }));
  },
  async save(navigation2) {
    const { masterModel } = getPluginModels(context);
    const { documentId, locale: locale2, ...rest } = navigation2;
    if (documentId) {
      return context.strapi.documents(masterModel.uid).update({
        locale: locale2,
        documentId,
        data: ___default.omit(rest, ["id", "documentId"]),
        populate: ["items"]
      }).then(navigationDBSchema(false).parse);
    } else {
      return context.strapi.documents(masterModel.uid).create({
        locale: locale2,
        data: {
          ...rest,
          populate: ["items"]
        }
      }).then(navigationDBSchema(false).parse);
    }
  },
  remove(navigation2) {
    const { masterModel } = getPluginModels(context);
    if (!navigation2.documentId) {
      throw new NavigationError("Document id is required.");
    }
    return context.strapi.documents(masterModel.uid).delete({ documentId: navigation2.documentId });
  }
}));
const DEFAULT_NAVIGATION_NAME = "Navigation";
const DEFAULT_NAVIGATION_SLUG = "navigation";
const navigationSetup = async (context) => {
  const commonService2 = getPluginService(context, "common");
  const { defaultLocale, restLocale = [] } = await commonService2.readLocale();
  const navigationRepository = getNavigationRepository(context);
  const navigations = await navigationRepository.find({
    limit: Number.MAX_SAFE_INTEGER,
    filters: {},
    locale: "*"
  });
  if (navigations.length === 0) {
    navigations.push(
      await navigationRepository.save({
        name: DEFAULT_NAVIGATION_NAME,
        visible: true,
        locale: defaultLocale,
        slug: DEFAULT_NAVIGATION_SLUG
      })
    );
  }
  const defaultLocaleNavigations = navigations.filter(({ locale: locale2 }) => locale2 === defaultLocale);
  for (const defaultLocaleNavigation of defaultLocaleNavigations) {
    for (const otherLocale of restLocale) {
      const otherLocaleMissing = !navigations.find(
        ({ locale: locale2, documentId }) => documentId === defaultLocaleNavigation.documentId && otherLocale === locale2
      );
      if (otherLocaleMissing) {
        await navigationRepository.save({
          documentId: defaultLocaleNavigation.documentId,
          name: defaultLocaleNavigation.name,
          locale: otherLocale,
          visible: defaultLocaleNavigation.visible,
          slug: defaultLocaleNavigation.slug
        });
      }
    }
  }
};
const permissions = {
  render: function(uid) {
    return `plugin::navigation.${uid}`;
  },
  navigation: {
    read: "read",
    update: "update",
    settings: "settings"
  }
};
const setupPermissions = async ({ strapi: strapi2 }) => {
  const actions = [
    {
      section: "plugins",
      displayName: "Read",
      uid: permissions.navigation.read,
      pluginName: "navigation"
    },
    {
      section: "plugins",
      displayName: "Update",
      uid: permissions.navigation.update,
      pluginName: "navigation"
    },
    {
      section: "plugins",
      displayName: "Settings",
      uid: permissions.navigation.settings,
      pluginName: "navigation"
    }
  ];
  await strapi2.admin.services.permission.actionProvider.registerMany(actions);
};
const LOCALE_SCALAR_TYPENAME = "I18NLocaleCode";
const renderNavigation = ({ strapi: strapi2, nexus }) => {
  const { nonNull, list, stringArg, booleanArg } = nexus;
  const defaultArgs = {
    navigationIdOrSlug: nonNull(stringArg()),
    type: "NavigationRenderType",
    menuOnly: booleanArg(),
    path: stringArg(),
    locale: nexus.arg({ type: LOCALE_SCALAR_TYPENAME })
  };
  const args = defaultArgs;
  return {
    args,
    type: nonNull(list("NavigationItem")),
    resolve(_, { navigationIdOrSlug, type: type2, menuOnly, path: rootPath, locale: locale2 }) {
      const idOrSlug = z.z.string().parse(navigationIdOrSlug);
      return getPluginService({ strapi: strapi2 }, "client").render({
        idOrSlug,
        type: type2,
        rootPath,
        locale: locale2,
        menuOnly,
        wrapRelated: true
      });
    }
  };
};
const renderNavigationChild = ({ strapi: strapi2, nexus }) => {
  const { nonNull, list, stringArg, booleanArg } = nexus;
  return {
    type: nonNull(list("NavigationItem")),
    args: {
      documentId: nonNull(stringArg()),
      childUiKey: nonNull(stringArg()),
      type: "NavigationRenderType",
      menuOnly: booleanArg()
    },
    resolve(_, args) {
      const { documentId, childUIKey, type: type2, menuOnly } = args;
      const idOrSlug = z.z.string().parse(documentId);
      return getPluginService({ strapi: strapi2 }, "client").renderChildren({
        idOrSlug,
        childUIKey,
        type: type2,
        menuOnly,
        wrapRelated: true
      });
    }
  };
};
const getQueries = (context) => {
  const queries = {
    renderNavigationChild,
    renderNavigation
  };
  return context.nexus.extendType({
    type: "Query",
    definition(t) {
      for (const [name, configFactory] of Object.entries(queries)) {
        const config2 = configFactory(context);
        t.field(name, config2);
      }
    }
  });
};
const getResolversConfig = () => ({
  "Query.renderNavigationChild": { auth: false },
  "Query.renderNavigation": { auth: false }
});
const contentTypes$1 = ({ nexus }) => nexus.objectType({
  name: "ContentTypes",
  definition(t) {
    t.nonNull.string("uid");
    t.nonNull.string("name");
    t.nonNull.boolean("isSingle");
    t.nonNull.string("collectionName");
    t.nonNull.string("contentTypeName");
    t.nonNull.string("label");
    t.nonNull.string("relatedField");
    t.nonNull.string("labelSingular");
    t.nonNull.string("endpoint");
    t.nonNull.boolean("available");
    t.nonNull.boolean("visible");
  }
});
const contentTypesNameFields = ({ nexus, strapi: strapi2 }) => nexus.objectType({
  name: "ContentTypesNameFields",
  async definition(t) {
    t.nonNull.list.nonNull.string("default");
    const commonService2 = getPluginService({ strapi: strapi2 }, "common");
    const pluginStore = await commonService2.getPluginStore();
    const config2 = DynamicSchemas.configSchema.parse(await pluginStore.get({ key: "config" }));
    const contentTypesNameFields2 = config2.contentTypesNameFields;
    Object.keys(contentTypesNameFields2 || {}).forEach((key) => t.nonNull.list.string(key));
  }
});
const createNavigations = ({ nexus }) => nexus.inputObjectType({
  name: "CreateNavigation",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.list.field("items", { type: "CreateNavigationItem" });
  }
});
const createNavigationItem = ({ nexus }) => nexus.inputObjectType({
  name: "CreateNavigationItem",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.field("type", { type: "NavigationItemType" });
    t.string("path");
    t.string("externalPath");
    t.nonNull.string("uiRouterKey");
    t.nonNull.boolean("menuAttached");
    t.nonNull.int("order");
    t.string("parent");
    t.string("master");
    t.list.field("items", { type: "CreateNavigationItem" });
    t.list.string("audience");
    t.field("related", { type: "CreateNavigationRelated" });
  }
});
const createNavigationRelated = ({ nexus }) => nexus.inputObjectType({
  name: "CreateNavigationRelated",
  definition(t) {
    t.nonNull.string("ref");
    t.nonNull.string("field");
    t.nonNull.string("refId");
  }
});
const navigation$1 = ({ nexus }) => nexus.objectType({
  name: "Navigation",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("documentId");
    t.nonNull.string("name");
    t.nonNull.string("slug");
    t.nonNull.boolean("visible");
  }
});
const navigationConfig = ({ nexus }) => nexus.objectType({
  name: "NavigationConfig",
  definition(t) {
    t.int("allowedLevels");
    t.nonNull.list.string("additionalFields");
    t.field("contentTypesNameFields", { type: "ContentTypesNameFields" });
    t.list.field("contentTypes", { type: "ContentTypes" });
  }
});
const navigationDetails = ({ nexus }) => nexus.objectType({
  name: "NavigationDetails",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("documentId");
    t.nonNull.string("name");
    t.nonNull.string("slug");
    t.nonNull.boolean("visible");
    t.nonNull.list.field("items", { type: "NavigationItem" });
  }
});
const navigationItem$1 = ({ nexus, config: config2 }) => nexus.objectType({
  name: "NavigationItem",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("documentId");
    t.nonNull.string("title");
    t.nonNull.field("type", { type: "NavigationItemType" });
    t.string("path");
    t.string("externalPath");
    t.nonNull.string("uiRouterKey");
    t.nonNull.boolean("menuAttached");
    t.nonNull.int("order");
    t.field("parent", { type: "NavigationItem" });
    t.string("master");
    t.list.field("items", { type: "NavigationItem" });
    t.field("related", { type: "NavigationItemRelated" });
    if (config2.additionalFields.find((field) => field === "audience")) {
      t.list.string("audience");
    }
    t.field("additionalFields", { type: "NavigationItemAdditionalFields" });
    t.string("created_at");
    t.string("updated_at");
    t.string("created_by");
    t.string("updated_by");
    t.string("createdAt");
    t.string("updatedAt");
    t.string("createdBy");
    t.string("updatedBy");
  }
});
const navigationItemAdditionalFields = ({ nexus, config: config2 }) => nexus.objectType({
  name: "NavigationItemAdditionalFields",
  definition(t) {
    config2.additionalFields.forEach((field) => {
      if (field !== "audience") {
        if (field.enabled) {
          switch (field.type) {
            case "media":
              t.field(field.name, { type: "UploadFile" });
              break;
            case "string":
              t.string(field.name);
              break;
            case "boolean":
              t.boolean(field.name);
              break;
            case "select":
              if (field.multi) t.list.string(field.name);
              else t.string(field.name);
              break;
            default:
              throw new Error(
                `Type "${JSON.stringify(field.type)}" is unsupported by custom fields`
              );
          }
        }
      }
    });
  }
});
const navigationItemRelated = ({ strapi: strapi2, nexus, config: config2 }) => {
  const related = config2.gql?.navigationItemRelated;
  const name = "NavigationItemRelated";
  if (related?.length) {
    return nexus.unionType({
      name,
      definition(t) {
        t.members(...related);
      },
      resolveType: (item) => {
        return strapi2.contentTypes[item.__type]?.globalId;
      }
    });
  }
  return nexus.objectType({
    name,
    definition(t) {
      t.int("id");
      t.string("documentId");
      t.string("title");
      t.string("name");
    }
  });
};
const navigationItemType = ({ nexus }) => nexus.enumType({
  name: "NavigationItemType",
  members: ["INTERNAL", "EXTERNAL", "WRAPPER"]
});
const renderType = ({ nexus }) => nexus.enumType({
  name: "NavigationRenderType",
  members: ["FLAT", "TREE"]
});
const typesFactories = [
  navigationItemAdditionalFields,
  navigationItemRelated,
  navigationItem$1,
  renderType,
  navigation$1,
  navigationDetails,
  contentTypesNameFields,
  contentTypes$1,
  navigationConfig,
  createNavigationRelated,
  createNavigationItem,
  createNavigations,
  navigationItemType
];
const getTypes = (context) => {
  return typesFactories.map((factory) => factory(context));
};
const handleConfig = async ({ strapi: strapi2 }) => {
  const extensionService = strapi2.plugin("graphql").service("extension");
  extensionService.shadowCRUD("plugin::navigation.audience").disable();
  extensionService.shadowCRUD("plugin::navigation.navigation").disable();
  extensionService.shadowCRUD("plugin::navigation.navigation-item").disable();
  extensionService.shadowCRUD("plugin::navigation.navigations-items-related").disable();
  const commonService2 = getPluginService({ strapi: strapi2 }, "common");
  const pluginStore = await commonService2.getPluginStore();
  const config2 = DynamicSchemas.configSchema.parse(await pluginStore.get({ key: "config" }));
  extensionService.use(({ strapi: strapi22, nexus }) => {
    const types = getTypes({ strapi: strapi22, nexus, config: config2 });
    const queries = getQueries({ strapi: strapi22, nexus });
    const resolversConfig = getResolversConfig();
    return {
      types: [types, queries],
      resolversConfig
    };
  });
};
const graphQLSetup = async ({ strapi: strapi2 }) => {
  const hasGraphQLPlugin = !!strapi2.plugin("graphql");
  if (hasGraphQLPlugin) {
    await handleConfig({ strapi: strapi2 });
  }
};
const bootstrap = async (context) => {
  await configSetup(context);
  await navigationSetup(context);
  await setupPermissions(context);
  await graphQLSetup(context);
  await strapi.service("plugin::navigation.migrate").migrateRelatedIdToDocumentId();
  strapi.db.lifecycles.subscribe({
    models: ["plugin::i18n.locale"],
    async afterCreate(event) {
      const adminService2 = getPluginService(context, "admin");
      await adminService2.refreshNavigationLocale(event.result?.code);
    }
  });
};
const destroy = ({ strapi: strapi2 }) => {
};
const register = ({ strapi: strapi2 }) => {
};
const schema$3 = {
  collectionName: "audience",
  info: {
    singularName: "audience",
    pluralName: "audiences",
    displayName: "Audience",
    name: "audience"
  },
  options: {
    increments: true,
    comment: "Audience"
  },
  attributes: {
    name: {
      type: "string",
      required: true
    },
    key: {
      type: "uid",
      targetField: "name"
    }
  }
};
const audience = {
  schema: schema$3
};
const lifecycles$1 = buildAllHookListeners("navigation", {
  strapi
});
const schema$2 = {
  collectionName: "navigations",
  info: {
    singularName: "navigation",
    pluralName: "navigations",
    displayName: "Navigation",
    name: "navigation"
  },
  options: {
    comment: ""
  },
  pluginOptions: {
    "content-manager": {
      visible: false
    },
    "content-type-builder": {
      visible: false
    },
    i18n: {
      localized: true
    }
  },
  attributes: {
    name: {
      type: "text",
      configurable: false,
      required: true
    },
    slug: {
      type: "uid",
      target: "name",
      configurable: false,
      required: true
    },
    visible: {
      type: "boolean",
      default: false,
      configurable: false
    },
    items: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::navigation.navigation-item",
      configurable: false,
      mappedBy: "master"
    }
  }
};
const navigation = {
  schema: schema$2,
  lifecycles: lifecycles$1
};
const lifecycles = buildAllHookListeners("navigation-item", {
  strapi
});
const schema$1 = {
  collectionName: "navigations_items",
  info: {
    singularName: "navigation-item",
    pluralName: "navigation-items",
    displayName: "Navigation Item",
    name: "navigation-item"
  },
  options: {
    increments: true,
    timestamps: true,
    comment: "Navigation Item"
  },
  pluginOptions: {
    "content-manager": {
      visible: false
    },
    "content-type-builder": {
      visible: false
    },
    i18n: {
      localized: false
    }
  },
  attributes: {
    title: {
      type: "text",
      configurable: false,
      required: true,
      pluginOptions: {
        i18n: {
          localized: false
        }
      }
    },
    type: {
      type: "enumeration",
      enum: ["INTERNAL", "EXTERNAL", "WRAPPER"],
      default: "INTERNAL",
      configurable: false
    },
    path: {
      type: "text",
      targetField: "title",
      configurable: false
    },
    externalPath: {
      type: "text",
      configurable: false
    },
    uiRouterKey: {
      type: "string",
      configurable: false
    },
    menuAttached: {
      type: "boolean",
      default: false,
      configurable: false
    },
    order: {
      type: "integer",
      default: 0,
      configurable: false
    },
    collapsed: {
      type: "boolean",
      default: false,
      configurable: false
    },
    autoSync: {
      type: "boolean",
      default: true,
      configurable: false
    },
    related: {
      type: "relation",
      relation: "morphToMany",
      required: true,
      configurable: false
    },
    parent: {
      type: "relation",
      relation: "oneToOne",
      target: "plugin::navigation.navigation-item",
      configurable: false,
      default: null
    },
    master: {
      type: "relation",
      relation: "manyToOne",
      target: "plugin::navigation.navigation",
      configurable: false,
      inversedBy: "items"
    },
    audience: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::navigation.audience"
    },
    additionalFields: {
      type: "json",
      require: false,
      default: {}
    }
  }
};
const navigationItem = {
  schema: schema$1,
  lifecycles
};
const contentTypes = {
  audience,
  navigation,
  "navigation-item": navigationItem
};
const booleanStringSchema = z__namespace.enum(["true", "false"]);
const idSchema = z__namespace.string();
const readAllQuerySchema = z__namespace.object({
  locale: z__namespace.string().optional(),
  orderBy: z__namespace.string().optional(),
  orderDirection: z__namespace.enum(["DESC", "ASC"]).optional()
});
const renderTypeSchema = z__namespace.enum(["FLAT", "TREE", "RFR"]);
const statusSchema = z__namespace.enum(["draft", "published"]);
const populateSchema = z__namespace.union([z__namespace.boolean(), z__namespace.string(), z__namespace.string().array(), z__namespace.undefined()]);
const renderQuerySchema = z__namespace.object({
  type: renderTypeSchema.optional(),
  menu: booleanStringSchema.optional(),
  path: z__namespace.string().optional(),
  locale: z__namespace.string().optional(),
  populate: populateSchema.optional(),
  status: statusSchema.optional()
});
const renderChildQueryParams = z__namespace.object({
  type: renderTypeSchema.optional(),
  menu: booleanStringSchema.optional(),
  locale: z__namespace.string().optional(),
  status: statusSchema.optional()
});
const fillFromOtherLocaleParams = z__namespace.object({
  source: z__namespace.string().min(1),
  target: z__namespace.string().min(1),
  documentId: z__namespace.string().min(1)
});
function adminController(context) {
  return {
    getAdminService() {
      return getPluginService(context, "admin");
    },
    getCommonService() {
      return getPluginService(context, "common");
    },
    async get() {
      return await this.getAdminService().get({});
    },
    async post(ctx) {
      const { auditLog } = ctx;
      try {
        return await this.getAdminService().post({
          payload: DynamicSchemas.createNavigationSchema.parse(ctx.request.body),
          auditLog
        });
      } catch (error2) {
        const originalError = error2 instanceof Error ? {
          name: error2.name,
          message: error2.message
        } : {};
        return ctx.internalServerError("Unable to create", { originalError });
      }
    },
    async put(ctx) {
      const {
        params: { documentId },
        auditLog
      } = ctx;
      const body = z__namespace.record(z__namespace.string(), z__namespace.unknown()).parse(ctx.request.body);
      try {
        return await this.getAdminService().put({
          auditLog,
          payload: DynamicSchemas.updateNavigationSchema.parse({
            ...body,
            documentId
          })
        });
      } catch (error2) {
        const originalError = error2 instanceof Error ? {
          name: error2.name,
          message: error2.message
        } : {};
        return ctx.internalServerError("Unable to update", { originalError });
      }
    },
    async delete(ctx) {
      const {
        auditLog,
        params: { documentId }
      } = ctx;
      await this.getAdminService().delete({
        documentId: idSchema.parse(documentId),
        auditLog
      });
      return {};
    },
    config() {
      return this.getAdminService().config({ viaSettingsPage: false });
    },
    async updateConfig(ctx) {
      await this.getAdminService().updateConfig({
        config: DynamicSchemas.configSchema.parse(ctx.request.body)
      });
      return {};
    },
    async restoreConfig() {
      await this.getAdminService().restoreConfig();
      return {};
    },
    settingsConfig() {
      return this.getAdminService().config({ viaSettingsPage: true });
    },
    async settingsRestart() {
      await this.getAdminService().restart();
      return {};
    },
    getById(ctx) {
      const {
        params: { documentId }
      } = ctx;
      return this.getAdminService().getById({ documentId: idSchema.parse(documentId) });
    },
    getContentTypeItems(ctx) {
      const {
        params: { model },
        query = {}
      } = ctx;
      return this.getAdminService().getContentTypeItems({
        query: z__namespace.record(z__namespace.string(), z__namespace.unknown()).parse(query),
        uid: z__namespace.string().parse(model)
      });
    },
    async fillFromOtherLocale(ctx) {
      const { params, auditLog } = ctx;
      const { source, target, documentId } = fillFromOtherLocaleParams.parse(params);
      return await this.getAdminService().fillFromOtherLocale({
        source,
        target,
        documentId,
        auditLog
      });
    },
    readNavigationItemFromLocale(ctx) {
      const {
        params: { source, target },
        query: { path: path2 }
      } = ctx;
      return this.getAdminService().readNavigationItemFromLocale({
        path: z__namespace.string().parse(path2),
        source: idSchema.parse(source),
        target: idSchema.parse(target)
      });
    },
    getSlug(ctx) {
      const {
        query: { q }
      } = ctx;
      return this.getCommonService().getSlug({ query: z__namespace.string().parse(q) }).then((slug) => ({ slug }));
    },
    settingsLocale() {
      return this.getCommonService().readLocale();
    }
  };
}
const sanitizePopulateField = (populate2) => {
  if (!populate2 || populate2 === true || populate2 === "*") {
    return void 0;
  }
  if ("object" === typeof populate2) {
    return void 0;
  }
  if (Array.isArray(populate2)) {
    return populate2;
  }
  return populate2;
};
function clientController(context) {
  return {
    getService() {
      return getPluginService(context, "client");
    },
    async readAll(ctx) {
      try {
        const { query = {} } = ctx;
        const { locale: locale2, orderBy, orderDirection } = readAllQuerySchema.parse(query);
        return await this.getService().readAll({
          locale: locale2,
          orderBy,
          orderDirection
        });
      } catch (error2) {
        if (error2 instanceof Error) {
          return ctx.badRequest(error2.message);
        }
        throw error2;
      }
    },
    async render(ctx) {
      const { params, query = {} } = ctx;
      const {
        type: type2,
        menu: menuOnly,
        path: rootPath,
        locale: locale2,
        populate: populate2,
        status: status2 = "published"
      } = renderQuerySchema.parse(query);
      const idOrSlug = z__namespace.string().parse(params.idOrSlug);
      return await this.getService().render({
        idOrSlug,
        type: type2,
        menuOnly: menuOnly === "true",
        rootPath,
        locale: locale2,
        populate: sanitizePopulateField(
          populateSchema.parse(
            populate2 === "true" ? true : populate2 === "false" ? false : Array.isArray(populate2) ? populate2.map((x) => x === "true" ? true : x === "false" ? false : populate2) : populate2
          )
        ),
        status: status2
      });
    },
    async renderChild(ctx) {
      const { params, query = {} } = ctx;
      const { type: type2, menu: menuOnly, locale: locale2, status: status2 = "published" } = renderChildQueryParams.parse(query);
      const idOrSlug = z__namespace.string().parse(params.idOrSlug);
      const childUIKey = z__namespace.string().parse(params.childUIKey);
      return await this.getService().renderChildren({
        idOrSlug,
        childUIKey,
        type: type2,
        menuOnly: menuOnly === "true",
        locale: locale2,
        status: status2
      });
    }
  };
}
const controllers = {
  admin: adminController,
  client: clientController
};
const middlewares = {};
const policies = {};
const routes$2 = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/",
      handler: "admin.get",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("read")]
            }
          }
        ]
      }
    },
    {
      method: "POST",
      path: "/",
      handler: "admin.post",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/config",
      handler: "admin.config",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("read")]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/config",
      handler: "admin.updateConfig",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "DELETE",
      path: "/config",
      handler: "admin.restoreConfig",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/slug",
      handler: "admin.getSlug",
      config: {
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "GET",
      path: "/:documentId",
      handler: "admin.getById",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("read")]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/:documentId",
      handler: "admin.put",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "DELETE",
      path: "/:documentId",
      handler: "admin.delete",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/content-type-items/:model",
      handler: "admin.getContentTypeItems",
      config: {
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "GET",
      path: "/settings/locale",
      handler: "admin.settingsLocale",
      config: {
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "GET",
      path: "/settings/config",
      handler: "admin.settingsConfig",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/settings/restart",
      handler: "admin.settingsRestart",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/i18n/copy/:documentId/:source/:target",
      handler: "admin.fillFromOtherLocale",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/i18n/item/read/:source/:target",
      handler: "admin.readNavigationItemFromLocale",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [permissions.render("read")]
            }
          }
        ]
      }
    }
  ]
};
const routes$1 = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/render/:idOrSlug",
      handler: "client.render",
      config: {
        policies: []
      }
    },
    {
      method: "GET",
      path: "/render/:idOrSlug/:childUIKey",
      handler: "client.renderChild",
      config: {
        policies: []
      }
    },
    {
      method: "GET",
      path: "/",
      handler: "client.readAll",
      config: {
        policies: []
      }
    }
  ]
};
const routes = {
  admin: routes$2,
  "content-api": routes$1
};
function envFn(key, defaultValue) {
  return ___default__default.default.has(process.env, key) ? process.env[key] : defaultValue;
}
function getKey(key) {
  return process.env[key] ?? "";
}
const utils$9 = {
  int(key, defaultValue) {
    if (!___default__default.default.has(process.env, key)) {
      return defaultValue;
    }
    return parseInt(getKey(key), 10);
  },
  float(key, defaultValue) {
    if (!___default__default.default.has(process.env, key)) {
      return defaultValue;
    }
    return parseFloat(getKey(key));
  },
  bool(key, defaultValue) {
    if (!___default__default.default.has(process.env, key)) {
      return defaultValue;
    }
    return getKey(key) === "true";
  },
  json(key, defaultValue) {
    if (!___default__default.default.has(process.env, key)) {
      return defaultValue;
    }
    try {
      return JSON.parse(getKey(key));
    } catch (error2) {
      if (error2 instanceof Error) {
        throw new Error(`Invalid json environment variable ${key}: ${error2.message}`);
      }
      throw error2;
    }
  },
  array(key, defaultValue) {
    if (!___default__default.default.has(process.env, key)) {
      return defaultValue;
    }
    let value = getKey(key);
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.substring(1, value.length - 1);
    }
    return value.split(",").map((v) => {
      return ___default__default.default.trim(___default__default.default.trim(v, " "), '"');
    });
  },
  date(key, defaultValue) {
    if (!___default__default.default.has(process.env, key)) {
      return defaultValue;
    }
    return new Date(getKey(key));
  },
  /**
  * Gets a value from env that matches oneOf provided values
  * @param {string} key
  * @param {string[]} expectedValues
  * @param {string|undefined} defaultValue
  * @returns {string|undefined}
  */
  oneOf(key, expectedValues, defaultValue) {
    if (!expectedValues) {
      throw new Error(`env.oneOf requires expectedValues`);
    }
    if (defaultValue && !expectedValues.includes(defaultValue)) {
      throw new Error(`env.oneOf requires defaultValue to be included in expectedValues`);
    }
    const rawValue = env(key, defaultValue);
    return expectedValues.includes(rawValue) ? rawValue : defaultValue;
  }
};
const env = Object.assign(envFn, utils$9);
const ID_ATTRIBUTE$1 = "id";
const DOC_ID_ATTRIBUTE$1 = "documentId";
const constants$5 = {
  ID_ATTRIBUTE: ID_ATTRIBUTE$1,
  DOC_ID_ATTRIBUTE: DOC_ID_ATTRIBUTE$1
};
const getStoredPrivateAttributes = (model) => fp.union(strapi?.config?.get("api.responses.privateAttributes", []) ?? [], fp.getOr([], "options.privateAttributes", model));
const isPrivateAttribute = (model, attributeName) => {
  if (model?.attributes?.[attributeName]?.private === true) {
    return true;
  }
  return getStoredPrivateAttributes(model).includes(attributeName);
};
const isScalarAttribute = (attribute) => {
  return attribute && ![
    "media",
    "component",
    "relation",
    "dynamiczone"
  ].includes(attribute.type);
};
const isMediaAttribute = (attribute) => attribute?.type === "media";
const isRelationalAttribute = (attribute) => attribute?.type === "relation";
const isDynamicZoneAttribute = (attribute) => !!attribute && attribute.type === "dynamiczone";
const isMorphToRelationalAttribute = (attribute) => {
  return !!attribute && isRelationalAttribute(attribute) && attribute.relation?.startsWith?.("morphTo");
};
const traverseEntity = async (visitor2, options, entity) => {
  const { path: path2 = {
    raw: null,
    attribute: null
  }, schema: schema2, getModel } = options;
  let parent = options.parent;
  const traverseMorphRelationTarget = async (visitor3, path3, entry) => {
    const targetSchema = getModel(entry.__type);
    const traverseOptions = {
      schema: targetSchema,
      path: path3,
      getModel,
      parent
    };
    return traverseEntity(visitor3, traverseOptions, entry);
  };
  const traverseRelationTarget = (schema3) => async (visitor3, path3, entry) => {
    const traverseOptions = {
      schema: schema3,
      path: path3,
      getModel,
      parent
    };
    return traverseEntity(visitor3, traverseOptions, entry);
  };
  const traverseMediaTarget = async (visitor3, path3, entry) => {
    const targetSchemaUID = "plugin::upload.file";
    const targetSchema = getModel(targetSchemaUID);
    const traverseOptions = {
      schema: targetSchema,
      path: path3,
      getModel,
      parent
    };
    return traverseEntity(visitor3, traverseOptions, entry);
  };
  const traverseComponent = async (visitor3, path3, schema3, entry) => {
    const traverseOptions = {
      schema: schema3,
      path: path3,
      getModel,
      parent
    };
    return traverseEntity(visitor3, traverseOptions, entry);
  };
  const visitDynamicZoneEntry = async (visitor3, path3, entry) => {
    const targetSchema = getModel(entry.__component);
    const traverseOptions = {
      schema: targetSchema,
      path: path3,
      getModel,
      parent
    };
    return traverseEntity(visitor3, traverseOptions, entry);
  };
  if (!fp.isObject(entity) || fp.isNil(schema2)) {
    return entity;
  }
  const copy = fp.clone(entity);
  const visitorUtils = createVisitorUtils({
    data: copy
  });
  const keys = Object.keys(copy);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const attribute = schema2.attributes[key];
    const newPath = {
      ...path2
    };
    newPath.raw = fp.isNil(path2.raw) ? key : `${path2.raw}.${key}`;
    if (!fp.isNil(attribute)) {
      newPath.attribute = fp.isNil(path2.attribute) ? key : `${path2.attribute}.${key}`;
    }
    const visitorOptions = {
      data: copy,
      schema: schema2,
      key,
      value: copy[key],
      attribute,
      path: newPath,
      getModel,
      parent
    };
    await visitor2(visitorOptions, visitorUtils);
    const value = copy[key];
    if (fp.isNil(value) || fp.isNil(attribute)) {
      continue;
    }
    parent = {
      schema: schema2,
      key,
      attribute,
      path: newPath
    };
    if (isRelationalAttribute(attribute)) {
      const isMorphRelation = attribute.relation.toLowerCase().startsWith("morph");
      const method = isMorphRelation ? traverseMorphRelationTarget : traverseRelationTarget(getModel(attribute.target));
      if (fp.isArray(value)) {
        const res = new Array(value.length);
        for (let i2 = 0; i2 < value.length; i2 += 1) {
          res[i2] = await method(visitor2, newPath, value[i2]);
        }
        copy[key] = res;
      } else {
        copy[key] = await method(visitor2, newPath, value);
      }
      continue;
    }
    if (isMediaAttribute(attribute)) {
      if (fp.isArray(value)) {
        const res = new Array(value.length);
        for (let i2 = 0; i2 < value.length; i2 += 1) {
          res[i2] = await traverseMediaTarget(visitor2, newPath, value[i2]);
        }
        copy[key] = res;
      } else {
        copy[key] = await traverseMediaTarget(visitor2, newPath, value);
      }
      continue;
    }
    if (attribute.type === "component") {
      const targetSchema = getModel(attribute.component);
      if (fp.isArray(value)) {
        const res = new Array(value.length);
        for (let i2 = 0; i2 < value.length; i2 += 1) {
          res[i2] = await traverseComponent(visitor2, newPath, targetSchema, value[i2]);
        }
        copy[key] = res;
      } else {
        copy[key] = await traverseComponent(visitor2, newPath, targetSchema, value);
      }
      continue;
    }
    if (attribute.type === "dynamiczone" && fp.isArray(value)) {
      const res = new Array(value.length);
      for (let i2 = 0; i2 < value.length; i2 += 1) {
        res[i2] = await visitDynamicZoneEntry(visitor2, newPath, value[i2]);
      }
      copy[key] = res;
      continue;
    }
  }
  return copy;
};
const createVisitorUtils = ({ data }) => ({
  remove(key) {
    delete data[key];
  },
  set(key, value) {
    data[key] = value;
  }
});
var traverseEntity$1 = fp.curry(traverseEntity);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var dist = { exports: {} };
(function(module2, exports2) {
  !function(t, n) {
    module2.exports = n(require$$0__default.default, require$$1__default.default);
  }(commonjsGlobal, function(t, n) {
    return function(t2) {
      function n2(e) {
        if (r[e]) return r[e].exports;
        var o = r[e] = { exports: {}, id: e, loaded: false };
        return t2[e].call(o.exports, o, o.exports, n2), o.loaded = true, o.exports;
      }
      var r = {};
      return n2.m = t2, n2.c = r, n2.p = "", n2(0);
    }([function(t2, n2, r) {
      t2.exports = r(34);
    }, function(t2, n2, r) {
      var e = r(29)("wks"), o = r(33), i = r(2).Symbol, c = "function" == typeof i, u = t2.exports = function(t3) {
        return e[t3] || (e[t3] = c && i[t3] || (c ? i : o)("Symbol." + t3));
      };
      u.store = e;
    }, function(t2, n2) {
      var r = t2.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
      "number" == typeof __g && (__g = r);
    }, function(t2, n2, r) {
      var e = r(9);
      t2.exports = function(t3) {
        if (!e(t3)) throw TypeError(t3 + " is not an object!");
        return t3;
      };
    }, function(t2, n2, r) {
      t2.exports = !r(24)(function() {
        return 7 != Object.defineProperty({}, "a", { get: function() {
          return 7;
        } }).a;
      });
    }, function(t2, n2, r) {
      var e = r(12), o = r(17);
      t2.exports = r(4) ? function(t3, n3, r2) {
        return e.f(t3, n3, o(1, r2));
      } : function(t3, n3, r2) {
        return t3[n3] = r2, t3;
      };
    }, function(t2, n2) {
      var r = t2.exports = { version: "2.4.0" };
      "number" == typeof __e && (__e = r);
    }, function(t2, n2, r) {
      var e = r(14);
      t2.exports = function(t3, n3, r2) {
        if (e(t3), void 0 === n3) return t3;
        switch (r2) {
          case 1:
            return function(r3) {
              return t3.call(n3, r3);
            };
          case 2:
            return function(r3, e2) {
              return t3.call(n3, r3, e2);
            };
          case 3:
            return function(r3, e2, o) {
              return t3.call(n3, r3, e2, o);
            };
        }
        return function() {
          return t3.apply(n3, arguments);
        };
      };
    }, function(t2, n2) {
      var r = {}.hasOwnProperty;
      t2.exports = function(t3, n3) {
        return r.call(t3, n3);
      };
    }, function(t2, n2) {
      t2.exports = function(t3) {
        return "object" == typeof t3 ? null !== t3 : "function" == typeof t3;
      };
    }, function(t2, n2) {
      t2.exports = {};
    }, function(t2, n2) {
      var r = {}.toString;
      t2.exports = function(t3) {
        return r.call(t3).slice(8, -1);
      };
    }, function(t2, n2, r) {
      var e = r(3), o = r(26), i = r(32), c = Object.defineProperty;
      n2.f = r(4) ? Object.defineProperty : function(t3, n3, r2) {
        if (e(t3), n3 = i(n3, true), e(r2), o) try {
          return c(t3, n3, r2);
        } catch (t4) {
        }
        if ("get" in r2 || "set" in r2) throw TypeError("Accessors not supported!");
        return "value" in r2 && (t3[n3] = r2.value), t3;
      };
    }, function(t2, n2, r) {
      var e = r(42), o = r(15);
      t2.exports = function(t3) {
        return e(o(t3));
      };
    }, function(t2, n2) {
      t2.exports = function(t3) {
        if ("function" != typeof t3) throw TypeError(t3 + " is not a function!");
        return t3;
      };
    }, function(t2, n2) {
      t2.exports = function(t3) {
        if (void 0 == t3) throw TypeError("Can't call method on  " + t3);
        return t3;
      };
    }, function(t2, n2, r) {
      var e = r(9), o = r(2).document, i = e(o) && e(o.createElement);
      t2.exports = function(t3) {
        return i ? o.createElement(t3) : {};
      };
    }, function(t2, n2) {
      t2.exports = function(t3, n3) {
        return { enumerable: !(1 & t3), configurable: !(2 & t3), writable: !(4 & t3), value: n3 };
      };
    }, function(t2, n2, r) {
      var e = r(12).f, o = r(8), i = r(1)("toStringTag");
      t2.exports = function(t3, n3, r2) {
        t3 && !o(t3 = r2 ? t3 : t3.prototype, i) && e(t3, i, { configurable: true, value: n3 });
      };
    }, function(t2, n2, r) {
      var e = r(29)("keys"), o = r(33);
      t2.exports = function(t3) {
        return e[t3] || (e[t3] = o(t3));
      };
    }, function(t2, n2) {
      var r = Math.ceil, e = Math.floor;
      t2.exports = function(t3) {
        return isNaN(t3 = +t3) ? 0 : (t3 > 0 ? e : r)(t3);
      };
    }, function(t2, n2, r) {
      var e = r(11), o = r(1)("toStringTag"), i = "Arguments" == e(/* @__PURE__ */ function() {
        return arguments;
      }()), c = function(t3, n3) {
        try {
          return t3[n3];
        } catch (t4) {
        }
      };
      t2.exports = function(t3) {
        var n3, r2, u;
        return void 0 === t3 ? "Undefined" : null === t3 ? "Null" : "string" == typeof (r2 = c(n3 = Object(t3), o)) ? r2 : i ? e(n3) : "Object" == (u = e(n3)) && "function" == typeof n3.callee ? "Arguments" : u;
      };
    }, function(t2, n2) {
      t2.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, function(t2, n2, r) {
      var e = r(2), o = r(6), i = r(7), c = r(5), u = "prototype", s = function(t3, n3, r2) {
        var f, a, p, l = t3 & s.F, v = t3 & s.G, h = t3 & s.S, d = t3 & s.P, y = t3 & s.B, _ = t3 & s.W, x = v ? o : o[n3] || (o[n3] = {}), m = x[u], w = v ? e : h ? e[n3] : (e[n3] || {})[u];
        v && (r2 = n3);
        for (f in r2) a = !l && w && void 0 !== w[f], a && f in x || (p = a ? w[f] : r2[f], x[f] = v && "function" != typeof w[f] ? r2[f] : y && a ? i(p, e) : _ && w[f] == p ? function(t4) {
          var n4 = function(n5, r3, e2) {
            if (this instanceof t4) {
              switch (arguments.length) {
                case 0:
                  return new t4();
                case 1:
                  return new t4(n5);
                case 2:
                  return new t4(n5, r3);
              }
              return new t4(n5, r3, e2);
            }
            return t4.apply(this, arguments);
          };
          return n4[u] = t4[u], n4;
        }(p) : d && "function" == typeof p ? i(Function.call, p) : p, d && ((x.virtual || (x.virtual = {}))[f] = p, t3 & s.R && m && !m[f] && c(m, f, p)));
      };
      s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, t2.exports = s;
    }, function(t2, n2) {
      t2.exports = function(t3) {
        try {
          return !!t3();
        } catch (t4) {
          return true;
        }
      };
    }, function(t2, n2, r) {
      t2.exports = r(2).document && document.documentElement;
    }, function(t2, n2, r) {
      t2.exports = !r(4) && !r(24)(function() {
        return 7 != Object.defineProperty(r(16)("div"), "a", { get: function() {
          return 7;
        } }).a;
      });
    }, function(t2, n2, r) {
      var e = r(28), o = r(23), i = r(57), c = r(5), u = r(8), s = r(10), f = r(45), a = r(18), p = r(52), l = r(1)("iterator"), v = !([].keys && "next" in [].keys()), h = "@@iterator", d = "keys", y = "values", _ = function() {
        return this;
      };
      t2.exports = function(t3, n3, r2, x, m, w, g) {
        f(r2, n3, x);
        var b, O, j, S = function(t4) {
          if (!v && t4 in T) return T[t4];
          switch (t4) {
            case d:
              return function() {
                return new r2(this, t4);
              };
            case y:
              return function() {
                return new r2(this, t4);
              };
          }
          return function() {
            return new r2(this, t4);
          };
        }, E = n3 + " Iterator", P = m == y, M = false, T = t3.prototype, A = T[l] || T[h] || m && T[m], k = A || S(m), C = m ? P ? S("entries") : k : void 0, I = "Array" == n3 ? T.entries || A : A;
        if (I && (j = p(I.call(new t3())), j !== Object.prototype && (a(j, E, true), e || u(j, l) || c(j, l, _))), P && A && A.name !== y && (M = true, k = function() {
          return A.call(this);
        }), e && !g || !v && !M && T[l] || c(T, l, k), s[n3] = k, s[E] = _, m) if (b = { values: P ? k : S(y), keys: w ? k : S(d), entries: C }, g) for (O in b) O in T || i(T, O, b[O]);
        else o(o.P + o.F * (v || M), n3, b);
        return b;
      };
    }, function(t2, n2) {
      t2.exports = true;
    }, function(t2, n2, r) {
      var e = r(2), o = "__core-js_shared__", i = e[o] || (e[o] = {});
      t2.exports = function(t3) {
        return i[t3] || (i[t3] = {});
      };
    }, function(t2, n2, r) {
      var e, o, i, c = r(7), u = r(41), s = r(25), f = r(16), a = r(2), p = a.process, l = a.setImmediate, v = a.clearImmediate, h = a.MessageChannel, d = 0, y = {}, _ = "onreadystatechange", x = function() {
        var t3 = +this;
        if (y.hasOwnProperty(t3)) {
          var n3 = y[t3];
          delete y[t3], n3();
        }
      }, m = function(t3) {
        x.call(t3.data);
      };
      l && v || (l = function(t3) {
        for (var n3 = [], r2 = 1; arguments.length > r2; ) n3.push(arguments[r2++]);
        return y[++d] = function() {
          u("function" == typeof t3 ? t3 : Function(t3), n3);
        }, e(d), d;
      }, v = function(t3) {
        delete y[t3];
      }, "process" == r(11)(p) ? e = function(t3) {
        p.nextTick(c(x, t3, 1));
      } : h ? (o = new h(), i = o.port2, o.port1.onmessage = m, e = c(i.postMessage, i, 1)) : a.addEventListener && "function" == typeof postMessage && !a.importScripts ? (e = function(t3) {
        a.postMessage(t3 + "", "*");
      }, a.addEventListener("message", m, false)) : e = _ in f("script") ? function(t3) {
        s.appendChild(f("script"))[_] = function() {
          s.removeChild(this), x.call(t3);
        };
      } : function(t3) {
        setTimeout(c(x, t3, 1), 0);
      }), t2.exports = { set: l, clear: v };
    }, function(t2, n2, r) {
      var e = r(20), o = Math.min;
      t2.exports = function(t3) {
        return t3 > 0 ? o(e(t3), 9007199254740991) : 0;
      };
    }, function(t2, n2, r) {
      var e = r(9);
      t2.exports = function(t3, n3) {
        if (!e(t3)) return t3;
        var r2, o;
        if (n3 && "function" == typeof (r2 = t3.toString) && !e(o = r2.call(t3))) return o;
        if ("function" == typeof (r2 = t3.valueOf) && !e(o = r2.call(t3))) return o;
        if (!n3 && "function" == typeof (r2 = t3.toString) && !e(o = r2.call(t3))) return o;
        throw TypeError("Can't convert object to primitive value");
      };
    }, function(t2, n2) {
      var r = 0, e = Math.random();
      t2.exports = function(t3) {
        return "Symbol(".concat(void 0 === t3 ? "" : t3, ")_", (++r + e).toString(36));
      };
    }, function(t2, n2, r) {
      function e(t3) {
        return t3 && t3.__esModule ? t3 : { default: t3 };
      }
      function o() {
        return "win32" !== process.platform ? "" : "ia32" === process.arch && process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432") ? "mixed" : "native";
      }
      function i(t3) {
        return (0, l.createHash)("sha256").update(t3).digest("hex");
      }
      function c(t3) {
        switch (h) {
          case "darwin":
            return t3.split("IOPlatformUUID")[1].split("\n")[0].replace(/\=|\s+|\"/gi, "").toLowerCase();
          case "win32":
            return t3.toString().split("REG_SZ")[1].replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          case "linux":
            return t3.toString().replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          case "freebsd":
            return t3.toString().replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          default:
            throw new Error("Unsupported platform: " + process.platform);
        }
      }
      function u(t3) {
        var n3 = c((0, p.execSync)(y[h]).toString());
        return t3 ? n3 : i(n3);
      }
      function s(t3) {
        return new a.default(function(n3, r2) {
          return (0, p.exec)(y[h], {}, function(e2, o2, u2) {
            if (e2) return r2(new Error("Error while obtaining machine id: " + e2.stack));
            var s2 = c(o2.toString());
            return n3(t3 ? s2 : i(s2));
          });
        });
      }
      Object.defineProperty(n2, "__esModule", { value: true });
      var f = r(35), a = e(f);
      n2.machineIdSync = u, n2.machineId = s;
      var p = r(70), l = r(71), v = process, h = v.platform, d = { native: "%windir%\\System32", mixed: "%windir%\\sysnative\\cmd.exe /c %windir%\\System32" }, y = { darwin: "ioreg -rd1 -c IOPlatformExpertDevice", win32: d[o()] + "\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid", linux: "( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :", freebsd: "kenv -q smbios.system.uuid || sysctl -n kern.hostuuid" };
    }, function(t2, n2, r) {
      t2.exports = { default: r(36), __esModule: true };
    }, function(t2, n2, r) {
      r(66), r(68), r(69), r(67), t2.exports = r(6).Promise;
    }, function(t2, n2) {
      t2.exports = function() {
      };
    }, function(t2, n2) {
      t2.exports = function(t3, n3, r, e) {
        if (!(t3 instanceof n3) || void 0 !== e && e in t3) throw TypeError(r + ": incorrect invocation!");
        return t3;
      };
    }, function(t2, n2, r) {
      var e = r(13), o = r(31), i = r(62);
      t2.exports = function(t3) {
        return function(n3, r2, c) {
          var u, s = e(n3), f = o(s.length), a = i(c, f);
          if (t3 && r2 != r2) {
            for (; f > a; ) if (u = s[a++], u != u) return true;
          } else for (; f > a; a++) if ((t3 || a in s) && s[a] === r2) return t3 || a || 0;
          return !t3 && -1;
        };
      };
    }, function(t2, n2, r) {
      var e = r(7), o = r(44), i = r(43), c = r(3), u = r(31), s = r(64), f = {}, a = {}, n2 = t2.exports = function(t3, n3, r2, p, l) {
        var v, h, d, y, _ = l ? function() {
          return t3;
        } : s(t3), x = e(r2, p, n3 ? 2 : 1), m = 0;
        if ("function" != typeof _) throw TypeError(t3 + " is not iterable!");
        if (i(_)) {
          for (v = u(t3.length); v > m; m++) if (y = n3 ? x(c(h = t3[m])[0], h[1]) : x(t3[m]), y === f || y === a) return y;
        } else for (d = _.call(t3); !(h = d.next()).done; ) if (y = o(d, x, h.value, n3), y === f || y === a) return y;
      };
      n2.BREAK = f, n2.RETURN = a;
    }, function(t2, n2) {
      t2.exports = function(t3, n3, r) {
        var e = void 0 === r;
        switch (n3.length) {
          case 0:
            return e ? t3() : t3.call(r);
          case 1:
            return e ? t3(n3[0]) : t3.call(r, n3[0]);
          case 2:
            return e ? t3(n3[0], n3[1]) : t3.call(r, n3[0], n3[1]);
          case 3:
            return e ? t3(n3[0], n3[1], n3[2]) : t3.call(r, n3[0], n3[1], n3[2]);
          case 4:
            return e ? t3(n3[0], n3[1], n3[2], n3[3]) : t3.call(r, n3[0], n3[1], n3[2], n3[3]);
        }
        return t3.apply(r, n3);
      };
    }, function(t2, n2, r) {
      var e = r(11);
      t2.exports = Object("z").propertyIsEnumerable(0) ? Object : function(t3) {
        return "String" == e(t3) ? t3.split("") : Object(t3);
      };
    }, function(t2, n2, r) {
      var e = r(10), o = r(1)("iterator"), i = Array.prototype;
      t2.exports = function(t3) {
        return void 0 !== t3 && (e.Array === t3 || i[o] === t3);
      };
    }, function(t2, n2, r) {
      var e = r(3);
      t2.exports = function(t3, n3, r2, o) {
        try {
          return o ? n3(e(r2)[0], r2[1]) : n3(r2);
        } catch (n4) {
          var i = t3.return;
          throw void 0 !== i && e(i.call(t3)), n4;
        }
      };
    }, function(t2, n2, r) {
      var e = r(49), o = r(17), i = r(18), c = {};
      r(5)(c, r(1)("iterator"), function() {
        return this;
      }), t2.exports = function(t3, n3, r2) {
        t3.prototype = e(c, { next: o(1, r2) }), i(t3, n3 + " Iterator");
      };
    }, function(t2, n2, r) {
      var e = r(1)("iterator"), o = false;
      try {
        var i = [7][e]();
        i.return = function() {
          o = true;
        }, Array.from(i, function() {
          throw 2;
        });
      } catch (t3) {
      }
      t2.exports = function(t3, n3) {
        if (!n3 && !o) return false;
        var r2 = false;
        try {
          var i2 = [7], c = i2[e]();
          c.next = function() {
            return { done: r2 = true };
          }, i2[e] = function() {
            return c;
          }, t3(i2);
        } catch (t4) {
        }
        return r2;
      };
    }, function(t2, n2) {
      t2.exports = function(t3, n3) {
        return { value: n3, done: !!t3 };
      };
    }, function(t2, n2, r) {
      var e = r(2), o = r(30).set, i = e.MutationObserver || e.WebKitMutationObserver, c = e.process, u = e.Promise, s = "process" == r(11)(c);
      t2.exports = function() {
        var t3, n3, r2, f = function() {
          var e2, o2;
          for (s && (e2 = c.domain) && e2.exit(); t3; ) {
            o2 = t3.fn, t3 = t3.next;
            try {
              o2();
            } catch (e3) {
              throw t3 ? r2() : n3 = void 0, e3;
            }
          }
          n3 = void 0, e2 && e2.enter();
        };
        if (s) r2 = function() {
          c.nextTick(f);
        };
        else if (i) {
          var a = true, p = document.createTextNode("");
          new i(f).observe(p, { characterData: true }), r2 = function() {
            p.data = a = !a;
          };
        } else if (u && u.resolve) {
          var l = u.resolve();
          r2 = function() {
            l.then(f);
          };
        } else r2 = function() {
          o.call(e, f);
        };
        return function(e2) {
          var o2 = { fn: e2, next: void 0 };
          n3 && (n3.next = o2), t3 || (t3 = o2, r2()), n3 = o2;
        };
      };
    }, function(t2, n2, r) {
      var e = r(3), o = r(50), i = r(22), c = r(19)("IE_PROTO"), u = function() {
      }, s = "prototype", f = function() {
        var t3, n3 = r(16)("iframe"), e2 = i.length, o2 = ">";
        for (n3.style.display = "none", r(25).appendChild(n3), n3.src = "javascript:", t3 = n3.contentWindow.document, t3.open(), t3.write("<script>document.F=Object<\/script" + o2), t3.close(), f = t3.F; e2--; ) delete f[s][i[e2]];
        return f();
      };
      t2.exports = Object.create || function(t3, n3) {
        var r2;
        return null !== t3 ? (u[s] = e(t3), r2 = new u(), u[s] = null, r2[c] = t3) : r2 = f(), void 0 === n3 ? r2 : o(r2, n3);
      };
    }, function(t2, n2, r) {
      var e = r(12), o = r(3), i = r(54);
      t2.exports = r(4) ? Object.defineProperties : function(t3, n3) {
        o(t3);
        for (var r2, c = i(n3), u = c.length, s = 0; u > s; ) e.f(t3, r2 = c[s++], n3[r2]);
        return t3;
      };
    }, function(t2, n2, r) {
      var e = r(55), o = r(17), i = r(13), c = r(32), u = r(8), s = r(26), f = Object.getOwnPropertyDescriptor;
      n2.f = r(4) ? f : function(t3, n3) {
        if (t3 = i(t3), n3 = c(n3, true), s) try {
          return f(t3, n3);
        } catch (t4) {
        }
        if (u(t3, n3)) return o(!e.f.call(t3, n3), t3[n3]);
      };
    }, function(t2, n2, r) {
      var e = r(8), o = r(63), i = r(19)("IE_PROTO"), c = Object.prototype;
      t2.exports = Object.getPrototypeOf || function(t3) {
        return t3 = o(t3), e(t3, i) ? t3[i] : "function" == typeof t3.constructor && t3 instanceof t3.constructor ? t3.constructor.prototype : t3 instanceof Object ? c : null;
      };
    }, function(t2, n2, r) {
      var e = r(8), o = r(13), i = r(39)(false), c = r(19)("IE_PROTO");
      t2.exports = function(t3, n3) {
        var r2, u = o(t3), s = 0, f = [];
        for (r2 in u) r2 != c && e(u, r2) && f.push(r2);
        for (; n3.length > s; ) e(u, r2 = n3[s++]) && (~i(f, r2) || f.push(r2));
        return f;
      };
    }, function(t2, n2, r) {
      var e = r(53), o = r(22);
      t2.exports = Object.keys || function(t3) {
        return e(t3, o);
      };
    }, function(t2, n2) {
      n2.f = {}.propertyIsEnumerable;
    }, function(t2, n2, r) {
      var e = r(5);
      t2.exports = function(t3, n3, r2) {
        for (var o in n3) r2 && t3[o] ? t3[o] = n3[o] : e(t3, o, n3[o]);
        return t3;
      };
    }, function(t2, n2, r) {
      t2.exports = r(5);
    }, function(t2, n2, r) {
      var e = r(9), o = r(3), i = function(t3, n3) {
        if (o(t3), !e(n3) && null !== n3) throw TypeError(n3 + ": can't set as prototype!");
      };
      t2.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function(t3, n3, e2) {
        try {
          e2 = r(7)(Function.call, r(51).f(Object.prototype, "__proto__").set, 2), e2(t3, []), n3 = !(t3 instanceof Array);
        } catch (t4) {
          n3 = true;
        }
        return function(t4, r2) {
          return i(t4, r2), n3 ? t4.__proto__ = r2 : e2(t4, r2), t4;
        };
      }({}, false) : void 0), check: i };
    }, function(t2, n2, r) {
      var e = r(2), o = r(6), i = r(12), c = r(4), u = r(1)("species");
      t2.exports = function(t3) {
        var n3 = "function" == typeof o[t3] ? o[t3] : e[t3];
        c && n3 && !n3[u] && i.f(n3, u, { configurable: true, get: function() {
          return this;
        } });
      };
    }, function(t2, n2, r) {
      var e = r(3), o = r(14), i = r(1)("species");
      t2.exports = function(t3, n3) {
        var r2, c = e(t3).constructor;
        return void 0 === c || void 0 == (r2 = e(c)[i]) ? n3 : o(r2);
      };
    }, function(t2, n2, r) {
      var e = r(20), o = r(15);
      t2.exports = function(t3) {
        return function(n3, r2) {
          var i, c, u = String(o(n3)), s = e(r2), f = u.length;
          return s < 0 || s >= f ? t3 ? "" : void 0 : (i = u.charCodeAt(s), i < 55296 || i > 56319 || s + 1 === f || (c = u.charCodeAt(s + 1)) < 56320 || c > 57343 ? t3 ? u.charAt(s) : i : t3 ? u.slice(s, s + 2) : (i - 55296 << 10) + (c - 56320) + 65536);
        };
      };
    }, function(t2, n2, r) {
      var e = r(20), o = Math.max, i = Math.min;
      t2.exports = function(t3, n3) {
        return t3 = e(t3), t3 < 0 ? o(t3 + n3, 0) : i(t3, n3);
      };
    }, function(t2, n2, r) {
      var e = r(15);
      t2.exports = function(t3) {
        return Object(e(t3));
      };
    }, function(t2, n2, r) {
      var e = r(21), o = r(1)("iterator"), i = r(10);
      t2.exports = r(6).getIteratorMethod = function(t3) {
        if (void 0 != t3) return t3[o] || t3["@@iterator"] || i[e(t3)];
      };
    }, function(t2, n2, r) {
      var e = r(37), o = r(47), i = r(10), c = r(13);
      t2.exports = r(27)(Array, "Array", function(t3, n3) {
        this._t = c(t3), this._i = 0, this._k = n3;
      }, function() {
        var t3 = this._t, n3 = this._k, r2 = this._i++;
        return !t3 || r2 >= t3.length ? (this._t = void 0, o(1)) : "keys" == n3 ? o(0, r2) : "values" == n3 ? o(0, t3[r2]) : o(0, [r2, t3[r2]]);
      }, "values"), i.Arguments = i.Array, e("keys"), e("values"), e("entries");
    }, function(t2, n2) {
    }, function(t2, n2, r) {
      var e, o, i, c = r(28), u = r(2), s = r(7), f = r(21), a = r(23), p = r(9), l = (r(3), r(14)), v = r(38), h = r(40), d = (r(58).set, r(60)), y = r(30).set, _ = r(48)(), x = "Promise", m = u.TypeError, w = u.process, g = u[x], w = u.process, b = "process" == f(w), O = function() {
      }, j = !!function() {
        try {
          var t3 = g.resolve(1), n3 = (t3.constructor = {})[r(1)("species")] = function(t4) {
            t4(O, O);
          };
          return (b || "function" == typeof PromiseRejectionEvent) && t3.then(O) instanceof n3;
        } catch (t4) {
        }
      }(), S = function(t3, n3) {
        return t3 === n3 || t3 === g && n3 === i;
      }, E = function(t3) {
        var n3;
        return !(!p(t3) || "function" != typeof (n3 = t3.then)) && n3;
      }, P = function(t3) {
        return S(g, t3) ? new M(t3) : new o(t3);
      }, M = o = function(t3) {
        var n3, r2;
        this.promise = new t3(function(t4, e2) {
          if (void 0 !== n3 || void 0 !== r2) throw m("Bad Promise constructor");
          n3 = t4, r2 = e2;
        }), this.resolve = l(n3), this.reject = l(r2);
      }, T = function(t3) {
        try {
          t3();
        } catch (t4) {
          return { error: t4 };
        }
      }, A = function(t3, n3) {
        if (!t3._n) {
          t3._n = true;
          var r2 = t3._c;
          _(function() {
            for (var e2 = t3._v, o2 = 1 == t3._s, i2 = 0, c2 = function(n4) {
              var r3, i3, c3 = o2 ? n4.ok : n4.fail, u2 = n4.resolve, s2 = n4.reject, f2 = n4.domain;
              try {
                c3 ? (o2 || (2 == t3._h && I(t3), t3._h = 1), c3 === true ? r3 = e2 : (f2 && f2.enter(), r3 = c3(e2), f2 && f2.exit()), r3 === n4.promise ? s2(m("Promise-chain cycle")) : (i3 = E(r3)) ? i3.call(r3, u2, s2) : u2(r3)) : s2(e2);
              } catch (t4) {
                s2(t4);
              }
            }; r2.length > i2; ) c2(r2[i2++]);
            t3._c = [], t3._n = false, n3 && !t3._h && k(t3);
          });
        }
      }, k = function(t3) {
        y.call(u, function() {
          var n3, r2, e2, o2 = t3._v;
          if (C(t3) && (n3 = T(function() {
            b ? w.emit("unhandledRejection", o2, t3) : (r2 = u.onunhandledrejection) ? r2({ promise: t3, reason: o2 }) : (e2 = u.console) && e2.error && e2.error("Unhandled promise rejection", o2);
          }), t3._h = b || C(t3) ? 2 : 1), t3._a = void 0, n3) throw n3.error;
        });
      }, C = function(t3) {
        if (1 == t3._h) return false;
        for (var n3, r2 = t3._a || t3._c, e2 = 0; r2.length > e2; ) if (n3 = r2[e2++], n3.fail || !C(n3.promise)) return false;
        return true;
      }, I = function(t3) {
        y.call(u, function() {
          var n3;
          b ? w.emit("rejectionHandled", t3) : (n3 = u.onrejectionhandled) && n3({ promise: t3, reason: t3._v });
        });
      }, R = function(t3) {
        var n3 = this;
        n3._d || (n3._d = true, n3 = n3._w || n3, n3._v = t3, n3._s = 2, n3._a || (n3._a = n3._c.slice()), A(n3, true));
      }, F = function(t3) {
        var n3, r2 = this;
        if (!r2._d) {
          r2._d = true, r2 = r2._w || r2;
          try {
            if (r2 === t3) throw m("Promise can't be resolved itself");
            (n3 = E(t3)) ? _(function() {
              var e2 = { _w: r2, _d: false };
              try {
                n3.call(t3, s(F, e2, 1), s(R, e2, 1));
              } catch (t4) {
                R.call(e2, t4);
              }
            }) : (r2._v = t3, r2._s = 1, A(r2, false));
          } catch (t4) {
            R.call({ _w: r2, _d: false }, t4);
          }
        }
      };
      j || (g = function(t3) {
        v(this, g, x, "_h"), l(t3), e.call(this);
        try {
          t3(s(F, this, 1), s(R, this, 1));
        } catch (t4) {
          R.call(this, t4);
        }
      }, e = function(t3) {
        this._c = [], this._a = void 0, this._s = 0, this._d = false, this._v = void 0, this._h = 0, this._n = false;
      }, e.prototype = r(56)(g.prototype, { then: function(t3, n3) {
        var r2 = P(d(this, g));
        return r2.ok = "function" != typeof t3 || t3, r2.fail = "function" == typeof n3 && n3, r2.domain = b ? w.domain : void 0, this._c.push(r2), this._a && this._a.push(r2), this._s && A(this, false), r2.promise;
      }, catch: function(t3) {
        return this.then(void 0, t3);
      } }), M = function() {
        var t3 = new e();
        this.promise = t3, this.resolve = s(F, t3, 1), this.reject = s(R, t3, 1);
      }), a(a.G + a.W + a.F * !j, { Promise: g }), r(18)(g, x), r(59)(x), i = r(6)[x], a(a.S + a.F * !j, x, { reject: function(t3) {
        var n3 = P(this), r2 = n3.reject;
        return r2(t3), n3.promise;
      } }), a(a.S + a.F * (c || !j), x, { resolve: function(t3) {
        if (t3 instanceof g && S(t3.constructor, this)) return t3;
        var n3 = P(this), r2 = n3.resolve;
        return r2(t3), n3.promise;
      } }), a(a.S + a.F * !(j && r(46)(function(t3) {
        g.all(t3).catch(O);
      })), x, { all: function(t3) {
        var n3 = this, r2 = P(n3), e2 = r2.resolve, o2 = r2.reject, i2 = T(function() {
          var r3 = [], i3 = 0, c2 = 1;
          h(t3, false, function(t4) {
            var u2 = i3++, s2 = false;
            r3.push(void 0), c2++, n3.resolve(t4).then(function(t5) {
              s2 || (s2 = true, r3[u2] = t5, --c2 || e2(r3));
            }, o2);
          }), --c2 || e2(r3);
        });
        return i2 && o2(i2.error), r2.promise;
      }, race: function(t3) {
        var n3 = this, r2 = P(n3), e2 = r2.reject, o2 = T(function() {
          h(t3, false, function(t4) {
            n3.resolve(t4).then(r2.resolve, e2);
          });
        });
        return o2 && e2(o2.error), r2.promise;
      } });
    }, function(t2, n2, r) {
      var e = r(61)(true);
      r(27)(String, "String", function(t3) {
        this._t = String(t3), this._i = 0;
      }, function() {
        var t3, n3 = this._t, r2 = this._i;
        return r2 >= n3.length ? { value: void 0, done: true } : (t3 = e(n3, r2), this._i += t3.length, { value: t3, done: false });
      });
    }, function(t2, n2, r) {
      r(65);
      for (var e = r(2), o = r(5), i = r(10), c = r(1)("toStringTag"), u = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], s = 0; s < 5; s++) {
        var f = u[s], a = e[f], p = a && a.prototype;
        p && !p[c] && o(p, c, f), i[f] = i.Array;
      }
    }, function(t2, n2) {
      t2.exports = require$$0__default.default;
    }, function(t2, n2) {
      t2.exports = require$$1__default.default;
    }]);
  });
})(dist);
var map$1;
try {
  map$1 = Map;
} catch (_) {
}
var set$1;
try {
  set$1 = Set;
} catch (_) {
}
function baseClone(src, circulars, clones) {
  if (!src || typeof src !== "object" || typeof src === "function") {
    return src;
  }
  if (src.nodeType && "cloneNode" in src) {
    return src.cloneNode(true);
  }
  if (src instanceof Date) {
    return new Date(src.getTime());
  }
  if (src instanceof RegExp) {
    return new RegExp(src);
  }
  if (Array.isArray(src)) {
    return src.map(clone$2);
  }
  if (map$1 && src instanceof map$1) {
    return new Map(Array.from(src.entries()));
  }
  if (set$1 && src instanceof set$1) {
    return new Set(Array.from(src.values()));
  }
  if (src instanceof Object) {
    circulars.push(src);
    var obj = Object.create(src);
    clones.push(obj);
    for (var key in src) {
      var idx = circulars.findIndex(function(i) {
        return i === src[key];
      });
      obj[key] = idx > -1 ? clones[idx] : baseClone(src[key], circulars, clones);
    }
    return obj;
  }
  return src;
}
function clone$2(src) {
  return baseClone(src, [], []);
}
const toString$1 = Object.prototype.toString;
const errorToString$1 = Error.prototype.toString;
const regExpToString$1 = RegExp.prototype.toString;
const symbolToString$1 = typeof Symbol !== "undefined" ? Symbol.prototype.toString : () => "";
const SYMBOL_REGEXP$1 = /^Symbol\((.*)\)(.*)$/;
function printNumber$1(val) {
  if (val != +val) return "NaN";
  const isNegativeZero2 = val === 0 && 1 / val < 0;
  return isNegativeZero2 ? "-0" : "" + val;
}
function printSimpleValue$1(val, quoteStrings = false) {
  if (val == null || val === true || val === false) return "" + val;
  const typeOf = typeof val;
  if (typeOf === "number") return printNumber$1(val);
  if (typeOf === "string") return quoteStrings ? `"${val}"` : val;
  if (typeOf === "function") return "[Function " + (val.name || "anonymous") + "]";
  if (typeOf === "symbol") return symbolToString$1.call(val).replace(SYMBOL_REGEXP$1, "Symbol($1)");
  const tag = toString$1.call(val).slice(8, -1);
  if (tag === "Date") return isNaN(val.getTime()) ? "" + val : val.toISOString(val);
  if (tag === "Error" || val instanceof Error) return "[" + errorToString$1.call(val) + "]";
  if (tag === "RegExp") return regExpToString$1.call(val);
  return null;
}
function printValue$1(value, quoteStrings) {
  let result = printSimpleValue$1(value, quoteStrings);
  if (result !== null) return result;
  return JSON.stringify(value, function(key, value2) {
    let result2 = printSimpleValue$1(this[key], quoteStrings);
    if (result2 !== null) return result2;
    return value2;
  }, 2);
}
let mixed = {
  default: "${path} is invalid",
  required: "${path} is a required field",
  oneOf: "${path} must be one of the following values: ${values}",
  notOneOf: "${path} must not be one of the following values: ${values}",
  notType: ({
    path: path2,
    type: type2,
    value,
    originalValue
  }) => {
    let isCast = originalValue != null && originalValue !== value;
    let msg = `${path2} must be a \`${type2}\` type, but the final value was: \`${printValue$1(value, true)}\`` + (isCast ? ` (cast from the value \`${printValue$1(originalValue, true)}\`).` : ".");
    if (value === null) {
      msg += `
 If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``;
    }
    return msg;
  },
  defined: "${path} must be defined"
};
let string = {
  length: "${path} must be exactly ${length} characters",
  min: "${path} must be at least ${min} characters",
  max: "${path} must be at most ${max} characters",
  matches: '${path} must match the following: "${regex}"',
  email: "${path} must be a valid email",
  url: "${path} must be a valid URL",
  uuid: "${path} must be a valid UUID",
  trim: "${path} must be a trimmed string",
  lowercase: "${path} must be a lowercase string",
  uppercase: "${path} must be a upper case string"
};
let number = {
  min: "${path} must be greater than or equal to ${min}",
  max: "${path} must be less than or equal to ${max}",
  lessThan: "${path} must be less than ${less}",
  moreThan: "${path} must be greater than ${more}",
  positive: "${path} must be a positive number",
  negative: "${path} must be a negative number",
  integer: "${path} must be an integer"
};
let date = {
  min: "${path} field must be later than ${min}",
  max: "${path} field must be at earlier than ${max}"
};
let boolean = {
  isValue: "${path} field must be ${value}"
};
let object = {
  noUnknown: "${path} field has unspecified keys: ${unknown}"
};
let array = {
  min: "${path} field must have at least ${min} items",
  max: "${path} field must have less than or equal to ${max} items",
  length: "${path} must be have ${length} items"
};
const locale = Object.assign(/* @__PURE__ */ Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean
});
const isSchema = (obj) => obj && obj.__isYupSchema__;
class Condition {
  constructor(refs, options) {
    this.refs = refs;
    this.refs = refs;
    if (typeof options === "function") {
      this.fn = options;
      return;
    }
    if (!has__default.default(options, "is")) throw new TypeError("`is:` is required for `when()` conditions");
    if (!options.then && !options.otherwise) throw new TypeError("either `then:` or `otherwise:` is required for `when()` conditions");
    let {
      is,
      then,
      otherwise
    } = options;
    let check = typeof is === "function" ? is : (...values) => values.every((value) => value === is);
    this.fn = function(...args) {
      let options2 = args.pop();
      let schema2 = args.pop();
      let branch = check(...args) ? then : otherwise;
      if (!branch) return void 0;
      if (typeof branch === "function") return branch(schema2);
      return schema2.concat(branch.resolve(options2));
    };
  }
  resolve(base, options) {
    let values = this.refs.map((ref) => ref.getValue(options == null ? void 0 : options.value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context));
    let schema2 = this.fn.apply(base, values.concat(base, options));
    if (schema2 === void 0 || schema2 === base) return base;
    if (!isSchema(schema2)) throw new TypeError("conditions must return a schema object");
    return schema2.resolve(options);
  }
}
function toArray$1(value) {
  return value == null ? [] : [].concat(value);
}
function _extends$4() {
  _extends$4 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$4.apply(this, arguments);
}
let strReg = /\$\{\s*(\w+)\s*\}/g;
class ValidationError extends Error {
  static formatError(message, params) {
    const path2 = params.label || params.path || "this";
    if (path2 !== params.path) params = _extends$4({}, params, {
      path: path2
    });
    if (typeof message === "string") return message.replace(strReg, (_, key) => printValue$1(params[key]));
    if (typeof message === "function") return message(params);
    return message;
  }
  static isError(err) {
    return err && err.name === "ValidationError";
  }
  constructor(errorOrErrors, value, field, type2) {
    super();
    this.name = "ValidationError";
    this.value = value;
    this.path = field;
    this.type = type2;
    this.errors = [];
    this.inner = [];
    toArray$1(errorOrErrors).forEach((err) => {
      if (ValidationError.isError(err)) {
        this.errors.push(...err.errors);
        this.inner = this.inner.concat(err.inner.length ? err.inner : err);
      } else {
        this.errors.push(err);
      }
    });
    this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0];
    if (Error.captureStackTrace) Error.captureStackTrace(this, ValidationError);
  }
}
const once = (cb) => {
  let fired = false;
  return (...args) => {
    if (fired) return;
    fired = true;
    cb(...args);
  };
};
function runTests(options, cb) {
  let {
    endEarly,
    tests,
    args,
    value,
    errors,
    sort: sort2,
    path: path2
  } = options;
  let callback = once(cb);
  let count = tests.length;
  const nestedErrors = [];
  errors = errors ? errors : [];
  if (!count) return errors.length ? callback(new ValidationError(errors, value, path2)) : callback(null, value);
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    test(args, function finishTestRun(err) {
      if (err) {
        if (!ValidationError.isError(err)) {
          return callback(err, value);
        }
        if (endEarly) {
          err.value = value;
          return callback(err, value);
        }
        nestedErrors.push(err);
      }
      if (--count <= 0) {
        if (nestedErrors.length) {
          if (sort2) nestedErrors.sort(sort2);
          if (errors.length) nestedErrors.push(...errors);
          errors = nestedErrors;
        }
        if (errors.length) {
          callback(new ValidationError(errors, value, path2), value);
          return;
        }
        callback(null, value);
      }
    });
  }
}
function Cache(maxSize) {
  this._maxSize = maxSize;
  this.clear();
}
Cache.prototype.clear = function() {
  this._size = 0;
  this._values = /* @__PURE__ */ Object.create(null);
};
Cache.prototype.get = function(key) {
  return this._values[key];
};
Cache.prototype.set = function(key, value) {
  this._size >= this._maxSize && this.clear();
  if (!(key in this._values)) this._size++;
  return this._values[key] = value;
};
var SPLIT_REGEX = /[^.^\]^[]+|(?=\[\]|\.\.)/g, DIGIT_REGEX = /^\d+$/, LEAD_DIGIT_REGEX = /^\d/, SPEC_CHAR_REGEX = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g, CLEAN_QUOTES_REGEX = /^\s*(['"]?)(.*?)(\1)\s*$/, MAX_CACHE_SIZE = 512;
var pathCache = new Cache(MAX_CACHE_SIZE), setCache = new Cache(MAX_CACHE_SIZE), getCache = new Cache(MAX_CACHE_SIZE);
var propertyExpr = {
  Cache,
  split,
  normalizePath,
  setter: function(path2) {
    var parts = normalizePath(path2);
    return setCache.get(path2) || setCache.set(path2, function setter(obj, value) {
      var index2 = 0;
      var len = parts.length;
      var data = obj;
      while (index2 < len - 1) {
        var part = parts[index2];
        if (part === "__proto__" || part === "constructor" || part === "prototype") {
          return obj;
        }
        data = data[parts[index2++]];
      }
      data[parts[index2]] = value;
    });
  },
  getter: function(path2, safe) {
    var parts = normalizePath(path2);
    return getCache.get(path2) || getCache.set(path2, function getter(data) {
      var index2 = 0, len = parts.length;
      while (index2 < len) {
        if (data != null || !safe) data = data[parts[index2++]];
        else return;
      }
      return data;
    });
  },
  join: function(segments) {
    return segments.reduce(function(path2, part) {
      return path2 + (isQuoted(part) || DIGIT_REGEX.test(part) ? "[" + part + "]" : (path2 ? "." : "") + part);
    }, "");
  },
  forEach: function(path2, cb, thisArg) {
    forEach(Array.isArray(path2) ? path2 : split(path2), cb, thisArg);
  }
};
function normalizePath(path2) {
  return pathCache.get(path2) || pathCache.set(
    path2,
    split(path2).map(function(part) {
      return part.replace(CLEAN_QUOTES_REGEX, "$2");
    })
  );
}
function split(path2) {
  return path2.match(SPLIT_REGEX) || [""];
}
function forEach(parts, iter, thisArg) {
  var len = parts.length, part, idx, isArray, isBracket;
  for (idx = 0; idx < len; idx++) {
    part = parts[idx];
    if (part) {
      if (shouldBeQuoted(part)) {
        part = '"' + part + '"';
      }
      isBracket = isQuoted(part);
      isArray = !isBracket && /^\d+$/.test(part);
      iter.call(thisArg, part, isBracket, isArray, idx, parts);
    }
  }
}
function isQuoted(str2) {
  return typeof str2 === "string" && str2 && ["'", '"'].indexOf(str2.charAt(0)) !== -1;
}
function hasLeadingNumber(part) {
  return part.match(LEAD_DIGIT_REGEX) && !part.match(DIGIT_REGEX);
}
function hasSpecialChars(part) {
  return SPEC_CHAR_REGEX.test(part);
}
function shouldBeQuoted(part) {
  return !isQuoted(part) && (hasLeadingNumber(part) || hasSpecialChars(part));
}
const prefixes = {
  context: "$",
  value: "."
};
class Reference {
  constructor(key, options = {}) {
    if (typeof key !== "string") throw new TypeError("ref must be a string, got: " + key);
    this.key = key.trim();
    if (key === "") throw new TypeError("ref must be a non-empty string");
    this.isContext = this.key[0] === prefixes.context;
    this.isValue = this.key[0] === prefixes.value;
    this.isSibling = !this.isContext && !this.isValue;
    let prefix = this.isContext ? prefixes.context : this.isValue ? prefixes.value : "";
    this.path = this.key.slice(prefix.length);
    this.getter = this.path && propertyExpr.getter(this.path, true);
    this.map = options.map;
  }
  getValue(value, parent, context) {
    let result = this.isContext ? context : this.isValue ? value : parent;
    if (this.getter) result = this.getter(result || {});
    if (this.map) result = this.map(result);
    return result;
  }
  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {Object=} options.context
   * @param {Object=} options.parent
   */
  cast(value, options) {
    return this.getValue(value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context);
  }
  resolve() {
    return this;
  }
  describe() {
    return {
      type: "ref",
      key: this.key
    };
  }
  toString() {
    return `Ref(${this.key})`;
  }
  static isRef(value) {
    return value && value.__isYupRef;
  }
}
Reference.prototype.__isYupRef = true;
function _extends$3() {
  _extends$3 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function createValidation(config2) {
  function validate(_ref, cb) {
    let {
      value,
      path: path2 = "",
      label,
      options,
      originalValue,
      sync: sync2
    } = _ref, rest = _objectWithoutPropertiesLoose(_ref, ["value", "path", "label", "options", "originalValue", "sync"]);
    const {
      name,
      test,
      params,
      message
    } = config2;
    let {
      parent,
      context
    } = options;
    function resolve(item) {
      return Reference.isRef(item) ? item.getValue(value, parent, context) : item;
    }
    function createError(overrides = {}) {
      const nextParams = mapValues__default.default(_extends$3({
        value,
        originalValue,
        label,
        path: overrides.path || path2
      }, params, overrides.params), resolve);
      const error2 = new ValidationError(ValidationError.formatError(overrides.message || message, nextParams), value, nextParams.path, overrides.type || name);
      error2.params = nextParams;
      return error2;
    }
    let ctx = _extends$3({
      path: path2,
      parent,
      type: name,
      createError,
      resolve,
      options,
      originalValue
    }, rest);
    if (!sync2) {
      try {
        Promise.resolve(test.call(ctx, value, ctx)).then((validOrError) => {
          if (ValidationError.isError(validOrError)) cb(validOrError);
          else if (!validOrError) cb(createError());
          else cb(null, validOrError);
        });
      } catch (err) {
        cb(err);
      }
      return;
    }
    let result;
    try {
      var _ref2;
      result = test.call(ctx, value, ctx);
      if (typeof ((_ref2 = result) == null ? void 0 : _ref2.then) === "function") {
        throw new Error(`Validation test of type: "${ctx.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`);
      }
    } catch (err) {
      cb(err);
      return;
    }
    if (ValidationError.isError(result)) cb(result);
    else if (!result) cb(createError());
    else cb(null, result);
  }
  validate.OPTIONS = config2;
  return validate;
}
let trim = (part) => part.substr(0, part.length - 1).substr(1);
function getIn(schema2, path2, value, context = value) {
  let parent, lastPart, lastPartDebug;
  if (!path2) return {
    parent,
    parentPath: path2,
    schema: schema2
  };
  propertyExpr.forEach(path2, (_part, isBracket, isArray) => {
    let part = isBracket ? trim(_part) : _part;
    schema2 = schema2.resolve({
      context,
      parent,
      value
    });
    if (schema2.innerType) {
      let idx = isArray ? parseInt(part, 10) : 0;
      if (value && idx >= value.length) {
        throw new Error(`Yup.reach cannot resolve an array item at index: ${_part}, in the path: ${path2}. because there is no value at that index. `);
      }
      parent = value;
      value = value && value[idx];
      schema2 = schema2.innerType;
    }
    if (!isArray) {
      if (!schema2.fields || !schema2.fields[part]) throw new Error(`The schema does not contain the path: ${path2}. (failed at: ${lastPartDebug} which is a type: "${schema2._type}")`);
      parent = value;
      value = value && value[part];
      schema2 = schema2.fields[part];
    }
    lastPart = part;
    lastPartDebug = isBracket ? "[" + _part + "]" : "." + _part;
  });
  return {
    schema: schema2,
    parent,
    parentPath: lastPart
  };
}
class ReferenceSet {
  constructor() {
    this.list = /* @__PURE__ */ new Set();
    this.refs = /* @__PURE__ */ new Map();
  }
  get size() {
    return this.list.size + this.refs.size;
  }
  describe() {
    const description = [];
    for (const item of this.list) description.push(item);
    for (const [, ref] of this.refs) description.push(ref.describe());
    return description;
  }
  toArray() {
    return Array.from(this.list).concat(Array.from(this.refs.values()));
  }
  add(value) {
    Reference.isRef(value) ? this.refs.set(value.key, value) : this.list.add(value);
  }
  delete(value) {
    Reference.isRef(value) ? this.refs.delete(value.key) : this.list.delete(value);
  }
  has(value, resolve) {
    if (this.list.has(value)) return true;
    let item, values = this.refs.values();
    while (item = values.next(), !item.done) if (resolve(item.value) === value) return true;
    return false;
  }
  clone() {
    const next = new ReferenceSet();
    next.list = new Set(this.list);
    next.refs = new Map(this.refs);
    return next;
  }
  merge(newItems, removeItems) {
    const next = this.clone();
    newItems.list.forEach((value) => next.add(value));
    newItems.refs.forEach((value) => next.add(value));
    removeItems.list.forEach((value) => next.delete(value));
    removeItems.refs.forEach((value) => next.delete(value));
    return next;
  }
}
function _extends$2() {
  _extends$2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
class BaseSchema {
  constructor(options) {
    this.deps = [];
    this.conditions = [];
    this._whitelist = new ReferenceSet();
    this._blacklist = new ReferenceSet();
    this.exclusiveTests = /* @__PURE__ */ Object.create(null);
    this.tests = [];
    this.transforms = [];
    this.withMutation(() => {
      this.typeError(mixed.notType);
    });
    this.type = (options == null ? void 0 : options.type) || "mixed";
    this.spec = _extends$2({
      strip: false,
      strict: false,
      abortEarly: true,
      recursive: true,
      nullable: false,
      presence: "optional"
    }, options == null ? void 0 : options.spec);
  }
  // TODO: remove
  get _type() {
    return this.type;
  }
  _typeCheck(_value) {
    return true;
  }
  clone(spec) {
    if (this._mutate) {
      if (spec) Object.assign(this.spec, spec);
      return this;
    }
    const next = Object.create(Object.getPrototypeOf(this));
    next.type = this.type;
    next._typeError = this._typeError;
    next._whitelistError = this._whitelistError;
    next._blacklistError = this._blacklistError;
    next._whitelist = this._whitelist.clone();
    next._blacklist = this._blacklist.clone();
    next.exclusiveTests = _extends$2({}, this.exclusiveTests);
    next.deps = [...this.deps];
    next.conditions = [...this.conditions];
    next.tests = [...this.tests];
    next.transforms = [...this.transforms];
    next.spec = clone$2(_extends$2({}, this.spec, spec));
    return next;
  }
  label(label) {
    var next = this.clone();
    next.spec.label = label;
    return next;
  }
  meta(...args) {
    if (args.length === 0) return this.spec.meta;
    let next = this.clone();
    next.spec.meta = Object.assign(next.spec.meta || {}, args[0]);
    return next;
  }
  // withContext<TContext extends AnyObject>(): BaseSchema<
  //   TCast,
  //   TContext,
  //   TOutput
  // > {
  //   return this as any;
  // }
  withMutation(fn) {
    let before = this._mutate;
    this._mutate = true;
    let result = fn(this);
    this._mutate = before;
    return result;
  }
  concat(schema2) {
    if (!schema2 || schema2 === this) return this;
    if (schema2.type !== this.type && this.type !== "mixed") throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${schema2.type}`);
    let base = this;
    let combined = schema2.clone();
    const mergedSpec = _extends$2({}, base.spec, combined.spec);
    combined.spec = mergedSpec;
    combined._typeError || (combined._typeError = base._typeError);
    combined._whitelistError || (combined._whitelistError = base._whitelistError);
    combined._blacklistError || (combined._blacklistError = base._blacklistError);
    combined._whitelist = base._whitelist.merge(schema2._whitelist, schema2._blacklist);
    combined._blacklist = base._blacklist.merge(schema2._blacklist, schema2._whitelist);
    combined.tests = base.tests;
    combined.exclusiveTests = base.exclusiveTests;
    combined.withMutation((next) => {
      schema2.tests.forEach((fn) => {
        next.test(fn.OPTIONS);
      });
    });
    return combined;
  }
  isType(v) {
    if (this.spec.nullable && v === null) return true;
    return this._typeCheck(v);
  }
  resolve(options) {
    let schema2 = this;
    if (schema2.conditions.length) {
      let conditions = schema2.conditions;
      schema2 = schema2.clone();
      schema2.conditions = [];
      schema2 = conditions.reduce((schema3, condition) => condition.resolve(schema3, options), schema2);
      schema2 = schema2.resolve(options);
    }
    return schema2;
  }
  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {*=} options.parent
   * @param {*=} options.context
   */
  cast(value, options = {}) {
    let resolvedSchema = this.resolve(_extends$2({
      value
    }, options));
    let result = resolvedSchema._cast(value, options);
    if (value !== void 0 && options.assert !== false && resolvedSchema.isType(result) !== true) {
      let formattedValue = printValue$1(value);
      let formattedResult = printValue$1(result);
      throw new TypeError(`The value of ${options.path || "field"} could not be cast to a value that satisfies the schema type: "${resolvedSchema._type}". 

attempted value: ${formattedValue} 
` + (formattedResult !== formattedValue ? `result of cast: ${formattedResult}` : ""));
    }
    return result;
  }
  _cast(rawValue, _options) {
    let value = rawValue === void 0 ? rawValue : this.transforms.reduce((value2, fn) => fn.call(this, value2, rawValue, this), rawValue);
    if (value === void 0) {
      value = this.getDefault();
    }
    return value;
  }
  _validate(_value, options = {}, cb) {
    let {
      sync: sync2,
      path: path2,
      from = [],
      originalValue = _value,
      strict = this.spec.strict,
      abortEarly = this.spec.abortEarly
    } = options;
    let value = _value;
    if (!strict) {
      value = this._cast(value, _extends$2({
        assert: false
      }, options));
    }
    let args = {
      value,
      path: path2,
      options,
      originalValue,
      schema: this,
      label: this.spec.label,
      sync: sync2,
      from
    };
    let initialTests = [];
    if (this._typeError) initialTests.push(this._typeError);
    if (this._whitelistError) initialTests.push(this._whitelistError);
    if (this._blacklistError) initialTests.push(this._blacklistError);
    runTests({
      args,
      value,
      path: path2,
      tests: initialTests,
      endEarly: abortEarly
    }, (err) => {
      if (err) return void cb(err, value);
      runTests({
        tests: this.tests,
        args,
        path: path2,
        sync: sync2,
        value,
        endEarly: abortEarly
      }, cb);
    });
  }
  validate(value, options, maybeCb) {
    let schema2 = this.resolve(_extends$2({}, options, {
      value
    }));
    return typeof maybeCb === "function" ? schema2._validate(value, options, maybeCb) : new Promise((resolve, reject) => schema2._validate(value, options, (err, value2) => {
      if (err) reject(err);
      else resolve(value2);
    }));
  }
  validateSync(value, options) {
    let schema2 = this.resolve(_extends$2({}, options, {
      value
    }));
    let result;
    schema2._validate(value, _extends$2({}, options, {
      sync: true
    }), (err, value2) => {
      if (err) throw err;
      result = value2;
    });
    return result;
  }
  isValid(value, options) {
    return this.validate(value, options).then(() => true, (err) => {
      if (ValidationError.isError(err)) return false;
      throw err;
    });
  }
  isValidSync(value, options) {
    try {
      this.validateSync(value, options);
      return true;
    } catch (err) {
      if (ValidationError.isError(err)) return false;
      throw err;
    }
  }
  _getDefault() {
    let defaultValue = this.spec.default;
    if (defaultValue == null) {
      return defaultValue;
    }
    return typeof defaultValue === "function" ? defaultValue.call(this) : clone$2(defaultValue);
  }
  getDefault(options) {
    let schema2 = this.resolve(options || {});
    return schema2._getDefault();
  }
  default(def) {
    if (arguments.length === 0) {
      return this._getDefault();
    }
    let next = this.clone({
      default: def
    });
    return next;
  }
  strict(isStrict = true) {
    var next = this.clone();
    next.spec.strict = isStrict;
    return next;
  }
  _isPresent(value) {
    return value != null;
  }
  defined(message = mixed.defined) {
    return this.test({
      message,
      name: "defined",
      exclusive: true,
      test(value) {
        return value !== void 0;
      }
    });
  }
  required(message = mixed.required) {
    return this.clone({
      presence: "required"
    }).withMutation((s) => s.test({
      message,
      name: "required",
      exclusive: true,
      test(value) {
        return this.schema._isPresent(value);
      }
    }));
  }
  notRequired() {
    var next = this.clone({
      presence: "optional"
    });
    next.tests = next.tests.filter((test) => test.OPTIONS.name !== "required");
    return next;
  }
  nullable(isNullable = true) {
    var next = this.clone({
      nullable: isNullable !== false
    });
    return next;
  }
  transform(fn) {
    var next = this.clone();
    next.transforms.push(fn);
    return next;
  }
  /**
   * Adds a test function to the schema's queue of tests.
   * tests can be exclusive or non-exclusive.
   *
   * - exclusive tests, will replace any existing tests of the same name.
   * - non-exclusive: can be stacked
   *
   * If a non-exclusive test is added to a schema with an exclusive test of the same name
   * the exclusive test is removed and further tests of the same name will be stacked.
   *
   * If an exclusive test is added to a schema with non-exclusive tests of the same name
   * the previous tests are removed and further tests of the same name will replace each other.
   */
  test(...args) {
    let opts;
    if (args.length === 1) {
      if (typeof args[0] === "function") {
        opts = {
          test: args[0]
        };
      } else {
        opts = args[0];
      }
    } else if (args.length === 2) {
      opts = {
        name: args[0],
        test: args[1]
      };
    } else {
      opts = {
        name: args[0],
        message: args[1],
        test: args[2]
      };
    }
    if (opts.message === void 0) opts.message = mixed.default;
    if (typeof opts.test !== "function") throw new TypeError("`test` is a required parameters");
    let next = this.clone();
    let validate = createValidation(opts);
    let isExclusive = opts.exclusive || opts.name && next.exclusiveTests[opts.name] === true;
    if (opts.exclusive) {
      if (!opts.name) throw new TypeError("Exclusive tests must provide a unique `name` identifying the test");
    }
    if (opts.name) next.exclusiveTests[opts.name] = !!opts.exclusive;
    next.tests = next.tests.filter((fn) => {
      if (fn.OPTIONS.name === opts.name) {
        if (isExclusive) return false;
        if (fn.OPTIONS.test === validate.OPTIONS.test) return false;
      }
      return true;
    });
    next.tests.push(validate);
    return next;
  }
  when(keys, options) {
    if (!Array.isArray(keys) && typeof keys !== "string") {
      options = keys;
      keys = ".";
    }
    let next = this.clone();
    let deps = toArray$1(keys).map((key) => new Reference(key));
    deps.forEach((dep) => {
      if (dep.isSibling) next.deps.push(dep.key);
    });
    next.conditions.push(new Condition(deps, options));
    return next;
  }
  typeError(message) {
    var next = this.clone();
    next._typeError = createValidation({
      message,
      name: "typeError",
      test(value) {
        if (value !== void 0 && !this.schema.isType(value)) return this.createError({
          params: {
            type: this.schema._type
          }
        });
        return true;
      }
    });
    return next;
  }
  oneOf(enums, message = mixed.oneOf) {
    var next = this.clone();
    enums.forEach((val) => {
      next._whitelist.add(val);
      next._blacklist.delete(val);
    });
    next._whitelistError = createValidation({
      message,
      name: "oneOf",
      test(value) {
        if (value === void 0) return true;
        let valids = this.schema._whitelist;
        return valids.has(value, this.resolve) ? true : this.createError({
          params: {
            values: valids.toArray().join(", ")
          }
        });
      }
    });
    return next;
  }
  notOneOf(enums, message = mixed.notOneOf) {
    var next = this.clone();
    enums.forEach((val) => {
      next._blacklist.add(val);
      next._whitelist.delete(val);
    });
    next._blacklistError = createValidation({
      message,
      name: "notOneOf",
      test(value) {
        let invalids = this.schema._blacklist;
        if (invalids.has(value, this.resolve)) return this.createError({
          params: {
            values: invalids.toArray().join(", ")
          }
        });
        return true;
      }
    });
    return next;
  }
  strip(strip = true) {
    let next = this.clone();
    next.spec.strip = strip;
    return next;
  }
  describe() {
    const next = this.clone();
    const {
      label,
      meta
    } = next.spec;
    const description = {
      meta,
      label,
      type: next.type,
      oneOf: next._whitelist.describe(),
      notOneOf: next._blacklist.describe(),
      tests: next.tests.map((fn) => ({
        name: fn.OPTIONS.name,
        params: fn.OPTIONS.params
      })).filter((n, idx, list) => list.findIndex((c) => c.name === n.name) === idx)
    };
    return description;
  }
}
BaseSchema.prototype.__isYupSchema__ = true;
for (const method of ["validate", "validateSync"]) BaseSchema.prototype[`${method}At`] = function(path2, value, options = {}) {
  const {
    parent,
    parentPath,
    schema: schema2
  } = getIn(this, path2, value, options.context);
  return schema2[method](parent && parent[parentPath], _extends$2({}, options, {
    parent,
    path: path2
  }));
};
for (const alias of ["equals", "is"]) BaseSchema.prototype[alias] = BaseSchema.prototype.oneOf;
for (const alias of ["not", "nope"]) BaseSchema.prototype[alias] = BaseSchema.prototype.notOneOf;
BaseSchema.prototype.optional = BaseSchema.prototype.notRequired;
const Mixed = BaseSchema;
function create$3() {
  return new Mixed();
}
create$3.prototype = Mixed.prototype;
const isAbsent = (value) => value == null;
let rEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
let rUrl = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
let rUUID = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
let isTrimmed = (value) => isAbsent(value) || value === value.trim();
let objStringTag = {}.toString();
function create$2() {
  return new StringSchema();
}
class StringSchema extends BaseSchema {
  constructor() {
    super({
      type: "string"
    });
    this.withMutation(() => {
      this.transform(function(value) {
        if (this.isType(value)) return value;
        if (Array.isArray(value)) return value;
        const strValue = value != null && value.toString ? value.toString() : value;
        if (strValue === objStringTag) return value;
        return strValue;
      });
    });
  }
  _typeCheck(value) {
    if (value instanceof String) value = value.valueOf();
    return typeof value === "string";
  }
  _isPresent(value) {
    return super._isPresent(value) && !!value.length;
  }
  length(length, message = string.length) {
    return this.test({
      message,
      name: "length",
      exclusive: true,
      params: {
        length
      },
      test(value) {
        return isAbsent(value) || value.length === this.resolve(length);
      }
    });
  }
  min(min, message = string.min) {
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        min
      },
      test(value) {
        return isAbsent(value) || value.length >= this.resolve(min);
      }
    });
  }
  max(max, message = string.max) {
    return this.test({
      name: "max",
      exclusive: true,
      message,
      params: {
        max
      },
      test(value) {
        return isAbsent(value) || value.length <= this.resolve(max);
      }
    });
  }
  matches(regex, options) {
    let excludeEmptyString = false;
    let message;
    let name;
    if (options) {
      if (typeof options === "object") {
        ({
          excludeEmptyString = false,
          message,
          name
        } = options);
      } else {
        message = options;
      }
    }
    return this.test({
      name: name || "matches",
      message: message || string.matches,
      params: {
        regex
      },
      test: (value) => isAbsent(value) || value === "" && excludeEmptyString || value.search(regex) !== -1
    });
  }
  email(message = string.email) {
    return this.matches(rEmail, {
      name: "email",
      message,
      excludeEmptyString: true
    });
  }
  url(message = string.url) {
    return this.matches(rUrl, {
      name: "url",
      message,
      excludeEmptyString: true
    });
  }
  uuid(message = string.uuid) {
    return this.matches(rUUID, {
      name: "uuid",
      message,
      excludeEmptyString: false
    });
  }
  //-- transforms --
  ensure() {
    return this.default("").transform((val) => val === null ? "" : val);
  }
  trim(message = string.trim) {
    return this.transform((val) => val != null ? val.trim() : val).test({
      message,
      name: "trim",
      test: isTrimmed
    });
  }
  lowercase(message = string.lowercase) {
    return this.transform((value) => !isAbsent(value) ? value.toLowerCase() : value).test({
      message,
      name: "string_case",
      exclusive: true,
      test: (value) => isAbsent(value) || value === value.toLowerCase()
    });
  }
  uppercase(message = string.uppercase) {
    return this.transform((value) => !isAbsent(value) ? value.toUpperCase() : value).test({
      message,
      name: "string_case",
      exclusive: true,
      test: (value) => isAbsent(value) || value === value.toUpperCase()
    });
  }
}
create$2.prototype = StringSchema.prototype;
var isoReg = /^(\d{4}|[+\-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
function parseIsoDate(date2) {
  var numericKeys = [1, 4, 5, 6, 7, 10, 11], minutesOffset = 0, timestamp2, struct;
  if (struct = isoReg.exec(date2)) {
    for (var i = 0, k; k = numericKeys[i]; ++i) struct[k] = +struct[k] || 0;
    struct[2] = (+struct[2] || 1) - 1;
    struct[3] = +struct[3] || 1;
    struct[7] = struct[7] ? String(struct[7]).substr(0, 3) : 0;
    if ((struct[8] === void 0 || struct[8] === "") && (struct[9] === void 0 || struct[9] === "")) timestamp2 = +new Date(struct[1], struct[2], struct[3], struct[4], struct[5], struct[6], struct[7]);
    else {
      if (struct[8] !== "Z" && struct[9] !== void 0) {
        minutesOffset = struct[10] * 60 + struct[11];
        if (struct[9] === "+") minutesOffset = 0 - minutesOffset;
      }
      timestamp2 = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
    }
  } else timestamp2 = Date.parse ? Date.parse(date2) : NaN;
  return timestamp2;
}
let invalidDate = /* @__PURE__ */ new Date("");
let isDate = (obj) => Object.prototype.toString.call(obj) === "[object Date]";
class DateSchema extends BaseSchema {
  constructor() {
    super({
      type: "date"
    });
    this.withMutation(() => {
      this.transform(function(value) {
        if (this.isType(value)) return value;
        value = parseIsoDate(value);
        return !isNaN(value) ? new Date(value) : invalidDate;
      });
    });
  }
  _typeCheck(v) {
    return isDate(v) && !isNaN(v.getTime());
  }
  prepareParam(ref, name) {
    let param;
    if (!Reference.isRef(ref)) {
      let cast = this.cast(ref);
      if (!this._typeCheck(cast)) throw new TypeError(`\`${name}\` must be a Date or a value that can be \`cast()\` to a Date`);
      param = cast;
    } else {
      param = ref;
    }
    return param;
  }
  min(min, message = date.min) {
    let limit = this.prepareParam(min, "min");
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        min
      },
      test(value) {
        return isAbsent(value) || value >= this.resolve(limit);
      }
    });
  }
  max(max, message = date.max) {
    var limit = this.prepareParam(max, "max");
    return this.test({
      message,
      name: "max",
      exclusive: true,
      params: {
        max
      },
      test(value) {
        return isAbsent(value) || value <= this.resolve(limit);
      }
    });
  }
}
DateSchema.INVALID_DATE = invalidDate;
var toposort$2 = { exports: {} };
toposort$2.exports = function(edges) {
  return toposort(uniqueNodes(edges), edges);
};
toposort$2.exports.array = toposort;
function toposort(nodes, edges) {
  var cursor = nodes.length, sorted = new Array(cursor), visited = {}, i = cursor, outgoingEdges = makeOutgoingEdges(edges), nodesHash = makeNodesHash(nodes);
  edges.forEach(function(edge) {
    if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
      throw new Error("Unknown node. There is an unknown node in the supplied edges.");
    }
  });
  while (i--) {
    if (!visited[i]) visit(nodes[i], i, /* @__PURE__ */ new Set());
  }
  return sorted;
  function visit(node, i2, predecessors) {
    if (predecessors.has(node)) {
      var nodeRep;
      try {
        nodeRep = ", node was:" + JSON.stringify(node);
      } catch (e) {
        nodeRep = "";
      }
      throw new Error("Cyclic dependency" + nodeRep);
    }
    if (!nodesHash.has(node)) {
      throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: " + JSON.stringify(node));
    }
    if (visited[i2]) return;
    visited[i2] = true;
    var outgoing = outgoingEdges.get(node) || /* @__PURE__ */ new Set();
    outgoing = Array.from(outgoing);
    if (i2 = outgoing.length) {
      predecessors.add(node);
      do {
        var child = outgoing[--i2];
        visit(child, nodesHash.get(child), predecessors);
      } while (i2);
      predecessors.delete(node);
    }
    sorted[--cursor] = node;
  }
}
function uniqueNodes(arr) {
  var res = /* @__PURE__ */ new Set();
  for (var i = 0, len = arr.length; i < len; i++) {
    var edge = arr[i];
    res.add(edge[0]);
    res.add(edge[1]);
  }
  return Array.from(res);
}
function makeOutgoingEdges(arr) {
  var edges = /* @__PURE__ */ new Map();
  for (var i = 0, len = arr.length; i < len; i++) {
    var edge = arr[i];
    if (!edges.has(edge[0])) edges.set(edge[0], /* @__PURE__ */ new Set());
    if (!edges.has(edge[1])) edges.set(edge[1], /* @__PURE__ */ new Set());
    edges.get(edge[0]).add(edge[1]);
  }
  return edges;
}
function makeNodesHash(arr) {
  var res = /* @__PURE__ */ new Map();
  for (var i = 0, len = arr.length; i < len; i++) {
    res.set(arr[i], i);
  }
  return res;
}
var toposortExports = toposort$2.exports;
const toposort$1 = /* @__PURE__ */ getDefaultExportFromCjs(toposortExports);
function sortFields(fields2, excludes = []) {
  let edges = [];
  let nodes = [];
  function addNode(depPath, key) {
    var node = propertyExpr.split(depPath)[0];
    if (!~nodes.indexOf(node)) nodes.push(node);
    if (!~excludes.indexOf(`${key}-${node}`)) edges.push([key, node]);
  }
  for (const key in fields2) if (has__default.default(fields2, key)) {
    let value = fields2[key];
    if (!~nodes.indexOf(key)) nodes.push(key);
    if (Reference.isRef(value) && value.isSibling) addNode(value.path, key);
    else if (isSchema(value) && "deps" in value) value.deps.forEach((path2) => addNode(path2, key));
  }
  return toposort$1.array(nodes, edges).reverse();
}
function findIndex(arr, err) {
  let idx = Infinity;
  arr.some((key, ii) => {
    var _err$path;
    if (((_err$path = err.path) == null ? void 0 : _err$path.indexOf(key)) !== -1) {
      idx = ii;
      return true;
    }
  });
  return idx;
}
function sortByKeyOrder(keys) {
  return (a, b) => {
    return findIndex(keys, a) - findIndex(keys, b);
  };
}
function _extends$1() {
  _extends$1 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
let isObject$3 = (obj) => Object.prototype.toString.call(obj) === "[object Object]";
function unknown(ctx, value) {
  let known = Object.keys(ctx.fields);
  return Object.keys(value).filter((key) => known.indexOf(key) === -1);
}
const defaultSort = sortByKeyOrder([]);
class ObjectSchema extends BaseSchema {
  constructor(spec) {
    super({
      type: "object"
    });
    this.fields = /* @__PURE__ */ Object.create(null);
    this._sortErrors = defaultSort;
    this._nodes = [];
    this._excludedEdges = [];
    this.withMutation(() => {
      this.transform(function coerce(value) {
        if (typeof value === "string") {
          try {
            value = JSON.parse(value);
          } catch (err) {
            value = null;
          }
        }
        if (this.isType(value)) return value;
        return null;
      });
      if (spec) {
        this.shape(spec);
      }
    });
  }
  _typeCheck(value) {
    return isObject$3(value) || typeof value === "function";
  }
  _cast(_value, options = {}) {
    var _options$stripUnknown;
    let value = super._cast(_value, options);
    if (value === void 0) return this.getDefault();
    if (!this._typeCheck(value)) return value;
    let fields2 = this.fields;
    let strip = (_options$stripUnknown = options.stripUnknown) != null ? _options$stripUnknown : this.spec.noUnknown;
    let props = this._nodes.concat(Object.keys(value).filter((v) => this._nodes.indexOf(v) === -1));
    let intermediateValue = {};
    let innerOptions = _extends$1({}, options, {
      parent: intermediateValue,
      __validating: options.__validating || false
    });
    let isChanged = false;
    for (const prop of props) {
      let field = fields2[prop];
      let exists = has__default.default(value, prop);
      if (field) {
        let fieldValue;
        let inputValue = value[prop];
        innerOptions.path = (options.path ? `${options.path}.` : "") + prop;
        field = field.resolve({
          value: inputValue,
          context: options.context,
          parent: intermediateValue
        });
        let fieldSpec = "spec" in field ? field.spec : void 0;
        let strict = fieldSpec == null ? void 0 : fieldSpec.strict;
        if (fieldSpec == null ? void 0 : fieldSpec.strip) {
          isChanged = isChanged || prop in value;
          continue;
        }
        fieldValue = !options.__validating || !strict ? (
          // TODO: use _cast, this is double resolving
          field.cast(value[prop], innerOptions)
        ) : value[prop];
        if (fieldValue !== void 0) {
          intermediateValue[prop] = fieldValue;
        }
      } else if (exists && !strip) {
        intermediateValue[prop] = value[prop];
      }
      if (intermediateValue[prop] !== value[prop]) {
        isChanged = true;
      }
    }
    return isChanged ? intermediateValue : value;
  }
  _validate(_value, opts = {}, callback) {
    let errors = [];
    let {
      sync: sync2,
      from = [],
      originalValue = _value,
      abortEarly = this.spec.abortEarly,
      recursive = this.spec.recursive
    } = opts;
    from = [{
      schema: this,
      value: originalValue
    }, ...from];
    opts.__validating = true;
    opts.originalValue = originalValue;
    opts.from = from;
    super._validate(_value, opts, (err, value) => {
      if (err) {
        if (!ValidationError.isError(err) || abortEarly) {
          return void callback(err, value);
        }
        errors.push(err);
      }
      if (!recursive || !isObject$3(value)) {
        callback(errors[0] || null, value);
        return;
      }
      originalValue = originalValue || value;
      let tests = this._nodes.map((key) => (_, cb) => {
        let path2 = key.indexOf(".") === -1 ? (opts.path ? `${opts.path}.` : "") + key : `${opts.path || ""}["${key}"]`;
        let field = this.fields[key];
        if (field && "validate" in field) {
          field.validate(value[key], _extends$1({}, opts, {
            // @ts-ignore
            path: path2,
            from,
            // inner fields are always strict:
            // 1. this isn't strict so the casting will also have cast inner values
            // 2. this is strict in which case the nested values weren't cast either
            strict: true,
            parent: value,
            originalValue: originalValue[key]
          }), cb);
          return;
        }
        cb(null);
      });
      runTests({
        tests,
        value,
        errors,
        endEarly: abortEarly,
        sort: this._sortErrors,
        path: opts.path
      }, callback);
    });
  }
  clone(spec) {
    const next = super.clone(spec);
    next.fields = _extends$1({}, this.fields);
    next._nodes = this._nodes;
    next._excludedEdges = this._excludedEdges;
    next._sortErrors = this._sortErrors;
    return next;
  }
  concat(schema2) {
    let next = super.concat(schema2);
    let nextFields = next.fields;
    for (let [field, schemaOrRef] of Object.entries(this.fields)) {
      const target = nextFields[field];
      if (target === void 0) {
        nextFields[field] = schemaOrRef;
      } else if (target instanceof BaseSchema && schemaOrRef instanceof BaseSchema) {
        nextFields[field] = schemaOrRef.concat(target);
      }
    }
    return next.withMutation(() => next.shape(nextFields));
  }
  getDefaultFromShape() {
    let dft = {};
    this._nodes.forEach((key) => {
      const field = this.fields[key];
      dft[key] = "default" in field ? field.getDefault() : void 0;
    });
    return dft;
  }
  _getDefault() {
    if ("default" in this.spec) {
      return super._getDefault();
    }
    if (!this._nodes.length) {
      return void 0;
    }
    return this.getDefaultFromShape();
  }
  shape(additions, excludes = []) {
    let next = this.clone();
    let fields2 = Object.assign(next.fields, additions);
    next.fields = fields2;
    next._sortErrors = sortByKeyOrder(Object.keys(fields2));
    if (excludes.length) {
      if (!Array.isArray(excludes[0])) excludes = [excludes];
      let keys = excludes.map(([first, second]) => `${first}-${second}`);
      next._excludedEdges = next._excludedEdges.concat(keys);
    }
    next._nodes = sortFields(fields2, next._excludedEdges);
    return next;
  }
  pick(keys) {
    const picked = {};
    for (const key of keys) {
      if (this.fields[key]) picked[key] = this.fields[key];
    }
    return this.clone().withMutation((next) => {
      next.fields = {};
      return next.shape(picked);
    });
  }
  omit(keys) {
    const next = this.clone();
    const fields2 = next.fields;
    next.fields = {};
    for (const key of keys) {
      delete fields2[key];
    }
    return next.withMutation(() => next.shape(fields2));
  }
  from(from, to, alias) {
    let fromGetter = propertyExpr.getter(from, true);
    return this.transform((obj) => {
      if (obj == null) return obj;
      let newObj = obj;
      if (has__default.default(obj, from)) {
        newObj = _extends$1({}, obj);
        if (!alias) delete newObj[from];
        newObj[to] = fromGetter(obj);
      }
      return newObj;
    });
  }
  noUnknown(noAllow = true, message = object.noUnknown) {
    if (typeof noAllow === "string") {
      message = noAllow;
      noAllow = true;
    }
    let next = this.test({
      name: "noUnknown",
      exclusive: true,
      message,
      test(value) {
        if (value == null) return true;
        const unknownKeys = unknown(this.schema, value);
        return !noAllow || unknownKeys.length === 0 || this.createError({
          params: {
            unknown: unknownKeys.join(", ")
          }
        });
      }
    });
    next.spec.noUnknown = noAllow;
    return next;
  }
  unknown(allow = true, message = object.noUnknown) {
    return this.noUnknown(!allow, message);
  }
  transformKeys(fn) {
    return this.transform((obj) => obj && mapKeys__default.default(obj, (_, key) => fn(key)));
  }
  camelCase() {
    return this.transformKeys(camelCase__default.default);
  }
  snakeCase() {
    return this.transformKeys(snakeCase__default.default);
  }
  constantCase() {
    return this.transformKeys((key) => snakeCase__default.default(key).toUpperCase());
  }
  describe() {
    let base = super.describe();
    base.fields = mapValues__default.default(this.fields, (value) => value.describe());
    return base;
  }
}
function create$1(spec) {
  return new ObjectSchema(spec);
}
create$1.prototype = ObjectSchema.prototype;
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function create(type2) {
  return new ArraySchema(type2);
}
class ArraySchema extends BaseSchema {
  constructor(type2) {
    super({
      type: "array"
    });
    this.innerType = type2;
    this.withMutation(() => {
      this.transform(function(values) {
        if (typeof values === "string") try {
          values = JSON.parse(values);
        } catch (err) {
          values = null;
        }
        return this.isType(values) ? values : null;
      });
    });
  }
  _typeCheck(v) {
    return Array.isArray(v);
  }
  get _subType() {
    return this.innerType;
  }
  _cast(_value, _opts) {
    const value = super._cast(_value, _opts);
    if (!this._typeCheck(value) || !this.innerType) return value;
    let isChanged = false;
    const castArray = value.map((v, idx) => {
      const castElement = this.innerType.cast(v, _extends({}, _opts, {
        path: `${_opts.path || ""}[${idx}]`
      }));
      if (castElement !== v) {
        isChanged = true;
      }
      return castElement;
    });
    return isChanged ? castArray : value;
  }
  _validate(_value, options = {}, callback) {
    var _options$abortEarly, _options$recursive;
    let errors = [];
    options.sync;
    let path2 = options.path;
    let innerType = this.innerType;
    let endEarly = (_options$abortEarly = options.abortEarly) != null ? _options$abortEarly : this.spec.abortEarly;
    let recursive = (_options$recursive = options.recursive) != null ? _options$recursive : this.spec.recursive;
    let originalValue = options.originalValue != null ? options.originalValue : _value;
    super._validate(_value, options, (err, value) => {
      if (err) {
        if (!ValidationError.isError(err) || endEarly) {
          return void callback(err, value);
        }
        errors.push(err);
      }
      if (!recursive || !innerType || !this._typeCheck(value)) {
        callback(errors[0] || null, value);
        return;
      }
      originalValue = originalValue || value;
      let tests = new Array(value.length);
      for (let idx = 0; idx < value.length; idx++) {
        let item = value[idx];
        let path3 = `${options.path || ""}[${idx}]`;
        let innerOptions = _extends({}, options, {
          path: path3,
          strict: true,
          parent: value,
          index: idx,
          originalValue: originalValue[idx]
        });
        tests[idx] = (_, cb) => innerType.validate(item, innerOptions, cb);
      }
      runTests({
        path: path2,
        value,
        errors,
        endEarly,
        tests
      }, callback);
    });
  }
  clone(spec) {
    const next = super.clone(spec);
    next.innerType = this.innerType;
    return next;
  }
  concat(schema2) {
    let next = super.concat(schema2);
    next.innerType = this.innerType;
    if (schema2.innerType) next.innerType = next.innerType ? (
      // @ts-expect-error Lazy doesn't have concat()
      next.innerType.concat(schema2.innerType)
    ) : schema2.innerType;
    return next;
  }
  of(schema2) {
    let next = this.clone();
    if (!isSchema(schema2)) throw new TypeError("`array.of()` sub-schema must be a valid yup schema not: " + printValue$1(schema2));
    next.innerType = schema2;
    return next;
  }
  length(length, message = array.length) {
    return this.test({
      message,
      name: "length",
      exclusive: true,
      params: {
        length
      },
      test(value) {
        return isAbsent(value) || value.length === this.resolve(length);
      }
    });
  }
  min(min, message) {
    message = message || array.min;
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        min
      },
      // FIXME(ts): Array<typeof T>
      test(value) {
        return isAbsent(value) || value.length >= this.resolve(min);
      }
    });
  }
  max(max, message) {
    message = message || array.max;
    return this.test({
      message,
      name: "max",
      exclusive: true,
      params: {
        max
      },
      test(value) {
        return isAbsent(value) || value.length <= this.resolve(max);
      }
    });
  }
  ensure() {
    return this.default(() => []).transform((val, original) => {
      if (this._typeCheck(val)) return val;
      return original == null ? [] : [].concat(original);
    });
  }
  compact(rejector) {
    let reject = !rejector ? (v) => !!v : (v, i, a) => !rejector(v, i, a);
    return this.transform((values) => values != null ? values.filter(reject) : values);
  }
  describe() {
    let base = super.describe();
    if (this.innerType) base.innerType = this.innerType.describe();
    return base;
  }
  nullable(isNullable = true) {
    return super.nullable(isNullable);
  }
  defined() {
    return super.defined();
  }
  required(msg) {
    return super.required(msg);
  }
}
create.prototype = ArraySchema.prototype;
function setLocale(custom) {
  Object.keys(custom).forEach((type2) => {
    Object.keys(custom[type2]).forEach((method) => {
      locale[type2][method] = custom[type2][method];
    });
  });
}
function addMethod(schemaType, name, fn) {
  if (!schemaType || !isSchema(schemaType.prototype)) throw new TypeError("You must provide a yup schema constructor function");
  if (typeof name !== "string") throw new TypeError("A Method name must be provided");
  if (typeof fn !== "function") throw new TypeError("Method function must be provided");
  schemaType.prototype[name] = fn;
}
var httpErrors = { exports: {} };
/*!
 * depd
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var browser = depd;
function depd(namespace) {
  if (!namespace) {
    throw new TypeError("argument namespace is required");
  }
  function deprecate(message) {
  }
  deprecate._file = void 0;
  deprecate._ignored = true;
  deprecate._namespace = namespace;
  deprecate._traced = false;
  deprecate._warned = /* @__PURE__ */ Object.create(null);
  deprecate.function = wrapfunction;
  deprecate.property = wrapproperty;
  return deprecate;
}
function wrapfunction(fn, message) {
  if (typeof fn !== "function") {
    throw new TypeError("argument fn must be a function");
  }
  return fn;
}
function wrapproperty(obj, prop, message) {
  if (!obj || typeof obj !== "object" && typeof obj !== "function") {
    throw new TypeError("argument obj must be object");
  }
  var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
  if (!descriptor) {
    throw new TypeError("must call property on owner object");
  }
  if (!descriptor.configurable) {
    throw new TypeError("property must be configurable");
  }
}
var setprototypeof = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? setProtoOf : mixinProperties);
function setProtoOf(obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
function mixinProperties(obj, proto) {
  for (var prop in proto) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
      obj[prop] = proto[prop];
    }
  }
  return obj;
}
const require$$0 = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "103": "Early Hints",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a Teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required"
};
/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var codes = require$$0;
var statuses = status;
status.message = codes;
status.code = createMessageToStatusCodeMap(codes);
status.codes = createStatusCodeList(codes);
status.redirect = {
  300: true,
  301: true,
  302: true,
  303: true,
  305: true,
  307: true,
  308: true
};
status.empty = {
  204: true,
  205: true,
  304: true
};
status.retry = {
  502: true,
  503: true,
  504: true
};
function createMessageToStatusCodeMap(codes2) {
  var map2 = {};
  Object.keys(codes2).forEach(function forEachCode(code) {
    var message = codes2[code];
    var status2 = Number(code);
    map2[message.toLowerCase()] = status2;
  });
  return map2;
}
function createStatusCodeList(codes2) {
  return Object.keys(codes2).map(function mapCode(code) {
    return Number(code);
  });
}
function getStatusCode(message) {
  var msg = message.toLowerCase();
  if (!Object.prototype.hasOwnProperty.call(status.code, msg)) {
    throw new Error('invalid status message: "' + message + '"');
  }
  return status.code[msg];
}
function getStatusMessage(code) {
  if (!Object.prototype.hasOwnProperty.call(status.message, code)) {
    throw new Error("invalid status code: " + code);
  }
  return status.message[code];
}
function status(code) {
  if (typeof code === "number") {
    return getStatusMessage(code);
  }
  if (typeof code !== "string") {
    throw new TypeError("code must be a number or string");
  }
  var n = parseInt(code, 10);
  if (!isNaN(n)) {
    return getStatusMessage(n);
  }
  return getStatusCode(code);
}
var inherits_browser = { exports: {} };
if (typeof Object.create === "function") {
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {
      };
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}
var inherits_browserExports = inherits_browser.exports;
/*!
 * toidentifier
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var toidentifier = toIdentifier;
function toIdentifier(str2) {
  return str2.split(" ").map(function(token) {
    return token.slice(0, 1).toUpperCase() + token.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(module2) {
  browser("http-errors");
  var setPrototypeOf = setprototypeof;
  var statuses$1 = statuses;
  var inherits = inherits_browserExports;
  var toIdentifier2 = toidentifier;
  module2.exports = createError;
  module2.exports.HttpError = createHttpErrorConstructor();
  module2.exports.isHttpError = createIsHttpErrorFunction(module2.exports.HttpError);
  populateConstructorExports(module2.exports, statuses$1.codes, module2.exports.HttpError);
  function codeClass(status2) {
    return Number(String(status2).charAt(0) + "00");
  }
  function createError() {
    var err;
    var msg;
    var status2 = 500;
    var props = {};
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      var type2 = typeof arg;
      if (type2 === "object" && arg instanceof Error) {
        err = arg;
        status2 = err.status || err.statusCode || status2;
      } else if (type2 === "number" && i === 0) {
        status2 = arg;
      } else if (type2 === "string") {
        msg = arg;
      } else if (type2 === "object") {
        props = arg;
      } else {
        throw new TypeError("argument #" + (i + 1) + " unsupported type " + type2);
      }
    }
    if (typeof status2 !== "number" || !statuses$1.message[status2] && (status2 < 400 || status2 >= 600)) {
      status2 = 500;
    }
    var HttpError = createError[status2] || createError[codeClass(status2)];
    if (!err) {
      err = HttpError ? new HttpError(msg) : new Error(msg || statuses$1.message[status2]);
      Error.captureStackTrace(err, createError);
    }
    if (!HttpError || !(err instanceof HttpError) || err.status !== status2) {
      err.expose = status2 < 500;
      err.status = err.statusCode = status2;
    }
    for (var key in props) {
      if (key !== "status" && key !== "statusCode") {
        err[key] = props[key];
      }
    }
    return err;
  }
  function createHttpErrorConstructor() {
    function HttpError() {
      throw new TypeError("cannot construct abstract class");
    }
    inherits(HttpError, Error);
    return HttpError;
  }
  function createClientErrorConstructor(HttpError, name, code) {
    var className = toClassName(name);
    function ClientError(message) {
      var msg = message != null ? message : statuses$1.message[code];
      var err = new Error(msg);
      Error.captureStackTrace(err, ClientError);
      setPrototypeOf(err, ClientError.prototype);
      Object.defineProperty(err, "message", {
        enumerable: true,
        configurable: true,
        value: msg,
        writable: true
      });
      Object.defineProperty(err, "name", {
        enumerable: false,
        configurable: true,
        value: className,
        writable: true
      });
      return err;
    }
    inherits(ClientError, HttpError);
    nameFunc(ClientError, className);
    ClientError.prototype.status = code;
    ClientError.prototype.statusCode = code;
    ClientError.prototype.expose = true;
    return ClientError;
  }
  function createIsHttpErrorFunction(HttpError) {
    return function isHttpError(val) {
      if (!val || typeof val !== "object") {
        return false;
      }
      if (val instanceof HttpError) {
        return true;
      }
      return val instanceof Error && typeof val.expose === "boolean" && typeof val.statusCode === "number" && val.status === val.statusCode;
    };
  }
  function createServerErrorConstructor(HttpError, name, code) {
    var className = toClassName(name);
    function ServerError(message) {
      var msg = message != null ? message : statuses$1.message[code];
      var err = new Error(msg);
      Error.captureStackTrace(err, ServerError);
      setPrototypeOf(err, ServerError.prototype);
      Object.defineProperty(err, "message", {
        enumerable: true,
        configurable: true,
        value: msg,
        writable: true
      });
      Object.defineProperty(err, "name", {
        enumerable: false,
        configurable: true,
        value: className,
        writable: true
      });
      return err;
    }
    inherits(ServerError, HttpError);
    nameFunc(ServerError, className);
    ServerError.prototype.status = code;
    ServerError.prototype.statusCode = code;
    ServerError.prototype.expose = false;
    return ServerError;
  }
  function nameFunc(func, name) {
    var desc = Object.getOwnPropertyDescriptor(func, "name");
    if (desc && desc.configurable) {
      desc.value = name;
      Object.defineProperty(func, "name", desc);
    }
  }
  function populateConstructorExports(exports2, codes2, HttpError) {
    codes2.forEach(function forEachCode(code) {
      var CodeError;
      var name = toIdentifier2(statuses$1.message[code]);
      switch (codeClass(code)) {
        case 400:
          CodeError = createClientErrorConstructor(HttpError, name, code);
          break;
        case 500:
          CodeError = createServerErrorConstructor(HttpError, name, code);
          break;
      }
      if (CodeError) {
        exports2[code] = CodeError;
        exports2[name] = CodeError;
      }
    });
  }
  function toClassName(name) {
    return name.substr(-5) !== "Error" ? name + "Error" : name;
  }
})(httpErrors);
class ApplicationError extends Error {
  constructor(message = "An application error occured", details = {}) {
    super();
    this.name = "ApplicationError";
    this.message = message;
    this.details = details;
  }
}
class NotFoundError extends ApplicationError {
  constructor(message = "Entity not found", details) {
    super(message, details);
    this.name = "NotFoundError";
    this.message = message;
  }
}
const GROUP_OPERATORS = [
  "$and",
  "$or"
];
const WHERE_OPERATORS = [
  "$not",
  "$in",
  "$notIn",
  "$eq",
  "$eqi",
  "$ne",
  "$nei",
  "$gt",
  "$gte",
  "$lt",
  "$lte",
  "$null",
  "$notNull",
  "$between",
  "$startsWith",
  "$endsWith",
  "$startsWithi",
  "$endsWithi",
  "$contains",
  "$notContains",
  "$containsi",
  "$notContainsi",
  // Experimental, only for internal use
  "$jsonSupersetOf"
];
const CAST_OPERATORS = [
  "$not",
  "$in",
  "$notIn",
  "$eq",
  "$ne",
  "$gt",
  "$gte",
  "$lt",
  "$lte",
  "$between"
];
const ARRAY_OPERATORS = [
  "$in",
  "$notIn",
  "$between"
];
const OPERATORS = {
  where: WHERE_OPERATORS,
  cast: CAST_OPERATORS,
  group: GROUP_OPERATORS,
  array: ARRAY_OPERATORS
};
const OPERATORS_LOWERCASE = Object.fromEntries(Object.entries(OPERATORS).map(([key, values]) => [
  key,
  values.map((value) => value.toLowerCase())
]));
const isObjKey = (key, obj) => {
  return key in obj;
};
const isOperatorOfType = (type2, key, ignoreCase = false) => {
  if (ignoreCase) {
    return OPERATORS_LOWERCASE[type2]?.includes(key.toLowerCase()) ?? false;
  }
  if (isObjKey(type2, OPERATORS)) {
    return OPERATORS[type2]?.includes(key) ?? false;
  }
  return false;
};
const isOperator = (key, ignoreCase = false) => {
  return Object.keys(OPERATORS).some((type2) => isOperatorOfType(type2, key, ignoreCase));
};
var indentString$2 = (string2, count = 1, options) => {
  options = {
    indent: " ",
    includeEmptyLines: false,
    ...options
  };
  if (typeof string2 !== "string") {
    throw new TypeError(
      `Expected \`input\` to be a \`string\`, got \`${typeof string2}\``
    );
  }
  if (typeof count !== "number") {
    throw new TypeError(
      `Expected \`count\` to be a \`number\`, got \`${typeof count}\``
    );
  }
  if (typeof options.indent !== "string") {
    throw new TypeError(
      `Expected \`options.indent\` to be a \`string\`, got \`${typeof options.indent}\``
    );
  }
  if (count === 0) {
    return string2;
  }
  const regex = options.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
  return string2.replace(regex, options.indent.repeat(count));
};
const os$1 = require$$0__default$1.default;
const extractPathRegex = /\s+at.*(?:\(|\s)(.*)\)?/;
const pathRegex = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/;
const homeDir = typeof os$1.homedir === "undefined" ? "" : os$1.homedir();
var cleanStack$1 = (stack, options) => {
  options = Object.assign({ pretty: false }, options);
  return stack.replace(/\\/g, "/").split("\n").filter((line) => {
    const pathMatches = line.match(extractPathRegex);
    if (pathMatches === null || !pathMatches[1]) {
      return true;
    }
    const match = pathMatches[1];
    if (match.includes(".app/Contents/Resources/electron.asar") || match.includes(".app/Contents/Resources/default_app.asar")) {
      return false;
    }
    return !pathRegex.test(match);
  }).filter((line) => line.trim() !== "").map((line) => {
    if (options.pretty) {
      return line.replace(extractPathRegex, (m, p1) => m.replace(p1, p1.replace(homeDir, "~")));
    }
    return line;
  }).join("\n");
};
const indentString$1 = indentString$2;
const cleanStack = cleanStack$1;
const cleanInternalStack = (stack) => stack.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, "");
let AggregateError$1 = class AggregateError extends Error {
  constructor(errors) {
    if (!Array.isArray(errors)) {
      throw new TypeError(`Expected input to be an Array, got ${typeof errors}`);
    }
    errors = [...errors].map((error2) => {
      if (error2 instanceof Error) {
        return error2;
      }
      if (error2 !== null && typeof error2 === "object") {
        return Object.assign(new Error(error2.message), error2);
      }
      return new Error(error2);
    });
    let message = errors.map((error2) => {
      return typeof error2.stack === "string" ? cleanInternalStack(cleanStack(error2.stack)) : String(error2);
    }).join("\n");
    message = "\n" + indentString$1(message, 4);
    super(message);
    this.name = "AggregateError";
    Object.defineProperty(this, "_errors", { value: errors });
  }
  *[Symbol.iterator]() {
    for (const error2 of this._errors) {
      yield error2;
    }
  }
};
var aggregateError = AggregateError$1;
const AggregateError2 = aggregateError;
var pMap = async (iterable, mapper, {
  concurrency = Infinity,
  stopOnError = true
} = {}) => {
  return new Promise((resolve, reject) => {
    if (typeof mapper !== "function") {
      throw new TypeError("Mapper function is required");
    }
    if (!((Number.isSafeInteger(concurrency) || concurrency === Infinity) && concurrency >= 1)) {
      throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${concurrency}\` (${typeof concurrency})`);
    }
    const result = [];
    const errors = [];
    const iterator = iterable[Symbol.iterator]();
    let isRejected = false;
    let isIterableDone = false;
    let resolvingCount = 0;
    let currentIndex = 0;
    const next = () => {
      if (isRejected) {
        return;
      }
      const nextItem = iterator.next();
      const index2 = currentIndex;
      currentIndex++;
      if (nextItem.done) {
        isIterableDone = true;
        if (resolvingCount === 0) {
          if (!stopOnError && errors.length !== 0) {
            reject(new AggregateError2(errors));
          } else {
            resolve(result);
          }
        }
        return;
      }
      resolvingCount++;
      (async () => {
        try {
          const element = await nextItem.value;
          result[index2] = await mapper(element, index2);
          resolvingCount--;
          next();
        } catch (error2) {
          if (stopOnError) {
            isRejected = true;
            reject(error2);
          } else {
            errors.push(error2);
            resolvingCount--;
            next();
          }
        }
      })();
    };
    for (let i = 0; i < concurrency; i++) {
      next();
      if (isIterableDone) {
        break;
      }
    }
  });
};
const pMap$1 = /* @__PURE__ */ getDefaultExportFromCjs(pMap);
function pipe(...fns) {
  const [firstFn, ...fnRest] = fns;
  return async (...args) => {
    let res = await firstFn.apply(firstFn, args);
    for (let i = 0; i < fnRest.length; i += 1) {
      res = await fnRest[i](res);
    }
    return res;
  };
}
fp.curry(pMap$1);
const visitor$4 = ({ key, attribute }, { remove }) => {
  if (attribute?.type === "password") {
    remove(key);
  }
};
const visitor$3 = ({ schema: schema2, key, attribute }, { remove }) => {
  if (!attribute) {
    return;
  }
  const isPrivate = attribute.private === true || isPrivateAttribute(schema2, key);
  if (isPrivate) {
    remove(key);
  }
};
const visitor$2 = ({ key, attribute }, { remove }) => {
  if (isMorphToRelationalAttribute(attribute)) {
    remove(key);
  }
};
const visitor$1 = ({ key, attribute }, { remove }) => {
  if (isDynamicZoneAttribute(attribute)) {
    remove(key);
  }
};
const visitor = ({ schema: schema2, key, value }, { set: set2 }) => {
  if (key === "" && value === "*") {
    const { attributes } = schema2;
    const newPopulateQuery = Object.entries(attributes).filter(([, attribute]) => [
      "relation",
      "component",
      "media",
      "dynamiczone"
    ].includes(attribute.type)).reduce((acc, [key2]) => ({
      ...acc,
      [key2]: true
    }), {});
    set2("", newPopulateQuery);
  }
};
const DEFAULT_PATH = {
  raw: null,
  attribute: null
};
var traverseFactory = () => {
  const state = {
    parsers: [],
    interceptors: [],
    ignore: [],
    handlers: {
      attributes: [],
      common: []
    }
  };
  const traverse = async (visitor2, options, data) => {
    const { path: path2 = DEFAULT_PATH, parent, schema: schema2, getModel } = options ?? {};
    for (const { predicate, handler } of state.interceptors) {
      if (predicate(data)) {
        return handler(visitor2, options, data, {
          recurse: traverse
        });
      }
    }
    const parser = state.parsers.find((parser2) => parser2.predicate(data))?.parser;
    const utils2 = parser?.(data);
    if (!utils2) {
      return data;
    }
    let out = utils2.transform(data);
    const keys = utils2.keys(out);
    for (const key of keys) {
      const attribute = schema2?.attributes?.[key];
      const newPath = {
        ...path2
      };
      newPath.raw = fp.isNil(path2.raw) ? key : `${path2.raw}.${key}`;
      if (!fp.isNil(attribute)) {
        newPath.attribute = fp.isNil(path2.attribute) ? key : `${path2.attribute}.${key}`;
      }
      const visitorOptions = {
        key,
        value: utils2.get(key, out),
        attribute,
        schema: schema2,
        path: newPath,
        data: out,
        getModel,
        parent
      };
      const transformUtils = {
        remove(key2) {
          out = utils2.remove(key2, out);
        },
        set(key2, value2) {
          out = utils2.set(key2, value2, out);
        },
        recurse: traverse
      };
      await visitor2(visitorOptions, fp.pick([
        "remove",
        "set"
      ], transformUtils));
      const value = utils2.get(key, out);
      const createContext = () => ({
        key,
        value,
        attribute,
        schema: schema2,
        path: newPath,
        data: out,
        visitor: visitor2,
        getModel,
        parent
      });
      const ignoreCtx = createContext();
      const shouldIgnore = state.ignore.some((predicate) => predicate(ignoreCtx));
      if (shouldIgnore) {
        continue;
      }
      const handlers = [
        ...state.handlers.common,
        ...state.handlers.attributes
      ];
      for await (const handler of handlers) {
        const ctx = createContext();
        const pass = await handler.predicate(ctx);
        if (pass) {
          await handler.handler(ctx, fp.pick([
            "recurse",
            "set"
          ], transformUtils));
        }
      }
    }
    return out;
  };
  return {
    traverse,
    intercept(predicate, handler) {
      state.interceptors.push({
        predicate,
        handler
      });
      return this;
    },
    parse(predicate, parser) {
      state.parsers.push({
        predicate,
        parser
      });
      return this;
    },
    ignore(predicate) {
      state.ignore.push(predicate);
      return this;
    },
    on(predicate, handler) {
      state.handlers.common.push({
        predicate,
        handler
      });
      return this;
    },
    onAttribute(predicate, handler) {
      state.handlers.attributes.push({
        predicate,
        handler
      });
      return this;
    },
    onRelation(handler) {
      return this.onAttribute(({ attribute }) => attribute?.type === "relation", handler);
    },
    onMedia(handler) {
      return this.onAttribute(({ attribute }) => attribute?.type === "media", handler);
    },
    onComponent(handler) {
      return this.onAttribute(({ attribute }) => attribute?.type === "component", handler);
    },
    onDynamicZone(handler) {
      return this.onAttribute(({ attribute }) => attribute?.type === "dynamiczone", handler);
    }
  };
};
const isObj$2 = (value) => fp.isObject(value);
const filters = traverseFactory().intercept(
  // Intercept filters arrays and apply the traversal to each one individually
  fp.isArray,
  async (visitor2, options, filters2, { recurse }) => {
    return Promise.all(filters2.map((filter, i) => {
      const newPath = options.path ? {
        ...options.path,
        raw: `${options.path.raw}[${i}]`
      } : options.path;
      return recurse(visitor2, {
        ...options,
        path: newPath
      }, filter);
    })).then((res) => res.filter((val) => !(fp.isObject(val) && fp.isEmpty(val))));
  }
).intercept(
  // Ignore non object filters and return the value as-is
  (filters2) => !fp.isObject(filters2),
  (_, __, filters2) => {
    return filters2;
  }
).parse(isObj$2, () => ({
  transform: fp.cloneDeep,
  remove(key, data) {
    return fp.omit(key, data);
  },
  set(key, value, data) {
    return {
      ...data,
      [key]: value
    };
  },
  keys(data) {
    return Object.keys(data);
  },
  get(key, data) {
    return data[key];
  }
})).ignore(({ value }) => fp.isNil(value)).on(({ attribute }) => fp.isNil(attribute), async ({ key, visitor: visitor2, path: path2, value, schema: schema2, getModel, attribute }, { set: set2, recurse }) => {
  const parent = {
    key,
    path: path2,
    schema: schema2,
    attribute
  };
  set2(key, await recurse(visitor2, {
    schema: schema2,
    path: path2,
    getModel,
    parent
  }, value));
}).onRelation(async ({ key, attribute, visitor: visitor2, path: path2, value, schema: schema2, getModel }, { set: set2, recurse }) => {
  const isMorphRelation = attribute.relation.toLowerCase().startsWith("morph");
  if (isMorphRelation) {
    return;
  }
  const parent = {
    key,
    path: path2,
    schema: schema2,
    attribute
  };
  const targetSchemaUID = attribute.target;
  const targetSchema = getModel(targetSchemaUID);
  const newValue = await recurse(visitor2, {
    schema: targetSchema,
    path: path2,
    getModel,
    parent
  }, value);
  set2(key, newValue);
}).onComponent(async ({ key, attribute, visitor: visitor2, path: path2, schema: schema2, value, getModel }, { set: set2, recurse }) => {
  const parent = {
    key,
    path: path2,
    schema: schema2,
    attribute
  };
  const targetSchema = getModel(attribute.component);
  const newValue = await recurse(visitor2, {
    schema: targetSchema,
    path: path2,
    getModel,
    parent
  }, value);
  set2(key, newValue);
}).onMedia(async ({ key, visitor: visitor2, path: path2, schema: schema2, attribute, value, getModel }, { set: set2, recurse }) => {
  const parent = {
    key,
    path: path2,
    schema: schema2,
    attribute
  };
  const targetSchemaUID = "plugin::upload.file";
  const targetSchema = getModel(targetSchemaUID);
  const newValue = await recurse(visitor2, {
    schema: targetSchema,
    path: path2,
    getModel,
    parent
  }, value);
  set2(key, newValue);
});
var traverseQueryFilters = fp.curry(filters.traverse);
const ORDERS = {
  asc: "asc",
  desc: "desc"
};
const ORDER_VALUES = Object.values(ORDERS);
const isSortOrder = (value) => ORDER_VALUES.includes(value.toLowerCase());
const isStringArray$2 = (value) => Array.isArray(value) && value.every(fp.isString);
const isObjectArray = (value) => Array.isArray(value) && value.every(fp.isObject);
const isNestedSorts = (value) => fp.isString(value) && value.split(",").length > 1;
const isObj$1 = (value) => fp.isObject(value);
const sort = traverseFactory().intercept(
  // String with chained sorts (foo,bar,foobar) => split, map(recurse), then recompose
  isNestedSorts,
  async (visitor2, options, sort2, { recurse }) => {
    return Promise.all(sort2.split(",").map(fp.trim).map((nestedSort) => recurse(visitor2, options, nestedSort))).then((res) => res.filter((part) => !fp.isEmpty(part)).join(","));
  }
).intercept(
  // Array of strings ['foo', 'foo,bar'] => map(recurse), then filter out empty items
  isStringArray$2,
  async (visitor2, options, sort2, { recurse }) => {
    return Promise.all(sort2.map((nestedSort) => recurse(visitor2, options, nestedSort))).then((res) => res.filter((nestedSort) => !fp.isEmpty(nestedSort)));
  }
).intercept(
  // Array of objects [{ foo: 'asc' }, { bar: 'desc', baz: 'asc' }] => map(recurse), then filter out empty items
  isObjectArray,
  async (visitor2, options, sort2, { recurse }) => {
    return Promise.all(sort2.map((nestedSort) => recurse(visitor2, options, nestedSort))).then((res) => res.filter((nestedSort) => !fp.isEmpty(nestedSort)));
  }
).parse(fp.isString, () => {
  const tokenize = fp.pipe(fp.split("."), fp.map(fp.split(":")), fp.flatten);
  const recompose = (parts) => {
    if (parts.length === 0) {
      return void 0;
    }
    return parts.reduce((acc, part) => {
      if (fp.isEmpty(part)) {
        return acc;
      }
      if (acc === "") {
        return part;
      }
      return isSortOrder(part) ? `${acc}:${part}` : `${acc}.${part}`;
    }, "");
  };
  return {
    transform: fp.trim,
    remove(key, data) {
      const [root] = tokenize(data);
      return root === key ? void 0 : data;
    },
    set(key, value, data) {
      const [root] = tokenize(data);
      if (root !== key) {
        return data;
      }
      return fp.isNil(value) ? root : `${root}.${value}`;
    },
    keys(data) {
      const v = fp.first(tokenize(data));
      return v ? [
        v
      ] : [];
    },
    get(key, data) {
      const [root, ...rest] = tokenize(data);
      return key === root ? recompose(rest) : void 0;
    }
  };
}).parse(isObj$1, () => ({
  transform: fp.cloneDeep,
  remove(key, data) {
    const { [key]: ignored, ...rest } = data;
    return rest;
  },
  set(key, value, data) {
    return {
      ...data,
      [key]: value
    };
  },
  keys(data) {
    return Object.keys(data);
  },
  get(key, data) {
    return data[key];
  }
})).onRelation(async ({ key, value, attribute, visitor: visitor2, path: path2, getModel, schema: schema2 }, { set: set2, recurse }) => {
  const isMorphRelation = attribute.relation.toLowerCase().startsWith("morph");
  if (isMorphRelation) {
    return;
  }
  const parent = {
    key,
    path: path2,
    schema: schema2,
    attribute
  };
  const targetSchemaUID = attribute.target;
  const targetSchema = getModel(targetSchemaUID);
  const newValue = await recurse(visitor2, {
    schema: targetSchema,
    path: path2,
    getModel,
    parent
  }, value);
  set2(key, newValue);
}).onMedia(async ({ key, path: path2, schema: schema2, attribute, visitor: visitor2, value, getModel }, { recurse, set: set2 }) => {
  const parent = {
    key,
    path: path2,
    schema: schema2,
    attribute
  };
  const targetSchemaUID = "plugin::upload.file";
  const targetSchema = getModel(targetSchemaUID);
  const newValue = await recurse(visitor2, {
    schema: targetSchema,
    path: path2,
    getModel,
    parent
  }, value);
  set2(key, newValue);
}).onComponent(async ({ key, value, visitor: visitor2, path: path2, schema: schema2, attribute, getModel }, { recurse, set: set2 }) => {
  const parent = {
    key,
    path: path2,
    schema: schema2,
    attribute
  };
  const targetSchema = getModel(attribute.component);
  const newValue = await recurse(visitor2, {
    schema: targetSchema,
    path: path2,
    getModel,
    parent
  }, value);
  set2(key, newValue);
});
var traverseQuerySort = fp.curry(sort.traverse);
const isKeyword = (keyword) => {
  return ({ key, attribute }) => {
    return !attribute && keyword === key;
  };
};
const isWildcard = (value) => value === "*";
const isPopulateString = (value) => {
  return fp.isString(value) && !isWildcard(value);
};
const isStringArray$1 = (value) => fp.isArray(value) && value.every(fp.isString);
const isObj = (value) => fp.isObject(value);
const populate = traverseFactory().intercept(isPopulateString, async (visitor2, options, populate2, { recurse }) => {
  const populateObject = pathsToObjectPopulate([
    populate2
  ]);
  const traversedPopulate = await recurse(visitor2, options, populateObject);
  const [result] = objectPopulateToPaths(traversedPopulate);
  return result;
}).intercept(isStringArray$1, async (visitor2, options, populate2, { recurse }) => {
  const paths = await Promise.all(populate2.map((subClause) => recurse(visitor2, options, subClause)));
  return paths.filter((item) => !fp.isNil(item));
}).parse(isWildcard, () => ({
  /**
  * Since value is '*', we don't need to transform it
  */
  transform: fp.identity,
  /**
  * '*' isn't a key/value structure, so regardless
  *  of the given key, it returns the data ('*')
  */
  get: (_key, data) => data,
  /**
  * '*' isn't a key/value structure, so regardless
  * of the given `key`, use `value` as the new `data`
  */
  set: (_key, value) => value,
  /**
  * '*' isn't a key/value structure, but we need to simulate at least one to enable
  * the data traversal. We're using '' since it represents a falsy string value
  */
  keys: fp.constant([
    ""
  ]),
  /**
  * Removing '*' means setting it to undefined, regardless of the given key
  */
  remove: fp.constant(void 0)
})).parse(fp.isString, () => {
  const tokenize = fp.split(".");
  const recompose = fp.join(".");
  return {
    transform: fp.trim,
    remove(key, data) {
      const [root] = tokenize(data);
      return root === key ? void 0 : data;
    },
    set(key, value, data) {
      const [root] = tokenize(data);
      if (root !== key) {
        return data;
      }
      return fp.isNil(value) || fp.isEmpty(value) ? root : `${root}.${value}`;
    },
    keys(data) {
      const v = fp.first(tokenize(data));
      return v ? [
        v
      ] : [];
    },
    get(key, data) {
      const [root, ...rest] = tokenize(data);
      return key === root ? recompose(rest) : void 0;
    }
  };
}).parse(isObj, () => ({
  transform: fp.cloneDeep,
  remove(key, data) {
    const { [key]: ignored, ...rest } = data;
    return rest;
  },
  set(key, value, data) {
    return {
      ...data,
      [key]: value
    };
  },
  keys(data) {
    return Object.keys(data);
  },
  get(key, data) {
    return data[key];
  }
})).ignore(({ key, attribute }) => {
  return [
    "sort",
    "filters",
    "fields"
  ].includes(key) && !attribute;
}).on(
  // Handle recursion on populate."populate"
  isKeyword("populate"),
  async ({ key, visitor: visitor2, path: path2, value, schema: schema2, getModel, attribute }, { set: set2, recurse }) => {
    const parent = {
      key,
      path: path2,
      schema: schema2,
      attribute
    };
    const newValue = await recurse(visitor2, {
      schema: schema2,
      path: path2,
      getModel,
      parent
    }, value);
    set2(key, newValue);
  }
).on(isKeyword("on"), async ({ key, visitor: visitor2, path: path2, value, getModel, parent }, { set: set2, recurse }) => {
  const newOn = {};
  if (!isObj(value)) {
    return;
  }
  for (const [uid, subPopulate] of Object.entries(value)) {
    const model = getModel(uid);
    const newPath = {
      ...path2,
      raw: `${path2.raw}[${uid}]`
    };
    newOn[uid] = await recurse(visitor2, {
      schema: model,
      path: newPath,
      getModel,
      parent
    }, subPopulate);
  }
  set2(key, newOn);
}).onRelation(async ({ key, value, attribute, visitor: visitor2, path: path2, schema: schema2, getModel }, { set: set2, recurse }) => {
  if (fp.isNil(value)) {
    return;
  }
  const parent = {
    key,
    path: path2,
    schema: schema2,
    attribute
  };
  if (isMorphToRelationalAttribute(attribute)) {
    if (!fp.isObject(value) || !("on" in value && fp.isObject(value?.on))) {
      return;
    }
    const newValue2 = await recurse(visitor2, {
      schema: schema2,
      path: path2,
      getModel,
      parent
    }, {
      on: value?.on
    });
    set2(key, newValue2);
    return;
  }
  const targetSchemaUID = attribute.target;
  const targetSchema = getModel(targetSchemaUID);
  const newValue = await recurse(visitor2, {
    schema: targetSchema,
    path: path2,
    getModel,
    parent
  }, value);
  set2(key, newValue);
}).onMedia(async ({ key, path: path2, schema: schema2, attribute, visitor: visitor2, value, getModel }, { recurse, set: set2 }) => {
  if (fp.isNil(value)) {
    return;
  }
  const parent = {
    key,
    path: path2,
    schema: schema2,
    attribute
  };
  const targetSchemaUID = "plugin::upload.file";
  const targetSchema = getModel(targetSchemaUID);
  const newValue = await recurse(visitor2, {
    schema: targetSchema,
    path: path2,
    getModel,
    parent
  }, value);
  set2(key, newValue);
}).onComponent(async ({ key, value, schema: schema2, visitor: visitor2, path: path2, attribute, getModel }, { recurse, set: set2 }) => {
  if (fp.isNil(value)) {
    return;
  }
  const parent = {
    key,
    path: path2,
    schema: schema2,
    attribute
  };
  const targetSchema = getModel(attribute.component);
  const newValue = await recurse(visitor2, {
    schema: targetSchema,
    path: path2,
    getModel,
    parent
  }, value);
  set2(key, newValue);
}).onDynamicZone(async ({ key, value, schema: schema2, visitor: visitor2, path: path2, attribute, getModel }, { set: set2, recurse }) => {
  if (fp.isNil(value) || !fp.isObject(value)) {
    return;
  }
  const parent = {
    key,
    path: path2,
    schema: schema2,
    attribute
  };
  if ("on" in value && value.on) {
    const newOn = await recurse(visitor2, {
      schema: schema2,
      path: path2,
      getModel,
      parent
    }, {
      on: value.on
    });
    set2(key, newOn);
  }
});
var traverseQueryPopulate = fp.curry(populate.traverse);
const objectPopulateToPaths = (input) => {
  const paths = [];
  function traverse(currentObj, parentPath) {
    for (const [key, value] of Object.entries(currentObj)) {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;
      if (value === true) {
        paths.push(currentPath);
      } else {
        traverse(value.populate, currentPath);
      }
    }
  }
  traverse(input, "");
  return paths;
};
const pathsToObjectPopulate = (input) => {
  const result = {};
  function traverse(object2, keys) {
    const [first, ...rest] = keys;
    if (rest.length === 0) {
      object2[first] = true;
    } else {
      if (!object2[first] || typeof object2[first] === "boolean") {
        object2[first] = {
          populate: {}
        };
      }
      traverse(object2[first].populate, rest);
    }
  }
  input.forEach((clause) => traverse(result, clause.split(".")));
  return result;
};
const isStringArray = (value) => {
  return fp.isArray(value) && value.every(fp.isString);
};
const fields = traverseFactory().intercept(isStringArray, async (visitor2, options, fields2, { recurse }) => {
  return Promise.all(fields2.map((field) => recurse(visitor2, options, field)));
}).intercept((value) => fp.isString(value) && value.includes(","), (visitor2, options, fields2, { recurse }) => {
  return Promise.all(fields2.split(",").map((field) => recurse(visitor2, options, field)));
}).intercept((value) => fp.eq("*", value), fp.constant("*")).parse(fp.isString, () => ({
  transform: fp.trim,
  remove(key, data) {
    return data === key ? void 0 : data;
  },
  set(_key, _value, data) {
    return data;
  },
  keys(data) {
    return [
      data
    ];
  },
  get(key, data) {
    return key === data ? data : void 0;
  }
}));
var traverseQueryFields = fp.curry(fields.traverse);
const { ID_ATTRIBUTE, DOC_ID_ATTRIBUTE } = constants$5;
const defaultSanitizeOutput = async (ctx, entity) => {
  if (!ctx.schema) {
    throw new Error("Missing schema in defaultSanitizeOutput");
  }
  return traverseEntity$1((...args) => {
    visitor$4(...args);
    visitor$3(...args);
  }, ctx, entity);
};
const defaultSanitizeFilters = fp.curry((ctx, filters2) => {
  if (!ctx.schema) {
    throw new Error("Missing schema in defaultSanitizeFilters");
  }
  return pipe(
    // Remove keys that are not attributes or valid operators
    traverseQueryFilters(({ key, attribute }, { remove }) => {
      const isAttribute = !!attribute;
      if ([
        ID_ATTRIBUTE,
        DOC_ID_ATTRIBUTE
      ].includes(key)) {
        return;
      }
      if (!isAttribute && !isOperator(key)) {
        remove(key);
      }
    }, ctx),
    // Remove dynamic zones from filters
    traverseQueryFilters(visitor$1, ctx),
    // Remove morpTo relations from filters
    traverseQueryFilters(visitor$2, ctx),
    // Remove passwords from filters
    traverseQueryFilters(visitor$4, ctx),
    // Remove private from filters
    traverseQueryFilters(visitor$3, ctx),
    // Remove empty objects
    traverseQueryFilters(({ key, value }, { remove }) => {
      if (fp.isObject(value) && fp.isEmpty(value)) {
        remove(key);
      }
    }, ctx)
  )(filters2);
});
const defaultSanitizeSort = fp.curry((ctx, sort2) => {
  if (!ctx.schema) {
    throw new Error("Missing schema in defaultSanitizeSort");
  }
  return pipe(
    // Remove non attribute keys
    traverseQuerySort(({ key, attribute }, { remove }) => {
      if ([
        ID_ATTRIBUTE,
        DOC_ID_ATTRIBUTE
      ].includes(key)) {
        return;
      }
      if (!attribute) {
        remove(key);
      }
    }, ctx),
    // Remove dynamic zones from sort
    traverseQuerySort(visitor$1, ctx),
    // Remove morpTo relations from sort
    traverseQuerySort(visitor$2, ctx),
    // Remove private from sort
    traverseQuerySort(visitor$3, ctx),
    // Remove passwords from filters
    traverseQuerySort(visitor$4, ctx),
    // Remove keys for empty non-scalar values
    traverseQuerySort(({ key, attribute, value }, { remove }) => {
      if ([
        ID_ATTRIBUTE,
        DOC_ID_ATTRIBUTE
      ].includes(key)) {
        return;
      }
      if (!isScalarAttribute(attribute) && fp.isEmpty(value)) {
        remove(key);
      }
    }, ctx)
  )(sort2);
});
const defaultSanitizeFields = fp.curry((ctx, fields2) => {
  if (!ctx.schema) {
    throw new Error("Missing schema in defaultSanitizeFields");
  }
  return pipe(
    // Only keep scalar attributes
    traverseQueryFields(({ key, attribute }, { remove }) => {
      if ([
        ID_ATTRIBUTE,
        DOC_ID_ATTRIBUTE
      ].includes(key)) {
        return;
      }
      if (fp.isNil(attribute) || !isScalarAttribute(attribute)) {
        remove(key);
      }
    }, ctx),
    // Remove private fields
    traverseQueryFields(visitor$3, ctx),
    // Remove password fields
    traverseQueryFields(visitor$4, ctx),
    // Remove nil values from fields array
    (value) => fp.isArray(value) ? value.filter((field) => !fp.isNil(field)) : value
  )(fields2);
});
const defaultSanitizePopulate = fp.curry((ctx, populate2) => {
  if (!ctx.schema) {
    throw new Error("Missing schema in defaultSanitizePopulate");
  }
  return pipe(
    traverseQueryPopulate(visitor, ctx),
    traverseQueryPopulate(async ({ key, value, schema: schema2, attribute, getModel, path: path2 }, { set: set2 }) => {
      if (attribute) {
        return;
      }
      const parent = {
        key,
        path: path2,
        schema: schema2,
        attribute
      };
      if (key === "sort") {
        set2(key, await defaultSanitizeSort({
          schema: schema2,
          getModel,
          parent
        }, value));
      }
      if (key === "filters") {
        set2(key, await defaultSanitizeFilters({
          schema: schema2,
          getModel,
          parent
        }, value));
      }
      if (key === "fields") {
        set2(key, await defaultSanitizeFields({
          schema: schema2,
          getModel,
          parent
        }, value));
      }
      if (key === "populate") {
        set2(key, await defaultSanitizePopulate({
          schema: schema2,
          getModel,
          parent
        }, value));
      }
    }, ctx),
    // Remove private fields
    traverseQueryPopulate(visitor$3, ctx)
  )(populate2);
});
var execa$1 = { exports: {} };
var crossSpawn$1 = { exports: {} };
var windows;
var hasRequiredWindows;
function requireWindows() {
  if (hasRequiredWindows) return windows;
  hasRequiredWindows = 1;
  windows = isexe2;
  isexe2.sync = sync2;
  var fs2 = require$$0__default$2.default;
  function checkPathExt(path2, options) {
    var pathext = options.pathExt !== void 0 ? options.pathExt : process.env.PATHEXT;
    if (!pathext) {
      return true;
    }
    pathext = pathext.split(";");
    if (pathext.indexOf("") !== -1) {
      return true;
    }
    for (var i = 0; i < pathext.length; i++) {
      var p = pathext[i].toLowerCase();
      if (p && path2.substr(-p.length).toLowerCase() === p) {
        return true;
      }
    }
    return false;
  }
  function checkStat(stat, path2, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
      return false;
    }
    return checkPathExt(path2, options);
  }
  function isexe2(path2, options, cb) {
    fs2.stat(path2, function(er, stat) {
      cb(er, er ? false : checkStat(stat, path2, options));
    });
  }
  function sync2(path2, options) {
    return checkStat(fs2.statSync(path2), path2, options);
  }
  return windows;
}
var mode;
var hasRequiredMode;
function requireMode() {
  if (hasRequiredMode) return mode;
  hasRequiredMode = 1;
  mode = isexe2;
  isexe2.sync = sync2;
  var fs2 = require$$0__default$2.default;
  function isexe2(path2, options, cb) {
    fs2.stat(path2, function(er, stat) {
      cb(er, er ? false : checkStat(stat, options));
    });
  }
  function sync2(path2, options) {
    return checkStat(fs2.statSync(path2), options);
  }
  function checkStat(stat, options) {
    return stat.isFile() && checkMode(stat, options);
  }
  function checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== void 0 ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== void 0 ? options.gid : process.getgid && process.getgid();
    var u = parseInt("100", 8);
    var g = parseInt("010", 8);
    var o = parseInt("001", 8);
    var ug = u | g;
    var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
  }
  return mode;
}
var core$3;
if (process.platform === "win32" || commonjsGlobal.TESTING_WINDOWS) {
  core$3 = requireWindows();
} else {
  core$3 = requireMode();
}
var isexe_1 = isexe$1;
isexe$1.sync = sync;
function isexe$1(path2, options, cb) {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }
  if (!cb) {
    if (typeof Promise !== "function") {
      throw new TypeError("callback not provided");
    }
    return new Promise(function(resolve, reject) {
      isexe$1(path2, options || {}, function(er, is) {
        if (er) {
          reject(er);
        } else {
          resolve(is);
        }
      });
    });
  }
  core$3(path2, options || {}, function(er, is) {
    if (er) {
      if (er.code === "EACCES" || options && options.ignoreErrors) {
        er = null;
        is = false;
      }
    }
    cb(er, is);
  });
}
function sync(path2, options) {
  try {
    return core$3.sync(path2, options || {});
  } catch (er) {
    if (options && options.ignoreErrors || er.code === "EACCES") {
      return false;
    } else {
      throw er;
    }
  }
}
const isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";
const path$8 = require$$0__default$3.default;
const COLON = isWindows ? ";" : ":";
const isexe = isexe_1;
const getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
const getPathInfo = (cmd, opt) => {
  const colon = opt.colon || COLON;
  const pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [""] : [
    // windows always checks the cwd first
    ...isWindows ? [process.cwd()] : [],
    ...(opt.path || process.env.PATH || /* istanbul ignore next: very unusual */
    "").split(colon)
  ];
  const pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
  const pathExt = isWindows ? pathExtExe.split(colon) : [""];
  if (isWindows) {
    if (cmd.indexOf(".") !== -1 && pathExt[0] !== "")
      pathExt.unshift("");
  }
  return {
    pathEnv,
    pathExt,
    pathExtExe
  };
};
const which$1 = (cmd, opt, cb) => {
  if (typeof opt === "function") {
    cb = opt;
    opt = {};
  }
  if (!opt)
    opt = {};
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];
  const step = (i) => new Promise((resolve, reject) => {
    if (i === pathEnv.length)
      return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
    const pCmd = path$8.join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
    resolve(subStep(p, i, 0));
  });
  const subStep = (p, i, ii) => new Promise((resolve, reject) => {
    if (ii === pathExt.length)
      return resolve(step(i + 1));
    const ext = pathExt[ii];
    isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
      if (!er && is) {
        if (opt.all)
          found.push(p + ext);
        else
          return resolve(p + ext);
      }
      return resolve(subStep(p, i, ii + 1));
    });
  });
  return cb ? step(0).then((res) => cb(null, res), cb) : step(0);
};
const whichSync = (cmd, opt) => {
  opt = opt || {};
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];
  for (let i = 0; i < pathEnv.length; i++) {
    const ppRaw = pathEnv[i];
    const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
    const pCmd = path$8.join(pathPart, cmd);
    const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
    for (let j = 0; j < pathExt.length; j++) {
      const cur = p + pathExt[j];
      try {
        const is = isexe.sync(cur, { pathExt: pathExtExe });
        if (is) {
          if (opt.all)
            found.push(cur);
          else
            return cur;
        }
      } catch (ex) {
      }
    }
  }
  if (opt.all && found.length)
    return found;
  if (opt.nothrow)
    return null;
  throw getNotFoundError(cmd);
};
var which_1 = which$1;
which$1.sync = whichSync;
var pathKey$1 = { exports: {} };
const pathKey = (options = {}) => {
  const environment = options.env || process.env;
  const platform2 = options.platform || process.platform;
  if (platform2 !== "win32") {
    return "PATH";
  }
  return Object.keys(environment).reverse().find((key) => key.toUpperCase() === "PATH") || "Path";
};
pathKey$1.exports = pathKey;
pathKey$1.exports.default = pathKey;
var pathKeyExports = pathKey$1.exports;
const path$7 = require$$0__default$3.default;
const which = which_1;
const getPathKey = pathKeyExports;
function resolveCommandAttempt(parsed, withoutPathExt) {
  const env2 = parsed.options.env || process.env;
  const cwd2 = process.cwd();
  const hasCustomCwd = parsed.options.cwd != null;
  const shouldSwitchCwd = hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled;
  if (shouldSwitchCwd) {
    try {
      process.chdir(parsed.options.cwd);
    } catch (err) {
    }
  }
  let resolved;
  try {
    resolved = which.sync(parsed.command, {
      path: env2[getPathKey({ env: env2 })],
      pathExt: withoutPathExt ? path$7.delimiter : void 0
    });
  } catch (e) {
  } finally {
    if (shouldSwitchCwd) {
      process.chdir(cwd2);
    }
  }
  if (resolved) {
    resolved = path$7.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
  }
  return resolved;
}
function resolveCommand$1(parsed) {
  return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}
var resolveCommand_1 = resolveCommand$1;
var _escape = {};
const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
function escapeCommand(arg) {
  arg = arg.replace(metaCharsRegExp, "^$1");
  return arg;
}
function escapeArgument(arg, doubleEscapeMetaChars) {
  arg = `${arg}`;
  arg = arg.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"');
  arg = arg.replace(/(?=(\\+?)?)\1$/, "$1$1");
  arg = `"${arg}"`;
  arg = arg.replace(metaCharsRegExp, "^$1");
  if (doubleEscapeMetaChars) {
    arg = arg.replace(metaCharsRegExp, "^$1");
  }
  return arg;
}
_escape.command = escapeCommand;
_escape.argument = escapeArgument;
var shebangRegex$1 = /^#!(.*)/;
const shebangRegex = shebangRegex$1;
var shebangCommand$1 = (string2 = "") => {
  const match = string2.match(shebangRegex);
  if (!match) {
    return null;
  }
  const [path2, argument] = match[0].replace(/#! ?/, "").split(" ");
  const binary2 = path2.split("/").pop();
  if (binary2 === "env") {
    return argument;
  }
  return argument ? `${binary2} ${argument}` : binary2;
};
const fs$5 = require$$0__default$2.default;
const shebangCommand = shebangCommand$1;
function readShebang$1(command2) {
  const size = 150;
  const buffer = Buffer.alloc(size);
  let fd;
  try {
    fd = fs$5.openSync(command2, "r");
    fs$5.readSync(fd, buffer, 0, size, 0);
    fs$5.closeSync(fd);
  } catch (e) {
  }
  return shebangCommand(buffer.toString());
}
var readShebang_1 = readShebang$1;
const path$6 = require$$0__default$3.default;
const resolveCommand = resolveCommand_1;
const escape = _escape;
const readShebang = readShebang_1;
const isWin$2 = process.platform === "win32";
const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
function detectShebang(parsed) {
  parsed.file = resolveCommand(parsed);
  const shebang = parsed.file && readShebang(parsed.file);
  if (shebang) {
    parsed.args.unshift(parsed.file);
    parsed.command = shebang;
    return resolveCommand(parsed);
  }
  return parsed.file;
}
function parseNonShell(parsed) {
  if (!isWin$2) {
    return parsed;
  }
  const commandFile = detectShebang(parsed);
  const needsShell = !isExecutableRegExp.test(commandFile);
  if (parsed.options.forceShell || needsShell) {
    const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
    parsed.command = path$6.normalize(parsed.command);
    parsed.command = escape.command(parsed.command);
    parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));
    const shellCommand = [parsed.command].concat(parsed.args).join(" ");
    parsed.args = ["/d", "/s", "/c", `"${shellCommand}"`];
    parsed.command = process.env.comspec || "cmd.exe";
    parsed.options.windowsVerbatimArguments = true;
  }
  return parsed;
}
function parse$6(command2, args, options) {
  if (args && !Array.isArray(args)) {
    options = args;
    args = null;
  }
  args = args ? args.slice(0) : [];
  options = Object.assign({}, options);
  const parsed = {
    command: command2,
    args,
    options,
    file: void 0,
    original: {
      command: command2,
      args
    }
  };
  return options.shell ? parsed : parseNonShell(parsed);
}
var parse_1$2 = parse$6;
const isWin$1 = process.platform === "win32";
function notFoundError(original, syscall) {
  return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
    code: "ENOENT",
    errno: "ENOENT",
    syscall: `${syscall} ${original.command}`,
    path: original.command,
    spawnargs: original.args
  });
}
function hookChildProcess(cp2, parsed) {
  if (!isWin$1) {
    return;
  }
  const originalEmit = cp2.emit;
  cp2.emit = function(name, arg1) {
    if (name === "exit") {
      const err = verifyENOENT(arg1, parsed);
      if (err) {
        return originalEmit.call(cp2, "error", err);
      }
    }
    return originalEmit.apply(cp2, arguments);
  };
}
function verifyENOENT(status2, parsed) {
  if (isWin$1 && status2 === 1 && !parsed.file) {
    return notFoundError(parsed.original, "spawn");
  }
  return null;
}
function verifyENOENTSync(status2, parsed) {
  if (isWin$1 && status2 === 1 && !parsed.file) {
    return notFoundError(parsed.original, "spawnSync");
  }
  return null;
}
var enoent$1 = {
  hookChildProcess,
  verifyENOENT,
  verifyENOENTSync,
  notFoundError
};
const cp = require$$0__default.default;
const parse$5 = parse_1$2;
const enoent = enoent$1;
function spawn(command2, args, options) {
  const parsed = parse$5(command2, args, options);
  const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
  enoent.hookChildProcess(spawned, parsed);
  return spawned;
}
function spawnSync(command2, args, options) {
  const parsed = parse$5(command2, args, options);
  const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
  result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);
  return result;
}
crossSpawn$1.exports = spawn;
crossSpawn$1.exports.spawn = spawn;
crossSpawn$1.exports.sync = spawnSync;
crossSpawn$1.exports._parse = parse$5;
crossSpawn$1.exports._enoent = enoent;
var crossSpawnExports = crossSpawn$1.exports;
var stripFinalNewline$1 = (input) => {
  const LF = typeof input === "string" ? "\n" : "\n".charCodeAt();
  const CR = typeof input === "string" ? "\r" : "\r".charCodeAt();
  if (input[input.length - 1] === LF) {
    input = input.slice(0, input.length - 1);
  }
  if (input[input.length - 1] === CR) {
    input = input.slice(0, input.length - 1);
  }
  return input;
};
var npmRunPath$1 = { exports: {} };
npmRunPath$1.exports;
(function(module2) {
  const path2 = require$$0__default$3.default;
  const pathKey2 = pathKeyExports;
  const npmRunPath2 = (options) => {
    options = {
      cwd: process.cwd(),
      path: process.env[pathKey2()],
      execPath: process.execPath,
      ...options
    };
    let previous;
    let cwdPath = path2.resolve(options.cwd);
    const result = [];
    while (previous !== cwdPath) {
      result.push(path2.join(cwdPath, "node_modules/.bin"));
      previous = cwdPath;
      cwdPath = path2.resolve(cwdPath, "..");
    }
    const execPathDir = path2.resolve(options.cwd, options.execPath, "..");
    result.push(execPathDir);
    return result.concat(options.path).join(path2.delimiter);
  };
  module2.exports = npmRunPath2;
  module2.exports.default = npmRunPath2;
  module2.exports.env = (options) => {
    options = {
      env: process.env,
      ...options
    };
    const env2 = { ...options.env };
    const path3 = pathKey2({ env: env2 });
    options.path = env2[path3];
    env2[path3] = module2.exports(options);
    return env2;
  };
})(npmRunPath$1);
var npmRunPathExports = npmRunPath$1.exports;
var onetime$2 = { exports: {} };
var mimicFn$2 = { exports: {} };
const mimicFn$1 = (to, from) => {
  for (const prop of Reflect.ownKeys(from)) {
    Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
  }
  return to;
};
mimicFn$2.exports = mimicFn$1;
mimicFn$2.exports.default = mimicFn$1;
var mimicFnExports = mimicFn$2.exports;
const mimicFn = mimicFnExports;
const calledFunctions = /* @__PURE__ */ new WeakMap();
const onetime$1 = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = null;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFn(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime$2.exports = onetime$1;
onetime$2.exports.default = onetime$1;
onetime$2.exports.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
var onetimeExports = onetime$2.exports;
var main = {};
var signals$2 = {};
var core$2 = {};
Object.defineProperty(core$2, "__esModule", { value: true });
core$2.SIGNALS = void 0;
const SIGNALS = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: true
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: true
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: true
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
  }
];
core$2.SIGNALS = SIGNALS;
var realtime = {};
Object.defineProperty(realtime, "__esModule", { value: true });
realtime.SIGRTMAX = realtime.getRealtimeSignals = void 0;
const getRealtimeSignals = function() {
  const length = SIGRTMAX - SIGRTMIN + 1;
  return Array.from({ length }, getRealtimeSignal);
};
realtime.getRealtimeSignals = getRealtimeSignals;
const getRealtimeSignal = function(value, index2) {
  return {
    name: `SIGRT${index2 + 1}`,
    number: SIGRTMIN + index2,
    action: "terminate",
    description: "Application-specific signal (realtime)",
    standard: "posix"
  };
};
const SIGRTMIN = 34;
const SIGRTMAX = 64;
realtime.SIGRTMAX = SIGRTMAX;
Object.defineProperty(signals$2, "__esModule", { value: true });
signals$2.getSignals = void 0;
var _os$1 = require$$0__default$1.default;
var _core = core$2;
var _realtime$1 = realtime;
const getSignals = function() {
  const realtimeSignals = (0, _realtime$1.getRealtimeSignals)();
  const signals = [..._core.SIGNALS, ...realtimeSignals].map(normalizeSignal);
  return signals;
};
signals$2.getSignals = getSignals;
const normalizeSignal = function({
  name,
  number: defaultNumber,
  description,
  action,
  forced = false,
  standard
}) {
  const {
    signals: { [name]: constantSignal }
  } = _os$1.constants;
  const supported = constantSignal !== void 0;
  const number2 = supported ? constantSignal : defaultNumber;
  return { name, number: number2, description, supported, action, forced, standard };
};
Object.defineProperty(main, "__esModule", { value: true });
main.signalsByNumber = main.signalsByName = void 0;
var _os = require$$0__default$1.default;
var _signals = signals$2;
var _realtime = realtime;
const getSignalsByName = function() {
  const signals = (0, _signals.getSignals)();
  return signals.reduce(getSignalByName, {});
};
const getSignalByName = function(signalByNameMemo, { name, number: number2, description, supported, action, forced, standard }) {
  return {
    ...signalByNameMemo,
    [name]: { name, number: number2, description, supported, action, forced, standard }
  };
};
const signalsByName$1 = getSignalsByName();
main.signalsByName = signalsByName$1;
const getSignalsByNumber = function() {
  const signals = (0, _signals.getSignals)();
  const length = _realtime.SIGRTMAX + 1;
  const signalsA = Array.from({ length }, (value, number2) => getSignalByNumber(number2, signals));
  return Object.assign({}, ...signalsA);
};
const getSignalByNumber = function(number2, signals) {
  const signal = findSignalByNumber(number2, signals);
  if (signal === void 0) {
    return {};
  }
  const { name, description, supported, action, forced, standard } = signal;
  return {
    [number2]: {
      name,
      number: number2,
      description,
      supported,
      action,
      forced,
      standard
    }
  };
};
const findSignalByNumber = function(number2, signals) {
  const signal = signals.find(({ name }) => _os.constants.signals[name] === number2);
  if (signal !== void 0) {
    return signal;
  }
  return signals.find((signalA) => signalA.number === number2);
};
const signalsByNumber = getSignalsByNumber();
main.signalsByNumber = signalsByNumber;
const { signalsByName } = main;
const getErrorPrefix = ({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled }) => {
  if (timedOut) {
    return `timed out after ${timeout} milliseconds`;
  }
  if (isCanceled) {
    return "was canceled";
  }
  if (errorCode !== void 0) {
    return `failed with ${errorCode}`;
  }
  if (signal !== void 0) {
    return `was killed with ${signal} (${signalDescription})`;
  }
  if (exitCode !== void 0) {
    return `failed with exit code ${exitCode}`;
  }
  return "failed";
};
const makeError$1 = ({
  stdout,
  stderr,
  all,
  error: error2,
  signal,
  exitCode,
  command: command2,
  escapedCommand,
  timedOut,
  isCanceled,
  killed,
  parsed: { options: { timeout } }
}) => {
  exitCode = exitCode === null ? void 0 : exitCode;
  signal = signal === null ? void 0 : signal;
  const signalDescription = signal === void 0 ? void 0 : signalsByName[signal].description;
  const errorCode = error2 && error2.code;
  const prefix = getErrorPrefix({ timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled });
  const execaMessage = `Command ${prefix}: ${command2}`;
  const isError = Object.prototype.toString.call(error2) === "[object Error]";
  const shortMessage = isError ? `${execaMessage}
${error2.message}` : execaMessage;
  const message = [shortMessage, stderr, stdout].filter(Boolean).join("\n");
  if (isError) {
    error2.originalMessage = error2.message;
    error2.message = message;
  } else {
    error2 = new Error(message);
  }
  error2.shortMessage = shortMessage;
  error2.command = command2;
  error2.escapedCommand = escapedCommand;
  error2.exitCode = exitCode;
  error2.signal = signal;
  error2.signalDescription = signalDescription;
  error2.stdout = stdout;
  error2.stderr = stderr;
  if (all !== void 0) {
    error2.all = all;
  }
  if ("bufferedData" in error2) {
    delete error2.bufferedData;
  }
  error2.failed = true;
  error2.timedOut = Boolean(timedOut);
  error2.isCanceled = isCanceled;
  error2.killed = killed && !timedOut;
  return error2;
};
var error = makeError$1;
var stdio = { exports: {} };
const aliases = ["stdin", "stdout", "stderr"];
const hasAlias = (options) => aliases.some((alias) => options[alias] !== void 0);
const normalizeStdio$1 = (options) => {
  if (!options) {
    return;
  }
  const { stdio: stdio2 } = options;
  if (stdio2 === void 0) {
    return aliases.map((alias) => options[alias]);
  }
  if (hasAlias(options)) {
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias) => `\`${alias}\``).join(", ")}`);
  }
  if (typeof stdio2 === "string") {
    return stdio2;
  }
  if (!Array.isArray(stdio2)) {
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio2}\``);
  }
  const length = Math.max(stdio2.length, aliases.length);
  return Array.from({ length }, (value, index2) => stdio2[index2]);
};
stdio.exports = normalizeStdio$1;
stdio.exports.node = (options) => {
  const stdio2 = normalizeStdio$1(options);
  if (stdio2 === "ipc") {
    return "ipc";
  }
  if (stdio2 === void 0 || typeof stdio2 === "string") {
    return [stdio2, stdio2, stdio2, "ipc"];
  }
  if (stdio2.includes("ipc")) {
    return stdio2;
  }
  return [...stdio2, "ipc"];
};
var stdioExports = stdio.exports;
var signalExit = { exports: {} };
var signals$1 = { exports: {} };
var hasRequiredSignals;
function requireSignals() {
  if (hasRequiredSignals) return signals$1.exports;
  hasRequiredSignals = 1;
  (function(module2) {
    module2.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ];
    if (process.platform !== "win32") {
      module2.exports.push(
        "SIGVTALRM",
        "SIGXCPU",
        "SIGXFSZ",
        "SIGUSR2",
        "SIGTRAP",
        "SIGSYS",
        "SIGQUIT",
        "SIGIOT"
        // should detect profiler and enable/disable accordingly.
        // see #21
        // 'SIGPROF'
      );
    }
    if (process.platform === "linux") {
      module2.exports.push(
        "SIGIO",
        "SIGPOLL",
        "SIGPWR",
        "SIGSTKFLT",
        "SIGUNUSED"
      );
    }
  })(signals$1);
  return signals$1.exports;
}
var process$1 = commonjsGlobal.process;
const processOk = function(process2) {
  return process2 && typeof process2 === "object" && typeof process2.removeListener === "function" && typeof process2.emit === "function" && typeof process2.reallyExit === "function" && typeof process2.listeners === "function" && typeof process2.kill === "function" && typeof process2.pid === "number" && typeof process2.on === "function";
};
if (!processOk(process$1)) {
  signalExit.exports = function() {
    return function() {
    };
  };
} else {
  var assert = require$$0__default$4.default;
  var signals = requireSignals();
  var isWin = /^win/i.test(process$1.platform);
  var EE = require$$2__default.default;
  if (typeof EE !== "function") {
    EE = EE.EventEmitter;
  }
  var emitter;
  if (process$1.__signal_exit_emitter__) {
    emitter = process$1.__signal_exit_emitter__;
  } else {
    emitter = process$1.__signal_exit_emitter__ = new EE();
    emitter.count = 0;
    emitter.emitted = {};
  }
  if (!emitter.infinite) {
    emitter.setMaxListeners(Infinity);
    emitter.infinite = true;
  }
  signalExit.exports = function(cb, opts) {
    if (!processOk(commonjsGlobal.process)) {
      return function() {
      };
    }
    assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
    if (loaded === false) {
      load$1();
    }
    var ev = "exit";
    if (opts && opts.alwaysLast) {
      ev = "afterexit";
    }
    var remove = function() {
      emitter.removeListener(ev, cb);
      if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
        unload();
      }
    };
    emitter.on(ev, cb);
    return remove;
  };
  var unload = function unload2() {
    if (!loaded || !processOk(commonjsGlobal.process)) {
      return;
    }
    loaded = false;
    signals.forEach(function(sig) {
      try {
        process$1.removeListener(sig, sigListeners[sig]);
      } catch (er) {
      }
    });
    process$1.emit = originalProcessEmit;
    process$1.reallyExit = originalProcessReallyExit;
    emitter.count -= 1;
  };
  signalExit.exports.unload = unload;
  var emit = function emit2(event, code, signal) {
    if (emitter.emitted[event]) {
      return;
    }
    emitter.emitted[event] = true;
    emitter.emit(event, code, signal);
  };
  var sigListeners = {};
  signals.forEach(function(sig) {
    sigListeners[sig] = function listener() {
      if (!processOk(commonjsGlobal.process)) {
        return;
      }
      var listeners = process$1.listeners(sig);
      if (listeners.length === emitter.count) {
        unload();
        emit("exit", null, sig);
        emit("afterexit", null, sig);
        if (isWin && sig === "SIGHUP") {
          sig = "SIGINT";
        }
        process$1.kill(process$1.pid, sig);
      }
    };
  });
  signalExit.exports.signals = function() {
    return signals;
  };
  var loaded = false;
  var load$1 = function load2() {
    if (loaded || !processOk(commonjsGlobal.process)) {
      return;
    }
    loaded = true;
    emitter.count += 1;
    signals = signals.filter(function(sig) {
      try {
        process$1.on(sig, sigListeners[sig]);
        return true;
      } catch (er) {
        return false;
      }
    });
    process$1.emit = processEmit;
    process$1.reallyExit = processReallyExit;
  };
  signalExit.exports.load = load$1;
  var originalProcessReallyExit = process$1.reallyExit;
  var processReallyExit = function processReallyExit2(code) {
    if (!processOk(commonjsGlobal.process)) {
      return;
    }
    process$1.exitCode = code || /* istanbul ignore next */
    0;
    emit("exit", process$1.exitCode, null);
    emit("afterexit", process$1.exitCode, null);
    originalProcessReallyExit.call(process$1, process$1.exitCode);
  };
  var originalProcessEmit = process$1.emit;
  var processEmit = function processEmit2(ev, arg) {
    if (ev === "exit" && processOk(commonjsGlobal.process)) {
      if (arg !== void 0) {
        process$1.exitCode = arg;
      }
      var ret = originalProcessEmit.apply(this, arguments);
      emit("exit", process$1.exitCode, null);
      emit("afterexit", process$1.exitCode, null);
      return ret;
    } else {
      return originalProcessEmit.apply(this, arguments);
    }
  };
}
var signalExitExports = signalExit.exports;
const os = require$$0__default$1.default;
const onExit = signalExitExports;
const DEFAULT_FORCE_KILL_TIMEOUT = 1e3 * 5;
const spawnedKill$1 = (kill2, signal = "SIGTERM", options = {}) => {
  const killResult = kill2(signal);
  setKillTimeout(kill2, signal, options, killResult);
  return killResult;
};
const setKillTimeout = (kill2, signal, options, killResult) => {
  if (!shouldForceKill(signal, options, killResult)) {
    return;
  }
  const timeout = getForceKillAfterTimeout(options);
  const t = setTimeout(() => {
    kill2("SIGKILL");
  }, timeout);
  if (t.unref) {
    t.unref();
  }
};
const shouldForceKill = (signal, { forceKillAfterTimeout }, killResult) => {
  return isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
};
const isSigterm = (signal) => {
  return signal === os.constants.signals.SIGTERM || typeof signal === "string" && signal.toUpperCase() === "SIGTERM";
};
const getForceKillAfterTimeout = ({ forceKillAfterTimeout = true }) => {
  if (forceKillAfterTimeout === true) {
    return DEFAULT_FORCE_KILL_TIMEOUT;
  }
  if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) {
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
  }
  return forceKillAfterTimeout;
};
const spawnedCancel$1 = (spawned, context) => {
  const killResult = spawned.kill();
  if (killResult) {
    context.isCanceled = true;
  }
};
const timeoutKill = (spawned, signal, reject) => {
  spawned.kill(signal);
  reject(Object.assign(new Error("Timed out"), { timedOut: true, signal }));
};
const setupTimeout$1 = (spawned, { timeout, killSignal = "SIGTERM" }, spawnedPromise) => {
  if (timeout === 0 || timeout === void 0) {
    return spawnedPromise;
  }
  let timeoutId;
  const timeoutPromise = new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => {
      timeoutKill(spawned, killSignal, reject);
    }, timeout);
  });
  const safeSpawnedPromise = spawnedPromise.finally(() => {
    clearTimeout(timeoutId);
  });
  return Promise.race([timeoutPromise, safeSpawnedPromise]);
};
const validateTimeout$1 = ({ timeout }) => {
  if (timeout !== void 0 && (!Number.isFinite(timeout) || timeout < 0)) {
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
  }
};
const setExitHandler$1 = async (spawned, { cleanup, detached }, timedPromise) => {
  if (!cleanup || detached) {
    return timedPromise;
  }
  const removeExitHandler = onExit(() => {
    spawned.kill();
  });
  return timedPromise.finally(() => {
    removeExitHandler();
  });
};
var kill = {
  spawnedKill: spawnedKill$1,
  spawnedCancel: spawnedCancel$1,
  setupTimeout: setupTimeout$1,
  validateTimeout: validateTimeout$1,
  setExitHandler: setExitHandler$1
};
const isStream$1 = (stream2) => stream2 !== null && typeof stream2 === "object" && typeof stream2.pipe === "function";
isStream$1.writable = (stream2) => isStream$1(stream2) && stream2.writable !== false && typeof stream2._write === "function" && typeof stream2._writableState === "object";
isStream$1.readable = (stream2) => isStream$1(stream2) && stream2.readable !== false && typeof stream2._read === "function" && typeof stream2._readableState === "object";
isStream$1.duplex = (stream2) => isStream$1.writable(stream2) && isStream$1.readable(stream2);
isStream$1.transform = (stream2) => isStream$1.duplex(stream2) && typeof stream2._transform === "function";
var isStream_1 = isStream$1;
var getStream$2 = { exports: {} };
const { PassThrough: PassThroughStream } = require$$0__default$5.default;
var bufferStream$1 = (options) => {
  options = { ...options };
  const { array: array2 } = options;
  let { encoding } = options;
  const isBuffer = encoding === "buffer";
  let objectMode = false;
  if (array2) {
    objectMode = !(encoding || isBuffer);
  } else {
    encoding = encoding || "utf8";
  }
  if (isBuffer) {
    encoding = null;
  }
  const stream2 = new PassThroughStream({ objectMode });
  if (encoding) {
    stream2.setEncoding(encoding);
  }
  let length = 0;
  const chunks = [];
  stream2.on("data", (chunk) => {
    chunks.push(chunk);
    if (objectMode) {
      length = chunks.length;
    } else {
      length += chunk.length;
    }
  });
  stream2.getBufferedValue = () => {
    if (array2) {
      return chunks;
    }
    return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
  };
  stream2.getBufferedLength = () => length;
  return stream2;
};
const { constants: BufferConstants } = require$$0__default$6.default;
const stream$1 = require$$0__default$5.default;
const { promisify: promisify$3 } = require$$2__default$1.default;
const bufferStream = bufferStream$1;
const streamPipelinePromisified = promisify$3(stream$1.pipeline);
class MaxBufferError extends Error {
  constructor() {
    super("maxBuffer exceeded");
    this.name = "MaxBufferError";
  }
}
async function getStream$1(inputStream, options) {
  if (!inputStream) {
    throw new Error("Expected a stream");
  }
  options = {
    maxBuffer: Infinity,
    ...options
  };
  const { maxBuffer } = options;
  const stream2 = bufferStream(options);
  await new Promise((resolve, reject) => {
    const rejectPromise = (error2) => {
      if (error2 && stream2.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
        error2.bufferedData = stream2.getBufferedValue();
      }
      reject(error2);
    };
    (async () => {
      try {
        await streamPipelinePromisified(inputStream, stream2);
        resolve();
      } catch (error2) {
        rejectPromise(error2);
      }
    })();
    stream2.on("data", () => {
      if (stream2.getBufferedLength() > maxBuffer) {
        rejectPromise(new MaxBufferError());
      }
    });
  });
  return stream2.getBufferedValue();
}
getStream$2.exports = getStream$1;
getStream$2.exports.buffer = (stream2, options) => getStream$1(stream2, { ...options, encoding: "buffer" });
getStream$2.exports.array = (stream2, options) => getStream$1(stream2, { ...options, array: true });
getStream$2.exports.MaxBufferError = MaxBufferError;
var getStreamExports = getStream$2.exports;
const { PassThrough } = require$$0__default$5.default;
var mergeStream$1 = function() {
  var sources = [];
  var output = new PassThrough({ objectMode: true });
  output.setMaxListeners(0);
  output.add = add;
  output.isEmpty = isEmpty;
  output.on("unpipe", remove);
  Array.prototype.slice.call(arguments).forEach(add);
  return output;
  function add(source) {
    if (Array.isArray(source)) {
      source.forEach(add);
      return this;
    }
    sources.push(source);
    source.once("end", remove.bind(null, source));
    source.once("error", output.emit.bind(output, "error"));
    source.pipe(output, { end: false });
    return this;
  }
  function isEmpty() {
    return sources.length == 0;
  }
  function remove(source) {
    sources = sources.filter(function(it) {
      return it !== source;
    });
    if (!sources.length && output.readable) {
      output.end();
    }
  }
};
const isStream = isStream_1;
const getStream = getStreamExports;
const mergeStream = mergeStream$1;
const handleInput$1 = (spawned, input) => {
  if (input === void 0 || spawned.stdin === void 0) {
    return;
  }
  if (isStream(input)) {
    input.pipe(spawned.stdin);
  } else {
    spawned.stdin.end(input);
  }
};
const makeAllStream$1 = (spawned, { all }) => {
  if (!all || !spawned.stdout && !spawned.stderr) {
    return;
  }
  const mixed2 = mergeStream();
  if (spawned.stdout) {
    mixed2.add(spawned.stdout);
  }
  if (spawned.stderr) {
    mixed2.add(spawned.stderr);
  }
  return mixed2;
};
const getBufferedData = async (stream2, streamPromise) => {
  if (!stream2) {
    return;
  }
  stream2.destroy();
  try {
    return await streamPromise;
  } catch (error2) {
    return error2.bufferedData;
  }
};
const getStreamPromise = (stream2, { encoding, buffer, maxBuffer }) => {
  if (!stream2 || !buffer) {
    return;
  }
  if (encoding) {
    return getStream(stream2, { encoding, maxBuffer });
  }
  return getStream.buffer(stream2, { maxBuffer });
};
const getSpawnedResult$1 = async ({ stdout, stderr, all }, { encoding, buffer, maxBuffer }, processDone) => {
  const stdoutPromise = getStreamPromise(stdout, { encoding, buffer, maxBuffer });
  const stderrPromise = getStreamPromise(stderr, { encoding, buffer, maxBuffer });
  const allPromise = getStreamPromise(all, { encoding, buffer, maxBuffer: maxBuffer * 2 });
  try {
    return await Promise.all([processDone, stdoutPromise, stderrPromise, allPromise]);
  } catch (error2) {
    return Promise.all([
      { error: error2, signal: error2.signal, timedOut: error2.timedOut },
      getBufferedData(stdout, stdoutPromise),
      getBufferedData(stderr, stderrPromise),
      getBufferedData(all, allPromise)
    ]);
  }
};
const validateInputSync$1 = ({ input }) => {
  if (isStream(input)) {
    throw new TypeError("The `input` option cannot be a stream in sync mode");
  }
};
var stream = {
  handleInput: handleInput$1,
  makeAllStream: makeAllStream$1,
  getSpawnedResult: getSpawnedResult$1,
  validateInputSync: validateInputSync$1
};
const nativePromisePrototype = (async () => {
})().constructor.prototype;
const descriptors = ["then", "catch", "finally"].map((property) => [
  property,
  Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property)
]);
const mergePromise$1 = (spawned, promise2) => {
  for (const [property, descriptor] of descriptors) {
    const value = typeof promise2 === "function" ? (...args) => Reflect.apply(descriptor.value, promise2(), args) : descriptor.value.bind(promise2);
    Reflect.defineProperty(spawned, property, { ...descriptor, value });
  }
  return spawned;
};
const getSpawnedPromise$1 = (spawned) => {
  return new Promise((resolve, reject) => {
    spawned.on("exit", (exitCode, signal) => {
      resolve({ exitCode, signal });
    });
    spawned.on("error", (error2) => {
      reject(error2);
    });
    if (spawned.stdin) {
      spawned.stdin.on("error", (error2) => {
        reject(error2);
      });
    }
  });
};
var promise = {
  mergePromise: mergePromise$1,
  getSpawnedPromise: getSpawnedPromise$1
};
const normalizeArgs = (file, args = []) => {
  if (!Array.isArray(args)) {
    return [file];
  }
  return [file, ...args];
};
const NO_ESCAPE_REGEXP = /^[\w.-]+$/;
const DOUBLE_QUOTES_REGEXP = /"/g;
const escapeArg = (arg) => {
  if (typeof arg !== "string" || NO_ESCAPE_REGEXP.test(arg)) {
    return arg;
  }
  return `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`;
};
const joinCommand$1 = (file, args) => {
  return normalizeArgs(file, args).join(" ");
};
const getEscapedCommand$1 = (file, args) => {
  return normalizeArgs(file, args).map((arg) => escapeArg(arg)).join(" ");
};
const SPACES_REGEXP = / +/g;
const parseCommand$1 = (command2) => {
  const tokens = [];
  for (const token of command2.trim().split(SPACES_REGEXP)) {
    const previousToken = tokens[tokens.length - 1];
    if (previousToken && previousToken.endsWith("\\")) {
      tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
    } else {
      tokens.push(token);
    }
  }
  return tokens;
};
var command = {
  joinCommand: joinCommand$1,
  getEscapedCommand: getEscapedCommand$1,
  parseCommand: parseCommand$1
};
const path$5 = require$$0__default$3.default;
const childProcess = require$$0__default.default;
const crossSpawn = crossSpawnExports;
const stripFinalNewline = stripFinalNewline$1;
const npmRunPath = npmRunPathExports;
const onetime = onetimeExports;
const makeError = error;
const normalizeStdio = stdioExports;
const { spawnedKill, spawnedCancel, setupTimeout, validateTimeout, setExitHandler } = kill;
const { handleInput, getSpawnedResult, makeAllStream, validateInputSync } = stream;
const { mergePromise, getSpawnedPromise } = promise;
const { joinCommand, parseCommand, getEscapedCommand } = command;
const DEFAULT_MAX_BUFFER = 1e3 * 1e3 * 100;
const getEnv = ({ env: envOption, extendEnv, preferLocal, localDir, execPath }) => {
  const env2 = extendEnv ? { ...process.env, ...envOption } : envOption;
  if (preferLocal) {
    return npmRunPath.env({ env: env2, cwd: localDir, execPath });
  }
  return env2;
};
const handleArguments = (file, args, options = {}) => {
  const parsed = crossSpawn._parse(file, args, options);
  file = parsed.command;
  args = parsed.args;
  options = parsed.options;
  options = {
    maxBuffer: DEFAULT_MAX_BUFFER,
    buffer: true,
    stripFinalNewline: true,
    extendEnv: true,
    preferLocal: false,
    localDir: options.cwd || process.cwd(),
    execPath: process.execPath,
    encoding: "utf8",
    reject: true,
    cleanup: true,
    all: false,
    windowsHide: true,
    ...options
  };
  options.env = getEnv(options);
  options.stdio = normalizeStdio(options);
  if (process.platform === "win32" && path$5.basename(file, ".exe") === "cmd") {
    args.unshift("/q");
  }
  return { file, args, options, parsed };
};
const handleOutput = (options, value, error2) => {
  if (typeof value !== "string" && !Buffer.isBuffer(value)) {
    return error2 === void 0 ? void 0 : "";
  }
  if (options.stripFinalNewline) {
    return stripFinalNewline(value);
  }
  return value;
};
const execa = (file, args, options) => {
  const parsed = handleArguments(file, args, options);
  const command2 = joinCommand(file, args);
  const escapedCommand = getEscapedCommand(file, args);
  validateTimeout(parsed.options);
  let spawned;
  try {
    spawned = childProcess.spawn(parsed.file, parsed.args, parsed.options);
  } catch (error2) {
    const dummySpawned = new childProcess.ChildProcess();
    const errorPromise = Promise.reject(makeError({
      error: error2,
      stdout: "",
      stderr: "",
      all: "",
      command: command2,
      escapedCommand,
      parsed,
      timedOut: false,
      isCanceled: false,
      killed: false
    }));
    return mergePromise(dummySpawned, errorPromise);
  }
  const spawnedPromise = getSpawnedPromise(spawned);
  const timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise);
  const processDone = setExitHandler(spawned, parsed.options, timedPromise);
  const context = { isCanceled: false };
  spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned));
  spawned.cancel = spawnedCancel.bind(null, spawned, context);
  const handlePromise = async () => {
    const [{ error: error2, exitCode, signal, timedOut }, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone);
    const stdout = handleOutput(parsed.options, stdoutResult);
    const stderr = handleOutput(parsed.options, stderrResult);
    const all = handleOutput(parsed.options, allResult);
    if (error2 || exitCode !== 0 || signal !== null) {
      const returnedError = makeError({
        error: error2,
        exitCode,
        signal,
        stdout,
        stderr,
        all,
        command: command2,
        escapedCommand,
        parsed,
        timedOut,
        isCanceled: context.isCanceled,
        killed: spawned.killed
      });
      if (!parsed.options.reject) {
        return returnedError;
      }
      throw returnedError;
    }
    return {
      command: command2,
      escapedCommand,
      exitCode: 0,
      stdout,
      stderr,
      all,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false
    };
  };
  const handlePromiseOnce = onetime(handlePromise);
  handleInput(spawned, parsed.options.input);
  spawned.all = makeAllStream(spawned, parsed.options);
  return mergePromise(spawned, handlePromiseOnce);
};
execa$1.exports = execa;
execa$1.exports.sync = (file, args, options) => {
  const parsed = handleArguments(file, args, options);
  const command2 = joinCommand(file, args);
  const escapedCommand = getEscapedCommand(file, args);
  validateInputSync(parsed.options);
  let result;
  try {
    result = childProcess.spawnSync(parsed.file, parsed.args, parsed.options);
  } catch (error2) {
    throw makeError({
      error: error2,
      stdout: "",
      stderr: "",
      all: "",
      command: command2,
      escapedCommand,
      parsed,
      timedOut: false,
      isCanceled: false,
      killed: false
    });
  }
  const stdout = handleOutput(parsed.options, result.stdout, result.error);
  const stderr = handleOutput(parsed.options, result.stderr, result.error);
  if (result.error || result.status !== 0 || result.signal !== null) {
    const error2 = makeError({
      stdout,
      stderr,
      error: result.error,
      signal: result.signal,
      exitCode: result.status,
      command: command2,
      escapedCommand,
      parsed,
      timedOut: result.error && result.error.code === "ETIMEDOUT",
      isCanceled: false,
      killed: result.signal !== null
    });
    if (!parsed.options.reject) {
      return error2;
    }
    throw error2;
  }
  return {
    command: command2,
    escapedCommand,
    exitCode: 0,
    stdout,
    stderr,
    failed: false,
    timedOut: false,
    isCanceled: false,
    killed: false
  };
};
execa$1.exports.command = (command2, options) => {
  const [file, ...args] = parseCommand(command2);
  return execa(file, args, options);
};
execa$1.exports.commandSync = (command2, options) => {
  const [file, ...args] = parseCommand(command2);
  return execa.sync(file, args, options);
};
execa$1.exports.node = (scriptPath, args, options = {}) => {
  if (args && !Array.isArray(args) && typeof args === "object") {
    options = args;
    args = [];
  }
  const stdio2 = normalizeStdio.node(options);
  const defaultExecArgv = process.execArgv.filter((arg) => !arg.startsWith("--inspect"));
  const {
    nodePath = process.execPath,
    nodeOptions = defaultExecArgv
  } = options;
  return execa(
    nodePath,
    [
      ...nodeOptions,
      scriptPath,
      ...Array.isArray(args) ? args : []
    ],
    {
      ...options,
      stdin: void 0,
      stdout: void 0,
      stderr: void 0,
      stdio: stdio2,
      shell: false
    }
  );
};
var core$1 = {};
var pkgDir$1 = { exports: {} };
var findUp$2 = { exports: {} };
var locatePath$1 = { exports: {} };
var pLocate$4 = { exports: {} };
var pLimit$4 = { exports: {} };
var pTry$2 = { exports: {} };
const pTry$1 = (fn, ...arguments_) => new Promise((resolve) => {
  resolve(fn(...arguments_));
});
pTry$2.exports = pTry$1;
pTry$2.exports.default = pTry$1;
var pTryExports = pTry$2.exports;
const pTry = pTryExports;
const pLimit$3 = (concurrency) => {
  if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  }
  const queue = [];
  let activeCount = 0;
  const next = () => {
    activeCount--;
    if (queue.length > 0) {
      queue.shift()();
    }
  };
  const run = (fn, resolve, ...args) => {
    activeCount++;
    const result = pTry(fn, ...args);
    resolve(result);
    result.then(next, next);
  };
  const enqueue2 = (fn, resolve, ...args) => {
    if (activeCount < concurrency) {
      run(fn, resolve, ...args);
    } else {
      queue.push(run.bind(null, fn, resolve, ...args));
    }
  };
  const generator = (fn, ...args) => new Promise((resolve) => enqueue2(fn, resolve, ...args));
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.length
    },
    clearQueue: {
      value: () => {
        queue.length = 0;
      }
    }
  });
  return generator;
};
pLimit$4.exports = pLimit$3;
pLimit$4.exports.default = pLimit$3;
var pLimitExports = pLimit$4.exports;
const pLimit$2 = pLimitExports;
let EndError$1 = class EndError extends Error {
  constructor(value) {
    super();
    this.value = value;
  }
};
const testElement$1 = async (element, tester) => tester(await element);
const finder$1 = async (element) => {
  const values = await Promise.all(element);
  if (values[1] === true) {
    throw new EndError$1(values[0]);
  }
  return false;
};
const pLocate$3 = async (iterable, tester, options) => {
  options = {
    concurrency: Infinity,
    preserveOrder: true,
    ...options
  };
  const limit = pLimit$2(options.concurrency);
  const items = [...iterable].map((element) => [element, limit(testElement$1, element, tester)]);
  const checkLimit = pLimit$2(options.preserveOrder ? 1 : Infinity);
  try {
    await Promise.all(items.map((element) => checkLimit(finder$1, element)));
  } catch (error2) {
    if (error2 instanceof EndError$1) {
      return error2.value;
    }
    throw error2;
  }
};
pLocate$4.exports = pLocate$3;
pLocate$4.exports.default = pLocate$3;
var pLocateExports = pLocate$4.exports;
const path$4 = require$$0__default$3.default;
const fs$4 = require$$0__default$2.default;
const { promisify: promisify$2 } = require$$2__default$1.default;
const pLocate$2 = pLocateExports;
const fsStat$1 = promisify$2(fs$4.stat);
const fsLStat$1 = promisify$2(fs$4.lstat);
const typeMappings$1 = {
  directory: "isDirectory",
  file: "isFile"
};
function checkType$1({ type: type2 }) {
  if (type2 in typeMappings$1) {
    return;
  }
  throw new Error(`Invalid type specified: ${type2}`);
}
const matchType$1 = (type2, stat) => type2 === void 0 || stat[typeMappings$1[type2]]();
locatePath$1.exports = async (paths, options) => {
  options = {
    cwd: process.cwd(),
    type: "file",
    allowSymlinks: true,
    ...options
  };
  checkType$1(options);
  const statFn = options.allowSymlinks ? fsStat$1 : fsLStat$1;
  return pLocate$2(paths, async (path_) => {
    try {
      const stat = await statFn(path$4.resolve(options.cwd, path_));
      return matchType$1(options.type, stat);
    } catch (_) {
      return false;
    }
  }, options);
};
locatePath$1.exports.sync = (paths, options) => {
  options = {
    cwd: process.cwd(),
    allowSymlinks: true,
    type: "file",
    ...options
  };
  checkType$1(options);
  const statFn = options.allowSymlinks ? fs$4.statSync : fs$4.lstatSync;
  for (const path_ of paths) {
    try {
      const stat = statFn(path$4.resolve(options.cwd, path_));
      if (matchType$1(options.type, stat)) {
        return path_;
      }
    } catch (_) {
    }
  }
};
var locatePathExports$1 = locatePath$1.exports;
var pathExists = { exports: {} };
const fs$3 = require$$0__default$2.default;
const { promisify: promisify$1 } = require$$2__default$1.default;
const pAccess = promisify$1(fs$3.access);
pathExists.exports = async (path2) => {
  try {
    await pAccess(path2);
    return true;
  } catch (_) {
    return false;
  }
};
pathExists.exports.sync = (path2) => {
  try {
    fs$3.accessSync(path2);
    return true;
  } catch (_) {
    return false;
  }
};
var pathExistsExports = pathExists.exports;
(function(module2) {
  const path2 = require$$0__default$3.default;
  const locatePath2 = locatePathExports$1;
  const pathExists2 = pathExistsExports;
  const stop = Symbol("findUp.stop");
  module2.exports = async (name, options = {}) => {
    let directory = path2.resolve(options.cwd || "");
    const { root } = path2.parse(directory);
    const paths = [].concat(name);
    const runMatcher = async (locateOptions) => {
      if (typeof name !== "function") {
        return locatePath2(paths, locateOptions);
      }
      const foundPath = await name(locateOptions.cwd);
      if (typeof foundPath === "string") {
        return locatePath2([foundPath], locateOptions);
      }
      return foundPath;
    };
    while (true) {
      const foundPath = await runMatcher({ ...options, cwd: directory });
      if (foundPath === stop) {
        return;
      }
      if (foundPath) {
        return path2.resolve(directory, foundPath);
      }
      if (directory === root) {
        return;
      }
      directory = path2.dirname(directory);
    }
  };
  module2.exports.sync = (name, options = {}) => {
    let directory = path2.resolve(options.cwd || "");
    const { root } = path2.parse(directory);
    const paths = [].concat(name);
    const runMatcher = (locateOptions) => {
      if (typeof name !== "function") {
        return locatePath2.sync(paths, locateOptions);
      }
      const foundPath = name(locateOptions.cwd);
      if (typeof foundPath === "string") {
        return locatePath2.sync([foundPath], locateOptions);
      }
      return foundPath;
    };
    while (true) {
      const foundPath = runMatcher({ ...options, cwd: directory });
      if (foundPath === stop) {
        return;
      }
      if (foundPath) {
        return path2.resolve(directory, foundPath);
      }
      if (directory === root) {
        return;
      }
      directory = path2.dirname(directory);
    }
  };
  module2.exports.exists = pathExists2;
  module2.exports.sync.exists = pathExists2.sync;
  module2.exports.stop = stop;
})(findUp$2);
var findUpExports = findUp$2.exports;
const path$3 = require$$0__default$3.default;
const findUp$1 = findUpExports;
const pkgDir = async (cwd2) => {
  const filePath = await findUp$1("package.json", { cwd: cwd2 });
  return filePath && path$3.dirname(filePath);
};
pkgDir$1.exports = pkgDir;
pkgDir$1.exports.default = pkgDir;
pkgDir$1.exports.sync = (cwd2) => {
  const filePath = findUp$1.sync("package.json", { cwd: cwd2 });
  return filePath && path$3.dirname(filePath);
};
var pkgDirExports = pkgDir$1.exports;
var utils$8 = {};
(function(exports2) {
  exports2.isInteger = (num) => {
    if (typeof num === "number") {
      return Number.isInteger(num);
    }
    if (typeof num === "string" && num.trim() !== "") {
      return Number.isInteger(Number(num));
    }
    return false;
  };
  exports2.find = (node, type2) => node.nodes.find((node2) => node2.type === type2);
  exports2.exceedsLimit = (min, max, step = 1, limit) => {
    if (limit === false) return false;
    if (!exports2.isInteger(min) || !exports2.isInteger(max)) return false;
    return (Number(max) - Number(min)) / Number(step) >= limit;
  };
  exports2.escapeNode = (block, n = 0, type2) => {
    const node = block.nodes[n];
    if (!node) return;
    if (type2 && node.type === type2 || node.type === "open" || node.type === "close") {
      if (node.escaped !== true) {
        node.value = "\\" + node.value;
        node.escaped = true;
      }
    }
  };
  exports2.encloseBrace = (node) => {
    if (node.type !== "brace") return false;
    if (node.commas >> 0 + node.ranges >> 0 === 0) {
      node.invalid = true;
      return true;
    }
    return false;
  };
  exports2.isInvalidBrace = (block) => {
    if (block.type !== "brace") return false;
    if (block.invalid === true || block.dollar) return true;
    if (block.commas >> 0 + block.ranges >> 0 === 0) {
      block.invalid = true;
      return true;
    }
    if (block.open !== true || block.close !== true) {
      block.invalid = true;
      return true;
    }
    return false;
  };
  exports2.isOpenOrClose = (node) => {
    if (node.type === "open" || node.type === "close") {
      return true;
    }
    return node.open === true || node.close === true;
  };
  exports2.reduce = (nodes) => nodes.reduce((acc, node) => {
    if (node.type === "text") acc.push(node.value);
    if (node.type === "range") node.type = "text";
    return acc;
  }, []);
  exports2.flatten = (...args) => {
    const result = [];
    const flat = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        const ele = arr[i];
        if (Array.isArray(ele)) {
          flat(ele);
          continue;
        }
        if (ele !== void 0) {
          result.push(ele);
        }
      }
      return result;
    };
    flat(args);
    return result;
  };
})(utils$8);
const utils$7 = utils$8;
var stringify$4 = (ast, options = {}) => {
  const stringify2 = (node, parent = {}) => {
    const invalidBlock = options.escapeInvalid && utils$7.isInvalidBrace(parent);
    const invalidNode = node.invalid === true && options.escapeInvalid === true;
    let output = "";
    if (node.value) {
      if ((invalidBlock || invalidNode) && utils$7.isOpenOrClose(node)) {
        return "\\" + node.value;
      }
      return node.value;
    }
    if (node.value) {
      return node.value;
    }
    if (node.nodes) {
      for (const child of node.nodes) {
        output += stringify2(child);
      }
    }
    return output;
  };
  return stringify2(ast);
};
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
var isNumber$2 = function(num) {
  if (typeof num === "number") {
    return num - num === 0;
  }
  if (typeof num === "string" && num.trim() !== "") {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
};
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
const isNumber$1 = isNumber$2;
const toRegexRange$1 = (min, max, options) => {
  if (isNumber$1(min) === false) {
    throw new TypeError("toRegexRange: expected the first argument to be a number");
  }
  if (max === void 0 || min === max) {
    return String(min);
  }
  if (isNumber$1(max) === false) {
    throw new TypeError("toRegexRange: expected the second argument to be a number.");
  }
  let opts = { relaxZeros: true, ...options };
  if (typeof opts.strictZeros === "boolean") {
    opts.relaxZeros = opts.strictZeros === false;
  }
  let relax = String(opts.relaxZeros);
  let shorthand = String(opts.shorthand);
  let capture = String(opts.capture);
  let wrap = String(opts.wrap);
  let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
  if (toRegexRange$1.cache.hasOwnProperty(cacheKey)) {
    return toRegexRange$1.cache[cacheKey].result;
  }
  let a = Math.min(min, max);
  let b = Math.max(min, max);
  if (Math.abs(a - b) === 1) {
    let result = min + "|" + max;
    if (opts.capture) {
      return `(${result})`;
    }
    if (opts.wrap === false) {
      return result;
    }
    return `(?:${result})`;
  }
  let isPadded = hasPadding(min) || hasPadding(max);
  let state = { min, max, a, b };
  let positives = [];
  let negatives = [];
  if (isPadded) {
    state.isPadded = isPadded;
    state.maxLen = String(state.max).length;
  }
  if (a < 0) {
    let newMin = b < 0 ? Math.abs(b) : 1;
    negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
    a = state.a = 0;
  }
  if (b >= 0) {
    positives = splitToPatterns(a, b, state, opts);
  }
  state.negatives = negatives;
  state.positives = positives;
  state.result = collatePatterns(negatives, positives);
  if (opts.capture === true) {
    state.result = `(${state.result})`;
  } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
    state.result = `(?:${state.result})`;
  }
  toRegexRange$1.cache[cacheKey] = state;
  return state.result;
};
function collatePatterns(neg, pos, options) {
  let onlyNegative = filterPatterns(neg, pos, "-", false) || [];
  let onlyPositive = filterPatterns(pos, neg, "", false) || [];
  let intersected = filterPatterns(neg, pos, "-?", true) || [];
  let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
  return subpatterns.join("|");
}
function splitToRanges(min, max) {
  let nines = 1;
  let zeros2 = 1;
  let stop = countNines(min, nines);
  let stops = /* @__PURE__ */ new Set([max]);
  while (min <= stop && stop <= max) {
    stops.add(stop);
    nines += 1;
    stop = countNines(min, nines);
  }
  stop = countZeros(max + 1, zeros2) - 1;
  while (min < stop && stop <= max) {
    stops.add(stop);
    zeros2 += 1;
    stop = countZeros(max + 1, zeros2) - 1;
  }
  stops = [...stops];
  stops.sort(compare);
  return stops;
}
function rangeToPattern(start, stop, options) {
  if (start === stop) {
    return { pattern: start, count: [], digits: 0 };
  }
  let zipped = zip(start, stop);
  let digits = zipped.length;
  let pattern = "";
  let count = 0;
  for (let i = 0; i < digits; i++) {
    let [startDigit, stopDigit] = zipped[i];
    if (startDigit === stopDigit) {
      pattern += startDigit;
    } else if (startDigit !== "0" || stopDigit !== "9") {
      pattern += toCharacterClass(startDigit, stopDigit);
    } else {
      count++;
    }
  }
  if (count) {
    pattern += options.shorthand === true ? "\\d" : "[0-9]";
  }
  return { pattern, count: [count], digits };
}
function splitToPatterns(min, max, tok, options) {
  let ranges = splitToRanges(min, max);
  let tokens = [];
  let start = min;
  let prev;
  for (let i = 0; i < ranges.length; i++) {
    let max2 = ranges[i];
    let obj = rangeToPattern(String(start), String(max2), options);
    let zeros2 = "";
    if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
      if (prev.count.length > 1) {
        prev.count.pop();
      }
      prev.count.push(obj.count[0]);
      prev.string = prev.pattern + toQuantifier(prev.count);
      start = max2 + 1;
      continue;
    }
    if (tok.isPadded) {
      zeros2 = padZeros(max2, tok, options);
    }
    obj.string = zeros2 + obj.pattern + toQuantifier(obj.count);
    tokens.push(obj);
    start = max2 + 1;
    prev = obj;
  }
  return tokens;
}
function filterPatterns(arr, comparison, prefix, intersection, options) {
  let result = [];
  for (let ele of arr) {
    let { string: string2 } = ele;
    if (!intersection && !contains(comparison, "string", string2)) {
      result.push(prefix + string2);
    }
    if (intersection && contains(comparison, "string", string2)) {
      result.push(prefix + string2);
    }
  }
  return result;
}
function zip(a, b) {
  let arr = [];
  for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
  return arr;
}
function compare(a, b) {
  return a > b ? 1 : b > a ? -1 : 0;
}
function contains(arr, key, val) {
  return arr.some((ele) => ele[key] === val);
}
function countNines(min, len) {
  return Number(String(min).slice(0, -len) + "9".repeat(len));
}
function countZeros(integer, zeros2) {
  return integer - integer % Math.pow(10, zeros2);
}
function toQuantifier(digits) {
  let [start = 0, stop = ""] = digits;
  if (stop || start > 1) {
    return `{${start + (stop ? "," + stop : "")}}`;
  }
  return "";
}
function toCharacterClass(a, b, options) {
  return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
}
function hasPadding(str2) {
  return /^-?(0+)\d/.test(str2);
}
function padZeros(value, tok, options) {
  if (!tok.isPadded) {
    return value;
  }
  let diff = Math.abs(tok.maxLen - String(value).length);
  let relax = options.relaxZeros !== false;
  switch (diff) {
    case 0:
      return "";
    case 1:
      return relax ? "0?" : "0";
    case 2:
      return relax ? "0{0,2}" : "00";
    default: {
      return relax ? `0{0,${diff}}` : `0{${diff}}`;
    }
  }
}
toRegexRange$1.cache = {};
toRegexRange$1.clearCache = () => toRegexRange$1.cache = {};
var toRegexRange_1 = toRegexRange$1;
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
const util$2 = require$$2__default$1.default;
const toRegexRange = toRegexRange_1;
const isObject$2 = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
const transform = (toNumber) => {
  return (value) => toNumber === true ? Number(value) : String(value);
};
const isValidValue = (value) => {
  return typeof value === "number" || typeof value === "string" && value !== "";
};
const isNumber = (num) => Number.isInteger(+num);
const zeros = (input) => {
  let value = `${input}`;
  let index2 = -1;
  if (value[0] === "-") value = value.slice(1);
  if (value === "0") return false;
  while (value[++index2] === "0") ;
  return index2 > 0;
};
const stringify$3 = (start, end, options) => {
  if (typeof start === "string" || typeof end === "string") {
    return true;
  }
  return options.stringify === true;
};
const pad = (input, maxLength, toNumber) => {
  if (maxLength > 0) {
    let dash = input[0] === "-" ? "-" : "";
    if (dash) input = input.slice(1);
    input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
  }
  if (toNumber === false) {
    return String(input);
  }
  return input;
};
const toMaxLen = (input, maxLength) => {
  let negative = input[0] === "-" ? "-" : "";
  if (negative) {
    input = input.slice(1);
    maxLength--;
  }
  while (input.length < maxLength) input = "0" + input;
  return negative ? "-" + input : input;
};
const toSequence = (parts, options, maxLen) => {
  parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  let prefix = options.capture ? "" : "?:";
  let positives = "";
  let negatives = "";
  let result;
  if (parts.positives.length) {
    positives = parts.positives.map((v) => toMaxLen(String(v), maxLen)).join("|");
  }
  if (parts.negatives.length) {
    negatives = `-(${prefix}${parts.negatives.map((v) => toMaxLen(String(v), maxLen)).join("|")})`;
  }
  if (positives && negatives) {
    result = `${positives}|${negatives}`;
  } else {
    result = positives || negatives;
  }
  if (options.wrap) {
    return `(${prefix}${result})`;
  }
  return result;
};
const toRange = (a, b, isNumbers, options) => {
  if (isNumbers) {
    return toRegexRange(a, b, { wrap: false, ...options });
  }
  let start = String.fromCharCode(a);
  if (a === b) return start;
  let stop = String.fromCharCode(b);
  return `[${start}-${stop}]`;
};
const toRegex = (start, end, options) => {
  if (Array.isArray(start)) {
    let wrap = options.wrap === true;
    let prefix = options.capture ? "" : "?:";
    return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
  }
  return toRegexRange(start, end, options);
};
const rangeError = (...args) => {
  return new RangeError("Invalid range arguments: " + util$2.inspect(...args));
};
const invalidRange = (start, end, options) => {
  if (options.strictRanges === true) throw rangeError([start, end]);
  return [];
};
const invalidStep = (step, options) => {
  if (options.strictRanges === true) {
    throw new TypeError(`Expected step "${step}" to be a number`);
  }
  return [];
};
const fillNumbers = (start, end, step = 1, options = {}) => {
  let a = Number(start);
  let b = Number(end);
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    if (options.strictRanges === true) throw rangeError([start, end]);
    return [];
  }
  if (a === 0) a = 0;
  if (b === 0) b = 0;
  let descending = a > b;
  let startString = String(start);
  let endString = String(end);
  let stepString = String(step);
  step = Math.max(Math.abs(step), 1);
  let padded = zeros(startString) || zeros(endString) || zeros(stepString);
  let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
  let toNumber = padded === false && stringify$3(start, end, options) === false;
  let format = options.transform || transform(toNumber);
  if (options.toRegex && step === 1) {
    return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
  }
  let parts = { negatives: [], positives: [] };
  let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
  let range = [];
  let index2 = 0;
  while (descending ? a >= b : a <= b) {
    if (options.toRegex === true && step > 1) {
      push(a);
    } else {
      range.push(pad(format(a, index2), maxLen, toNumber));
    }
    a = descending ? a - step : a + step;
    index2++;
  }
  if (options.toRegex === true) {
    return step > 1 ? toSequence(parts, options, maxLen) : toRegex(range, null, { wrap: false, ...options });
  }
  return range;
};
const fillLetters = (start, end, step = 1, options = {}) => {
  if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
    return invalidRange(start, end, options);
  }
  let format = options.transform || ((val) => String.fromCharCode(val));
  let a = `${start}`.charCodeAt(0);
  let b = `${end}`.charCodeAt(0);
  let descending = a > b;
  let min = Math.min(a, b);
  let max = Math.max(a, b);
  if (options.toRegex && step === 1) {
    return toRange(min, max, false, options);
  }
  let range = [];
  let index2 = 0;
  while (descending ? a >= b : a <= b) {
    range.push(format(a, index2));
    a = descending ? a - step : a + step;
    index2++;
  }
  if (options.toRegex === true) {
    return toRegex(range, null, { wrap: false, options });
  }
  return range;
};
const fill$2 = (start, end, step, options = {}) => {
  if (end == null && isValidValue(start)) {
    return [start];
  }
  if (!isValidValue(start) || !isValidValue(end)) {
    return invalidRange(start, end, options);
  }
  if (typeof step === "function") {
    return fill$2(start, end, 1, { transform: step });
  }
  if (isObject$2(step)) {
    return fill$2(start, end, 0, step);
  }
  let opts = { ...options };
  if (opts.capture === true) opts.wrap = true;
  step = step || opts.step || 1;
  if (!isNumber(step)) {
    if (step != null && !isObject$2(step)) return invalidStep(step, opts);
    return fill$2(start, end, 1, step);
  }
  if (isNumber(start) && isNumber(end)) {
    return fillNumbers(start, end, step, opts);
  }
  return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
};
var fillRange = fill$2;
const fill$1 = fillRange;
const utils$6 = utils$8;
const compile$1 = (ast, options = {}) => {
  const walk = (node, parent = {}) => {
    const invalidBlock = utils$6.isInvalidBrace(parent);
    const invalidNode = node.invalid === true && options.escapeInvalid === true;
    const invalid = invalidBlock === true || invalidNode === true;
    const prefix = options.escapeInvalid === true ? "\\" : "";
    let output = "";
    if (node.isOpen === true) {
      return prefix + node.value;
    }
    if (node.isClose === true) {
      console.log("node.isClose", prefix, node.value);
      return prefix + node.value;
    }
    if (node.type === "open") {
      return invalid ? prefix + node.value : "(";
    }
    if (node.type === "close") {
      return invalid ? prefix + node.value : ")";
    }
    if (node.type === "comma") {
      return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
    }
    if (node.value) {
      return node.value;
    }
    if (node.nodes && node.ranges > 0) {
      const args = utils$6.reduce(node.nodes);
      const range = fill$1(...args, { ...options, wrap: false, toRegex: true, strictZeros: true });
      if (range.length !== 0) {
        return args.length > 1 && range.length > 1 ? `(${range})` : range;
      }
    }
    if (node.nodes) {
      for (const child of node.nodes) {
        output += walk(child, node);
      }
    }
    return output;
  };
  return walk(ast);
};
var compile_1 = compile$1;
const fill = fillRange;
const stringify$2 = stringify$4;
const utils$5 = utils$8;
const append = (queue = "", stash = "", enclose = false) => {
  const result = [];
  queue = [].concat(queue);
  stash = [].concat(stash);
  if (!stash.length) return queue;
  if (!queue.length) {
    return enclose ? utils$5.flatten(stash).map((ele) => `{${ele}}`) : stash;
  }
  for (const item of queue) {
    if (Array.isArray(item)) {
      for (const value of item) {
        result.push(append(value, stash, enclose));
      }
    } else {
      for (let ele of stash) {
        if (enclose === true && typeof ele === "string") ele = `{${ele}}`;
        result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
      }
    }
  }
  return utils$5.flatten(result);
};
const expand$1 = (ast, options = {}) => {
  const rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
  const walk = (node, parent = {}) => {
    node.queue = [];
    let p = parent;
    let q = parent.queue;
    while (p.type !== "brace" && p.type !== "root" && p.parent) {
      p = p.parent;
      q = p.queue;
    }
    if (node.invalid || node.dollar) {
      q.push(append(q.pop(), stringify$2(node, options)));
      return;
    }
    if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
      q.push(append(q.pop(), ["{}"]));
      return;
    }
    if (node.nodes && node.ranges > 0) {
      const args = utils$5.reduce(node.nodes);
      if (utils$5.exceedsLimit(...args, options.step, rangeLimit)) {
        throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
      }
      let range = fill(...args, options);
      if (range.length === 0) {
        range = stringify$2(node, options);
      }
      q.push(append(q.pop(), range));
      node.nodes = [];
      return;
    }
    const enclose = utils$5.encloseBrace(node);
    let queue = node.queue;
    let block = node;
    while (block.type !== "brace" && block.type !== "root" && block.parent) {
      block = block.parent;
      queue = block.queue;
    }
    for (let i = 0; i < node.nodes.length; i++) {
      const child = node.nodes[i];
      if (child.type === "comma" && node.type === "brace") {
        if (i === 1) queue.push("");
        queue.push("");
        continue;
      }
      if (child.type === "close") {
        q.push(append(q.pop(), queue, enclose));
        continue;
      }
      if (child.value && child.type !== "open") {
        queue.push(append(queue.pop(), child.value));
        continue;
      }
      if (child.nodes) {
        walk(child, node);
      }
    }
    return queue;
  };
  return utils$5.flatten(walk(ast));
};
var expand_1 = expand$1;
var constants$4 = {
  MAX_LENGTH: 1e4,
  CHAR_LEFT_PARENTHESES: "(",
  /* ( */
  CHAR_RIGHT_PARENTHESES: ")",
  /* ) */
  CHAR_BACKSLASH: "\\",
  /* \ */
  CHAR_BACKTICK: "`",
  /* ` */
  CHAR_COMMA: ",",
  /* , */
  CHAR_DOT: ".",
  /* . */
  CHAR_DOUBLE_QUOTE: '"',
  /* " */
  CHAR_LEFT_CURLY_BRACE: "{",
  /* { */
  CHAR_LEFT_SQUARE_BRACKET: "[",
  /* [ */
  CHAR_NO_BREAK_SPACE: " ",
  /* \u00A0 */
  CHAR_RIGHT_CURLY_BRACE: "}",
  /* } */
  CHAR_RIGHT_SQUARE_BRACKET: "]",
  /* ] */
  CHAR_SINGLE_QUOTE: "'",
  /* ' */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
  /* \uFEFF */
};
const stringify$1 = stringify$4;
const {
  MAX_LENGTH: MAX_LENGTH$1,
  CHAR_BACKSLASH,
  /* \ */
  CHAR_BACKTICK,
  /* ` */
  CHAR_COMMA: CHAR_COMMA$2,
  /* , */
  CHAR_DOT: CHAR_DOT$1,
  /* . */
  CHAR_LEFT_PARENTHESES: CHAR_LEFT_PARENTHESES$1,
  /* ( */
  CHAR_RIGHT_PARENTHESES: CHAR_RIGHT_PARENTHESES$1,
  /* ) */
  CHAR_LEFT_CURLY_BRACE: CHAR_LEFT_CURLY_BRACE$1,
  /* { */
  CHAR_RIGHT_CURLY_BRACE: CHAR_RIGHT_CURLY_BRACE$1,
  /* } */
  CHAR_LEFT_SQUARE_BRACKET: CHAR_LEFT_SQUARE_BRACKET$2,
  /* [ */
  CHAR_RIGHT_SQUARE_BRACKET: CHAR_RIGHT_SQUARE_BRACKET$2,
  /* ] */
  CHAR_DOUBLE_QUOTE: CHAR_DOUBLE_QUOTE$1,
  /* " */
  CHAR_SINGLE_QUOTE: CHAR_SINGLE_QUOTE$1,
  /* ' */
  CHAR_NO_BREAK_SPACE,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE
} = constants$4;
const parse$4 = (input, options = {}) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected a string");
  }
  const opts = options || {};
  const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH$1, opts.maxLength) : MAX_LENGTH$1;
  if (input.length > max) {
    throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
  }
  const ast = { type: "root", input, nodes: [] };
  const stack = [ast];
  let block = ast;
  let prev = ast;
  let brackets = 0;
  const length = input.length;
  let index2 = 0;
  let depth2 = 0;
  let value;
  const advance = () => input[index2++];
  const push = (node) => {
    if (node.type === "text" && prev.type === "dot") {
      prev.type = "text";
    }
    if (prev && prev.type === "text" && node.type === "text") {
      prev.value += node.value;
      return;
    }
    block.nodes.push(node);
    node.parent = block;
    node.prev = prev;
    prev = node;
    return node;
  };
  push({ type: "bos" });
  while (index2 < length) {
    block = stack[stack.length - 1];
    value = advance();
    if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
      continue;
    }
    if (value === CHAR_BACKSLASH) {
      push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
      continue;
    }
    if (value === CHAR_RIGHT_SQUARE_BRACKET$2) {
      push({ type: "text", value: "\\" + value });
      continue;
    }
    if (value === CHAR_LEFT_SQUARE_BRACKET$2) {
      brackets++;
      let next;
      while (index2 < length && (next = advance())) {
        value += next;
        if (next === CHAR_LEFT_SQUARE_BRACKET$2) {
          brackets++;
          continue;
        }
        if (next === CHAR_BACKSLASH) {
          value += advance();
          continue;
        }
        if (next === CHAR_RIGHT_SQUARE_BRACKET$2) {
          brackets--;
          if (brackets === 0) {
            break;
          }
        }
      }
      push({ type: "text", value });
      continue;
    }
    if (value === CHAR_LEFT_PARENTHESES$1) {
      block = push({ type: "paren", nodes: [] });
      stack.push(block);
      push({ type: "text", value });
      continue;
    }
    if (value === CHAR_RIGHT_PARENTHESES$1) {
      if (block.type !== "paren") {
        push({ type: "text", value });
        continue;
      }
      block = stack.pop();
      push({ type: "text", value });
      block = stack[stack.length - 1];
      continue;
    }
    if (value === CHAR_DOUBLE_QUOTE$1 || value === CHAR_SINGLE_QUOTE$1 || value === CHAR_BACKTICK) {
      const open = value;
      let next;
      if (options.keepQuotes !== true) {
        value = "";
      }
      while (index2 < length && (next = advance())) {
        if (next === CHAR_BACKSLASH) {
          value += next + advance();
          continue;
        }
        if (next === open) {
          if (options.keepQuotes === true) value += next;
          break;
        }
        value += next;
      }
      push({ type: "text", value });
      continue;
    }
    if (value === CHAR_LEFT_CURLY_BRACE$1) {
      depth2++;
      const dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
      const brace = {
        type: "brace",
        open: true,
        close: false,
        dollar,
        depth: depth2,
        commas: 0,
        ranges: 0,
        nodes: []
      };
      block = push(brace);
      stack.push(block);
      push({ type: "open", value });
      continue;
    }
    if (value === CHAR_RIGHT_CURLY_BRACE$1) {
      if (block.type !== "brace") {
        push({ type: "text", value });
        continue;
      }
      const type2 = "close";
      block = stack.pop();
      block.close = true;
      push({ type: type2, value });
      depth2--;
      block = stack[stack.length - 1];
      continue;
    }
    if (value === CHAR_COMMA$2 && depth2 > 0) {
      if (block.ranges > 0) {
        block.ranges = 0;
        const open = block.nodes.shift();
        block.nodes = [open, { type: "text", value: stringify$1(block) }];
      }
      push({ type: "comma", value });
      block.commas++;
      continue;
    }
    if (value === CHAR_DOT$1 && depth2 > 0 && block.commas === 0) {
      const siblings = block.nodes;
      if (depth2 === 0 || siblings.length === 0) {
        push({ type: "text", value });
        continue;
      }
      if (prev.type === "dot") {
        block.range = [];
        prev.value += value;
        prev.type = "range";
        if (block.nodes.length !== 3 && block.nodes.length !== 5) {
          block.invalid = true;
          block.ranges = 0;
          prev.type = "text";
          continue;
        }
        block.ranges++;
        block.args = [];
        continue;
      }
      if (prev.type === "range") {
        siblings.pop();
        const before = siblings[siblings.length - 1];
        before.value += prev.value + value;
        prev = before;
        block.ranges--;
        continue;
      }
      push({ type: "dot", value });
      continue;
    }
    push({ type: "text", value });
  }
  do {
    block = stack.pop();
    if (block.type !== "root") {
      block.nodes.forEach((node) => {
        if (!node.nodes) {
          if (node.type === "open") node.isOpen = true;
          if (node.type === "close") node.isClose = true;
          if (!node.nodes) node.type = "text";
          node.invalid = true;
        }
      });
      const parent = stack[stack.length - 1];
      const index3 = parent.nodes.indexOf(block);
      parent.nodes.splice(index3, 1, ...block.nodes);
    }
  } while (stack.length > 0);
  push({ type: "eos" });
  return ast;
};
var parse_1$1 = parse$4;
const stringify = stringify$4;
const compile = compile_1;
const expand = expand_1;
const parse$3 = parse_1$1;
const braces$1 = (input, options = {}) => {
  let output = [];
  if (Array.isArray(input)) {
    for (const pattern of input) {
      const result = braces$1.create(pattern, options);
      if (Array.isArray(result)) {
        output.push(...result);
      } else {
        output.push(result);
      }
    }
  } else {
    output = [].concat(braces$1.create(input, options));
  }
  if (options && options.expand === true && options.nodupes === true) {
    output = [...new Set(output)];
  }
  return output;
};
braces$1.parse = (input, options = {}) => parse$3(input, options);
braces$1.stringify = (input, options = {}) => {
  if (typeof input === "string") {
    return stringify(braces$1.parse(input, options), options);
  }
  return stringify(input, options);
};
braces$1.compile = (input, options = {}) => {
  if (typeof input === "string") {
    input = braces$1.parse(input, options);
  }
  return compile(input, options);
};
braces$1.expand = (input, options = {}) => {
  if (typeof input === "string") {
    input = braces$1.parse(input, options);
  }
  let result = expand(input, options);
  if (options.noempty === true) {
    result = result.filter(Boolean);
  }
  if (options.nodupes === true) {
    result = [...new Set(result)];
  }
  return result;
};
braces$1.create = (input, options = {}) => {
  if (input === "" || input.length < 3) {
    return [input];
  }
  return options.expand !== true ? braces$1.compile(input, options) : braces$1.expand(input, options);
};
var braces_1 = braces$1;
var utils$4 = {};
const path$2 = require$$0__default$3.default;
const WIN_SLASH = "\\\\/";
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
const DOT_LITERAL = "\\.";
const PLUS_LITERAL = "\\+";
const QMARK_LITERAL = "\\?";
const SLASH_LITERAL = "\\/";
const ONE_CHAR = "(?=.)";
const QMARK = "[^/]";
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;
const POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};
const WINDOWS_CHARS = {
  ...POSIX_CHARS,
  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};
const POSIX_REGEX_SOURCE$1 = {
  alnum: "a-zA-Z0-9",
  alpha: "a-zA-Z",
  ascii: "\\x00-\\x7F",
  blank: " \\t",
  cntrl: "\\x00-\\x1F\\x7F",
  digit: "0-9",
  graph: "\\x21-\\x7E",
  lower: "a-z",
  print: "\\x20-\\x7E ",
  punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
  space: " \\t\\r\\n\\v\\f",
  upper: "A-Z",
  word: "A-Za-z0-9_",
  xdigit: "A-Fa-f0-9"
};
var constants$3 = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,
  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    "***": "*",
    "**/**": "**",
    "**/**/**": "**"
  },
  // Digits
  CHAR_0: 48,
  /* 0 */
  CHAR_9: 57,
  /* 9 */
  // Alphabet chars.
  CHAR_UPPERCASE_A: 65,
  /* A */
  CHAR_LOWERCASE_A: 97,
  /* a */
  CHAR_UPPERCASE_Z: 90,
  /* Z */
  CHAR_LOWERCASE_Z: 122,
  /* z */
  CHAR_LEFT_PARENTHESES: 40,
  /* ( */
  CHAR_RIGHT_PARENTHESES: 41,
  /* ) */
  CHAR_ASTERISK: 42,
  /* * */
  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38,
  /* & */
  CHAR_AT: 64,
  /* @ */
  CHAR_BACKWARD_SLASH: 92,
  /* \ */
  CHAR_CARRIAGE_RETURN: 13,
  /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94,
  /* ^ */
  CHAR_COLON: 58,
  /* : */
  CHAR_COMMA: 44,
  /* , */
  CHAR_DOT: 46,
  /* . */
  CHAR_DOUBLE_QUOTE: 34,
  /* " */
  CHAR_EQUAL: 61,
  /* = */
  CHAR_EXCLAMATION_MARK: 33,
  /* ! */
  CHAR_FORM_FEED: 12,
  /* \f */
  CHAR_FORWARD_SLASH: 47,
  /* / */
  CHAR_GRAVE_ACCENT: 96,
  /* ` */
  CHAR_HASH: 35,
  /* # */
  CHAR_HYPHEN_MINUS: 45,
  /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60,
  /* < */
  CHAR_LEFT_CURLY_BRACE: 123,
  /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91,
  /* [ */
  CHAR_LINE_FEED: 10,
  /* \n */
  CHAR_NO_BREAK_SPACE: 160,
  /* \u00A0 */
  CHAR_PERCENT: 37,
  /* % */
  CHAR_PLUS: 43,
  /* + */
  CHAR_QUESTION_MARK: 63,
  /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62,
  /* > */
  CHAR_RIGHT_CURLY_BRACE: 125,
  /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93,
  /* ] */
  CHAR_SEMICOLON: 59,
  /* ; */
  CHAR_SINGLE_QUOTE: 39,
  /* ' */
  CHAR_SPACE: 32,
  /*   */
  CHAR_TAB: 9,
  /* \t */
  CHAR_UNDERSCORE: 95,
  /* _ */
  CHAR_VERTICAL_LINE: 124,
  /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
  /* \uFEFF */
  SEP: path$2.sep,
  /**
   * Create EXTGLOB_CHARS
   */
  extglobChars(chars) {
    return {
      "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
      "?": { type: "qmark", open: "(?:", close: ")?" },
      "+": { type: "plus", open: "(?:", close: ")+" },
      "*": { type: "star", open: "(?:", close: ")*" },
      "@": { type: "at", open: "(?:", close: ")" }
    };
  },
  /**
   * Create GLOB_CHARS
   */
  globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};
(function(exports2) {
  const path2 = require$$0__default$3.default;
  const win32 = process.platform === "win32";
  const {
    REGEX_BACKSLASH,
    REGEX_REMOVE_BACKSLASH,
    REGEX_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_GLOBAL
  } = constants$3;
  exports2.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  exports2.hasRegexChars = (str2) => REGEX_SPECIAL_CHARS.test(str2);
  exports2.isRegexChar = (str2) => str2.length === 1 && exports2.hasRegexChars(str2);
  exports2.escapeRegex = (str2) => str2.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
  exports2.toPosixSlashes = (str2) => str2.replace(REGEX_BACKSLASH, "/");
  exports2.removeBackslashes = (str2) => {
    return str2.replace(REGEX_REMOVE_BACKSLASH, (match) => {
      return match === "\\" ? "" : match;
    });
  };
  exports2.supportsLookbehinds = () => {
    const segs = process.version.slice(1).split(".").map(Number);
    if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
      return true;
    }
    return false;
  };
  exports2.isWindows = (options) => {
    if (options && typeof options.windows === "boolean") {
      return options.windows;
    }
    return win32 === true || path2.sep === "\\";
  };
  exports2.escapeLast = (input, char, lastIdx) => {
    const idx = input.lastIndexOf(char, lastIdx);
    if (idx === -1) return input;
    if (input[idx - 1] === "\\") return exports2.escapeLast(input, char, idx - 1);
    return `${input.slice(0, idx)}\\${input.slice(idx)}`;
  };
  exports2.removePrefix = (input, state = {}) => {
    let output = input;
    if (output.startsWith("./")) {
      output = output.slice(2);
      state.prefix = "./";
    }
    return output;
  };
  exports2.wrapOutput = (input, state = {}, options = {}) => {
    const prepend = options.contains ? "" : "^";
    const append2 = options.contains ? "" : "$";
    let output = `${prepend}(?:${input})${append2}`;
    if (state.negated === true) {
      output = `(?:^(?!${output}).*$)`;
    }
    return output;
  };
})(utils$4);
const utils$3 = utils$4;
const {
  CHAR_ASTERISK: CHAR_ASTERISK$1,
  /* * */
  CHAR_AT,
  /* @ */
  CHAR_BACKWARD_SLASH,
  /* \ */
  CHAR_COMMA: CHAR_COMMA$1,
  /* , */
  CHAR_DOT,
  /* . */
  CHAR_EXCLAMATION_MARK,
  /* ! */
  CHAR_FORWARD_SLASH,
  /* / */
  CHAR_LEFT_CURLY_BRACE,
  /* { */
  CHAR_LEFT_PARENTHESES,
  /* ( */
  CHAR_LEFT_SQUARE_BRACKET: CHAR_LEFT_SQUARE_BRACKET$1,
  /* [ */
  CHAR_PLUS,
  /* + */
  CHAR_QUESTION_MARK,
  /* ? */
  CHAR_RIGHT_CURLY_BRACE,
  /* } */
  CHAR_RIGHT_PARENTHESES,
  /* ) */
  CHAR_RIGHT_SQUARE_BRACKET: CHAR_RIGHT_SQUARE_BRACKET$1
  /* ] */
} = constants$3;
const isPathSeparator = (code) => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};
const depth = (token) => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};
const scan$1 = (input, options) => {
  const opts = options || {};
  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];
  let str2 = input;
  let index2 = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob = false;
  let isExtglob = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let negatedExtglob = false;
  let finished = false;
  let braces2 = 0;
  let prev;
  let code;
  let token = { value: "", depth: 0, isGlob: false };
  const eos = () => index2 >= length;
  const peek = () => str2.charCodeAt(index2 + 1);
  const advance = () => {
    prev = code;
    return str2.charCodeAt(++index2);
  };
  while (index2 < length) {
    code = advance();
    let next;
    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();
      if (code === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }
      continue;
    }
    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces2++;
      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }
        if (code === CHAR_LEFT_CURLY_BRACE) {
          braces2++;
          continue;
        }
        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (braceEscaped !== true && code === CHAR_COMMA$1) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_RIGHT_CURLY_BRACE) {
          braces2--;
          if (braces2 === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index2);
      tokens.push(token);
      token = { value: "", depth: 0, isGlob: false };
      if (finished === true) continue;
      if (prev === CHAR_DOT && index2 === start + 1) {
        start += 2;
        continue;
      }
      lastIndex = index2 + 1;
      continue;
    }
    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK$1 || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
        isGlob = token.isGlob = true;
        isExtglob = token.isExtglob = true;
        finished = true;
        if (code === CHAR_EXCLAMATION_MARK && index2 === start) {
          negatedExtglob = true;
        }
        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }
            if (code === CHAR_RIGHT_PARENTHESES) {
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }
    if (code === CHAR_ASTERISK$1) {
      if (prev === CHAR_ASTERISK$1) isGlobstar = token.isGlobstar = true;
      isGlob = token.isGlob = true;
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_QUESTION_MARK) {
      isGlob = token.isGlob = true;
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (code === CHAR_LEFT_SQUARE_BRACKET$1) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }
        if (next === CHAR_RIGHT_SQUARE_BRACKET$1) {
          isBracket = token.isBracket = true;
          isGlob = token.isGlob = true;
          finished = true;
          break;
        }
      }
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index2 === start) {
      negated = token.negated = true;
      start++;
      continue;
    }
    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
      isGlob = token.isGlob = true;
      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }
          if (code === CHAR_RIGHT_PARENTHESES) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }
    if (isGlob === true) {
      finished = true;
      if (scanToEnd === true) {
        continue;
      }
      break;
    }
  }
  if (opts.noext === true) {
    isExtglob = false;
    isGlob = false;
  }
  let base = str2;
  let prefix = "";
  let glob = "";
  if (start > 0) {
    prefix = str2.slice(0, start);
    str2 = str2.slice(start);
    lastIndex -= start;
  }
  if (base && isGlob === true && lastIndex > 0) {
    base = str2.slice(0, lastIndex);
    glob = str2.slice(lastIndex);
  } else if (isGlob === true) {
    base = "";
    glob = str2;
  } else {
    base = str2;
  }
  if (base && base !== "" && base !== "/" && base !== str2) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }
  if (opts.unescape === true) {
    if (glob) glob = utils$3.removeBackslashes(glob);
    if (base && backslashes === true) {
      base = utils$3.removeBackslashes(base);
    }
  }
  const state = {
    prefix,
    input,
    start,
    base,
    glob,
    isBrace,
    isBracket,
    isGlob,
    isExtglob,
    isGlobstar,
    negated,
    negatedExtglob
  };
  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }
  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;
    for (let idx = 0; idx < slashes.length; idx++) {
      const n = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== "") {
        parts.push(value);
      }
      prevIndex = i;
    }
    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);
      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }
    state.slashes = slashes;
    state.parts = parts;
  }
  return state;
};
var scan_1 = scan$1;
const constants$2 = constants$3;
const utils$2 = utils$4;
const {
  MAX_LENGTH,
  POSIX_REGEX_SOURCE,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants$2;
const expandRange = (args, options) => {
  if (typeof options.expandRange === "function") {
    return options.expandRange(...args, options);
  }
  args.sort();
  const value = `[${args.join("-")}]`;
  try {
    new RegExp(value);
  } catch (ex) {
    return args.map((v) => utils$2.escapeRegex(v)).join("..");
  }
  return value;
};
const syntaxError = (type2, char) => {
  return `Missing ${type2}: "${char}" - use "\\\\${char}" to match literal characters`;
};
const parse$2 = (input, options) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected a string");
  }
  input = REPLACEMENTS[input] || input;
  const opts = { ...options };
  const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }
  const bos = { type: "bos", value: "", output: opts.prepend || "" };
  const tokens = [bos];
  const capture = opts.capture ? "" : "?:";
  const win32 = utils$2.isWindows(options);
  const PLATFORM_CHARS = constants$2.globChars(win32);
  const EXTGLOB_CHARS = constants$2.extglobChars(PLATFORM_CHARS);
  const {
    DOT_LITERAL: DOT_LITERAL2,
    PLUS_LITERAL: PLUS_LITERAL2,
    SLASH_LITERAL: SLASH_LITERAL2,
    ONE_CHAR: ONE_CHAR2,
    DOTS_SLASH: DOTS_SLASH2,
    NO_DOT: NO_DOT2,
    NO_DOT_SLASH: NO_DOT_SLASH2,
    NO_DOTS_SLASH: NO_DOTS_SLASH2,
    QMARK: QMARK2,
    QMARK_NO_DOT: QMARK_NO_DOT2,
    STAR: STAR2,
    START_ANCHOR: START_ANCHOR2
  } = PLATFORM_CHARS;
  const globstar = (opts2) => {
    return `(${capture}(?:(?!${START_ANCHOR2}${opts2.dot ? DOTS_SLASH2 : DOT_LITERAL2}).)*?)`;
  };
  const nodot = opts.dot ? "" : NO_DOT2;
  const qmarkNoDot = opts.dot ? QMARK2 : QMARK_NO_DOT2;
  let star = opts.bash === true ? globstar(opts) : STAR2;
  if (opts.capture) {
    star = `(${star})`;
  }
  if (typeof opts.noext === "boolean") {
    opts.noextglob = opts.noext;
  }
  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: "",
    output: "",
    prefix: "",
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };
  input = utils$2.removePrefix(input, state);
  len = input.length;
  const extglobs = [];
  const braces2 = [];
  const stack = [];
  let prev = bos;
  let value;
  const eos = () => state.index === len - 1;
  const peek = state.peek = (n = 1) => input[state.index + n];
  const advance = state.advance = () => input[++state.index] || "";
  const remaining = () => input.slice(state.index + 1);
  const consume = (value2 = "", num = 0) => {
    state.consumed += value2;
    state.index += num;
  };
  const append2 = (token) => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };
  const negate = () => {
    let count = 1;
    while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
      advance();
      state.start++;
      count++;
    }
    if (count % 2 === 0) {
      return false;
    }
    state.negated = true;
    state.start++;
    return true;
  };
  const increment = (type2) => {
    state[type2]++;
    stack.push(type2);
  };
  const decrement = (type2) => {
    state[type2]--;
    stack.pop();
  };
  const push = (tok) => {
    if (prev.type === "globstar") {
      const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
      const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
      if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = "star";
        prev.value = "*";
        prev.output = star;
        state.output += prev.output;
      }
    }
    if (extglobs.length && tok.type !== "paren") {
      extglobs[extglobs.length - 1].inner += tok.value;
    }
    if (tok.value || tok.output) append2(tok);
    if (prev && prev.type === "text" && tok.type === "text") {
      prev.value += tok.value;
      prev.output = (prev.output || "") + tok.value;
      return;
    }
    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };
  const extglobOpen = (type2, value2) => {
    const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? "(" : "") + token.open;
    increment("parens");
    push({ type: type2, value: value2, output: state.output ? "" : ONE_CHAR2 });
    push({ type: "paren", extglob: true, value: advance(), output });
    extglobs.push(token);
  };
  const extglobClose = (token) => {
    let output = token.close + (opts.capture ? ")" : "");
    let rest;
    if (token.type === "negate") {
      let extglobStar = star;
      if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
        extglobStar = globstar(opts);
      }
      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }
      if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
        const expression = parse$2(rest, { ...options, fastpaths: false }).output;
        output = token.close = `)${expression})${extglobStar})`;
      }
      if (token.prev.type === "bos") {
        state.negatedExtglob = true;
      }
    }
    push({ type: "paren", extglob: true, value, output });
    decrement("parens");
  };
  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;
    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index2) => {
      if (first === "\\") {
        backslashes = true;
        return m;
      }
      if (first === "?") {
        if (esc) {
          return esc + first + (rest ? QMARK2.repeat(rest.length) : "");
        }
        if (index2 === 0) {
          return qmarkNoDot + (rest ? QMARK2.repeat(rest.length) : "");
        }
        return QMARK2.repeat(chars.length);
      }
      if (first === ".") {
        return DOT_LITERAL2.repeat(chars.length);
      }
      if (first === "*") {
        if (esc) {
          return esc + first + (rest ? star : "");
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });
    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, "");
      } else {
        output = output.replace(/\\+/g, (m) => {
          return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
        });
      }
    }
    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }
    state.output = utils$2.wrapOutput(output, state, options);
    return state;
  }
  while (!eos()) {
    value = advance();
    if (value === "\0") {
      continue;
    }
    if (value === "\\") {
      const next = peek();
      if (next === "/" && opts.bash !== true) {
        continue;
      }
      if (next === "." || next === ";") {
        continue;
      }
      if (!next) {
        value += "\\";
        push({ type: "text", value });
        continue;
      }
      const match = /^\\+/.exec(remaining());
      let slashes = 0;
      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += "\\";
        }
      }
      if (opts.unescape === true) {
        value = advance();
      } else {
        value += advance();
      }
      if (state.brackets === 0) {
        push({ type: "text", value });
        continue;
      }
    }
    if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
      if (opts.posix !== false && value === ":") {
        const inner = prev.value.slice(1);
        if (inner.includes("[")) {
          prev.posix = true;
          if (inner.includes(":")) {
            const idx = prev.value.lastIndexOf("[");
            const pre = prev.value.slice(0, idx);
            const rest2 = prev.value.slice(idx + 2);
            const posix = POSIX_REGEX_SOURCE[rest2];
            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();
              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR2;
              }
              continue;
            }
          }
        }
      }
      if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
        value = `\\${value}`;
      }
      if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
        value = `\\${value}`;
      }
      if (opts.posix === true && value === "!" && prev.value === "[") {
        value = "^";
      }
      prev.value += value;
      append2({ value });
      continue;
    }
    if (state.quotes === 1 && value !== '"') {
      value = utils$2.escapeRegex(value);
      prev.value += value;
      append2({ value });
      continue;
    }
    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({ type: "text", value });
      }
      continue;
    }
    if (value === "(") {
      increment("parens");
      push({ type: "paren", value });
      continue;
    }
    if (value === ")") {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError("opening", "("));
      }
      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }
      push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
      decrement("parens");
      continue;
    }
    if (value === "[") {
      if (opts.nobracket === true || !remaining().includes("]")) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("closing", "]"));
        }
        value = `\\${value}`;
      } else {
        increment("brackets");
      }
      push({ type: "bracket", value });
      continue;
    }
    if (value === "]") {
      if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
        push({ type: "text", value, output: `\\${value}` });
        continue;
      }
      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("opening", "["));
        }
        push({ type: "text", value, output: `\\${value}` });
        continue;
      }
      decrement("brackets");
      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
        value = `/${value}`;
      }
      prev.value += value;
      append2({ value });
      if (opts.literalBrackets === false || utils$2.hasRegexChars(prevValue)) {
        continue;
      }
      const escaped = utils$2.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);
      if (opts.literalBrackets === true) {
        state.output += escaped;
        prev.value = escaped;
        continue;
      }
      prev.value = `(${capture}${escaped}|${prev.value})`;
      state.output += prev.value;
      continue;
    }
    if (value === "{" && opts.nobrace !== true) {
      increment("braces");
      const open = {
        type: "brace",
        value,
        output: "(",
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };
      braces2.push(open);
      push(open);
      continue;
    }
    if (value === "}") {
      const brace = braces2[braces2.length - 1];
      if (opts.nobrace === true || !brace) {
        push({ type: "text", value, output: value });
        continue;
      }
      let output = ")";
      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];
        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === "brace") {
            break;
          }
          if (arr[i].type !== "dots") {
            range.unshift(arr[i].value);
          }
        }
        output = expandRange(range, opts);
        state.backtrack = true;
      }
      if (brace.comma !== true && brace.dots !== true) {
        const out = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = "\\{";
        value = output = "\\}";
        state.output = out;
        for (const t of toks) {
          state.output += t.output || t.value;
        }
      }
      push({ type: "brace", value, output });
      decrement("braces");
      braces2.pop();
      continue;
    }
    if (value === "|") {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({ type: "text", value });
      continue;
    }
    if (value === ",") {
      let output = value;
      const brace = braces2[braces2.length - 1];
      if (brace && stack[stack.length - 1] === "braces") {
        brace.comma = true;
        output = "|";
      }
      push({ type: "comma", value, output });
      continue;
    }
    if (value === "/") {
      if (prev.type === "dot" && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = "";
        state.output = "";
        tokens.pop();
        prev = bos;
        continue;
      }
      push({ type: "slash", value, output: SLASH_LITERAL2 });
      continue;
    }
    if (value === ".") {
      if (state.braces > 0 && prev.type === "dot") {
        if (prev.value === ".") prev.output = DOT_LITERAL2;
        const brace = braces2[braces2.length - 1];
        prev.type = "dots";
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }
      if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
        push({ type: "text", value, output: DOT_LITERAL2 });
        continue;
      }
      push({ type: "dot", value, output: DOT_LITERAL2 });
      continue;
    }
    if (value === "?") {
      const isGroup = prev && prev.value === "(";
      if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        extglobOpen("qmark", value);
        continue;
      }
      if (prev && prev.type === "paren") {
        const next = peek();
        let output = value;
        if (next === "<" && !utils$2.supportsLookbehinds()) {
          throw new Error("Node.js v10 or higher is required for regex lookbehinds");
        }
        if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
          output = `\\${value}`;
        }
        push({ type: "text", value, output });
        continue;
      }
      if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
        push({ type: "qmark", value, output: QMARK_NO_DOT2 });
        continue;
      }
      push({ type: "qmark", value, output: QMARK2 });
      continue;
    }
    if (value === "!") {
      if (opts.noextglob !== true && peek() === "(") {
        if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
          extglobOpen("negate", value);
          continue;
        }
      }
      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }
    if (value === "+") {
      if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        extglobOpen("plus", value);
        continue;
      }
      if (prev && prev.value === "(" || opts.regex === false) {
        push({ type: "plus", value, output: PLUS_LITERAL2 });
        continue;
      }
      if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
        push({ type: "plus", value });
        continue;
      }
      push({ type: "plus", value: PLUS_LITERAL2 });
      continue;
    }
    if (value === "@") {
      if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
        push({ type: "at", extglob: true, value, output: "" });
        continue;
      }
      push({ type: "text", value });
      continue;
    }
    if (value !== "*") {
      if (value === "$" || value === "^") {
        value = `\\${value}`;
      }
      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match) {
        value += match[0];
        state.index += match[0].length;
      }
      push({ type: "text", value });
      continue;
    }
    if (prev && (prev.type === "globstar" || prev.star === true)) {
      prev.type = "star";
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }
    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen("star", value);
      continue;
    }
    if (prev.type === "star") {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }
      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === "slash" || prior.type === "bos";
      const afterStar = before && (before.type === "star" || before.type === "globstar");
      if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
        push({ type: "star", value, output: "" });
        continue;
      }
      const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
      const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
      if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
        push({ type: "star", value, output: "" });
        continue;
      }
      while (rest.slice(0, 3) === "/**") {
        const after = input[state.index + 4];
        if (after && after !== "/") {
          break;
        }
        rest = rest.slice(3);
        consume("/**", 3);
      }
      if (prior.type === "bos" && eos()) {
        prev.type = "globstar";
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }
      if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;
        prev.type = "globstar";
        prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }
      if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
        const end = rest[1] !== void 0 ? "|$" : "";
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;
        prev.type = "globstar";
        prev.output = `${globstar(opts)}${SLASH_LITERAL2}|${SLASH_LITERAL2}${end})`;
        prev.value += value;
        state.output += prior.output + prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: "slash", value: "/", output: "" });
        continue;
      }
      if (prior.type === "bos" && rest[0] === "/") {
        prev.type = "globstar";
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL2}|${globstar(opts)}${SLASH_LITERAL2})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: "slash", value: "/", output: "" });
        continue;
      }
      state.output = state.output.slice(0, -prev.output.length);
      prev.type = "globstar";
      prev.output = globstar(opts);
      prev.value += value;
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }
    const token = { type: "star", value, output: star };
    if (opts.bash === true) {
      token.output = ".*?";
      if (prev.type === "bos" || prev.type === "slash") {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }
    if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }
    if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
      if (prev.type === "dot") {
        state.output += NO_DOT_SLASH2;
        prev.output += NO_DOT_SLASH2;
      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH2;
        prev.output += NO_DOTS_SLASH2;
      } else {
        state.output += nodot;
        prev.output += nodot;
      }
      if (peek() !== "*") {
        state.output += ONE_CHAR2;
        prev.output += ONE_CHAR2;
      }
    }
    push(token);
  }
  while (state.brackets > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
    state.output = utils$2.escapeLast(state.output, "[");
    decrement("brackets");
  }
  while (state.parens > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
    state.output = utils$2.escapeLast(state.output, "(");
    decrement("parens");
  }
  while (state.braces > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
    state.output = utils$2.escapeLast(state.output, "{");
    decrement("braces");
  }
  if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
    push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL2}?` });
  }
  if (state.backtrack === true) {
    state.output = "";
    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;
      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }
  return state;
};
parse$2.fastpaths = (input, options) => {
  const opts = { ...options };
  const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }
  input = REPLACEMENTS[input] || input;
  const win32 = utils$2.isWindows(options);
  const {
    DOT_LITERAL: DOT_LITERAL2,
    SLASH_LITERAL: SLASH_LITERAL2,
    ONE_CHAR: ONE_CHAR2,
    DOTS_SLASH: DOTS_SLASH2,
    NO_DOT: NO_DOT2,
    NO_DOTS: NO_DOTS2,
    NO_DOTS_SLASH: NO_DOTS_SLASH2,
    STAR: STAR2,
    START_ANCHOR: START_ANCHOR2
  } = constants$2.globChars(win32);
  const nodot = opts.dot ? NO_DOTS2 : NO_DOT2;
  const slashDot = opts.dot ? NO_DOTS_SLASH2 : NO_DOT2;
  const capture = opts.capture ? "" : "?:";
  const state = { negated: false, prefix: "" };
  let star = opts.bash === true ? ".*?" : STAR2;
  if (opts.capture) {
    star = `(${star})`;
  }
  const globstar = (opts2) => {
    if (opts2.noglobstar === true) return star;
    return `(${capture}(?:(?!${START_ANCHOR2}${opts2.dot ? DOTS_SLASH2 : DOT_LITERAL2}).)*?)`;
  };
  const create2 = (str2) => {
    switch (str2) {
      case "*":
        return `${nodot}${ONE_CHAR2}${star}`;
      case ".*":
        return `${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "*.*":
        return `${nodot}${star}${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "*/*":
        return `${nodot}${star}${SLASH_LITERAL2}${ONE_CHAR2}${slashDot}${star}`;
      case "**":
        return nodot + globstar(opts);
      case "**/*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${slashDot}${ONE_CHAR2}${star}`;
      case "**/*.*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${slashDot}${star}${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      case "**/.*":
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL2})?${DOT_LITERAL2}${ONE_CHAR2}${star}`;
      default: {
        const match = /^(.*?)\.(\w+)$/.exec(str2);
        if (!match) return;
        const source2 = create2(match[1]);
        if (!source2) return;
        return source2 + DOT_LITERAL2 + match[2];
      }
    }
  };
  const output = utils$2.removePrefix(input, state);
  let source = create2(output);
  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL2}?`;
  }
  return source;
};
var parse_1 = parse$2;
const path$1 = require$$0__default$3.default;
const scan = scan_1;
const parse$1 = parse_1;
const utils$1 = utils$4;
const constants$1 = constants$3;
const isObject$1 = (val) => val && typeof val === "object" && !Array.isArray(val);
const picomatch$2 = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map((input) => picomatch$2(input, options, returnState));
    const arrayMatcher = (str2) => {
      for (const isMatch of fns) {
        const state2 = isMatch(str2);
        if (state2) return state2;
      }
      return false;
    };
    return arrayMatcher;
  }
  const isState = isObject$1(glob) && glob.tokens && glob.input;
  if (glob === "" || typeof glob !== "string" && !isState) {
    throw new TypeError("Expected pattern to be a non-empty string");
  }
  const opts = options || {};
  const posix = utils$1.isWindows(options);
  const regex = isState ? picomatch$2.compileRe(glob, options) : picomatch$2.makeRe(glob, options, false, true);
  const state = regex.state;
  delete regex.state;
  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
    isIgnored = picomatch$2(opts.ignore, ignoreOpts, returnState);
  }
  const matcher = (input, returnObject = false) => {
    const { isMatch, match, output } = picomatch$2.test(input, regex, options, { glob, posix });
    const result = { glob, state, regex, posix, input, output, match, isMatch };
    if (typeof opts.onResult === "function") {
      opts.onResult(result);
    }
    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }
    if (isIgnored(input)) {
      if (typeof opts.onIgnore === "function") {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }
    if (typeof opts.onMatch === "function") {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };
  if (returnState) {
    matcher.state = state;
  }
  return matcher;
};
picomatch$2.test = (input, regex, options, { glob, posix } = {}) => {
  if (typeof input !== "string") {
    throw new TypeError("Expected input to be a string");
  }
  if (input === "") {
    return { isMatch: false, output: "" };
  }
  const opts = options || {};
  const format = opts.format || (posix ? utils$1.toPosixSlashes : null);
  let match = input === glob;
  let output = match && format ? format(input) : input;
  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }
  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch$2.matchBase(input, regex, options, posix);
    } else {
      match = regex.exec(output);
    }
  }
  return { isMatch: Boolean(match), match, output };
};
picomatch$2.matchBase = (input, glob, options, posix = utils$1.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch$2.makeRe(glob, options);
  return regex.test(path$1.basename(input));
};
picomatch$2.isMatch = (str2, patterns, options) => picomatch$2(patterns, options)(str2);
picomatch$2.parse = (pattern, options) => {
  if (Array.isArray(pattern)) return pattern.map((p) => picomatch$2.parse(p, options));
  return parse$1(pattern, { ...options, fastpaths: false });
};
picomatch$2.scan = (input, options) => scan(input, options);
picomatch$2.compileRe = (state, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return state.output;
  }
  const opts = options || {};
  const prepend = opts.contains ? "" : "^";
  const append2 = opts.contains ? "" : "$";
  let source = `${prepend}(?:${state.output})${append2}`;
  if (state && state.negated === true) {
    source = `^(?!${source}).*$`;
  }
  const regex = picomatch$2.toRegex(source, options);
  if (returnState === true) {
    regex.state = state;
  }
  return regex;
};
picomatch$2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== "string") {
    throw new TypeError("Expected a non-empty string");
  }
  let parsed = { negated: false, fastpaths: true };
  if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
    parsed.output = parse$1.fastpaths(input, options);
  }
  if (!parsed.output) {
    parsed = parse$1(input, options);
  }
  return picomatch$2.compileRe(parsed, options, returnOutput, returnState);
};
picomatch$2.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
  } catch (err) {
    if (options && options.debug === true) throw err;
    return /$^/;
  }
};
picomatch$2.constants = constants$1;
var picomatch_1 = picomatch$2;
var picomatch$1 = picomatch_1;
const util$1 = require$$2__default$1.default;
const braces = braces_1;
const picomatch = picomatch$1;
const utils = utils$4;
const isEmptyString = (v) => v === "" || v === "./";
const hasBraces = (v) => {
  const index2 = v.indexOf("{");
  return index2 > -1 && v.indexOf("}", index2) > -1;
};
const micromatch = (list, patterns, options) => {
  patterns = [].concat(patterns);
  list = [].concat(list);
  let omit = /* @__PURE__ */ new Set();
  let keep = /* @__PURE__ */ new Set();
  let items = /* @__PURE__ */ new Set();
  let negatives = 0;
  let onResult = (state) => {
    items.add(state.output);
    if (options && options.onResult) {
      options.onResult(state);
    }
  };
  for (let i = 0; i < patterns.length; i++) {
    let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true);
    let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
    if (negated) negatives++;
    for (let item of list) {
      let matched = isMatch(item, true);
      let match = negated ? !matched.isMatch : matched.isMatch;
      if (!match) continue;
      if (negated) {
        omit.add(matched.output);
      } else {
        omit.delete(matched.output);
        keep.add(matched.output);
      }
    }
  }
  let result = negatives === patterns.length ? [...items] : [...keep];
  let matches = result.filter((item) => !omit.has(item));
  if (options && matches.length === 0) {
    if (options.failglob === true) {
      throw new Error(`No matches found for "${patterns.join(", ")}"`);
    }
    if (options.nonull === true || options.nullglob === true) {
      return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
    }
  }
  return matches;
};
micromatch.match = micromatch;
micromatch.matcher = (pattern, options) => picomatch(pattern, options);
micromatch.isMatch = (str2, patterns, options) => picomatch(patterns, options)(str2);
micromatch.any = micromatch.isMatch;
micromatch.not = (list, patterns, options = {}) => {
  patterns = [].concat(patterns).map(String);
  let result = /* @__PURE__ */ new Set();
  let items = [];
  let onResult = (state) => {
    if (options.onResult) options.onResult(state);
    items.push(state.output);
  };
  let matches = new Set(micromatch(list, patterns, { ...options, onResult }));
  for (let item of items) {
    if (!matches.has(item)) {
      result.add(item);
    }
  }
  return [...result];
};
micromatch.contains = (str2, pattern, options) => {
  if (typeof str2 !== "string") {
    throw new TypeError(`Expected a string: "${util$1.inspect(str2)}"`);
  }
  if (Array.isArray(pattern)) {
    return pattern.some((p) => micromatch.contains(str2, p, options));
  }
  if (typeof pattern === "string") {
    if (isEmptyString(str2) || isEmptyString(pattern)) {
      return false;
    }
    if (str2.includes(pattern) || str2.startsWith("./") && str2.slice(2).includes(pattern)) {
      return true;
    }
  }
  return micromatch.isMatch(str2, pattern, { ...options, contains: true });
};
micromatch.matchKeys = (obj, patterns, options) => {
  if (!utils.isObject(obj)) {
    throw new TypeError("Expected the first argument to be an object");
  }
  let keys = micromatch(Object.keys(obj), patterns, options);
  let res = {};
  for (let key of keys) res[key] = obj[key];
  return res;
};
micromatch.some = (list, patterns, options) => {
  let items = [].concat(list);
  for (let pattern of [].concat(patterns)) {
    let isMatch = picomatch(String(pattern), options);
    if (items.some((item) => isMatch(item))) {
      return true;
    }
  }
  return false;
};
micromatch.every = (list, patterns, options) => {
  let items = [].concat(list);
  for (let pattern of [].concat(patterns)) {
    let isMatch = picomatch(String(pattern), options);
    if (!items.every((item) => isMatch(item))) {
      return false;
    }
  }
  return true;
};
micromatch.all = (str2, patterns, options) => {
  if (typeof str2 !== "string") {
    throw new TypeError(`Expected a string: "${util$1.inspect(str2)}"`);
  }
  return [].concat(patterns).every((p) => picomatch(p, options)(str2));
};
micromatch.capture = (glob, input, options) => {
  let posix = utils.isWindows(options);
  let regex = picomatch.makeRe(String(glob), { ...options, capture: true });
  let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);
  if (match) {
    return match.slice(1).map((v) => v === void 0 ? "" : v);
  }
};
micromatch.makeRe = (...args) => picomatch.makeRe(...args);
micromatch.scan = (...args) => picomatch.scan(...args);
micromatch.parse = (patterns, options) => {
  let res = [];
  for (let pattern of [].concat(patterns || [])) {
    for (let str2 of braces(String(pattern), options)) {
      res.push(picomatch.parse(str2, options));
    }
  }
  return res;
};
micromatch.braces = (pattern, options) => {
  if (typeof pattern !== "string") throw new TypeError("Expected a string");
  if (options && options.nobrace === true || !hasBraces(pattern)) {
    return [pattern];
  }
  return braces(pattern, options);
};
micromatch.braceExpand = (pattern, options) => {
  if (typeof pattern !== "string") throw new TypeError("Expected a string");
  return micromatch.braces(pattern, { ...options, expand: true });
};
micromatch.hasBraces = hasBraces;
var micromatch_1$1 = micromatch;
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(core$1, "__esModule", { value: true });
core$1.readPackageJSON = core$1.extractWorkspaces = core$1.isMatchWorkspaces = core$1.checkWorkspaces = core$1.findWorkspaceRoot = void 0;
const path_1 = __importDefault(require$$0__default$3.default);
const pkg_dir_1 = __importDefault(pkgDirExports);
const fs_1 = require$$0__default$2.default;
const micromatch_1 = __importDefault(micromatch_1$1);
function findWorkspaceRoot(initial) {
  if (!initial) {
    initial = process.cwd();
  }
  let _pkg = pkg_dir_1.default.sync(initial);
  if (!_pkg) {
    return null;
  }
  initial = path_1.default.normalize(_pkg);
  let previous = null;
  let current = initial;
  do {
    const manifest = readPackageJSON(current);
    extractWorkspaces(manifest);
    let { done, found } = checkWorkspaces(current, initial);
    if (done) {
      return found;
    }
    previous = current;
    current = path_1.default.dirname(current);
  } while (current !== previous);
  return null;
}
core$1.findWorkspaceRoot = findWorkspaceRoot;
function checkWorkspaces(current, initial) {
  const manifest = readPackageJSON(current);
  const workspaces = extractWorkspaces(manifest);
  let done = false;
  let found;
  let relativePath;
  if (workspaces) {
    done = true;
    relativePath = path_1.default.relative(current, initial);
    if (relativePath === "" || isMatchWorkspaces(relativePath, workspaces)) {
      found = current;
    } else {
      found = null;
    }
  }
  return {
    done,
    found,
    relativePath
  };
}
core$1.checkWorkspaces = checkWorkspaces;
function isMatchWorkspaces(relativePath, workspaces) {
  let ls = micromatch_1.default([relativePath], workspaces);
  return ls.length > 0;
}
core$1.isMatchWorkspaces = isMatchWorkspaces;
function extractWorkspaces(manifest) {
  const workspaces = (manifest || {}).workspaces;
  return workspaces && workspaces.packages || (Array.isArray(workspaces) ? workspaces : null);
}
core$1.extractWorkspaces = extractWorkspaces;
function readPackageJSON(dir) {
  const file = path_1.default.join(dir, "package.json");
  if (fs_1.existsSync(file)) {
    return JSON.parse(fs_1.readFileSync(file, "utf8"));
  }
  return null;
}
core$1.readPackageJSON = readPackageJSON;
findWorkspaceRoot.findWorkspaceRoot = findWorkspaceRoot;
findWorkspaceRoot.readPackageJSON = readPackageJSON;
findWorkspaceRoot.extractWorkspaces = extractWorkspaces;
findWorkspaceRoot.isMatchWorkspaces = isMatchWorkspaces;
findWorkspaceRoot.default = findWorkspaceRoot;
core$1.default = findWorkspaceRoot;
const core_1 = core$1;
core_1.findWorkspaceRoot;
var findUp = { exports: {} };
var locatePath = { exports: {} };
class Node {
  /// value;
  /// next;
  constructor(value) {
    this.value = value;
    this.next = void 0;
  }
}
let Queue$1 = class Queue {
  // TODO: Use private class fields when targeting Node.js 12.
  // #_head;
  // #_tail;
  // #_size;
  constructor() {
    this.clear();
  }
  enqueue(value) {
    const node = new Node(value);
    if (this._head) {
      this._tail.next = node;
      this._tail = node;
    } else {
      this._head = node;
      this._tail = node;
    }
    this._size++;
  }
  dequeue() {
    const current = this._head;
    if (!current) {
      return;
    }
    this._head = this._head.next;
    this._size--;
    return current.value;
  }
  clear() {
    this._head = void 0;
    this._tail = void 0;
    this._size = 0;
  }
  get size() {
    return this._size;
  }
  *[Symbol.iterator]() {
    let current = this._head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
};
var yoctoQueue = Queue$1;
const Queue2 = yoctoQueue;
const pLimit$1 = (concurrency) => {
  if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  }
  const queue = new Queue2();
  let activeCount = 0;
  const next = () => {
    activeCount--;
    if (queue.size > 0) {
      queue.dequeue()();
    }
  };
  const run = async (fn, resolve, ...args) => {
    activeCount++;
    const result = (async () => fn(...args))();
    resolve(result);
    try {
      await result;
    } catch {
    }
    next();
  };
  const enqueue2 = (fn, resolve, ...args) => {
    queue.enqueue(run.bind(null, fn, resolve, ...args));
    (async () => {
      await Promise.resolve();
      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()();
      }
    })();
  };
  const generator = (fn, ...args) => new Promise((resolve) => {
    enqueue2(fn, resolve, ...args);
  });
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.size
    },
    clearQueue: {
      value: () => {
        queue.clear();
      }
    }
  });
  return generator;
};
var pLimit_1 = pLimit$1;
const pLimit = pLimit_1;
class EndError2 extends Error {
  constructor(value) {
    super();
    this.value = value;
  }
}
const testElement = async (element, tester) => tester(await element);
const finder = async (element) => {
  const values = await Promise.all(element);
  if (values[1] === true) {
    throw new EndError2(values[0]);
  }
  return false;
};
const pLocate$1 = async (iterable, tester, options) => {
  options = {
    concurrency: Infinity,
    preserveOrder: true,
    ...options
  };
  const limit = pLimit(options.concurrency);
  const items = [...iterable].map((element) => [element, limit(testElement, element, tester)]);
  const checkLimit = pLimit(options.preserveOrder ? 1 : Infinity);
  try {
    await Promise.all(items.map((element) => checkLimit(finder, element)));
  } catch (error2) {
    if (error2 instanceof EndError2) {
      return error2.value;
    }
    throw error2;
  }
};
var pLocate_1 = pLocate$1;
const path = require$$0__default$3.default;
const fs$2 = require$$0__default$2.default;
const { promisify } = require$$2__default$1.default;
const pLocate = pLocate_1;
const fsStat = promisify(fs$2.stat);
const fsLStat = promisify(fs$2.lstat);
const typeMappings = {
  directory: "isDirectory",
  file: "isFile"
};
function checkType({ type: type2 }) {
  if (type2 in typeMappings) {
    return;
  }
  throw new Error(`Invalid type specified: ${type2}`);
}
const matchType = (type2, stat) => type2 === void 0 || stat[typeMappings[type2]]();
locatePath.exports = async (paths, options) => {
  options = {
    cwd: process.cwd(),
    type: "file",
    allowSymlinks: true,
    ...options
  };
  checkType(options);
  const statFn = options.allowSymlinks ? fsStat : fsLStat;
  return pLocate(paths, async (path_) => {
    try {
      const stat = await statFn(path.resolve(options.cwd, path_));
      return matchType(options.type, stat);
    } catch {
      return false;
    }
  }, options);
};
locatePath.exports.sync = (paths, options) => {
  options = {
    cwd: process.cwd(),
    allowSymlinks: true,
    type: "file",
    ...options
  };
  checkType(options);
  const statFn = options.allowSymlinks ? fs$2.statSync : fs$2.lstatSync;
  for (const path_ of paths) {
    try {
      const stat = statFn(path.resolve(options.cwd, path_));
      if (matchType(options.type, stat)) {
        return path_;
      }
    } catch {
    }
  }
};
var locatePathExports = locatePath.exports;
(function(module2) {
  const path2 = require$$0__default$3.default;
  const locatePath2 = locatePathExports;
  const pathExists2 = pathExistsExports;
  const stop = Symbol("findUp.stop");
  module2.exports = async (name, options = {}) => {
    let directory = path2.resolve(options.cwd || "");
    const { root } = path2.parse(directory);
    const paths = [].concat(name);
    const runMatcher = async (locateOptions) => {
      if (typeof name !== "function") {
        return locatePath2(paths, locateOptions);
      }
      const foundPath = await name(locateOptions.cwd);
      if (typeof foundPath === "string") {
        return locatePath2([foundPath], locateOptions);
      }
      return foundPath;
    };
    while (true) {
      const foundPath = await runMatcher({ ...options, cwd: directory });
      if (foundPath === stop) {
        return;
      }
      if (foundPath) {
        return path2.resolve(directory, foundPath);
      }
      if (directory === root) {
        return;
      }
      directory = path2.dirname(directory);
    }
  };
  module2.exports.sync = (name, options = {}) => {
    let directory = path2.resolve(options.cwd || "");
    const { root } = path2.parse(directory);
    const paths = [].concat(name);
    const runMatcher = (locateOptions) => {
      if (typeof name !== "function") {
        return locatePath2.sync(paths, locateOptions);
      }
      const foundPath = name(locateOptions.cwd);
      if (typeof foundPath === "string") {
        return locatePath2.sync([foundPath], locateOptions);
      }
      return foundPath;
    };
    while (true) {
      const foundPath = runMatcher({ ...options, cwd: directory });
      if (foundPath === stop) {
        return;
      }
      if (foundPath) {
        return path2.resolve(directory, foundPath);
      }
      if (directory === root) {
        return;
      }
      directory = path2.dirname(directory);
    }
  };
  module2.exports.exists = pathExists2;
  module2.exports.sync.exists = pathExists2.sync;
  module2.exports.stop = stop;
})(findUp);
var loadYamlFile = { exports: {} };
var constants = require$$0__default$7.default;
var origCwd = process.cwd;
var cwd = null;
var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process);
  return cwd;
};
try {
  process.cwd();
} catch (er) {
}
if (typeof process.chdir === "function") {
  var chdir = process.chdir;
  process.chdir = function(d) {
    cwd = null;
    chdir.call(process, d);
  };
  if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
}
var polyfills$1 = patch$1;
function patch$1(fs2) {
  if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs2);
  }
  if (!fs2.lutimes) {
    patchLutimes(fs2);
  }
  fs2.chown = chownFix(fs2.chown);
  fs2.fchown = chownFix(fs2.fchown);
  fs2.lchown = chownFix(fs2.lchown);
  fs2.chmod = chmodFix(fs2.chmod);
  fs2.fchmod = chmodFix(fs2.fchmod);
  fs2.lchmod = chmodFix(fs2.lchmod);
  fs2.chownSync = chownFixSync(fs2.chownSync);
  fs2.fchownSync = chownFixSync(fs2.fchownSync);
  fs2.lchownSync = chownFixSync(fs2.lchownSync);
  fs2.chmodSync = chmodFixSync(fs2.chmodSync);
  fs2.fchmodSync = chmodFixSync(fs2.fchmodSync);
  fs2.lchmodSync = chmodFixSync(fs2.lchmodSync);
  fs2.stat = statFix(fs2.stat);
  fs2.fstat = statFix(fs2.fstat);
  fs2.lstat = statFix(fs2.lstat);
  fs2.statSync = statFixSync(fs2.statSync);
  fs2.fstatSync = statFixSync(fs2.fstatSync);
  fs2.lstatSync = statFixSync(fs2.lstatSync);
  if (fs2.chmod && !fs2.lchmod) {
    fs2.lchmod = function(path2, mode2, cb) {
      if (cb) process.nextTick(cb);
    };
    fs2.lchmodSync = function() {
    };
  }
  if (fs2.chown && !fs2.lchown) {
    fs2.lchown = function(path2, uid, gid, cb) {
      if (cb) process.nextTick(cb);
    };
    fs2.lchownSync = function() {
    };
  }
  if (platform === "win32") {
    fs2.rename = typeof fs2.rename !== "function" ? fs2.rename : function(fs$rename) {
      function rename(from, to, cb) {
        var start = Date.now();
        var backoff = 0;
        fs$rename(from, to, function CB(er) {
          if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
            setTimeout(function() {
              fs2.stat(to, function(stater, st) {
                if (stater && stater.code === "ENOENT")
                  fs$rename(from, to, CB);
                else
                  cb(er);
              });
            }, backoff);
            if (backoff < 100)
              backoff += 10;
            return;
          }
          if (cb) cb(er);
        });
      }
      if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
      return rename;
    }(fs2.rename);
  }
  fs2.read = typeof fs2.read !== "function" ? fs2.read : function(fs$read) {
    function read(fd, buffer, offset, length, position, callback_) {
      var callback;
      if (callback_ && typeof callback_ === "function") {
        var eagCounter = 0;
        callback = function(er, _, __) {
          if (er && er.code === "EAGAIN" && eagCounter < 10) {
            eagCounter++;
            return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
          }
          callback_.apply(this, arguments);
        };
      }
      return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
    }
    if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
    return read;
  }(fs2.read);
  fs2.readSync = typeof fs2.readSync !== "function" ? fs2.readSync : /* @__PURE__ */ function(fs$readSync) {
    return function(fd, buffer, offset, length, position) {
      var eagCounter = 0;
      while (true) {
        try {
          return fs$readSync.call(fs2, fd, buffer, offset, length, position);
        } catch (er) {
          if (er.code === "EAGAIN" && eagCounter < 10) {
            eagCounter++;
            continue;
          }
          throw er;
        }
      }
    };
  }(fs2.readSync);
  function patchLchmod(fs3) {
    fs3.lchmod = function(path2, mode2, callback) {
      fs3.open(
        path2,
        constants.O_WRONLY | constants.O_SYMLINK,
        mode2,
        function(err, fd) {
          if (err) {
            if (callback) callback(err);
            return;
          }
          fs3.fchmod(fd, mode2, function(err2) {
            fs3.close(fd, function(err22) {
              if (callback) callback(err2 || err22);
            });
          });
        }
      );
    };
    fs3.lchmodSync = function(path2, mode2) {
      var fd = fs3.openSync(path2, constants.O_WRONLY | constants.O_SYMLINK, mode2);
      var threw = true;
      var ret;
      try {
        ret = fs3.fchmodSync(fd, mode2);
        threw = false;
      } finally {
        if (threw) {
          try {
            fs3.closeSync(fd);
          } catch (er) {
          }
        } else {
          fs3.closeSync(fd);
        }
      }
      return ret;
    };
  }
  function patchLutimes(fs3) {
    if (constants.hasOwnProperty("O_SYMLINK") && fs3.futimes) {
      fs3.lutimes = function(path2, at, mt, cb) {
        fs3.open(path2, constants.O_SYMLINK, function(er, fd) {
          if (er) {
            if (cb) cb(er);
            return;
          }
          fs3.futimes(fd, at, mt, function(er2) {
            fs3.close(fd, function(er22) {
              if (cb) cb(er2 || er22);
            });
          });
        });
      };
      fs3.lutimesSync = function(path2, at, mt) {
        var fd = fs3.openSync(path2, constants.O_SYMLINK);
        var ret;
        var threw = true;
        try {
          ret = fs3.futimesSync(fd, at, mt);
          threw = false;
        } finally {
          if (threw) {
            try {
              fs3.closeSync(fd);
            } catch (er) {
            }
          } else {
            fs3.closeSync(fd);
          }
        }
        return ret;
      };
    } else if (fs3.futimes) {
      fs3.lutimes = function(_a, _b, _c, cb) {
        if (cb) process.nextTick(cb);
      };
      fs3.lutimesSync = function() {
      };
    }
  }
  function chmodFix(orig) {
    if (!orig) return orig;
    return function(target, mode2, cb) {
      return orig.call(fs2, target, mode2, function(er) {
        if (chownErOk(er)) er = null;
        if (cb) cb.apply(this, arguments);
      });
    };
  }
  function chmodFixSync(orig) {
    if (!orig) return orig;
    return function(target, mode2) {
      try {
        return orig.call(fs2, target, mode2);
      } catch (er) {
        if (!chownErOk(er)) throw er;
      }
    };
  }
  function chownFix(orig) {
    if (!orig) return orig;
    return function(target, uid, gid, cb) {
      return orig.call(fs2, target, uid, gid, function(er) {
        if (chownErOk(er)) er = null;
        if (cb) cb.apply(this, arguments);
      });
    };
  }
  function chownFixSync(orig) {
    if (!orig) return orig;
    return function(target, uid, gid) {
      try {
        return orig.call(fs2, target, uid, gid);
      } catch (er) {
        if (!chownErOk(er)) throw er;
      }
    };
  }
  function statFix(orig) {
    if (!orig) return orig;
    return function(target, options, cb) {
      if (typeof options === "function") {
        cb = options;
        options = null;
      }
      function callback(er, stats) {
        if (stats) {
          if (stats.uid < 0) stats.uid += 4294967296;
          if (stats.gid < 0) stats.gid += 4294967296;
        }
        if (cb) cb.apply(this, arguments);
      }
      return options ? orig.call(fs2, target, options, callback) : orig.call(fs2, target, callback);
    };
  }
  function statFixSync(orig) {
    if (!orig) return orig;
    return function(target, options) {
      var stats = options ? orig.call(fs2, target, options) : orig.call(fs2, target);
      if (stats) {
        if (stats.uid < 0) stats.uid += 4294967296;
        if (stats.gid < 0) stats.gid += 4294967296;
      }
      return stats;
    };
  }
  function chownErOk(er) {
    if (!er)
      return true;
    if (er.code === "ENOSYS")
      return true;
    var nonroot = !process.getuid || process.getuid() !== 0;
    if (nonroot) {
      if (er.code === "EINVAL" || er.code === "EPERM")
        return true;
    }
    return false;
  }
}
var Stream = require$$0__default$5.default.Stream;
var legacyStreams = legacy$1;
function legacy$1(fs2) {
  return {
    ReadStream,
    WriteStream
  };
  function ReadStream(path2, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path2, options);
    Stream.call(this);
    var self2 = this;
    this.path = path2;
    this.fd = null;
    this.readable = true;
    this.paused = false;
    this.flags = "r";
    this.mode = 438;
    this.bufferSize = 64 * 1024;
    options = options || {};
    var keys = Object.keys(options);
    for (var index2 = 0, length = keys.length; index2 < length; index2++) {
      var key = keys[index2];
      this[key] = options[key];
    }
    if (this.encoding) this.setEncoding(this.encoding);
    if (this.start !== void 0) {
      if ("number" !== typeof this.start) {
        throw TypeError("start must be a Number");
      }
      if (this.end === void 0) {
        this.end = Infinity;
      } else if ("number" !== typeof this.end) {
        throw TypeError("end must be a Number");
      }
      if (this.start > this.end) {
        throw new Error("start must be <= end");
      }
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        self2._read();
      });
      return;
    }
    fs2.open(this.path, this.flags, this.mode, function(err, fd) {
      if (err) {
        self2.emit("error", err);
        self2.readable = false;
        return;
      }
      self2.fd = fd;
      self2.emit("open", fd);
      self2._read();
    });
  }
  function WriteStream(path2, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path2, options);
    Stream.call(this);
    this.path = path2;
    this.fd = null;
    this.writable = true;
    this.flags = "w";
    this.encoding = "binary";
    this.mode = 438;
    this.bytesWritten = 0;
    options = options || {};
    var keys = Object.keys(options);
    for (var index2 = 0, length = keys.length; index2 < length; index2++) {
      var key = keys[index2];
      this[key] = options[key];
    }
    if (this.start !== void 0) {
      if ("number" !== typeof this.start) {
        throw TypeError("start must be a Number");
      }
      if (this.start < 0) {
        throw new Error("start must be >= zero");
      }
      this.pos = this.start;
    }
    this.busy = false;
    this._queue = [];
    if (this.fd === null) {
      this._open = fs2.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
      this.flush();
    }
  }
}
var clone_1 = clone$1;
var getPrototypeOf = Object.getPrototypeOf || function(obj) {
  return obj.__proto__;
};
function clone$1(obj) {
  if (obj === null || typeof obj !== "object")
    return obj;
  if (obj instanceof Object)
    var copy = { __proto__: getPrototypeOf(obj) };
  else
    var copy = /* @__PURE__ */ Object.create(null);
  Object.getOwnPropertyNames(obj).forEach(function(key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
  });
  return copy;
}
var fs$1 = require$$0__default$2.default;
var polyfills = polyfills$1;
var legacy = legacyStreams;
var clone = clone_1;
var util = require$$2__default$1.default;
var gracefulQueue;
var previousSymbol;
if (typeof Symbol === "function" && typeof Symbol.for === "function") {
  gracefulQueue = Symbol.for("graceful-fs.queue");
  previousSymbol = Symbol.for("graceful-fs.previous");
} else {
  gracefulQueue = "___graceful-fs.queue";
  previousSymbol = "___graceful-fs.previous";
}
function noop() {
}
function publishQueue(context, queue) {
  Object.defineProperty(context, gracefulQueue, {
    get: function() {
      return queue;
    }
  });
}
var debug = noop;
if (util.debuglog)
  debug = util.debuglog("gfs4");
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
  debug = function() {
    var m = util.format.apply(util, arguments);
    m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
    console.error(m);
  };
if (!fs$1[gracefulQueue]) {
  var queue = commonjsGlobal[gracefulQueue] || [];
  publishQueue(fs$1, queue);
  fs$1.close = function(fs$close) {
    function close(fd, cb) {
      return fs$close.call(fs$1, fd, function(err) {
        if (!err) {
          resetQueue();
        }
        if (typeof cb === "function")
          cb.apply(this, arguments);
      });
    }
    Object.defineProperty(close, previousSymbol, {
      value: fs$close
    });
    return close;
  }(fs$1.close);
  fs$1.closeSync = function(fs$closeSync) {
    function closeSync(fd) {
      fs$closeSync.apply(fs$1, arguments);
      resetQueue();
    }
    Object.defineProperty(closeSync, previousSymbol, {
      value: fs$closeSync
    });
    return closeSync;
  }(fs$1.closeSync);
  if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
    process.on("exit", function() {
      debug(fs$1[gracefulQueue]);
      require$$0__default$4.default.equal(fs$1[gracefulQueue].length, 0);
    });
  }
}
if (!commonjsGlobal[gracefulQueue]) {
  publishQueue(commonjsGlobal, fs$1[gracefulQueue]);
}
var gracefulFs = patch(clone(fs$1));
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs$1.__patched) {
  gracefulFs = patch(fs$1);
  fs$1.__patched = true;
}
function patch(fs2) {
  polyfills(fs2);
  fs2.gracefulify = patch;
  fs2.createReadStream = createReadStream;
  fs2.createWriteStream = createWriteStream;
  var fs$readFile = fs2.readFile;
  fs2.readFile = readFile;
  function readFile(path2, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    return go$readFile(path2, options, cb);
    function go$readFile(path3, options2, cb2, startTime) {
      return fs$readFile(path3, options2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$readFile, [path3, options2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$writeFile = fs2.writeFile;
  fs2.writeFile = writeFile;
  function writeFile(path2, data, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    return go$writeFile(path2, data, options, cb);
    function go$writeFile(path3, data2, options2, cb2, startTime) {
      return fs$writeFile(path3, data2, options2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$writeFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$appendFile = fs2.appendFile;
  if (fs$appendFile)
    fs2.appendFile = appendFile;
  function appendFile(path2, data, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    return go$appendFile(path2, data, options, cb);
    function go$appendFile(path3, data2, options2, cb2, startTime) {
      return fs$appendFile(path3, data2, options2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$appendFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$copyFile = fs2.copyFile;
  if (fs$copyFile)
    fs2.copyFile = copyFile;
  function copyFile(src, dest, flags, cb) {
    if (typeof flags === "function") {
      cb = flags;
      flags = 0;
    }
    return go$copyFile(src, dest, flags, cb);
    function go$copyFile(src2, dest2, flags2, cb2, startTime) {
      return fs$copyFile(src2, dest2, flags2, function(err) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  var fs$readdir = fs2.readdir;
  fs2.readdir = readdir;
  var noReaddirOptionVersions = /^v[0-5]\./;
  function readdir(path2, options, cb) {
    if (typeof options === "function")
      cb = options, options = null;
    var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path3, options2, cb2, startTime) {
      return fs$readdir(path3, fs$readdirCallback(
        path3,
        options2,
        cb2,
        startTime
      ));
    } : function go$readdir2(path3, options2, cb2, startTime) {
      return fs$readdir(path3, options2, fs$readdirCallback(
        path3,
        options2,
        cb2,
        startTime
      ));
    };
    return go$readdir(path2, options, cb);
    function fs$readdirCallback(path3, options2, cb2, startTime) {
      return function(err, files) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([
            go$readdir,
            [path3, options2, cb2],
            err,
            startTime || Date.now(),
            Date.now()
          ]);
        else {
          if (files && files.sort)
            files.sort();
          if (typeof cb2 === "function")
            cb2.call(this, err, files);
        }
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var legStreams = legacy(fs2);
    ReadStream = legStreams.ReadStream;
    WriteStream = legStreams.WriteStream;
  }
  var fs$ReadStream = fs2.ReadStream;
  if (fs$ReadStream) {
    ReadStream.prototype = Object.create(fs$ReadStream.prototype);
    ReadStream.prototype.open = ReadStream$open;
  }
  var fs$WriteStream = fs2.WriteStream;
  if (fs$WriteStream) {
    WriteStream.prototype = Object.create(fs$WriteStream.prototype);
    WriteStream.prototype.open = WriteStream$open;
  }
  Object.defineProperty(fs2, "ReadStream", {
    get: function() {
      return ReadStream;
    },
    set: function(val) {
      ReadStream = val;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(fs2, "WriteStream", {
    get: function() {
      return WriteStream;
    },
    set: function(val) {
      WriteStream = val;
    },
    enumerable: true,
    configurable: true
  });
  var FileReadStream = ReadStream;
  Object.defineProperty(fs2, "FileReadStream", {
    get: function() {
      return FileReadStream;
    },
    set: function(val) {
      FileReadStream = val;
    },
    enumerable: true,
    configurable: true
  });
  var FileWriteStream = WriteStream;
  Object.defineProperty(fs2, "FileWriteStream", {
    get: function() {
      return FileWriteStream;
    },
    set: function(val) {
      FileWriteStream = val;
    },
    enumerable: true,
    configurable: true
  });
  function ReadStream(path2, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this;
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
  }
  function ReadStream$open() {
    var that = this;
    open(that.path, that.flags, that.mode, function(err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy();
        that.emit("error", err);
      } else {
        that.fd = fd;
        that.emit("open", fd);
        that.read();
      }
    });
  }
  function WriteStream(path2, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this;
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
  }
  function WriteStream$open() {
    var that = this;
    open(that.path, that.flags, that.mode, function(err, fd) {
      if (err) {
        that.destroy();
        that.emit("error", err);
      } else {
        that.fd = fd;
        that.emit("open", fd);
      }
    });
  }
  function createReadStream(path2, options) {
    return new fs2.ReadStream(path2, options);
  }
  function createWriteStream(path2, options) {
    return new fs2.WriteStream(path2, options);
  }
  var fs$open = fs2.open;
  fs2.open = open;
  function open(path2, flags, mode2, cb) {
    if (typeof mode2 === "function")
      cb = mode2, mode2 = null;
    return go$open(path2, flags, mode2, cb);
    function go$open(path3, flags2, mode3, cb2, startTime) {
      return fs$open(path3, flags2, mode3, function(err, fd) {
        if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
          enqueue([go$open, [path3, flags2, mode3, cb2], err, startTime || Date.now(), Date.now()]);
        else {
          if (typeof cb2 === "function")
            cb2.apply(this, arguments);
        }
      });
    }
  }
  return fs2;
}
function enqueue(elem) {
  debug("ENQUEUE", elem[0].name, elem[1]);
  fs$1[gracefulQueue].push(elem);
  retry();
}
var retryTimer;
function resetQueue() {
  var now = Date.now();
  for (var i = 0; i < fs$1[gracefulQueue].length; ++i) {
    if (fs$1[gracefulQueue][i].length > 2) {
      fs$1[gracefulQueue][i][3] = now;
      fs$1[gracefulQueue][i][4] = now;
    }
  }
  retry();
}
function retry() {
  clearTimeout(retryTimer);
  retryTimer = void 0;
  if (fs$1[gracefulQueue].length === 0)
    return;
  var elem = fs$1[gracefulQueue].shift();
  var fn = elem[0];
  var args = elem[1];
  var err = elem[2];
  var startTime = elem[3];
  var lastTime = elem[4];
  if (startTime === void 0) {
    debug("RETRY", fn.name, args);
    fn.apply(null, args);
  } else if (Date.now() - startTime >= 6e4) {
    debug("TIMEOUT", fn.name, args);
    var cb = args.pop();
    if (typeof cb === "function")
      cb.call(null, err);
  } else {
    var sinceAttempt = Date.now() - lastTime;
    var sinceStart = Math.max(lastTime - startTime, 1);
    var desiredDelay = Math.min(sinceStart * 1.2, 100);
    if (sinceAttempt >= desiredDelay) {
      debug("RETRY", fn.name, args);
      fn.apply(null, args.concat([startTime]));
    } else {
      fs$1[gracefulQueue].push(elem);
    }
  }
  if (retryTimer === void 0) {
    retryTimer = setTimeout(retry, 0);
  }
}
const processFn = (fn, options) => function(...args) {
  const P = options.promiseModule;
  return new P((resolve, reject) => {
    if (options.multiArgs) {
      args.push((...result) => {
        if (options.errorFirst) {
          if (result[0]) {
            reject(result);
          } else {
            result.shift();
            resolve(result);
          }
        } else {
          resolve(result);
        }
      });
    } else if (options.errorFirst) {
      args.push((error2, result) => {
        if (error2) {
          reject(error2);
        } else {
          resolve(result);
        }
      });
    } else {
      args.push(resolve);
    }
    fn.apply(this, args);
  });
};
var pify$1 = (input, options) => {
  options = Object.assign({
    exclude: [/.+(Sync|Stream)$/],
    errorFirst: true,
    promiseModule: Promise
  }, options);
  const objType = typeof input;
  if (!(input !== null && (objType === "object" || objType === "function"))) {
    throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? "null" : objType}\``);
  }
  const filter = (key) => {
    const match = (pattern) => typeof pattern === "string" ? key === pattern : pattern.test(key);
    return options.include ? options.include.some(match) : !options.exclude.some(match);
  };
  let ret;
  if (objType === "function") {
    ret = function(...args) {
      return options.excludeMain ? input(...args) : processFn(input, options).apply(this, args);
    };
  } else {
    ret = Object.create(Object.getPrototypeOf(input));
  }
  for (const key in input) {
    const property = input[key];
    ret[key] = typeof property === "function" && filter(key) ? processFn(property, options) : property;
  }
  return ret;
};
var stripBom$1 = (x) => {
  if (typeof x !== "string") {
    throw new TypeError("Expected a string, got " + typeof x);
  }
  if (x.charCodeAt(0) === 65279) {
    return x.slice(1);
  }
  return x;
};
var jsYaml$1 = {};
var loader$1 = {};
var common$6 = {};
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];
  return [sequence];
}
function extend(target, source) {
  var index2, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index2 = 0, length = sourceKeys.length; index2 < length; index2 += 1) {
      key = sourceKeys[index2];
      target[key] = source[key];
    }
  }
  return target;
}
function repeat(string2, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string2;
  }
  return result;
}
function isNegativeZero(number2) {
  return number2 === 0 && Number.NEGATIVE_INFINITY === 1 / number2;
}
common$6.isNothing = isNothing;
common$6.isObject = isObject;
common$6.toArray = toArray;
common$6.repeat = repeat;
common$6.isNegativeZero = isNegativeZero;
common$6.extend = extend;
function YAMLException$4(reason, mark2) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark2;
  this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
YAMLException$4.prototype = Object.create(Error.prototype);
YAMLException$4.prototype.constructor = YAMLException$4;
YAMLException$4.prototype.toString = function toString(compact) {
  var result = this.name + ": ";
  result += this.reason || "(unknown reason)";
  if (!compact && this.mark) {
    result += " " + this.mark.toString();
  }
  return result;
};
var exception = YAMLException$4;
var common$5 = common$6;
function Mark$1(name, buffer, position, line, column) {
  this.name = name;
  this.buffer = buffer;
  this.position = position;
  this.line = line;
  this.column = column;
}
Mark$1.prototype.getSnippet = function getSnippet(indent, maxLength) {
  var head, start, tail, end, snippet;
  if (!this.buffer) return null;
  indent = indent || 4;
  maxLength = maxLength || 75;
  head = "";
  start = this.position;
  while (start > 0 && "\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
    start -= 1;
    if (this.position - start > maxLength / 2 - 1) {
      head = " ... ";
      start += 5;
      break;
    }
  }
  tail = "";
  end = this.position;
  while (end < this.buffer.length && "\0\r\n\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
    end += 1;
    if (end - this.position > maxLength / 2 - 1) {
      tail = " ... ";
      end -= 5;
      break;
    }
  }
  snippet = this.buffer.slice(start, end);
  return common$5.repeat(" ", indent) + head + snippet + tail + "\n" + common$5.repeat(" ", indent + this.position - start + head.length) + "^";
};
Mark$1.prototype.toString = function toString2(compact) {
  var snippet, where = "";
  if (this.name) {
    where += 'in "' + this.name + '" ';
  }
  where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
  if (!compact) {
    snippet = this.getSnippet();
    if (snippet) {
      where += ":\n" + snippet;
    }
  }
  return where;
};
var mark = Mark$1;
var YAMLException$3 = exception;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$h(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new YAMLException$3('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new YAMLException$3('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
var type = Type$h;
var common$4 = common$6;
var YAMLException$2 = exception;
var Type$g = type;
function compileList(schema2, name, result) {
  var exclude = [];
  schema2.include.forEach(function(includedSchema) {
    result = compileList(includedSchema, name, result);
  });
  schema2[name].forEach(function(currentType) {
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
        exclude.push(previousIndex);
      }
    });
    result.push(currentType);
  });
  return result.filter(function(type2, index2) {
    return exclude.indexOf(index2) === -1;
  });
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {}
  }, index2, length;
  function collectType(type2) {
    result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
  }
  for (index2 = 0, length = arguments.length; index2 < length; index2 += 1) {
    arguments[index2].forEach(collectType);
  }
  return result;
}
function Schema$5(definition) {
  this.include = definition.include || [];
  this.implicit = definition.implicit || [];
  this.explicit = definition.explicit || [];
  this.implicit.forEach(function(type2) {
    if (type2.loadKind && type2.loadKind !== "scalar") {
      throw new YAMLException$2("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
  });
  this.compiledImplicit = compileList(this, "implicit", []);
  this.compiledExplicit = compileList(this, "explicit", []);
  this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
}
Schema$5.DEFAULT = null;
Schema$5.create = function createSchema() {
  var schemas, types;
  switch (arguments.length) {
    case 1:
      schemas = Schema$5.DEFAULT;
      types = arguments[0];
      break;
    case 2:
      schemas = arguments[0];
      types = arguments[1];
      break;
    default:
      throw new YAMLException$2("Wrong number of arguments for Schema.create function");
  }
  schemas = common$4.toArray(schemas);
  types = common$4.toArray(types);
  if (!schemas.every(function(schema2) {
    return schema2 instanceof Schema$5;
  })) {
    throw new YAMLException$2("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
  }
  if (!types.every(function(type2) {
    return type2 instanceof Type$g;
  })) {
    throw new YAMLException$2("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  }
  return new Schema$5({
    include: schemas,
    explicit: types
  });
};
var schema = Schema$5;
var Type$f = type;
var str = new Type$f("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var Type$e = type;
var seq = new Type$e("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var Type$d = type;
var map = new Type$d("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var Schema$4 = schema;
var failsafe = new Schema$4({
  explicit: [
    str,
    seq,
    map
  ]
});
var Type$c = type;
function resolveYamlNull(data) {
  if (data === null) return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object2) {
  return object2 === null;
}
var _null = new Type$c("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    }
  },
  defaultStyle: "lowercase"
});
var Type$b = type;
function resolveYamlBoolean(data) {
  if (data === null) return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object2) {
  return Object.prototype.toString.call(object2) === "[object Boolean]";
}
var bool = new Type$b("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function(object2) {
      return object2 ? "true" : "false";
    },
    uppercase: function(object2) {
      return object2 ? "TRUE" : "FALSE";
    },
    camelcase: function(object2) {
      return object2 ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
var common$3 = common$6;
var Type$a = type;
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null) return false;
  var max = data.length, index2 = 0, hasDigits = false, ch;
  if (!max) return false;
  ch = data[index2];
  if (ch === "-" || ch === "+") {
    ch = data[++index2];
  }
  if (ch === "0") {
    if (index2 + 1 === max) return true;
    ch = data[++index2];
    if (ch === "b") {
      index2++;
      for (; index2 < max; index2++) {
        ch = data[index2];
        if (ch === "_") continue;
        if (ch !== "0" && ch !== "1") return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index2++;
      for (; index2 < max; index2++) {
        ch = data[index2];
        if (ch === "_") continue;
        if (!isHexCode(data.charCodeAt(index2))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    for (; index2 < max; index2++) {
      ch = data[index2];
      if (ch === "_") continue;
      if (!isOctCode(data.charCodeAt(index2))) return false;
      hasDigits = true;
    }
    return hasDigits && ch !== "_";
  }
  if (ch === "_") return false;
  for (; index2 < max; index2++) {
    ch = data[index2];
    if (ch === "_") continue;
    if (ch === ":") break;
    if (!isDecCode(data.charCodeAt(index2))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_") return false;
  if (ch !== ":") return true;
  return /^(:[0-5]?[0-9])+$/.test(data.slice(index2));
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch, base, digits = [];
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-") sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0") return 0;
  if (ch === "0") {
    if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x") return sign * parseInt(value, 16);
    return sign * parseInt(value, 8);
  }
  if (value.indexOf(":") !== -1) {
    value.split(":").forEach(function(v) {
      digits.unshift(parseInt(v, 10));
    });
    value = 0;
    base = 1;
    digits.forEach(function(d) {
      value += d * base;
      base *= 60;
    });
    return sign * value;
  }
  return sign * parseInt(value, 10);
}
function isInteger(object2) {
  return Object.prototype.toString.call(object2) === "[object Number]" && (object2 % 1 === 0 && !common$3.isNegativeZero(object2));
}
var int = new Type$a("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var common$2 = common$6;
var Type$9 = type;
var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function resolveYamlFloat(data) {
  if (data === null) return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign, base, digits;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  digits = [];
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  } else if (value.indexOf(":") >= 0) {
    value.split(":").forEach(function(v) {
      digits.unshift(parseFloat(v, 10));
    });
    value = 0;
    base = 1;
    digits.forEach(function(d) {
      value += d * base;
      base *= 60;
    });
    return sign * value;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object2, style) {
  var res;
  if (isNaN(object2)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object2) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object2) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common$2.isNegativeZero(object2)) {
    return "-0.0";
  }
  res = object2.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object2) {
  return Object.prototype.toString.call(object2) === "[object Number]" && (object2 % 1 !== 0 || common$2.isNegativeZero(object2));
}
var float = new Type$9("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var Schema$3 = schema;
var json = new Schema$3({
  include: [
    failsafe
  ],
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var Schema$2 = schema;
var core = new Schema$2({
  include: [
    json
  ]
});
var Type$8 = type;
var YAML_DATE_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
);
var YAML_TIMESTAMP_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date2;
  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null) throw new Error("Date resolve error");
  year = +match[1];
  month = +match[2] - 1;
  day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match[4];
  minute = +match[5];
  second = +match[6];
  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match[9]) {
    tz_hour = +match[10];
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match[9] === "-") delta = -delta;
  }
  date2 = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta) date2.setTime(date2.getTime() - delta);
  return date2;
}
function representYamlTimestamp(object2) {
  return object2.toISOString();
}
var timestamp = new Type$8("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
var Type$7 = type;
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge = new Type$7("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
function commonjsRequire(path2) {
  throw new Error('Could not dynamically require "' + path2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var NodeBuffer;
try {
  var _require$1 = commonjsRequire;
  NodeBuffer = _require$1("buffer").Buffer;
} catch (__) {
}
var Type$6 = type;
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null) return false;
  var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64) continue;
    if (code < 0) return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  if (NodeBuffer) {
    return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
  }
  return result;
}
function representYamlBinary(object2) {
  var result = "", bits = 0, idx, tail, max = object2.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object2[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(object2) {
  return NodeBuffer && NodeBuffer.isBuffer(object2);
}
var binary = new Type$6("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var Type$5 = type;
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null) return true;
  var objectKeys = [], index2, length, pair, pairKey, pairHasKey, object2 = data;
  for (index2 = 0, length = object2.length; index2 < length; index2 += 1) {
    pair = object2[index2];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]") return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }
    if (!pairHasKey) return false;
    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new Type$5("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var Type$4 = type;
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null) return true;
  var index2, length, pair, keys, result, object2 = data;
  result = new Array(object2.length);
  for (index2 = 0, length = object2.length; index2 < length; index2 += 1) {
    pair = object2[index2];
    if (_toString$1.call(pair) !== "[object Object]") return false;
    keys = Object.keys(pair);
    if (keys.length !== 1) return false;
    result[index2] = [keys[0], pair[keys[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null) return [];
  var index2, length, pair, keys, result, object2 = data;
  result = new Array(object2.length);
  for (index2 = 0, length = object2.length; index2 < length; index2 += 1) {
    pair = object2[index2];
    keys = Object.keys(pair);
    result[index2] = [keys[0], pair[keys[0]]];
  }
  return result;
}
var pairs = new Type$4("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var Type$3 = type;
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null) return true;
  var key, object2 = data;
  for (key in object2) {
    if (_hasOwnProperty$2.call(object2, key)) {
      if (object2[key] !== null) return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new Type$3("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var Schema$1 = schema;
var default_safe = new Schema$1({
  include: [
    core
  ],
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var Type$2 = type;
function resolveJavascriptUndefined() {
  return true;
}
function constructJavascriptUndefined() {
  return void 0;
}
function representJavascriptUndefined() {
  return "";
}
function isUndefined(object2) {
  return typeof object2 === "undefined";
}
var _undefined = new Type$2("tag:yaml.org,2002:js/undefined", {
  kind: "scalar",
  resolve: resolveJavascriptUndefined,
  construct: constructJavascriptUndefined,
  predicate: isUndefined,
  represent: representJavascriptUndefined
});
var Type$1 = type;
function resolveJavascriptRegExp(data) {
  if (data === null) return false;
  if (data.length === 0) return false;
  var regexp2 = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
  if (regexp2[0] === "/") {
    if (tail) modifiers = tail[1];
    if (modifiers.length > 3) return false;
    if (regexp2[regexp2.length - modifiers.length - 1] !== "/") return false;
  }
  return true;
}
function constructJavascriptRegExp(data) {
  var regexp2 = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
  if (regexp2[0] === "/") {
    if (tail) modifiers = tail[1];
    regexp2 = regexp2.slice(1, regexp2.length - modifiers.length - 1);
  }
  return new RegExp(regexp2, modifiers);
}
function representJavascriptRegExp(object2) {
  var result = "/" + object2.source + "/";
  if (object2.global) result += "g";
  if (object2.multiline) result += "m";
  if (object2.ignoreCase) result += "i";
  return result;
}
function isRegExp(object2) {
  return Object.prototype.toString.call(object2) === "[object RegExp]";
}
var regexp = new Type$1("tag:yaml.org,2002:js/regexp", {
  kind: "scalar",
  resolve: resolveJavascriptRegExp,
  construct: constructJavascriptRegExp,
  predicate: isRegExp,
  represent: representJavascriptRegExp
});
var esprima;
try {
  var _require = commonjsRequire;
  esprima = _require("esprima");
} catch (_) {
  if (typeof window !== "undefined") esprima = window.esprima;
}
var Type = type;
function resolveJavascriptFunction(data) {
  if (data === null) return false;
  try {
    var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
    if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
function constructJavascriptFunction(data) {
  var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
  if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
    throw new Error("Failed to resolve function");
  }
  ast.body[0].expression.params.forEach(function(param) {
    params.push(param.name);
  });
  body = ast.body[0].expression.body.range;
  if (ast.body[0].expression.body.type === "BlockStatement") {
    return new Function(params, source.slice(body[0] + 1, body[1] - 1));
  }
  return new Function(params, "return " + source.slice(body[0], body[1]));
}
function representJavascriptFunction(object2) {
  return object2.toString();
}
function isFunction(object2) {
  return Object.prototype.toString.call(object2) === "[object Function]";
}
var _function = new Type("tag:yaml.org,2002:js/function", {
  kind: "scalar",
  resolve: resolveJavascriptFunction,
  construct: constructJavascriptFunction,
  predicate: isFunction,
  represent: representJavascriptFunction
});
var Schema = schema;
var default_full = Schema.DEFAULT = new Schema({
  include: [
    default_safe
  ],
  explicit: [
    _undefined,
    regexp,
    _function
  ]
});
var common$1 = common$6;
var YAMLException$1 = exception;
var Mark = mark;
var DEFAULT_SAFE_SCHEMA$1 = default_safe;
var DEFAULT_FULL_SCHEMA$1 = default_full;
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
  return c === 10 || c === 13;
}
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "" : c === 95 ? " " : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode(
    (c - 65536 >> 10) + 55296,
    (c - 65536 & 1023) + 56320
  );
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || DEFAULT_FULL_SCHEMA$1;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.documents = [];
}
function generateError(state, message) {
  return new YAMLException$1(
    message,
    new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart)
  );
}
function throwError(state, message) {
  throw generateError(state, message);
}
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
var directiveHandlers = {
  YAML: function handleYamlDirective(state, name, args) {
    var match, major, minor;
    if (state.version !== null) {
      throwError(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError(state, "YAML directive accepts exactly one argument");
    }
    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match === null) {
      throwError(state, "ill-formed argument of the YAML directive");
    }
    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);
    if (major !== 1) {
      throwError(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      throwWarning(state, "unsupported YAML version of the document");
    }
  },
  TAG: function handleTagDirective(state, name, args) {
    var handle, prefix;
    if (args.length !== 2) {
      throwError(state, "TAG directive accepts exactly two arguments");
    }
    handle = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    state.tagMap[handle] = prefix;
  }
};
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index2, quantity;
  if (!common$1.isObject(source)) {
    throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index2 = 0, quantity = sourceKeys.length; index2 < quantity; index2 += 1) {
    key = sourceKeys[index2];
    if (!_hasOwnProperty$1.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
  var index2, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index2 = 0, quantity = keyNode.length; index2 < quantity; index2 += 1) {
      if (Array.isArray(keyNode[index2])) {
        throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index2]) === "[object Object]") {
        keyNode[index2] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index2 = 0, quantity = valueNode.length; index2 < quantity; index2 += 1) {
        mergeMappings(state, _result, valueNode[index2], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.position = startPos || state.position;
      throwError(state, "duplicated mapping key");
    }
    _result[keyNode] = valueNode;
    delete overridableKeys[keyNode];
  }
  return _result;
}
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += common$1.repeat("\n", count - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = _kind;
  state.result = _result;
  return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(++state.position);
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, "missed comma between flow collection entries");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common$1.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common$1.repeat("\n", emptyLines);
      }
    } else {
      state.result += common$1.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    _pos = state.position;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    } else {
      break;
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if (state.lineIndent > nodeIndent && ch !== 0) {
      throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33) return false;
  if (state.tag !== null) {
    throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, "tag name cannot contain such characters: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38) return false;
  if (state.anchor !== null) {
    throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42) return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag !== null && state.tag !== "!") {
    if (state.tag === "?") {
      if (state.result !== null && state.kind !== "scalar") {
        throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
      }
      for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type2 = state.implicitTypes[typeIndex];
        if (type2.resolve(state.result)) {
          state.result = type2.construct(state.result);
          state.tag = type2.tag;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
          break;
        }
      }
    } else if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
      if (state.result !== null && type2.kind !== state.kind) {
        throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
      }
      if (!type2.resolve(state.result)) {
        throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
      } else {
        state.result = type2.construct(state.result);
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else {
      throwError(state, "unknown tag !<" + state.tag + ">");
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = {};
  state.anchorMap = {};
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch)) break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0) readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function loadAll(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index2 = 0, length = documents.length; index2 < length; index2 += 1) {
    iterator(documents[index2]);
  }
}
function load(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new YAMLException$1("expected a single document in the stream, but found more");
}
function safeLoadAll(input, iterator, options) {
  if (typeof iterator === "object" && iterator !== null && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  return loadAll(input, iterator, common$1.extend({ schema: DEFAULT_SAFE_SCHEMA$1 }, options));
}
function safeLoad(input, options) {
  return load(input, common$1.extend({ schema: DEFAULT_SAFE_SCHEMA$1 }, options));
}
loader$1.loadAll = loadAll;
loader$1.load = load;
loader$1.safeLoadAll = safeLoadAll;
loader$1.safeLoad = safeLoad;
var dumper$1 = {};
var common = common$6;
var YAMLException = exception;
var DEFAULT_FULL_SCHEMA = default_full;
var DEFAULT_SAFE_SCHEMA = default_safe;
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
function compileStyleMap(schema2, map2) {
  var result, keys, index2, length, tag, style, type2;
  if (map2 === null) return {};
  result = {};
  keys = Object.keys(map2);
  for (index2 = 0, length = keys.length; index2 < length; index2 += 1) {
    tag = keys[index2];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
function encodeHex(character) {
  var string2, handle, length;
  string2 = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle + common.repeat("0", length - string2.length) + string2;
}
function State(options) {
  this.schema = options["schema"] || DEFAULT_FULL_SCHEMA;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
function indentString(string2, spaces) {
  var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string2.length;
  while (position < length) {
    next = string2.indexOf("\n", position);
    if (next === -1) {
      line = string2.slice(position);
      position = length;
    } else {
      line = string2.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n") result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str2) {
  var index2, length, type2;
  for (index2 = 0, length = state.implicitTypes.length; index2 < length; index2 += 1) {
    type2 = state.implicitTypes[index2];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
}
function isNsChar(c) {
  return isPrintable(c) && !isWhitespace(c) && c !== 65279 && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
function isPlainSafe(c, prev) {
  return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function needIndentIndicator(string2) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string2);
}
var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
function chooseScalarStyle(string2, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
  var i;
  var char, prev_char;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(string2.charCodeAt(0)) && !isWhitespace(string2.charCodeAt(string2.length - 1));
  if (singleLineOnly) {
    for (i = 0; i < string2.length; i++) {
      char = string2.charCodeAt(i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      prev_char = i > 0 ? string2.charCodeAt(i - 1) : null;
      plain = plain && isPlainSafe(char, prev_char);
    }
  } else {
    for (i = 0; i < string2.length; i++) {
      char = string2.charCodeAt(i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i - previousLineBreak - 1 > lineWidth && string2[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      prev_char = i > 0 ? string2.charCodeAt(i - 1) : null;
      plain = plain && isPlainSafe(char, prev_char);
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string2[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    return plain && !testAmbiguousType(string2) ? STYLE_PLAIN : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string2)) {
    return STYLE_DOUBLE;
  }
  return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
}
function writeScalar(state, string2, level, iskey) {
  state.dump = function() {
    if (string2.length === 0) {
      return "''";
    }
    if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string2) !== -1) {
      return "'" + string2 + "'";
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string3) {
      return testImplicitResolving(state, string3);
    }
    switch (chooseScalarStyle(string2, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
      case STYLE_PLAIN:
        return string2;
      case STYLE_SINGLE:
        return "'" + string2.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string2, state.indent) + dropEndingNewline(indentString(string2, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string2, state.indent) + dropEndingNewline(indentString(foldString(string2, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string2) + '"';
      default:
        throw new YAMLException("impossible error: invalid scalar style");
    }
  }();
}
function blockHeader(string2, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string2) ? String(indentPerLevel) : "";
  var clip = string2[string2.length - 1] === "\n";
  var keep = clip && (string2[string2.length - 2] === "\n" || string2 === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
function dropEndingNewline(string2) {
  return string2[string2.length - 1] === "\n" ? string2.slice(0, -1) : string2;
}
function foldString(string2, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = function() {
    var nextLF = string2.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string2.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string2.slice(0, nextLF), width);
  }();
  var prevMoreIndented = string2[0] === "\n" || string2[0] === " ";
  var moreIndented;
  var match;
  while (match = lineRe.exec(string2)) {
    var prefix = match[1], line = match[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ") return line;
  var breakRe = / [^ ]/g;
  var match;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match = breakRe.exec(line)) {
    next = match.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function escapeString(string2) {
  var result = "";
  var char, nextChar;
  var escapeSeq;
  for (var i = 0; i < string2.length; i++) {
    char = string2.charCodeAt(i);
    if (char >= 55296 && char <= 56319) {
      nextChar = string2.charCodeAt(i + 1);
      if (nextChar >= 56320 && nextChar <= 57343) {
        result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
        i++;
        continue;
      }
    }
    escapeSeq = ESCAPE_SEQUENCES[char];
    result += !escapeSeq && isPrintable(char) ? string2[i] : escapeSeq || encodeHex(char);
  }
  return result;
}
function writeFlowSequence(state, level, object2) {
  var _result = "", _tag = state.tag, index2, length;
  for (index2 = 0, length = object2.length; index2 < length; index2 += 1) {
    if (writeNode(state, level, object2[index2], false, false)) {
      if (index2 !== 0) _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object2, compact) {
  var _result = "", _tag = state.tag, index2, length;
  for (index2 = 0, length = object2.length; index2 < length; index2 += 1) {
    if (writeNode(state, level + 1, object2[index2], true, true)) {
      if (!compact || index2 !== 0) {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object2) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object2), index2, length, objectKey, objectValue, pairBuffer;
  for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
    pairBuffer = "";
    if (index2 !== 0) pairBuffer += ", ";
    if (state.condenseFlow) pairBuffer += '"';
    objectKey = objectKeyList[index2];
    objectValue = object2[objectKey];
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024) pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object2, compact) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object2), index2, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new YAMLException("sortKeys must be a boolean or a function");
  }
  for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
    pairBuffer = "";
    if (!compact || index2 !== 0) {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index2];
    objectValue = object2[objectKey];
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object2, explicit) {
  var _result, typeList, index2, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index2 = 0, length = typeList.length; index2 < length; index2 += 1) {
    type2 = typeList[index2];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object2 === "object" && object2 instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object2))) {
      state.tag = explicit ? type2.tag : "?";
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object2, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object2, style);
        } else {
          throw new YAMLException("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object2, block, compact, iskey) {
  state.tag = null;
  state.dump = object2;
  if (!detectType(state, object2, false)) {
    detectType(state, object2, true);
  }
  var type2 = _toString.call(state.dump);
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object2);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
      if (block && state.dump.length !== 0) {
        writeBlockSequence(state, arrayLevel, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, arrayLevel, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey);
      }
    } else {
      if (state.skipInvalid) return false;
      throw new YAMLException("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      state.dump = "!<" + state.tag + "> " + state.dump;
    }
  }
  return true;
}
function getDuplicateReferences(object2, state) {
  var objects = [], duplicatesIndexes = [], index2, length;
  inspectNode(object2, objects, duplicatesIndexes);
  for (index2 = 0, length = duplicatesIndexes.length; index2 < length; index2 += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index2]]);
  }
  state.usedDuplicates = new Array(length);
}
function inspectNode(object2, objects, duplicatesIndexes) {
  var objectKeyList, index2, length;
  if (object2 !== null && typeof object2 === "object") {
    index2 = objects.indexOf(object2);
    if (index2 !== -1) {
      if (duplicatesIndexes.indexOf(index2) === -1) {
        duplicatesIndexes.push(index2);
      }
    } else {
      objects.push(object2);
      if (Array.isArray(object2)) {
        for (index2 = 0, length = object2.length; index2 < length; index2 += 1) {
          inspectNode(object2[index2], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object2);
        for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
          inspectNode(object2[objectKeyList[index2]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function dump(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs) getDuplicateReferences(input, state);
  if (writeNode(state, 0, input, true, true)) return state.dump + "\n";
  return "";
}
function safeDump(input, options) {
  return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}
dumper$1.dump = dump;
dumper$1.safeDump = safeDump;
var loader = loader$1;
var dumper = dumper$1;
function deprecated(name) {
  return function() {
    throw new Error("Function " + name + " is deprecated and cannot be used.");
  };
}
jsYaml$1.Type = type;
jsYaml$1.Schema = schema;
jsYaml$1.FAILSAFE_SCHEMA = failsafe;
jsYaml$1.JSON_SCHEMA = json;
jsYaml$1.CORE_SCHEMA = core;
jsYaml$1.DEFAULT_SAFE_SCHEMA = default_safe;
jsYaml$1.DEFAULT_FULL_SCHEMA = default_full;
jsYaml$1.load = loader.load;
jsYaml$1.loadAll = loader.loadAll;
jsYaml$1.safeLoad = loader.safeLoad;
jsYaml$1.safeLoadAll = loader.safeLoadAll;
jsYaml$1.dump = dumper.dump;
jsYaml$1.safeDump = dumper.safeDump;
jsYaml$1.YAMLException = exception;
jsYaml$1.MINIMAL_SCHEMA = failsafe;
jsYaml$1.SAFE_SCHEMA = default_safe;
jsYaml$1.DEFAULT_SCHEMA = default_full;
jsYaml$1.scan = deprecated("scan");
jsYaml$1.parse = deprecated("parse");
jsYaml$1.compose = deprecated("compose");
jsYaml$1.addConstructor = deprecated("addConstructor");
var yaml$1 = jsYaml$1;
var jsYaml = yaml$1;
const fs = gracefulFs;
const pify = pify$1;
const stripBom = stripBom$1;
const yaml = jsYaml;
const parse = (data) => yaml.safeLoad(stripBom(data));
loadYamlFile.exports = (fp2) => pify(fs.readFile)(fp2, "utf8").then((data) => parse(data));
loadYamlFile.exports.sync = (fp2) => parse(fs.readFileSync(fp2, "utf8"));
const isCamelCase = (value) => /^[a-z][a-zA-Z0-9]+$/.test(value);
const isKebabCase = (value) => /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(value);
const { toString: toString3 } = Object.prototype;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const symbolToString = typeof Symbol !== "undefined" ? Symbol.prototype.toString : () => "";
const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
function printNumber(val) {
  if (val != +val) return "NaN";
  const isNegativeZero2 = val === 0 && 1 / val < 0;
  return isNegativeZero2 ? "-0" : `${val}`;
}
function printSimpleValue(val, quoteStrings = false) {
  if (val == null || val === true || val === false) return `${val}`;
  if (typeof val === "number") return printNumber(val);
  if (typeof val === "string") return quoteStrings ? `"${val}"` : val;
  if (typeof val === "function") return `[Function ${val.name || "anonymous"}]`;
  if (typeof val === "symbol") return symbolToString.call(val).replace(SYMBOL_REGEXP, "Symbol($1)");
  const tag = toString3.call(val).slice(8, -1);
  if (tag === "Date") {
    const v = val;
    return Number.isNaN(v.getTime()) ? `${v}` : v.toISOString();
  }
  if (tag === "Error" || val instanceof Error) return `[${errorToString.call(val)}]`;
  if (tag === "RegExp") return regExpToString.call(val);
  return null;
}
function printValue(value, quoteStrings) {
  const result = printSimpleValue(value, quoteStrings);
  if (result !== null) return result;
  return JSON.stringify(value, function replacer(key, value2) {
    const result2 = printSimpleValue(this[key], quoteStrings);
    if (result2 !== null) return result2;
    return value2;
  }, 2);
}
const isNotNilTest = (value) => !___default__default.default.isNil(value);
const isNotNullTest = (value) => !___default__default.default.isNull(value);
addMethod(create$3, "notNil", function isNotNill(msg = "${path} must be defined.") {
  return this.test("defined", msg, isNotNilTest);
});
addMethod(create$3, "notNull", function isNotNull(msg = "${path} cannot be null.") {
  return this.test("defined", msg, isNotNullTest);
});
addMethod(create$3, "isFunction", function isFunction2(message = "${path} is not a function") {
  return this.test("is a function", message, (value) => ___default__default.default.isUndefined(value) || ___default__default.default.isFunction(value));
});
addMethod(create$2, "isCamelCase", function isCamelCase$1(message = "${path} is not in camel case (anExampleOfCamelCase)") {
  return this.test("is in camelCase", message, (value) => value ? isCamelCase(value) : true);
});
addMethod(create$2, "isKebabCase", function isKebabCase$1(message = "${path} is not in kebab case (an-example-of-kebab-case)") {
  return this.test("is in kebab-case", message, (value) => value ? isKebabCase(value) : true);
});
addMethod(create$1, "onlyContainsFunctions", function onlyContainsFunctions(message = "${path} contains values that are not functions") {
  return this.test("only contains functions", message, (value) => ___default__default.default.isUndefined(value) || value && Object.values(value).every(___default__default.default.isFunction));
});
addMethod(create, "uniqueProperty", function uniqueProperty(propertyName, message) {
  return this.test("unique", message, function unique(list) {
    const errors = [];
    list?.forEach((element, index2) => {
      const sameElements = list.filter((e) => fp.get(propertyName, e) === fp.get(propertyName, element));
      if (sameElements.length > 1) {
        errors.push(this.createError({
          path: `${this.path}[${index2}].${propertyName}`,
          message
        }));
      }
    });
    if (errors.length) {
      throw new ValidationError(errors);
    }
    return true;
  });
});
setLocale({
  mixed: {
    notType(options) {
      const { path: path2, type: type2, value, originalValue } = options;
      const isCast = originalValue != null && originalValue !== value;
      const msg = `${path2} must be a \`${type2}\` type, but the final value was: \`${printValue(value, true)}\`${isCast ? ` (cast from the value \`${printValue(originalValue, true)}\`).` : "."}`;
      return msg;
    }
  }
});
z__namespace$1.union([
  z__namespace$1.string(),
  z__namespace$1.array(z__namespace$1.string())
]).describe("Select specific fields to return in the response");
z__namespace$1.union([
  z__namespace$1.literal("*"),
  z__namespace$1.string(),
  z__namespace$1.array(z__namespace$1.string()),
  z__namespace$1.record(z__namespace$1.string(), z__namespace$1.any())
]).describe("Specify which relations to populate in the response");
z__namespace$1.union([
  z__namespace$1.string(),
  z__namespace$1.array(z__namespace$1.string()),
  z__namespace$1.record(z__namespace$1.string(), z__namespace$1.enum([
    "asc",
    "desc"
  ])),
  z__namespace$1.array(z__namespace$1.record(z__namespace$1.string(), z__namespace$1.enum([
    "asc",
    "desc"
  ])))
]).describe("Sort the results by specified fields");
z__namespace$1.intersection(z__namespace$1.object({
  withCount: z__namespace$1.boolean().optional().describe("Include total count in response")
}), z__namespace$1.union([
  z__namespace$1.object({
    page: z__namespace$1.number().int().positive().describe("Page number (1-based)"),
    pageSize: z__namespace$1.number().int().positive().describe("Number of entries per page")
  }).describe("Page-based pagination"),
  z__namespace$1.object({
    start: z__namespace$1.number().int().min(0).describe("Number of entries to skip"),
    limit: z__namespace$1.number().int().positive().describe("Maximum number of entries to return")
  }).describe("Offset-based pagination")
])).describe("Pagination parameters");
z__namespace$1.record(z__namespace$1.string(), z__namespace$1.any()).describe("Apply filters to the query");
z__namespace$1.string().describe("Specify the locale for localized content");
z__namespace$1.enum([
  "draft",
  "published"
]).describe("Filter by publication status");
z__namespace$1.string().describe("Search query string");
const sendAuditLog = (auditLogInstance, event, data) => {
  if (auditLogInstance && auditLogInstance.emit) {
    auditLogInstance.emit(event, data);
  }
};
const prepareAuditLog = (actions) => {
  return [
    ...new Set(
      actions.filter((_) => !!_).flatMap(({ remove, create: create2, update }) => {
        return [create2 ? "CREATE" : "", update ? "UPDATE" : "", remove ? "REMOVE" : ""].filter(
          (_) => !!_
        );
      })
    )
  ].join("_");
};
const processItems = (context) => async (item) => {
  return {
    title: item.title,
    path: item.path,
    audience: item.audience,
    type: item.type,
    uiRouterKey: item.uiRouterKey,
    order: item.order,
    collapsed: item.collapsed,
    menuAttached: item.menuAttached,
    removed: false,
    updated: true,
    externalPath: item.externalPath,
    items: item.items ? await Promise.all(item.items.map(processItems(context))) : [],
    master: context.master,
    parent: void 0,
    related: item.related,
    additionalFields: item.additionalFields
  };
};
const intercalate = (glue, arr) => arr.slice(1).reduce((acc, element) => acc.concat([glue, element]), arr.slice(0, 1));
const getCacheStatus = async ({
  strapi: strapi2
}) => {
  const cachePlugin = strapi2.plugin("rest-cache");
  const hasCachePlugin = !!cachePlugin;
  const pluginStore = strapi2.store({
    type: "plugin",
    name: "navigation"
  });
  const config2 = DynamicSchemas.configSchema.parse(
    await pluginStore.get({
      key: "config"
    })
  );
  return hasCachePlugin ? { hasCachePlugin, enabled: !!config2.isCacheEnabled } : { hasCachePlugin, enabled: false };
};
const adminService = (context) => ({
  async config({ viaSettingsPage = false }) {
    const commonService2 = getPluginService(context, "common");
    const cacheStatus = await getCacheStatus(context);
    const pluginStore = await commonService2.getPluginStore();
    const config2 = await pluginStore.get({
      key: "config"
    }).then(DynamicSchemas.configSchema.parse);
    const {
      additionalFields,
      cascadeMenuAttached,
      contentTypesPopulate,
      contentTypesNameFields: contentTypesNameFields2,
      defaultContentType,
      pathDefaultFields,
      allowedLevels,
      preferCustomContentTypes
    } = config2;
    const isGQLPluginEnabled = !!strapi.plugin("graphql");
    let extendedResult = {
      allowedContentTypes: ALLOWED_CONTENT_TYPES,
      restrictedContentTypes: RESTRICTED_CONTENT_TYPES,
      availableAudience: []
    };
    const configContentTypes = await this.configContentTypes({});
    const result = {
      contentTypes: await this.configContentTypes({ viaSettingsPage }),
      contentTypesNameFields: {
        default: CONTENT_TYPES_NAME_FIELDS_DEFAULTS,
        ...___default.isObject(contentTypesNameFields2) ? contentTypesNameFields2 : {}
      },
      contentTypesPopulate: ___default.isObject(contentTypesPopulate) ? contentTypesPopulate : {},
      defaultContentType,
      pathDefaultFields: ___default.isObject(pathDefaultFields) ? pathDefaultFields : {},
      allowedLevels,
      additionalFields: viaSettingsPage ? additionalFields : additionalFields.filter((field) => typeof field === "string" || !!field.enabled),
      gql: {
        navigationItemRelated: configContentTypes.map(
          ({ labelSingular }) => labelSingular.replace(/\s+/g, "")
        )
      },
      isGQLPluginEnabled: viaSettingsPage ? isGQLPluginEnabled : void 0,
      cascadeMenuAttached,
      preferCustomContentTypes
    };
    if (additionalFields.includes("audience")) {
      const audienceItems = await getAudienceRepository(context).find({}, Number.MAX_SAFE_INTEGER);
      extendedResult = {
        ...extendedResult,
        availableAudience: audienceItems
      };
    }
    return {
      ...result,
      ...extendedResult,
      isCacheEnabled: cacheStatus.enabled,
      isCachePluginEnabled: cacheStatus.hasCachePlugin
    };
  },
  async configContentTypes({
    viaSettingsPage = false
  }) {
    const commonService2 = getPluginService(context, "common");
    const pluginStore = await commonService2.getPluginStore();
    const config2 = await pluginStore.get({ key: "config" }).then(DynamicSchemas.configSchema.parse);
    const eligibleContentTypes = await Promise.all(
      config2.contentTypes.filter(
        (contentType2) => !!context.strapi.contentTypes[contentType2] && isContentTypeEligible(contentType2)
      ).map(async (key) => {
        const item = contentTypeFullSchema.parse(strapi.contentTypes[key]);
        const { kind, options, uid } = item;
        const draftAndPublish = options?.draftAndPublish;
        const isSingleType = kind === KIND_TYPES.SINGLE;
        const isSingleTypeWithPublishFlow = isSingleType && draftAndPublish;
        const returnType = (available) => ({
          key,
          available
        });
        if (isSingleType) {
          const repository = getGenericRepository(context, uid);
          if (isSingleTypeWithPublishFlow) {
            const itemsCountOrBypass = isSingleTypeWithPublishFlow ? await repository.count({}, "published") : true;
            return returnType(itemsCountOrBypass !== 0);
          }
          const isAvailable = await repository.count({});
          return isAvailable !== 0 ? returnType(true) : viaSettingsPage ? returnType(false) : void 0;
        }
        return returnType(true);
      })
    );
    return eligibleContentTypes.reduce((acc, current) => {
      if (!current?.key) {
        return acc;
      }
      const { key, available } = current;
      const item = contentTypeFullSchema.parse(context.strapi.contentTypes[key]);
      const relatedField = (item.associations || []).find(
        ({ model }) => model === "navigationitem"
      );
      const {
        uid,
        options,
        info,
        collectionName,
        modelName,
        apiName,
        plugin,
        kind,
        pluginOptions = {}
      } = item;
      const isAvailable = available && !options?.hidden;
      if (!isAvailable) {
        return acc;
      }
      const { visible = true } = pluginOptions["content-manager"] || {};
      const { name = "", description = "" } = info;
      const findRouteConfig = ___default.find(
        ___default.get(context.strapi.api, `[${modelName}].config.routes`, []),
        (route) => route.handler.includes(".find")
      );
      const findRoutePath = findRouteConfig && findRouteConfig.path.split("/")[1];
      const apiPath = findRoutePath && findRoutePath !== apiName ? findRoutePath : apiName || modelName;
      const isSingle = kind === KIND_TYPES.SINGLE;
      const endpoint = isSingle ? apiPath : pluralize__default.default(apiPath);
      const relationName = singularize(modelName);
      const relationNameParts = typeof uid === "string" ? ___default.last(uid.split(".")).split("-") : [];
      const contentTypeName = relationNameParts.length > 1 ? relationNameParts.reduce((prev, curr) => `${prev}${___default.upperFirst(curr)}`, "") : ___default.upperFirst(modelName);
      const labelSingular = name || ___default.upperFirst(relationNameParts.length > 1 ? relationNameParts.join(" ") : relationName);
      acc.push({
        uid,
        name: relationName,
        draftAndPublish: options?.draftAndPublish,
        isSingle,
        description,
        collectionName,
        contentTypeName,
        label: isSingle ? labelSingular : pluralize__default.default(name || labelSingular),
        relatedField: relatedField ? relatedField.alias : void 0,
        labelSingular: singularize(labelSingular),
        endpoint,
        plugin,
        available: isAvailable,
        visible,
        templateName: options?.templateName
      });
      return acc;
    }, []);
  },
  async get({ ids, locale: locale2 }) {
    let filters2 = {};
    if (ids && ids.length) {
      filters2.id = { $in: ids };
    }
    const dbResults = await getNavigationRepository(context).find({
      filters: filters2,
      locale: locale2 || "*",
      limit: Number.MAX_SAFE_INTEGER,
      populate: ["items", "items.parent", "items.audience", "items.related"]
    });
    const buildItemsStructure = ({
      allItems,
      item,
      parent
    }) => {
      const children = allItems.filter((child) => child.parent?.documentId === item.documentId);
      return {
        ...item,
        parent,
        items: children.map(
          (child) => buildItemsStructure({
            parent: item,
            item: child,
            allItems
          })
        ).sort((a, b) => a.order - b.order)
      };
    };
    return dbResults.map((navigation2) => ({
      ...navigation2,
      items: navigation2.items?.filter((item) => !item.parent).map(
        (item) => buildItemsStructure({
          allItems: navigation2.items ?? [],
          item
        })
      ).sort((a, b) => a.order - b.order)
    }));
  },
  async getById({ documentId, locale: locale2, populate: populate2 = [] }) {
    const commonService2 = getPluginService(context, "common");
    const { defaultLocale } = await commonService2.readLocale();
    const filters2 = {
      documentId
    };
    const navigation2 = await getNavigationRepository(context).findOne({
      filters: filters2,
      locale: locale2 || defaultLocale
    });
    const dbNavigationItems = await getNavigationItemRepository(context).find({
      filters: { master: navigation2.id },
      locale: locale2 || defaultLocale,
      limit: Number.MAX_SAFE_INTEGER,
      order: [{ order: "asc" }],
      populate: ["parent", "audience", ...populate2]
    });
    return {
      ...navigation2,
      items: commonService2.buildNestedStructure({
        navigationItems: dbNavigationItems
      }).filter(({ parent }) => !parent)
    };
  },
  async post({ auditLog, payload }) {
    const { masterModel } = getPluginModels(context);
    const commonService2 = getPluginService(context, "common");
    const { defaultLocale, restLocale } = await commonService2.readLocale();
    const repository = getNavigationRepository(context);
    const navigationSummary = [];
    const { name, visible } = payload;
    const slug = await commonService2.getSlug({ query: name });
    const mainNavigation = await repository.save({
      name,
      visible,
      locale: defaultLocale,
      slug
    });
    navigationSummary.push(await this.getById({ documentId: mainNavigation.documentId }));
    for (const localeCode of restLocale) {
      const newLocaleNavigation = await repository.save({
        name,
        visible,
        locale: localeCode,
        slug,
        documentId: mainNavigation.documentId
      });
      navigationSummary.push(await this.getById({ documentId: newLocaleNavigation.documentId }));
    }
    navigationSummary.map((navigation2) => {
      sendAuditLog(auditLog, "onChangeNavigation", {
        actionType: "CREATE",
        oldEntity: navigation2,
        newEntity: navigation2
      });
    });
    await commonService2.emitEvent({
      entity: mainNavigation,
      event: "entry.create",
      uid: masterModel.uid
    });
    return {
      ...mainNavigation,
      items: []
    };
  },
  async put({ auditLog, payload }) {
    const { masterModel } = getPluginModels(context);
    const commonService2 = getPluginService(context, "common");
    const { defaultLocale, restLocale } = await commonService2.readLocale();
    const repository = getNavigationRepository(context);
    const { name, visible, items } = payload;
    const currentNavigation = await repository.findOne({
      filters: { documentId: payload.documentId },
      locale: payload.locale,
      populate: "*"
    });
    const currentNavigationAsDTO = await this.getById({
      documentId: payload.documentId,
      locale: payload.locale
    });
    const detailsHaveChanged = currentNavigation.name !== name || currentNavigation.visible !== visible;
    if (detailsHaveChanged) {
      const newSlug = name ? await commonService2.getSlug({
        query: name
      }) : currentNavigation.slug;
      const allNavigations = await Promise.all(
        [defaultLocale, ...restLocale].map(
          (locale2) => repository.findOne({
            filters: { documentId: currentNavigation.documentId },
            locale: locale2
          })
        )
      );
      for (const navigation2 of allNavigations) {
        await repository.save({
          documentId: navigation2.documentId,
          id: navigation2.id,
          slug: newSlug,
          locale: navigation2.locale,
          name,
          visible
        });
      }
    }
    await commonService2.analyzeBranch({
      navigationItems: items ?? [],
      masterEntity: currentNavigation,
      prevAction: {}
    }).then(prepareAuditLog).then(async (actionType) => {
      const newEntity = await this.getById({ documentId: currentNavigation.documentId });
      sendAuditLog(auditLog, "onChangeNavigation", {
        actionType,
        oldEntity: currentNavigationAsDTO,
        newEntity
      });
    });
    await commonService2.emitEvent({
      entity: await repository.findOne({
        filters: { documentId: payload.documentId },
        populate: "*"
      }),
      event: "entry.update",
      uid: masterModel.uid
    });
    return await this.getById({
      documentId: payload.documentId,
      locale: payload.locale,
      populate: ["related"]
    });
  },
  async delete({ auditLog, documentId }) {
    const navigationRepository = getNavigationRepository(context);
    const navigationItemRepository = getNavigationItemRepository(context);
    const navigationAsDTO = await this.getById({ documentId });
    const cleanNavigationItems = async (masterIds) => {
      if (masterIds.length < 1) {
        return;
      }
      await navigationItemRepository.removeForIds(
        await navigationItemRepository.findForMasterIds(masterIds).then(
          (_) => _.reduce((acc, { documentId: documentId2 }) => {
            if (documentId2) {
              acc.push(documentId2);
            }
            return acc;
          }, [])
        )
      );
    };
    const navigation2 = await navigationRepository.findOne({
      filters: { documentId },
      populate: "*"
    });
    const allNavigations = await navigationRepository.find({
      filters: { documentId: navigation2.documentId },
      populate: "*"
    });
    await cleanNavigationItems(allNavigations.map(({ id }) => id));
    await navigationRepository.remove({ documentId: navigation2.documentId });
    sendAuditLog(auditLog, "onNavigationDeletion", {
      entity: navigationAsDTO,
      actionType: "DELETE"
    });
  },
  async restart() {
    context.strapi.reload.isWatching = false;
    setImmediate(() => context.strapi.reload());
  },
  async restoreConfig() {
    console.log("restore");
    const commonService2 = getPluginService(context, "common");
    const pluginStore = await commonService2.getPluginStore();
    await pluginStore.delete({ key: "config" });
    await commonService2.setDefaultConfig();
  },
  async refreshNavigationLocale(newLocale) {
    if (!newLocale) {
      return;
    }
    const commonService2 = getPluginService(context, "common");
    const { defaultLocale } = await commonService2.readLocale();
    const repository = getNavigationRepository(context);
    const navigations = await repository.find({
      limit: Number.MAX_SAFE_INTEGER,
      locale: defaultLocale
    });
    await Promise.all(
      navigations.map(
        ({ name, visible, slug, documentId }) => repository.save({
          name,
          visible,
          locale: newLocale,
          slug,
          documentId
        })
      )
    );
  },
  async updateConfig({ config: newConfig }) {
    const commonService2 = getPluginService(context, "common");
    const pluginStore = await commonService2.getPluginStore();
    const config2 = await pluginStore.get({
      key: "config"
    }).then(DynamicSchemas.configSchema.parse);
    validateAdditionalFields(newConfig.additionalFields);
    await pluginStore.set({ key: "config", value: newConfig });
    const removedFields = ___default.differenceBy(
      config2.additionalFields,
      newConfig.additionalFields,
      "name"
    ).reduce((acc, field) => {
      if (typeof field === "string") {
        return acc;
      }
      acc.push(field);
      return acc;
    }, []);
    if (!___default.isEmpty(removedFields)) {
      await commonService2.pruneCustomFields({ removedFields });
    }
  },
  async fillFromOtherLocale({
    auditLog,
    source,
    target,
    documentId
  }) {
    const targetEntity = await this.getById({ documentId, locale: target });
    return await this.i18nNavigationContentsCopy({
      source: await this.getById({ documentId, locale: source, populate: ["related"] }),
      target: targetEntity
    }).then(() => this.getById({ documentId, locale: target, populate: ["related"] })).then((newEntity) => {
      sendAuditLog(auditLog, "onChangeNavigation", {
        actionType: "UPDATE",
        oldEntity: targetEntity,
        newEntity
      });
      return newEntity;
    });
  },
  async i18nNavigationContentsCopy({
    source,
    target
  }) {
    const commonService2 = getPluginService(context, "common");
    const sourceItems = source.items ?? [];
    const navigationRepository = getNavigationRepository(context);
    if (target.items?.length) {
      throw new FillNavigationError("Current navigation is non-empty");
    }
    if (!target.locale) {
      throw new FillNavigationError("Current navigation does not have specified locale");
    }
    if (!sourceItems.length) {
      throw new FillNavigationError("Source navigation is empty");
    }
    const itemProcessor = processItems({
      master: target,
      locale: target.locale,
      strapi
    });
    await commonService2.createBranch({
      action: { create: true },
      masterEntity: await navigationRepository.findOne({
        filters: { documentId: target.documentId },
        locale: target.locale,
        populate: "*"
      }),
      navigationItems: await Promise.all(sourceItems.map(itemProcessor)),
      parentItem: void 0
    });
  },
  async readNavigationItemFromLocale({
    path: path2,
    source,
    target
  }) {
    const sourceNavigation = await this.getById({ documentId: source });
    const targetNavigation = await this.getById({ documentId: target });
    if (!sourceNavigation) {
      throw new NotFoundError("Unable to find source navigation for specified query");
    }
    if (!targetNavigation) {
      throw new NotFoundError("Unable to find target navigation for specified query");
    }
    const requiredFields = [
      "path",
      "related",
      "type",
      "uiRouterKey",
      "title",
      "externalPath"
    ];
    const structurePath = path2.split(".").map((p) => parseInt(p, 10));
    if (!structurePath.some(Number.isNaN) || !structurePath.length) {
      new InvalidParamNavigationError("Path is invalid");
    }
    let result = ___default.get(
      sourceNavigation.items,
      intercalate("items", structurePath.map(___default.toString))
    );
    if (!result) {
      throw new NotFoundError("Unable to find navigation item");
    }
    return readNavigationItemFromLocaleSchema.parse(___default.pick(result, requiredFields));
  },
  async getContentTypeItems({
    query,
    uid
  }) {
    const commonService2 = getPluginService(context, "common");
    const pluginStore = await commonService2.getPluginStore();
    const config2 = await pluginStore.get({ key: "config" }).then(DynamicSchemas.configSchema.parse);
    const where = {
      publishedAt: {
        $notNull: true
      }
    };
    const contentType2 = ___default.get(context.strapi.contentTypes, uid);
    const { draftAndPublish } = contentType2.options;
    const { localized = false } = contentType2?.pluginOptions?.i18n || {};
    if (localized && query.locale) {
      where.locale = query.locale;
    }
    const repository = getGenericRepository(context, uid);
    try {
      const contentTypeItems = await repository.findMany(
        where,
        config2.contentTypesPopulate[uid] || [],
        draftAndPublish ? "published" : void 0
      );
      return contentTypeItems;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  async purgeNavigationCache(documentId, clearLocalisations) {
    const navigationRepository = getNavigationRepository(context);
    const entity = await navigationRepository.findOne({ filters: { documentId } });
    if (!entity) {
      throw new NotFoundError("Navigation is not defined");
    }
    const mapToRegExp = (documentId2) => new RegExp(`/api/navigation/render/${documentId2}`);
    let regexps = [mapToRegExp(entity.documentId)];
    if (clearLocalisations) {
      const navigations = await navigationRepository.find({
        filters: {
          documentId: entity.documentId
        }
      });
      regexps = navigations.map(({ documentId: documentId2 }) => mapToRegExp(documentId2));
    }
    const restCachePlugin = strapi.plugin("rest-cache");
    const cacheStore = restCachePlugin.service("cacheStore");
    regexps.push(mapToRegExp(documentId));
    await cacheStore.clearByRegexp(regexps);
    return { success: true };
  },
  async purgeNavigationsCache() {
    const restCachePlugin = strapi.plugin("rest-cache");
    const cacheStore = restCachePlugin.service("cacheStore");
    const regex = new RegExp("/api/navigation/render(.*)");
    await cacheStore.clearByRegexp([regex]);
    return { success: true };
  }
});
const composeItemTitle = (item, fields2 = {}, contentTypes2 = []) => {
  const { title, related } = item;
  const lastRelated = ___default.isArray(related) ? ___default.last(related) : related;
  if (title) {
    return ___default.isString(title) && !___default.isEmpty(title) ? title : void 0;
  } else if (lastRelated) {
    const relationTitle = extractItemRelationTitle(lastRelated, fields2, contentTypes2);
    return ___default.isString(relationTitle) && !___default.isEmpty(relationTitle) ? relationTitle : void 0;
  }
  return void 0;
};
const extractItemRelationTitle = (relatedItem, fields2 = {}, contentTypes2 = []) => {
  const { __contentType } = relatedItem;
  const contentType2 = ___default.find(contentTypes2, (_) => _.contentTypeName === __contentType);
  const { default: defaultFields = [] } = fields2;
  return ___default.get(fields2, `${contentType2 ? contentType2.collectionName : ""}`, defaultFields).map((_) => relatedItem[_]).filter((_) => _)[0] || "";
};
const filterByPath = (items, path2) => {
  const parsedItems = buildNestedPaths(items);
  const itemsWithPaths = path2 ? parsedItems.filter(({ path: itemPath }) => itemPath.includes(path2)) : parsedItems;
  const root = itemsWithPaths.find(({ path: itemPath }) => itemPath === path2);
  return {
    root,
    items: ___default.isNil(root) ? [] : items.filter(({ documentId }) => itemsWithPaths.find((v) => v.documentId === documentId))
  };
};
const buildNestedPaths = (items, documentId, parentPath = null) => {
  return items.filter((entity) => {
    let data = entity.parent;
    if (!data == null && !documentId) {
      return true;
    }
    return entity.parent?.documentId === documentId;
  }).reduce((acc, entity) => {
    const path2 = `${parentPath || ""}/${entity.path}`.replace("//", "/");
    return [
      {
        documentId: entity.documentId,
        parent: parentPath && entity.parent?.documentId ? {
          id: entity.parent?.id,
          documentId: entity.parent?.documentId,
          path: parentPath
        } : void 0,
        path: path2
      },
      ...buildNestedPaths(items, entity.documentId, path2),
      ...acc
    ];
  }, []);
};
const compareArraysOfNumbers = (arrA, arrB) => {
  const diff = ___default.zipWith(arrA, arrB, (a, b) => {
    if (___default.isNil(a)) return -1;
    if (___default.isNil(b)) return 1;
    return a - b;
  });
  return ___default.find(diff, (a) => a !== 0) || 0;
};
const clientService = (context) => ({
  async readAll({ locale: locale2, orderBy = "createdAt", orderDirection = "DESC" }) {
    const repository = getNavigationRepository(context);
    const navigations = repository.find({
      locale: locale2,
      orderBy: { [orderBy]: orderDirection }
    });
    return navigations;
  },
  renderRFRNavigationItem({ item }) {
    const { uiRouterKey, title, path: path2, type: type2, audience: audience2, additionalFields } = item;
    const itemCommon = {
      label: title,
      type: type2,
      audience: audience2?.map(({ key }) => key),
      additionalFields
    };
    if (type2 === "WRAPPER") {
      return { ...itemCommon };
    }
    if (type2 === "EXTERNAL") {
      assertNotEmpty(
        path2,
        new NavigationError("External navigation item's path is undefined", item)
      );
      return {
        ...itemCommon,
        url: path2
      };
    }
    if (type2 === "INTERNAL") {
      return {
        ...itemCommon,
        page: uiRouterKey
      };
    }
    if (type2 === "WRAPPER") {
      return {
        ...itemCommon
      };
    }
    throw new NavigationError("Unknown item type", item);
  },
  renderRFRPage({ item, parent, enabledCustomFieldsNames }) {
    const {
      documentId,
      uiRouterKey,
      title,
      path: path2,
      related,
      type: type2,
      audience: audience2,
      menuAttached,
      additionalFields
    } = item;
    const additionalFieldsRendered = enabledCustomFieldsNames.reduce(
      (acc, field) => ({ ...acc, [field]: additionalFields?.[field] }),
      {}
    );
    return {
      id: uiRouterKey,
      documentId,
      title,
      related: type2 === "INTERNAL" && related?.documentId && related?.__type ? {
        contentType: related.__type,
        documentId: related.documentId
      } : void 0,
      path: path2,
      parent,
      audience: audience2,
      menuAttached,
      additionalFields: additionalFieldsRendered
    };
  },
  renderRFR({
    items,
    parent,
    parentNavItem,
    contentTypes: contentTypes2 = [],
    enabledCustomFieldsNames
  }) {
    const navItems = [];
    let nav = {};
    let pages = {};
    items.forEach((item) => {
      const { items: itemChildren, ...restOfItem } = item;
      const itemNav = this.renderRFRNavigationItem({
        item: restOfItem
      });
      const itemPage = this.renderRFRPage({
        item: restOfItem,
        parent,
        enabledCustomFieldsNames
      });
      if (item.type !== "EXTERNAL") {
        pages = {
          ...pages,
          [itemPage.documentId]: {
            ...itemPage
          }
        };
      }
      if (item.menuAttached) {
        navItems.push(itemNav);
      }
      if (!parent) {
        nav = {
          ...nav,
          root: navItems
        };
      } else {
        const navigationLevel = navItems.filter((navItem) => navItem.type);
        if (!___default.isEmpty(navigationLevel))
          nav = {
            ...nav,
            [parent]: navigationLevel.concat(parentNavItem ? parentNavItem : [])
          };
      }
      if (!___default.isEmpty(itemChildren)) {
        const { nav: nestedNavs } = this.renderRFR({
          items: itemChildren ?? [],
          parent: itemPage.documentId,
          parentNavItem: itemNav,
          contentTypes: contentTypes2,
          enabledCustomFieldsNames
        });
        const { pages: nestedPages } = this.renderRFR({
          items: itemChildren || [],
          parent: itemPage.documentId,
          parentNavItem: itemNav,
          contentTypes: contentTypes2,
          enabledCustomFieldsNames
        });
        pages = {
          ...pages,
          ...nestedPages
        };
        nav = {
          ...nav,
          ...nestedNavs
        };
      }
    });
    return {
      pages,
      nav
    };
  },
  renderTree({
    items = [],
    documentId,
    path: path2 = "",
    itemParser = (i) => Promise.resolve(i)
  }) {
    return Promise.all(
      items.reduce((acc, item) => {
        if (item.parent?.documentId === documentId) {
          acc.push(itemParser(___default.cloneDeep(item), path2));
        }
        return acc;
      }, [])
    ).then(
      (result) => result.sort((x, y) => {
        if (x.order !== void 0 && y.order !== void 0) {
          return x.order - y.order;
        }
        return 0;
      })
    );
  },
  getCustomFields(additionalFields) {
    return additionalFields.reduce((acc, field) => {
      if (field !== "audience") {
        acc.push(field);
      }
      return acc;
    }, []);
  },
  async renderType({
    criteria = {},
    filter,
    itemCriteria = {},
    locale: locale2,
    populate: populate2,
    rootPath,
    type: type2 = "FLAT",
    wrapRelated,
    status: status2 = "published"
  }) {
    const adminService2 = getPluginService(context, "admin");
    const commonService2 = getPluginService(context, "common");
    const entityWhereClause = {
      ...criteria,
      visible: true
    };
    const navigationRepository = getNavigationRepository(context);
    const navigationItemRepository = getNavigationItemRepository(context);
    let navigation2;
    if (locale2) {
      navigation2 = await navigationRepository.find({
        filters: {
          ...entityWhereClause
        },
        locale: locale2,
        limit: 1
      });
    } else {
      navigation2 = await navigationRepository.find({
        filters: entityWhereClause,
        limit: 1
      });
    }
    if (___default.isArray(navigation2)) {
      navigation2 = ___default.first(navigation2);
    }
    if (navigation2 && navigation2.documentId) {
      const navigationItems = await navigationItemRepository.find({
        filters: {
          master: ___default.pick(navigation2, ["slug", "id"]),
          ...itemCriteria
        },
        locale: locale2,
        limit: Number.MAX_SAFE_INTEGER,
        order: [{ order: "asc" }],
        populate: ["audience", "parent", "related"]
      });
      const mappedItems = await commonService2.mapToNavigationItemDTO({
        locale: locale2,
        master: navigation2,
        navigationItems,
        populate: populate2,
        status: status2
      });
      const { contentTypes: contentTypes2, contentTypesNameFields: contentTypesNameFields2, additionalFields } = await adminService2.config({
        viaSettingsPage: false
      });
      const enabledCustomFieldsNames = this.getCustomFields(additionalFields).reduce(
        (acc, curr) => curr.enabled ? [...acc, curr.name] : acc,
        []
      );
      const wrapContentType = (itemContentType) => wrapRelated && itemContentType ? {
        documentId: itemContentType.documentId,
        ...itemContentType
      } : itemContentType;
      const customFieldsDefinitions = additionalFields.filter(
        (_) => typeof _ !== "string"
      );
      const additionalFieldsMapper = (item) => (acc, field) => {
        const fieldDefinition = customFieldsDefinitions.find(({ name }) => name === field);
        let content = item.additionalFields?.[field];
        if (content) {
          switch (fieldDefinition?.type) {
            case "media":
              content = JSON.parse(content);
              break;
            case "boolean":
              content = content === "true";
              break;
          }
        }
        return { ...acc, [field]: content };
      };
      switch (type2) {
        case "TREE":
        case "RFR":
          const itemParser = async (item, path2 = "") => {
            const isExternal = item.type === "EXTERNAL";
            const parentPath = isExternal ? void 0 : `${path2 === "/" ? "" : path2}/${___default.first(item.path) === "/" ? item.path.substring(1) : item.path}`;
            const slug = typeof parentPath === "string" ? await commonService2.getSlug({
              query: (___default.first(parentPath) === "/" ? parentPath.substring(1) : parentPath).replace(/\//g, "-")
            }) : void 0;
            const lastRelated = ___default.isArray(item.related) ? ___default.last(item.related) : item.related;
            const relatedContentType = wrapContentType(lastRelated);
            const customFields = enabledCustomFieldsNames.reduce(additionalFieldsMapper(item), {});
            return {
              id: item.id,
              documentId: item.documentId,
              title: composeItemTitle(item, contentTypesNameFields2, contentTypes2) ?? "Title missing",
              menuAttached: item.menuAttached,
              order: item.order,
              path: (isExternal ? item.externalPath : parentPath) ?? "Path is missing",
              type: item.type,
              uiRouterKey: item.uiRouterKey,
              slug: !slug && item.uiRouterKey ? await commonService2.getSlug({ query: item.uiRouterKey }) : slug,
              related: isExternal || !lastRelated ? void 0 : {
                ...relatedContentType
              },
              audience: !___default.isEmpty(item.audience) ? item.audience : void 0,
              items: await this.renderTree({
                itemParser,
                path: parentPath,
                documentId: item.documentId,
                items: mappedItems
              }),
              collapsed: item.collapsed,
              additionalFields: customFields || {}
            };
          };
          const { items: itemsFilteredByPath, root: rootElement } = filterByPath(
            mappedItems,
            rootPath
          );
          const treeStructure = await this.renderTree({
            itemParser,
            items: ___default.isNil(rootPath) ? mappedItems : itemsFilteredByPath,
            path: rootElement?.parent?.path,
            documentId: rootElement?.parent?.documentId
          });
          const filteredStructure = filter ? treeStructure.filter((item) => item.uiRouterKey === filter) : treeStructure;
          if (type2 === "RFR") {
            return this.renderRFR({
              items: filteredStructure,
              contentTypes: contentTypes2.map((_) => _.contentTypeName),
              enabledCustomFieldsNames
            });
          }
          return filteredStructure;
        default:
          const result = ___default.isNil(rootPath) ? mappedItems : filterByPath(mappedItems, rootPath).items;
          const defaultCache = /* @__PURE__ */ new Map();
          const getNestedOrders = (documentId, cache = defaultCache) => {
            const cached = cache.get(documentId);
            if (!___default.isNil(cached)) return cached;
            const item = result.find((item2) => item2.documentId === documentId);
            if (___default.isNil(item)) return [];
            const { order, parent } = item;
            const nestedOrders = parent ? getNestedOrders(parent.documentId, cache).concat(order) : [order];
            cache.set(documentId, nestedOrders);
            return nestedOrders;
          };
          return result.map((item) => {
            const additionalFieldsMapped = enabledCustomFieldsNames.reduce(
              additionalFieldsMapper(item),
              {}
            );
            return {
              ...item,
              audience: item.audience?.map((_) => _.key),
              title: composeItemTitle(item, contentTypesNameFields2, contentTypes2) || "",
              related: wrapContentType(item.related),
              items: null,
              additionalFields: additionalFieldsMapped
            };
          }).sort(
            (a, b) => compareArraysOfNumbers(getNestedOrders(a.documentId), getNestedOrders(b.documentId))
          );
      }
    }
    throw new NotFoundError();
  },
  renderChildren({
    childUIKey,
    idOrSlug,
    locale: locale2,
    menuOnly,
    type: type2 = "FLAT",
    wrapRelated,
    status: status2
  }) {
    const criteria = { $or: [{ documentId: idOrSlug }, { slug: idOrSlug }] };
    const filter = type2 === "FLAT" ? void 0 : childUIKey;
    const itemCriteria = {
      ...menuOnly && { menuAttached: true },
      ...type2 === "FLAT" ? { uiRouterKey: childUIKey } : {}
    };
    return this.renderType({
      type: type2,
      criteria,
      itemCriteria,
      filter,
      wrapRelated,
      locale: locale2,
      status: status2
    });
  },
  render({
    idOrSlug,
    locale: locale2,
    menuOnly,
    populate: populate2,
    rootPath,
    type: type2 = "FLAT",
    wrapRelated,
    status: status2
  }) {
    const criteria = { $or: [{ documentId: idOrSlug }, { slug: idOrSlug }] };
    const itemCriteria = menuOnly ? { menuAttached: true } : {};
    return this.renderType({
      type: type2,
      criteria,
      itemCriteria,
      rootPath,
      wrapRelated,
      locale: locale2,
      populate: populate2,
      status: status2
    });
  }
});
const checkDuplicatePath = ({
  checkData,
  parentItem
}) => {
  return new Promise((resolve, reject) => {
    if (parentItem && parentItem.items) {
      for (let item of checkData) {
        for (let _ of parentItem.items) {
          if (_.path === item.path && _.id !== item.id && item.type === "INTERNAL" && !_.removed) {
            return reject(
              new NavigationError(
                `Duplicate path:${item.path} in parent: ${parentItem.title || "root"} for ${item.title} and ${_.title} items`,
                {
                  parentTitle: parentItem.title,
                  parentId: parentItem.id,
                  path: item.path,
                  errorTitles: [item.title, _.title]
                }
              )
            );
          }
        }
      }
    }
    return resolve();
  });
};
const lifecycleHookListeners = {
  navigation: {},
  "navigation-item": {}
};
const commonService = (context) => ({
  async getPluginStore() {
    return await strapi.store({ type: "plugin", name: "navigation" });
  },
  async mapToNavigationItemDTO({
    locale: locale2,
    master,
    navigationItems,
    parent,
    populate: populate2,
    status: status2 = "published"
  }) {
    const result = [];
    const pluginStore = await this.getPluginStore();
    const config2 = await pluginStore.get({
      key: "config"
    }).then(DynamicSchemas.configSchema.parse);
    const extendedNavigationItems = await Promise.all(
      navigationItems.map(async (item) => {
        if (!item.related?.__type || !item.related.documentId) {
          return item;
        }
        const fieldsToPopulate = config2.contentTypesPopulate[item.related.__type];
        const repository = getGenericRepository({ strapi }, item.related.__type);
        const related = await repository.findById(
          item.related.documentId,
          fieldsToPopulate,
          status2,
          {
            locale: locale2
          }
        );
        return {
          ...item,
          related: {
            ...related,
            __type: item.related.__type,
            documentId: item.related.documentId
          }
        };
      })
    );
    for (const navigationItem2 of extendedNavigationItems) {
      const { items = [], ...base } = navigationItem2;
      result.push({
        ...base,
        parent: parent ?? base.parent,
        items: await this.mapToNavigationItemDTO({
          navigationItems: items,
          populate: populate2,
          master,
          parent: base,
          locale: locale2,
          status: status2
        })
      });
    }
    return result;
  },
  setDefaultConfig() {
    return configSetup({ strapi, forceDefault: true });
  },
  getBranchName({ item }) {
    const hasId = !!item.documentId;
    const toRemove = item.removed;
    if (hasId && !toRemove) {
      return "toUpdate";
    }
    if (hasId && toRemove) {
      return "toRemove";
    }
    if (!hasId && !toRemove) {
      return "toCreate";
    }
  },
  async analyzeBranch({
    masterEntity,
    navigationItems = [],
    parentItem,
    prevAction = {}
  }) {
    const { toCreate, toRemove, toUpdate } = navigationItems.reduce(
      (acc, navigationItem2) => {
        const branchName = this.getBranchName({
          item: navigationItem2
        });
        return branchName ? { ...acc, [branchName]: [...acc[branchName], navigationItem2] } : acc;
      },
      {
        toRemove: [],
        toCreate: [],
        toUpdate: []
      }
    );
    const action = {
      create: prevAction.create || toCreate.length > 0,
      update: prevAction.update || toUpdate.length > 0,
      remove: prevAction.remove || toRemove.length > 0
    };
    const checkData = [...toCreate, ...toUpdate];
    await checkDuplicatePath({
      checkData,
      parentItem
    });
    return Promise.all([
      this.createBranch({
        action,
        masterEntity,
        navigationItems: toCreate,
        parentItem
      }),
      this.removeBranch({
        navigationItems: toRemove,
        action
      }),
      this.updateBranch({
        action,
        masterEntity,
        navigationItems: toUpdate,
        parentItem
      })
    ]).then(([a, b, c]) => [...a, ...b, ...c]);
  },
  async removeBranch({
    navigationItems = [],
    action = {}
  }) {
    const navigationActions = [];
    for (const navigationItem2 of navigationItems) {
      if (!navigationItem2.documentId) {
        continue;
      }
      action.remove = true;
      await getNavigationItemRepository(context).remove(navigationItem2);
      navigationActions.push(action);
      if (!!navigationItem2.items?.length) {
        const innerResult = await this.removeBranch({
          navigationItems: navigationItem2.items
        });
        innerResult.forEach((_) => {
          navigationActions.push(_);
        });
      }
    }
    return navigationActions;
  },
  async createBranch({
    action,
    masterEntity,
    navigationItems,
    parentItem
  }) {
    let navigationActions = [];
    for (const navigationItem2 of navigationItems) {
      action.create = true;
      const { parent, master, items, documentId, id, ...params } = navigationItem2;
      const insertDetails = documentId && id ? {
        ...params,
        documentId,
        id,
        master: masterEntity ? masterEntity.id : void 0,
        parent: parentItem ? parentItem.id : void 0
      } : {
        ...params,
        documentId: void 0,
        id: void 0,
        master: masterEntity ? masterEntity.id : void 0,
        parent: parentItem ? parentItem.id : void 0
      };
      const nextParentItem = await getNavigationItemRepository(context).save({
        item: insertDetails,
        locale: masterEntity?.locale
      });
      if (!!navigationItem2.items?.length) {
        const innerActions = await this.createBranch({
          action: {},
          masterEntity,
          navigationItems: navigationItem2.items,
          parentItem: nextParentItem
        });
        navigationActions = navigationActions.concat(innerActions).concat([action]);
      } else {
        navigationActions.push(action);
      }
    }
    return navigationActions;
  },
  async updateBranch({
    masterEntity,
    navigationItems,
    action,
    parentItem
  }) {
    const result = [];
    for (const updateDetails of navigationItems) {
      action.update = true;
      const { documentId, updated, parent, master, items, ...params } = updateDetails;
      let currentItem;
      if (updated) {
        currentItem = await getNavigationItemRepository(context).save({
          item: {
            documentId,
            ...params
          },
          locale: masterEntity?.locale
        });
      } else {
        currentItem = updateDetails;
      }
      if (!!items?.length) {
        const innerResult = await this.analyzeBranch({
          navigationItems: items,
          prevAction: {},
          masterEntity,
          parentItem: currentItem
        });
        innerResult.forEach((_) => {
          result.push(_);
        });
      } else {
        result.push(action);
      }
    }
    return result;
  },
  async emitEvent({ entity, event, uid }) {
    const model = strapi.getModel(uid);
    const sanitizedEntity = await defaultSanitizeOutput(
      {
        ...model,
        schema: model.__schema__,
        getModel: () => model
      },
      entity
    );
    if (strapi.webhookRunner) {
      strapi.webhookRunner.eventHub.emit(event, {
        model: model.modelName,
        entry: sanitizedEntity
      });
    } else {
      console.warn("Webhook runner not present. Contact with Strapi Navigation Plugin team.");
    }
  },
  async pruneCustomFields({ removedFields }) {
    const removedFieldsKeys = removedFields.map(({ name }) => `additionalFields.${name}`);
    const removedFieldsNames = removedFields.map(({ name }) => name);
    const navigationItems = await getNavigationItemRepository(context).find({
      filters: {
        additionalFields: {
          $contains: [removedFieldsNames]
        }
      }
    });
    const navigationItemsToUpdate = navigationItems.map(
      (navigationItem2) => ___default.omit(navigationItem2, removedFieldsKeys)
    );
    for (const item of navigationItemsToUpdate) {
      await getNavigationItemRepository(context).save({
        item: {
          documentId: item.documentId,
          additionalFields: item.additionalFields
        }
      });
    }
  },
  async getSlug({ query }) {
    let slug = slugify__default.default(query);
    if (slug) {
      const existingItems = await getNavigationItemRepository(context).count({
        $or: [
          {
            uiRouterKey: {
              $startsWith: slug
            }
          },
          { uiRouterKey: slug }
        ]
      });
      if (existingItems) {
        slug = `${slug}-${existingItems}`;
      }
    }
    return slug.toLowerCase();
  },
  registerLifeCycleHook({ callback, contentTypeName, hookName }) {
    if (!lifecycleHookListeners[contentTypeName][hookName]) {
      lifecycleHookListeners[contentTypeName][hookName] = [];
    }
    lifecycleHookListeners[contentTypeName][hookName]?.push(callback);
  },
  async runLifeCycleHook({ contentTypeName, event, hookName }) {
    const hookListeners = lifecycleHookListeners[contentTypeName][hookName] ?? [];
    for (const listener of hookListeners) {
      await listener(event);
    }
  },
  buildNestedStructure({
    navigationItems,
    id
  }) {
    return navigationItems?.reduce((acc, navigationItem2) => {
      if (id && navigationItem2.parent?.id !== id) {
        return acc;
      }
      acc.push({
        ...___default.omit(navigationItem2, ["related", "items"]),
        related: navigationItem2.related,
        items: this.buildNestedStructure({
          navigationItems,
          id: navigationItem2.id
        })
      });
      return acc;
    }, []) ?? [];
  },
  async readLocale() {
    const localeService = strapi.plugin("i18n").service("locales");
    let defaultLocale = await localeService.getDefaultLocale();
    let restLocale = (await localeService.find({})).map(({ code }) => code).filter((code) => code !== defaultLocale);
    if (!defaultLocale) {
      defaultLocale = restLocale[0];
      restLocale = restLocale.slice(1);
    }
    return {
      defaultLocale,
      restLocale
    };
  },
  updateConfigSchema,
  updateCreateNavigationSchema,
  updateNavigationItemAdditionalField,
  updateNavigationItemCustomField,
  updateUpdateNavigationSchema
});
const TARGET_TABLE_NAME = "navigations_items";
const TARGET_COLUMN_NAME = "related";
const migrationService = (context) => ({
  async migrateRelatedIdToDocumentId() {
    const hasColumn = await strapi.db.connection.schema.hasColumn(
      TARGET_TABLE_NAME,
      TARGET_COLUMN_NAME
    );
    if (!hasColumn) {
      return;
    }
    console.log("Navigation plugin :: Migrations :: Related id to document id - START");
    const navigationItemRepository = getNavigationItemRepository(context);
    const all = await navigationItemRepository.findV4({
      filters: {},
      limit: Number.MAX_SAFE_INTEGER
    });
    await Promise.all(
      all.map(async (item) => {
        const related = item.related;
        if (related && typeof related === "string") {
          const [__type, id] = related.split(RELATED_ITEM_SEPARATOR);
          if (!___default.isNaN(parseInt(id, 10))) {
            const relatedItem = await context.strapi.query(__type).findOne({ where: { id } });
            if (relatedItem) {
              await navigationItemRepository.save({
                item: {
                  documentId: item.documentId,
                  related: { __type, documentId: relatedItem.documentId }
                }
              });
            }
          }
        }
      })
    );
    await strapi.db.connection.schema.alterTable(TARGET_TABLE_NAME, (table) => {
      table.dropColumn(TARGET_COLUMN_NAME);
    });
    console.log("Navigation plugin :: Migrations :: Related id to document id - DONE");
  }
});
const services = {
  admin: adminService,
  common: commonService,
  client: clientService,
  migrate: migrationService
};
const index = {
  bootstrap,
  destroy,
  register,
  config,
  controllers,
  contentTypes,
  middlewares,
  policies,
  routes,
  services
};
module.exports = index;
//# sourceMappingURL=index.js.map
