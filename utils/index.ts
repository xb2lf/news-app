/*
 * @Author: {baixiao}
 * @version:
 * @Date: 2025-03-24 14:41:12
 * @LastEditors: {baixiao}
 * @LastEditTime: 2025-03-24 14:43:01
 * @Description:
 */
export const formatDate = (isoDate: Date | string) => {
  const options = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  const date = new Date(isoDate);

  return date.toLocaleDateString(undefined, options as any);
};
