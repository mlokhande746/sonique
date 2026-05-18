/**
 * Calculates a point on a radar chart based on a value and index.
 * 
 * @param value - The value (0-100)
 * @param index - The index of the axis
 * @param total - Total number of axes
 * @param centerX - Center X coordinate
 * @param centerY - Center Y coordinate
 * @param radius - Maximum radius
 * @returns {x, y} coordinates
 */
export const getRadarPoint = (
  value: number,
  index: number,
  total: number,
  centerX: number,
  centerY: number,
  radius: number
) => {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = (value / 100) * radius;
  return {
    x: centerX + r * Math.cos(angle),
    y: centerY + r * Math.sin(angle),
  };
};
