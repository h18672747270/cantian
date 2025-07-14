/**
 * @author zouzhifeng
 * @date 2024-07-18
 * @desc 像素转换vw
 * @param size 需要转化的设计图像素值
 * @returns 转化后的vw值
 */
export const calculateVw = (size: number): number => (size / 1920) * 100
