import { PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { Flex } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { useDebounce, useKeyboardVisibility } from '../../hooks';
import { Note, useNotesStore } from '../../store/notesStore';
import { EditedFormattingToolbar } from './FormattingToolbar';

interface EditorProps {
  note: Note;
}

export const Editor: FC<EditorProps> = ({ note }) => {
  const initialContent = note.content.length > 0 ? (JSON.parse(note.content) as PartialBlock[]) : undefined;
  const [content, setContent] = useState<string>(note.content);
  const debouncedContent = useDebounce(content, 5000);
  const { updateNoteById } = useNotesStore();
  const editor = useCreateBlockNote({
    initialContent
  });
  const keyboardVisibility = useKeyboardVisibility();

  useEffect(() => {
    if (debouncedContent) {
      const date = Date.now();
      updateNoteById(note.id, { content: JSON.stringify(editor.document), lastSyncDate: date, lastModifiedDate: date });
    }
  }, [debouncedContent]);

  return (
    <BlockNoteView
      editor={editor}
      formattingToolbar={false}
      sideMenu={false}
      onChange={() => setContent(JSON.stringify(editor.document))}
    >
      <Flex
        direction='row'
        align='center'
        justify='center'
        w='100%'
        pos='fixed'
        bottom={0}
        style={{ overflowX: 'auto' }}
      >
        {keyboardVisibility.isKeyboardVisible && <EditedFormattingToolbar />}
      </Flex>
    </BlockNoteView>
  );
};
