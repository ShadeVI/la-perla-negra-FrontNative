

export function lineHeight(fontSize: number) {
  const multiplier = fontSize > 20 ? 1.5 : 1;
  return fontSize + fontSize * multiplier;
}
