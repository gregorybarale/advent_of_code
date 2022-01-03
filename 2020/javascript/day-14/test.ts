import { applyMaskToAdress, applyMaskToNumber } from "./fn.ts";

console.log(applyMaskToNumber("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X")(11));
console.log(applyMaskToNumber("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X")(101));
console.log(applyMaskToNumber("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X")(0));

console.log("------");
console.log(applyMaskToAdress("000000000000000000000000000000X1001X")(42));
console.log(applyMaskToAdress("00000000000000000000000000000000X0XX")(26));
