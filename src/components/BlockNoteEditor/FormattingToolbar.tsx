import {
  BasicTextStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton
} from '@blocknote/react';
import { Flex } from '@mantine/core';
import { FC } from 'react';

export const EditedFormattingToolbar: FC = () => {
  return (
    <Flex
      direction='row'
      align='center'
      justify='center'
      w='100%'
      style={{ overflowX: 'auto' }}
      top={0}
      pos='fixed'
    >
      <FormattingToolbar>
        <FileCaptionButton key={'fileCaptionButton'} />
        <FileReplaceButton key={'replaceFileButton'} />

        <BasicTextStyleButton
          basicTextStyle={'bold'}
          key={'boldStyleButton'}
        />
        <BasicTextStyleButton
          basicTextStyle={'italic'}
          key={'italicStyleButton'}
        />
        <BasicTextStyleButton
          basicTextStyle={'underline'}
          key={'underlineStyleButton'}
        />
        <BasicTextStyleButton
          basicTextStyle={'strike'}
          key={'strikeStyleButton'}
        />
        {/* Extra button to toggle code styles */}
        <BasicTextStyleButton
          key={'codeStyleButton'}
          basicTextStyle={'code'}
        />

        <TextAlignButton
          textAlignment={'left'}
          key={'textAlignLeftButton'}
        />
        <TextAlignButton
          textAlignment={'center'}
          key={'textAlignCenterButton'}
        />
        <TextAlignButton
          textAlignment={'right'}
          key={'textAlignRightButton'}
        />

        {/* <ColorStyleButton key={'colorStyleButton'} /> */}

        <NestBlockButton key={'nestBlockButton'} />
        <UnnestBlockButton key={'unnestBlockButton'} />

        <CreateLinkButton key={'createLinkButton'} />
      </FormattingToolbar>
    </Flex>
  );
};
