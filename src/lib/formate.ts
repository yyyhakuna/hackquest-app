export const tuple = <T extends string[]>(...args: T) => args

export const computeProgress = (n: number) => {
  return Math.floor(n * 100)
}

export const tagFormate = (input: string) => {
  if (!input) return input
  // if (input.toUpperCase() === input) {
  //   return input[0].toUpperCase() + input.substring(1).toLowerCase();
  // }
  // // 利用正则表达式将字符串分割成单词数组
  // const words = input.split(/[_\- ]+/);

  // // 将每个单词的首字母大写，并拼接成新的字符串
  // const formatted = words
  //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //   .join(' ');

  // return formatted;
  // 将字符串转换为小写，并用空格或下划线分割成单词数组
  const words = input.toLowerCase().split(/[\s_-]/)

  // 将每个单词的首字母大写，并连接成新的字符串
  const convertedStr = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return convertedStr
}

export const transformQueryString = (params: Record<string, any>) => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')
}
