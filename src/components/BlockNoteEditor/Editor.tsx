import { PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { Flex, TextInput } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { useDebounce } from '../../hooks';
import { Note, useNotesStore } from '../../store/notesStore';
import { EditedFormattingToolbar } from './FormattingToolbar';

interface EditorProps {
  note: Note;
}

export const Editor: FC<EditorProps> = ({ note }) => {
  const initialContent = note.content.length > 0 ? (JSON.parse(note.content) as PartialBlock[]) : undefined;
  const [content, setContent] = useState<string>(note.content);
  const debouncedContent = useDebounce(content, 3000);
  const { updateNoteById } = useNotesStore();
  const editor = useCreateBlockNote({
    initialContent
  });

  useEffect(() => {
    if (debouncedContent) {
      const date = Date.now();
      updateNoteById(note.id, { content: JSON.stringify(debouncedContent), lastSyncDate: date, lastModifiedDate: date });
    }
  }, [debouncedContent]);

  const updateTitle = (title: string) => {
    const date = Date.now();
    updateNoteById(note.id, { title, lastSyncDate: date, lastModifiedDate: date });
  };
  return (
    <Flex direction='column'>
      <TextInput
        mt={32}
        p={16}
        variant='unstyled'
        size='xl'
        radius='xs'
        placeholder='Note title'
        value={note.title}
        onChange={(event) => updateTitle(event.currentTarget.value)}
      />
      <BlockNoteView
        editor={editor}
        formattingToolbar={false}
        sideMenu={false}
        onChange={() => setContent(JSON.stringify(editor.document))}
      >
        <EditedFormattingToolbar />
      </BlockNoteView>
    </Flex>
  );
};
