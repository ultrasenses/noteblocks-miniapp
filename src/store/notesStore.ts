import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cloudStorage } from '../utils/cloudStorage';

interface Note {
  id: number;
  content: string;
  userId: number;
  isPublished: boolean;
  isPinned: boolean;
  createdDate: number;
  lastSyncDate: number;
  lastModifiedDate: number;
}

interface NotesState {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNoteById: (id: number, updatedNote: Partial<Note>) => void;
  deleteNoteById: (id: number) => void;
  pinNoteById: (id: number) => void;
  unpinNoteById: (id: number) => void;
  clearAll: () => void;
  isLimitReached: boolean;
  getNoteById: (id: number) => Note | undefined;
  lastModifiedNote: Note | undefined;
  allNotes: Note[];
  pinnedNotes: Note[];
  regularNotes: Note[];
}

export const useNotesStore = create<NotesState, [['zustand/persist', Note[]]]>(
  persist(
    (set, get) => ({
      notes: [],
      addNote: (note) =>
        set((state) => {
          if (state.notes.length >= 500) {
            return state; // Do not add if limit is reached
          }
          return { notes: [...state.notes, note] };
        }),
      updateNoteById: (id, updatedNote) =>
        set((state) => ({
          notes: state.notes.map((note) => (note.id === id ? { ...note, ...updatedNote, lastModifiedDate: Date.now() } : note))
        })),
      deleteNoteById: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id)
        })),
      pinNoteById: (id) =>
        set((state) => ({
          notes: state.notes.map((note) => (note.id === id ? { ...note, pinned: true, lastModifiedDate: Date.now() } : note))
        })),
      unpinNoteById: (id) =>
        set((state) => ({
          notes: state.notes.map((note) => (note.id === id ? { ...note, pinned: false, lastModifiedDate: Date.now() } : note))
        })),
      getNoteById: (id) => get().notes.find((note) => note.id === id),
      clearAll: () => set({ notes: [] }),
      get isLimitReached() {
        return get().notes.length >= 500;
      },
      get lastModifiedNote() {
        return get().notes.reduce(
          (latest, note) => {
            return latest && latest.lastModifiedDate > note.lastModifiedDate ? latest : note;
          },
          undefined as Note | undefined
        );
      },
      get lastSyncedNote() {
        return get().notes.reduce(
          (latest, note) => {
            return latest && latest.lastSyncDate > note.lastSyncDate ? latest : note;
          },
          undefined as Note | undefined
        );
      },
      get allNotes() {
        return get().notes;
      },
      get pinnedNotes() {
        return get().notes.filter((note) => note.isPinned);
      },
      get regularNotes() {
        return get().notes.filter((note) => !note.isPinned);
      }
    }),
    {
      name: 'notes-storage', // name of the item in the storage
      getStorage: () => cloudStorage,
      onRehydrateStorage: () => {
        console.log('[Notes storage]: hydration starts');

        return (_, error) => {
          if (error) {
            console.log('[Notes storage]: an error happened during hydration', error);
          } else {
            console.log('[Notes storage]: hydration finished');
          }
        };
      }
    }
  )
);

export const clearAllNotes = () => useNotesStore.persist.clearStorage();
export const rehydrateNotes = () => useNotesStore.persist.rehydrate();
