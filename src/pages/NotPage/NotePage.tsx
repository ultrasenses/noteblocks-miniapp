import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useNotesStore } from '../../store/notesStore';
import { Box, Text } from '@mantine/core';
import classes from './NotePage.module.css';
import { Editor } from '../../components/BlockNoteEditor';

export const NotePage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getNoteById } = useNotesStore();

  const note = getNoteById(id ?? '');

  if (!note) {
    return <div>Note not found</div>;
  }
  return (
    <Box>
      <Box className={classes.buttonsRow_box}>
        <Box className={classes.openInBrowser_box}>
          <Text
            size='md'
            fw={600}
            c='#FFF'
            ta='center'
          >
            Открыть в браузере
          </Text>
        </Box>
        <Box className={classes.share_box}>
          <Text
            size='md'
            fw={600}
            c='#FFF'
            ta='center'
          >
            Поделиться
          </Text>
        </Box>
      </Box>
      <Editor note={note} />
    </Box>
  );
};
