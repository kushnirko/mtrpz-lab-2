export const pipe = (fns) => (data) => fns.reduce((acc, fn) => fn(acc), data);

export default { pipe };
