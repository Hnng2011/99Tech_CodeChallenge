// utils/importSVG.ts
export const importSVG = async (currency: string): Promise<string> => {
  try {
    const svg = await import(`../../public/tokens/${currency}.svg`);
    return svg.default;
  } catch (error) {
    return "";
  }
};
