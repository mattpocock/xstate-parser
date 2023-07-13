import { createMachine, MachineConfig } from "xstate";

const config: MachineConfig<any, any, any> = {
  states: {
    a: { always: { target: "b" } },
    b: { type: "final" },
  },
};

export const nestedSpreadMachine = createMachine({
  initial: "A",
  states: {
    A: { ...config },
    B: { ...config, states: { ...config.states, c: {} } },
  },
});
