import { writable, derived } from "svelte/store";

export const errors = writable([]);
export const url = writable("");
export const recordType = writable("AAAA");
export const result = writable({});

export const defaultState = { recordType: "AAAA", url: "" };

export const urlString = derived(
  [url, recordType],
  ([$url, $recordType], set) => {
    set(`?url=${$url}&recordType=${$recordType}`);
  }
);
