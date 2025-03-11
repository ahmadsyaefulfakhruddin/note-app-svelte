export type labelLocalStorage = "NOTES" | "TAGS" | "MODE" | "TRASHNOTES";
export type Mode = "dark" | "light";

export type Note = {
  id: string;
  tagIds: string[];
} & NoteData 

export type NoteData = {
  title: string;
  body: string;
};

export type Tag = {
  id: string;
} & TagData;

export type TagData = {
  label: string;
};

export type IsError = {
  message: string;
  error: {
    title: boolean;
    tag: boolean;
  };
};
