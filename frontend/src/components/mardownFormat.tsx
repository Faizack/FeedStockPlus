import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

interface propType{
    content: string;
}
export const MarkdownRenderer = ({ content }:propType) => {
  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}

    />
  );
};

