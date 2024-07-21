export function capitalizeString(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
}

export function transformUnderscoreString(useCase: string) {
  return useCase
    .split('_')
    .map((word) => capitalizeString(word))
    .join(' ');
}

export function splitByUpperCaseAndCapitalize(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .map((word) => capitalizeString(word))
    .join(' ');
}
