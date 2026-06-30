export const pageTransitionClass = (phase: "enter" | "idle" | "leave") => {
  switch (phase) {
    case "enter":
      return "opacity-0 translate-y-10";
    case "leave":
      return "opacity-0 translate-y-10";
    default:
      return "opacity-100 translate-y-0";
  }
};
