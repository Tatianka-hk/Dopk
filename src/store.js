import { writable } from "svelte/store";
import { derived } from "svelte/store";

export const isLoading = writable(false);
export const errors = writable([]);
export const url = writable("");
export const recordType = writable("AAAA");
export const result = writable({});
export const urlString = derived(
  [url, recordType],
  ([$url, $recordType]) => `?url=${$url}&recordType=${$recordType}`
);
