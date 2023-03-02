const myObj = {
  a: 6,
  b: 2,
  c: 3,
  d: {
    e: 4,
    f: 5,
    g: {
      h: 6,
      i: 7,
      j: {
        k: 8,
        l: 9,
        m: 10,
        n: {
          o: 2,
          p: 1
        }
      }
    }
  }
};

const process = (obj) => {
  const newObject = {};
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (obj[key] % 2 === 0) newObject[key] = obj[key];
    else if (typeof(obj[key]) ===  "object") newObject[key] = process(obj[key]);
  });

  return newObject;
};

const result = process(myObj);
console.log(result);