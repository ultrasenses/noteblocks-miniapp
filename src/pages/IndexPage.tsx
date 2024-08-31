import Masonry from 'react-layout-masonry';
import { Box, Text, TextInput } from '@mantine/core';
import { FC, useState } from 'react';
import { IconFilePlus, IconSearch } from '@tabler/icons-react';

export const IndexPage: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('recent');
  const heightValues = [180, 220, 260, 280, 300];
  const Card = () => (
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
        File name
      </Text>
    </Box>
  );

  const filters = [
    {
      label: 'Недавнее',
      value: 'recent'
    },
    {
      label: 'Доступные мне',
      value: 'available'
    }
  ];

  return (
    <Box
      maw='390px'
      px={12}
    >
      <TextInput
        placeholder='Найти'
        styles={{
          input: {
            backgroundColor: '#323232',
            height: 44,
            borderRadius: 12,
            borderColor: '#323232',
            fontSize: 16,
            color: '#AAAAAA'
          },
          wrapper: {
            marginTop: 12,
            marginBottom: 12
          }
        }}
        leftSection={<IconSearch size={24} />}
        leftSectionWidth={44}
      />
      <Box
        style={{
          flexDirection: 'row',
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box
          style={{
            borderRadius: 44,
            width: 44,
            height: 44,
            backgroundColor: '#2990FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconFilePlus
            size={30}
            fill='white'
            stroke={1.5}
          />
        </Box>
        {filters.map((filter, index) => (
          <Box
            key={index}
            h={44}
            w='40%'
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: selectedFilter === filter.value ? '#323232' : 'transparent',
              borderRadius: 24
            }}
            onClick={() => setSelectedFilter(filter.value)}
          >
            <Text
              size='md'
              fw={600}
              c='#CECECEFF'
            >
              {filter.label}
            </Text>
          </Box>
        ))}
      </Box>
      <Box
        bg='#242424'
        mt={16}
      >
        <Masonry
          columns={2}
          gap={12}
        >
          {Array.from({ length: 4 }).map(() => (
            <Card />
          ))}
        </Masonry>
      </Box>
    </Box>
  );
};
