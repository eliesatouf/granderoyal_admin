import { isProd } from './environment';

export function getSharedAsset(path) {
  if (isProd) {
    return `/granderoyal/shared-static/${path}`;
  } else {
    return `/shared/${path}`;
  }
}