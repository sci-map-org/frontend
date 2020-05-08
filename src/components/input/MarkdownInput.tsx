import dynamic from 'next/dynamic';

import SimpleMDE, { SimpleMDEEditorProps } from 'react-simplemde-editor';
// const SimpleMDE = dynamic(import('react-simplemde-editor'), { ssr: false });

export const MarkdownInput: React.FC<
  {
    content?: string;
    setContent: (content: string) => void;
  } & Omit<SimpleMDEEditorProps, 'onChange' | 'value'>
> = ({ content, setContent, ...props }) => {
  return (
    <SimpleMDE key="new_article_mde" id="mardownEditorId" onChange={(e) => setContent(e)} value={content} {...props} />
  );
};
