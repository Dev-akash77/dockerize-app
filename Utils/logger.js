import pkg from "signale";
const { Signale } = pkg;

const options = {
  types: {
    success: {
      badge: "",
      color: "green",
      label: "success",
      logLevel: "info",
    },
    error: {
      badge: "",
      color: "red",
      label: "error",
      logLevel: "error",
    },
    warn: {
      badge: "",
      color: "yellow",
      label: "warn",
      logLevel: "warn",
    },
    info: {
      badge: "",
      color: "blue",
      label: "info",
      logLevel: "info",
    },
    pending: {
      badge: "",
      color: "cyan",
      label: "pending",
      logLevel: "info",
    },
    note: {
      badge: "",
      color: "magenta",
      label: "note",
      logLevel: "info",
    },
    complete: {
      badge: "",
      color: "green",
      label: "note",
      logLevel: "info",
    },
  },
};

export const logger = new Signale(options);

 