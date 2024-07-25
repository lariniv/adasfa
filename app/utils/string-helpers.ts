export function capitalizeString(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
}

export function transformUnderscoreString(str: string) {
  return str
    .split('_')
    .map((word) => capitalizeString(word))
    .join(' ');
}

export function transformToUnderscoreString(str: string) {
  return str
    .split(' ')
    .map((word) => word.toLowerCase())
    .join('_');
}

export function splitByUpperCaseAndCapitalize(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .map((word) => capitalizeString(word))
    .join(' ');
}
