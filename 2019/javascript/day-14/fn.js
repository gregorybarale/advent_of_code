const reactionParser = (string) => {
  const [inputsString, output] = string.split('=>').map(x => x.trim());
  const [outputQuantity, outputElement] = output.split(' ');
  const inputs = inputsString.split(',').map(x => x.trim()).map(x => {
    const [inputQuantity, inputElement] = x.split(' ');
    return {
      id: inputElement,
      quantity: Number.parseInt(inputQuantity, 10)
    };
  });
  return {
    inputs,
    output: {
      id: outputElement,
      quantity: Number.parseInt(outputQuantity, 10)
    }
  }
}

const fn1 = reactionsAsString => {
  const reactions = reactionsAsString.map(reactionAsString => reactionParser(reactionAsString));
  const oreReactions = reactions.filter(reaction => reaction.inputs.some(input => input.id === 'ORE'));
  const othersReactions = reactions.filter(reaction => reaction.inputs.every(input => input.id !== 'ORE'));

  const elementsFromORE = oreReactions.map(reaction => reaction.output.id);

  let aggregatedReaction = { ...othersReactions.find(reaction => reaction.output.id === 'FUEL') };


  const nextAggregatedReaction = {
    output: aggregatedReaction.output
  };
  const inputsFromOre = aggregatedReaction.inputs.filter(input => elementsFromORE.includes(input.id));
  const inputsToTransform = aggregatedReaction.inputs.filter(input => !elementsFromORE.includes(input.id));

  console.log(aggregatedReaction);
  console.log(inputsFromOre);
  console.log(inputsToTransform);

  const transformedInput = inputsToTransform.map(input => {
    const reactionToObtainInput
  })

  //while (aggregatedReaction.inputs.some(input => !elementsFromORE.includes(input.id))) {
  //  
  //
  //}

  return undefined
};

const fn2 = input => {
  return undefined
};

module.exports = {
  fn1,
  fn2
};
