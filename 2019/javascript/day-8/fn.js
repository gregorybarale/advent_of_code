function getLayerChunk(input, chunkSize) {
  if (input.length % chunkSize !== 0)
    throw new Error("Input does not match chunk size");
  return input
    .split("")
    .map(x => Number.parseInt(x, 10))
    .reduce((acc, value, index) => {
      if (index % chunkSize === 0) {
        acc.push([value]);
      } else {
        acc[acc.length - 1].push(value);
      }
      return acc;
    }, []);
}

function displayImage(input, rowSize) {
  input
    .map(n => (n === 1 ? "X" : " "))
    .reduce((acc, value, index) => {
      if (index % rowSize === 0) {
        acc.push([value]);
      } else {
        acc[acc.length - 1].push(value);
      }
      return acc;
    }, [])
    .map(r => r.join(""))
    .forEach(r => {
      console.log(r);
    });
}

const fn1 = (input, height, width) => {
  const layersChunk = getLayerChunk(input, height * width).sort((a, b) => {
    const zeroInA = a.filter(x => x === 0).length;
    const zeroInB = b.filter(x => x === 0).length;
    if (zeroInA < zeroInB) return -1;
    if (zeroInA > zeroInB) return 1;
    return 0;
  });

  return (
    layersChunk[0].filter(x => x === 1).length *
    layersChunk[0].filter(x => x === 2).length
  );
};

const fn2 = (input, height, width) => {
  const layersChunk = getLayerChunk(input, height * width);
  const finalLayer = layersChunk.reverse().reduce(
    (topLayer, layer) => {
      return topLayer.map((topPixel, index) => {
        const layerPixel = layer[index];
        if (layerPixel === 2) {
          return topPixel;
        }
        return layerPixel;
      });
    },
    Array.from({ length: height * width }, x => 2)
  );

  displayImage(finalLayer, width)
};

module.exports = {
  fn1,
  fn2
};
