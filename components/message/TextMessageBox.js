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
            }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}
        >
            {/* {message.content} */}
        </Box>
    </>
}