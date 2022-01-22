import { writable } from "svelte/store";
import { derived } from "svelte/store";

export const isLoading = writable(false);
export const errors = writable([]);
export const url = writable("");
export const recordType = writable("AAAA");
const urlSearchParams = new URLSearchParams(window.location.search);
export const params = Object.fromEntries(urlSearchParams.entries());
export const result = writable({});
export const defaultState = { recordType: "AAAA" };
