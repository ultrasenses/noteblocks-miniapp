import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from '../components/BlockNoteEditor';
import { useNotesStore } from '../store/notesStore';

export const NotePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getNoteById } = useNotesStore();

  const note = getNoteById(id ?? '');

  if (!note) {
    return <div>Note not found</div>;
  }
  return <Editor note={note} />;
};
