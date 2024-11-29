import { Box } from "@mui/material"
import DOMPurify from 'dompurify';

export default function TextMessageBox({message}) {
    return <>
        <Box
            sx={{
                p: 1,
                pl: 2,
                pr: 2,
                bgcolor: message.side === 'right' ? 'primary.main' : 'grey.300',
                color: message.side === 'right' ? 'primary.contrastText' : 'text.primary',
                borderRadius: 1,
                '& em': {  // Add styles for em tags
                    backgroundColor: 'yellow',
                    fontStyle: 'normal',
                    padding: '0 2px',
                }
            }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}
            
        >
            {/* {message.content} */}
        </Box>
    </>
}