import { useCallback, useEffect, useState } from "react";
import * as Device from "expo-device";

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false)

  const checkIfTablet = useCallback(async () => {
    const deviceType = await Device.getDeviceTypeAsync();
    console.log("CUSTOM HOOK")
    return deviceType === Device.DeviceType.TABLET;
  }, [])

  useEffect(() => {
    checkIfTablet().then((isTablet) => setIsTablet(isTablet));
  }, []);

  return { isTablet }

}