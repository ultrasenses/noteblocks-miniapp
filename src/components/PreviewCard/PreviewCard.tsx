import { Box, Text } from '@mantine/core';
import { FC } from 'react';
import { DumbLink } from '../Link';

interface PreviewCardProps {
  title: string;
  id: string;
}

export const PreviewCard: FC<PreviewCardProps> = ({ title, id }) => {
  const heightValues = [180, 220, 260, 280, 300];
  return (
    <DumbLink to={`/note/${id}`}>
      <Box
        bg='#464646'
        h={heightValues[(heightValues.length * Math.random()) | 0]}
        style={{ flexDirection: 'column', display: 'flex', padding: '12px', borderRadius: '12px' }}
      >
        <Text
          size='lg'
          fw={600}
          c='#CECECEFF'
        >
          {title}
        </Text>
      </Box>
    </DumbLink>
  );
};
