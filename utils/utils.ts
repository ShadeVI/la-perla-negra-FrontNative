import * as Device from "expo-device";

export function lineHeight(fontSize: number) {
  const multiplier = fontSize > 20 ? 1.5 : 1;
  return fontSize + fontSize * multiplier;
}

export const checkIfTablet = async () => {
  const deviceType = await Device.getDeviceTypeAsync();
  return deviceType === Device.DeviceType.TABLET;
};