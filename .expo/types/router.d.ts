/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/authModal`; params?: Router.UnknownInputParams; } | { pathname: `/deliveryPartnerLogin`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/sellerLogin`; params?: Router.UnknownInputParams; } | { pathname: `/splash`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/[category]`, params: Router.UnknownInputParams & { category: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/authModal`; params?: Router.UnknownOutputParams; } | { pathname: `/deliveryPartnerLogin`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/sellerLogin`; params?: Router.UnknownOutputParams; } | { pathname: `/splash`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/[category]`, params: Router.UnknownOutputParams & { category: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/authModal${`?${string}` | `#${string}` | ''}` | `/deliveryPartnerLogin${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/sellerLogin${`?${string}` | `#${string}` | ''}` | `/splash${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/authModal`; params?: Router.UnknownInputParams; } | { pathname: `/deliveryPartnerLogin`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/sellerLogin`; params?: Router.UnknownInputParams; } | { pathname: `/splash`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | `/${Router.SingleRoutePart<T>}${`?${string}` | `#${string}` | ''}` | { pathname: `/[category]`, params: Router.UnknownInputParams & { category: string | number; } };
    }
  }
}
