import prettyMs from "pretty-ms";

const convertTimestamp = (timestamp) =>
  timestamp
    ? prettyMs(Date.now() - new Date(timestamp), {
        compact: true,
      }) + " ago"
    : "";

export { convertTimestamp };
