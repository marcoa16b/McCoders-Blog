import React from 'react';
import ReactMarkdown from 'react-markdown';
import { materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Image from 'next/image';

const Markdown = ({ content }) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        components={{
          p: ({ node, children}) => {
            if (node.children[0].tagName === "img"){
              const image = node.children[0];
              const metastring = image.properties.alt;
              const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
              const isPriority = metastring?.toLowerCase().match('{priority}');
              
              return (
                <div className='image'>
                  <Image 
                    src={image.properties.src}
                    alt={alt}
                    width="850"
                    height="600"
                    className="postImg"
                    layout='responsive'
                    priority={isPriority}

                  />
                </div>
              )
            }
          },
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '');

            return (!inline && match) ? (
              <SyntaxHighlighter
                style={materialLight}
                PreTag="div"
                language={match[1]}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className ? className : ""} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>   
    </div>
  );
};

export default Markdown;