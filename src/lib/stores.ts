import { writable, type Writable } from 'svelte/store';
import type { Theme } from './types';

export let selectedId = writable(-1);
export let scrolledId = writable(-1);

export let showControls = writable(true);

export let theme: Writable<Theme | null> = writable(null);
