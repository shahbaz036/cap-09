import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import Suggestion from '@tiptap/suggestion';
import { ReactRenderer } from '@tiptap/react';
import tippy from 'tippy.js';
import VariableList from '../components/VariableList';
import { Variable } from '../types/variables';

export const VariableExtension = Extension.create({
  name: 'variable',

  addOptions() {
    return {
      variables: [],
      suggestion: {
        char: '{{',
        command: ({ editor, range, props }: { editor: any; range: any; props: Variable }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertContent(props.value)
            .run();
        },
        items: ({ query }: { query: string }) => {
          return this.options.variables.filter((variable: Variable) =>
            variable.label.toLowerCase().includes(query.toLowerCase())
          );
        },
        render: () => {
          let component: ReactRenderer | null = null;
          let popup: any[] = [];

          return {
            onStart: (props: any) => {
              if (!component) {
                component = new ReactRenderer(VariableList, {
                  props,
                  editor: props.editor,
                });

                if (component.element) {
                  popup = tippy('body', {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: component.element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: 'manual',
                    placement: 'bottom-start',
                  });
                }
              }
            },
            onUpdate(props: any) {
              if (component) {
                component.updateProps(props);

                if (popup[0]) {
                  popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                  });
                }
              }
            },
            onKeyDown(props: any) {
              if (props.event.key === 'Escape') {
                if (popup[0]) {
                  popup[0].hide();
                }
                return true;
              }

              return component?.ref?.onKeyDown(props);
            },
            onExit() {
              if (popup[0]) {
                popup[0].destroy();
              }
              if (component) {
                component.destroy();
              }
              component = null;
              popup = [];
            },
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    const variableRegex = /{{[^}]+}}/g;

    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
      new Plugin({
        key: new PluginKey('variable-highlight'),
        props: {
          decorations: (state) => {
            const decorations: Decoration[] = [];
            const doc = state.doc;

            doc.descendants((node: ProseMirrorNode, pos: number) => {
              if (node.isText) {
                const text = node.text || '';
                let match;

                while ((match = variableRegex.exec(text)) !== null) {
                  const start = pos + match.index;
                  const end = start + match[0].length;
                  
                  decorations.push(
                    Decoration.inline(start, end, {
                      class: 'variable-token',
                    })
                  );
                }
              }
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});