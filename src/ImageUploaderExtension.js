import { Node, mergeAttributes } from '@tiptap/core';

export const ImageUploaderExtension = Node.create({
  name: 'image',
  group: 'block',
  draggable: true,
  selectable: true,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: 'img' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)];
  },
  addCommands() {
    return {
      setImage:
        (src) =>
        ({ commands }) => {
          return commands.insertContent(`<img src="${src}" />`);
        },
    };
  },
});
