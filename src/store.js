import { writable } from "svelte/store";

export const isLoading = writable(false);
export const errors = writable([]);
export const url = writable("");
export const recordType = writable("");
export const result = writable({});
