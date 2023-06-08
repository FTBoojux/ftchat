import { Box, Button } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, coyWithoutShadows, darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// darcula webstorm
// vscDarkPlus vscode暗色主题


const them = {
  dark: vscDarkPlus,
  light: coyWithoutShadows
};

const OmsViewMarkdown = (props) => {
  const { textContent, darkMode } = props;
  if (typeof darkMode === 'undefined') {
    them.light = darcula;
  }
  if (typeof darkMode === 'boolean') {
    them.light = coyWithoutShadows;
  }
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
            const copy = () => {
                if(navigator.clipboard) {
                    navigator.clipboard.writeText(children);
                }
            }
            console.log('match', children);
            return !inline && match ? (
                <Box>
                    <Box
                        sx={{
                            display:'flex'
                        }}
                    >
                        <Box
                            sx={{
                                flex:1
                            }}
                        ></Box>
                        <Button 
                            onClick={()=>copy()}
                        >
                            <ContentCopyIcon/>
                        </Button>
                        
                    </Box>
                    <SyntaxHighlighter
                        showLineNumbers={true}
                        style={darkMode ? them.dark : them.light}
                        language={match[1]}
                        PreTag='div'
                        {...props}
                    >
                        {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                </Box>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        }
      }}
    >
      {textContent}
    </ReactMarkdown>
  );
};

export default OmsViewMarkdown;

