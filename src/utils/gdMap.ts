import AMapLoader from '@amap/amap-jsapi-loader';
import {
  GD_WEBEND_SJC,
  GD_WEBEND_KEY,
  GD_WEBEND_VERSION
} from 'src/common/config';

window._AMapSecurityConfig = {
  securityJsCode: GD_WEBEND_SJC
};

interface MapOpt {
  container: string;
  options: object;
  plugins?: string[];
}

async function MapLoader(plugins?: string[]) {
  const AMap = await AMapLoader.load({
    key: GD_WEBEND_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: GD_WEBEND_VERSION, // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    plugins: plugins || [] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  });
  return AMap;
}

export default MapLoader;
