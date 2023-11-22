import axios from 'axios';
import { GD_WEBSEV_KEY } from 'src/common/config';

interface GDLocation {
  adcode: string;
  city: string;
  info: string;
  infocode: string;
  province: string;
  rectangle: string;
  status: string;
}

export async function getGdLoc(params?: { ip: string }): Promise<GDLocation> {
  return await axios.get(
    `https://restapi.amap.com/v3/ip?key=${GD_WEBSEV_KEY}&output=json&ip=${
      params?.ip || ''
    }`
  );
}
