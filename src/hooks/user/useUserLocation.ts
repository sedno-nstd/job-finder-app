import { useState } from "react";

export const useUserLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  };
  return { location, getLocation };
};
