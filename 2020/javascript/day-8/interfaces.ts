export enum OperationEnum {
  ACC = "acc",
  JMP = "jmp",
  NOP = "nop",
}

export interface IInstruction {
  id: number;
  operation: OperationEnum;
  argument: number;
}

export interface IGameConsole {
  runnedInstruction: ReadonlyArray<IInstruction>;
  accumulator: number;
}
