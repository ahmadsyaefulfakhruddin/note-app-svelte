import { derived, writable } from "svelte/store";
import type { labelLocalStorage, Note, Tag } from "../types";

export function useLocalStorage<T>(label: labelLocalStorage, initialValue: T) {
  const localStorage = window.localStorage.getItem(label);
  const defaultValue = localStorage ? JSON.parse(localStorage) : initialValue;
  let store = writable<T>(defaultValue);

  store.subscribe((value) => {
    window.localStorage.setItem(label, JSON.stringify(value));
  });

  return store;
}

export const notes = useLocalStorage<Note[]>("NOTES", []);
export const tags = useLocalStorage<Tag[]>("TAGS", []);
export const trashNotes = useLocalStorage<string[]>("TRASHNOTES", []);

export const filtered = writable<Tag[]>([]);

export const note = writable<Note | null>(null);
export const showCreateNote = writable(false);
export const showEditNote = writable(false);
export const showEditTag = writable(false);
export const showHystory = writable(false);

export const infoTrashNote = writable(false);
export const delelteTimeOut = writable(0);

export const listNotes = derived(
  [notes, trashNotes, filtered],
  ([$notes, $trashNotes, $filtered]) => {
    const revomedTrash = $notes.filter(
      (note) => !$trashNotes.includes(note.id),
    );
    const filteredNotes = revomedTrash.filter((note) =>
      $filtered.every((filter) => note.tagIds.includes(filter.id)),
    );
    return filteredNotes;
  },
);

export const listTrashNotes = derived(
  [notes, trashNotes, filtered],
  ([$notes, $trashNotes, $filtered]) => {
    const trashNotes = $notes.filter((note) => $trashNotes.includes(note.id));
    const filteredTrashNotes = trashNotes.filter((trashNote) =>
      $filtered.every((filter) => trashNote.tagIds.includes(filter.id)),
    );
    return filteredTrashNotes;
  },
);
