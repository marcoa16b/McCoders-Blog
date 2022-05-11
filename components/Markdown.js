import React from 'react';
import ReactMarkdown from 'react-markdown';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import gfm from 'remark-gfm';
import Image from 'next/image';

// import 'katex/dist/katex.mjs'

const Markdown = ({ content }) => {

  // const newProps = {
  //   ...content,
  //   plugins: [
  //     remarkMath,
  //   ],
  //   renderers: {
  //     ...content.renderers,
  //     math: (props) => 
  //       <MathJax.Node formula={props.value} />,
  //     inlineMath: (props) => 
  //       <MathJax.Node inline formula={props.value} />,
  //   }
  // };

  return (
    <div className="markdown-body">
      {/* <MathJax.Provider input="tex"> */}
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
                      priority={true}

                    />
                  </div>
                )
              }
              return <p>{children}</p>;
            },
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');

              return (!inline && match) ? (
                <SyntaxHighlighter
                  style={materialDark}
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
          remarkPlugins={[gfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {content}
        </ReactMarkdown>   
      {/* </MathJax.Provider> */}
    </div>
  );
};

export default Markdown;