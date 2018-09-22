export default function (func) {
  return (...args) => new Promise((resolve, reject) => {
    func.call(this, ...args, resolve, reject);
  });
}
