import type { BTActionNode, BTContext, BTNode, BTStatus } from "./types";

// Selector: tries children in order, returns success on first success
export const selector =
  (...children: BTNode[]): BTNode =>
  (context: BTContext): BTStatus => {
    for (const child of children) {
      const status = child(context);
      if (status !== "failure") return status;
    }
    return "failure";
  };

// Sequence: runs children in order, fails on first failure
export const sequence =
  (...children: BTNode[]): BTNode =>
  (context: BTContext): BTStatus => {
    for (const child of children) {
      const status = child(context);
      if (status !== "success") return status;
    }
    return "success";
  };

// Condition: returns success/failure based on predicate
export const condition =
  (predicate: (context: BTContext) => boolean): BTNode =>
  (context: BTContext): BTStatus =>
    predicate(context) ? "success" : "failure";

// Action node factory: wraps action result in a BTNode
export const actionNode =
  (action: BTActionNode): BTNode =>
  (context: BTContext): BTStatus =>
    action(context).status;

// Inverter: inverts success/failure
export const inverter =
  (child: BTNode): BTNode =>
  (context: BTContext): BTStatus => {
    const status = child(context);
    if (status === "success") return "failure";
    if (status === "failure") return "success";
    return "running";
  };
