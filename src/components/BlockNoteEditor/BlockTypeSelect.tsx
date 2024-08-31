// import { Block, BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';
// import { blockTypeSelectItems, useBlockNoteEditor, useEditorContentOrSelectionChange } from '@blocknote/react';
// import { useCallback, useMemo, useState } from 'react';

// // Simplified schema without media, file, and table blocks.
// export const schema = BlockNoteSchema.create({
//   blockSpecs: {
//     paragraph: defaultBlockSpecs.paragraph,
//     heading: defaultBlockSpecs.heading,
//     bulletListItem: defaultBlockSpecs.bulletListItem,
//     numberedListItem: defaultBlockSpecs.numberedListItem,
//     checkListItem: defaultBlockSpecs.checkListItem
//   }
// });

// export type TextBlockSchema = typeof schema.blockSchema;

// function BlockTypeSelect() {
//   const editor = useBlockNoteEditor<TextBlockSchema>();

//   // The block currently containing the text cursor.
//   const [block, setBlock] = useState<Block>(editor.getTextCursorPosition().block);

//   // Updates the block currently containing the text cursor whenever the editor
//   // content or selection changes.
//   useEditorContentOrSelectionChange(() => setBlock(editor.getTextCursorPosition().block), editor);

//   // Gets the default items for the select.
//   const defaultBlockTypeSelectItems = useMemo(() => blockTypeSelectItems(editor.dictionary), [editor.dictionary]);

//   // Gets the selected item.
//   const selectedItem = useMemo(
//     () => defaultBlockTypeSelectItems.find((item) => item.isSelected(block as any))!,
//     [defaultBlockTypeSelectItems, block]
//   );

//   // Updates the state when the user chooses an item.
//   const onChange = useCallback(
//     (event: SelectChangeEvent<string>) => {
//       const newSelectedItem = defaultBlockTypeSelectItems.find((item) => item.name === event.target.value)!;

//       editor.updateBlock(block, {
//         type: newSelectedItem.type as keyof TextBlockSchema,
//         props: newSelectedItem.props
//       });
//       editor.focus();

//       setBlock(editor.getTextCursorPosition().block);
//     },
//     [block, defaultBlockTypeSelectItems, editor]
//   );

//   return (
//     <MUIToolbarSelect
//       items={defaultBlockTypeSelectItems}
//       selectedItem={selectedItem}
//       onChange={onChange}
//     />
//   );
// }
