

export function includeAll (arr: any[], target: any[]) {
  return arr.every(v => target.includes(v));
}