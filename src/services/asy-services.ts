export const resizeFont = async (
  size: number
): Promise<Record<string, string | number>> => {
  const clampedSize = Math.max(0.5, Math.min(3, size)); // Limit to 0.5x–3x
  return {
    message: `Font resized to ${clampedSize}x for accessibility.`,
    newSize: clampedSize
  };
}

export const applyColorBlindnessFilter = async (
  type: string
): Promise<Record<string, string | number>> => {
  const validTypes = ["protanopia", "deuteranopia", "tritanopia"];
  if (!validTypes.includes(type)) {
    throw new Error("Invalid color blindness type");
  }
  const filterId = `${type}`;
  return {
    message: `Applied ${type} color blindness filter.`,
    filterId
  };
};