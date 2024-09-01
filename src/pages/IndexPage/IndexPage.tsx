import { Box, Tabs, Text, TextInput } from '@mantine/core';
import { FC, useState } from 'react';
import Masonry from 'react-layout-masonry';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import SearchIcon from '../../assets/search.svg?react';
import AddFileIcon from '../../assets/add-file.svg?react';
import { PreviewCard } from '../../components/PreviewCard';
import { useNotesStore } from '../../store/notesStore';
import classes from './IndexPage.module.css';

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
    <Box>
      <TextInput
        placeholder='Найти'
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
        classNames={{ input: classes.searchInput_textInput, wrapper: classes.searchWrapper_textInput }}
        leftSection={
          <SearchIcon
            width={24}
            height={24}
          />
        }
        leftSectionWidth={44}
      />

      <Tabs
        defaultValue='recent'
        variant='unstyled'
        value={selectedFilter}
        onChange={setSelectedFilter}
        classNames={{
          tab: classes.tab_tabs,
          tabLabel: classes.label_tabs,
          list: classes.list_tabs
        }}
      >
        <Tabs.List grow>
          <Box
            onClick={handleAddNote}
            className={classes.addFileButton_box}
          >
            <AddFileIcon
              width={28}
              height={28}
              color='white'
            />
          </Box>
          {filters.map((filter, index) => (
            <Tabs.Tab
              value={filter.value}
              key={index}
            >
              {filter.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
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
