import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';
import { Flex } from '@mantine/core';
import { FC } from 'react';
import useKeyboardVisibility from '../../hooks/useKeyboardVisibility';
import { EditedFormattingToolbar } from './FormattingToolbar';

export const BlockNote: FC = () => {
  // Creates a new editor instance.
  const editor = useCreateBlockNote();
  const keyboardVisibility = useKeyboardVisibility();

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      formattingToolbar={false}
      sideMenu={false}
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
