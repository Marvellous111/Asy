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
  const validTypes = [
    'protanopia', 'protanomaly',
    'deuteranopia', 'deuteranomaly',
    'tritanopia', 'tritanomaly',
    'achromatopsia', 'achromatomaly',
    'normal',
  ];
  if (!validTypes.includes(type)) {
    throw new Error("Invalid color blindness type");
  }
  const filterId = `${type}`;
  return {
    message: `Applied ${type} color blindness filter.`,
    filterId
  };
};

export const enlargeTargets = async (
  scale: number
): Promise<Record<string, string|number>> => {
  const clampedScale = Math.max(1, Math.min(2, scale));
  return { 
    message: `Enlarged clickable areas to ${clampedScale}x.`,
    targetScale: clampedScale
  };
}

export const setDyslexiaFont = async (
  setFont: boolean
): Promise<Record<string, string|boolean>> => {
  if (setFont === false) {
    return {
      message: 'Removed dyslexia-friendly font.',
      dyslexiaFont: setFont
    };
  }
  return { 
    message: 'Applied dyslexia-friendly font.',
    dyslexiaFont: setFont
  };
}

export const reduceMotion = async(
  reduceMotion: boolean
): Promise<Record<string, string|boolean>> => {
  if (reduceMotion === false) {
    return {
      message: 'Disabled reduced-motion mode',
      reduceMotion
    };
  }
  return {
    message: 'Enabled reduced-motion mode.',
    reduceMotion 
  };
};