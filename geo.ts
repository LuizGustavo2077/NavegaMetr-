import { Geolocation } from '@capacitor/geolocation';

export const Geo = {
  getCurrentPosition: async () => {
    try {
      // tenta Capacitor
      const pos = await Geolocation.getCurrentPosition();
      return { lat: pos.coords.latitude, lng: pos.coords.longitude };
    } catch (e) {
      // fallback browser
      return new Promise<{lat:number,lng:number}>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(p => resolve({ lat:p.coords.latitude, lng:p.coords.longitude }), reject);
      });
    }
  }
};
