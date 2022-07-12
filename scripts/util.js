export function camelize(str) {
  return capitalize(str.replace(/[_.-](\w|$)/g, function (_, x) {
    return x.toUpperCase();
  }));
}

const capitalize = str => str.charAt(0).toLowerCase() + str.slice(1)
