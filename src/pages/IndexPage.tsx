import { Box, Text, TextInput } from '@mantine/core';
import { FC, useState } from 'react';
import Masonry from 'react-layout-masonry';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AddFileIcon from '../assets/add-file.svg?react';
import SearchIcon from '../assets/search.svg?react';
import { PreviewCard } from '../components/PreviewCard';
import { useNotesStore } from '../store/notesStore';

export const IndexPage: FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const { addNote, isLimitReached, notes } = useNotesStore();
  const navigate = useNavigate();
  const handleAddNote = () => {
    if (!isLimitReached()) {
      const date = Date.now();
      const id = uuidv4();
      const newNote = {
        id: id,
        content: '',
        title: 'Untitled',
        isPublished: false,
        userId: 1, // Example userId, replace with actual userId
        lastSyncDate: date,
        createdDate: date,
        lastModifiedDate: date,
        isPinned: false
      };
      addNote(newNote);
      navigate(`/note/${id}`);
    }
  };

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

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Box
      maw='390px'
      px={12}
    >
      <TextInput
        placeholder='Найти'
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
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
        leftSection={
          <SearchIcon
            width={24}
            height={24}
          />
        }
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
          onClick={handleAddNote}
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
          <AddFileIcon
            width={28}
            height={28}
            color='white'
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
        {filteredNotes.length > 0 ? (
          <Masonry
            columns={2}
            gap={12}
          >
            {filteredNotes.map((note) => (
              <PreviewCard
                key={note.id}
                id={note.id}
                title={note.title}
              />
            ))}
          </Masonry>
        ) : (
          <Text
            size='md'
            fw={600}
            c='#CECECEFF'
            ta='center'
            mt={16}
          >
            No notes found
          </Text>
        )}
      </Box>
    </Box>
  );
};
