import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({handleAgree, handleDisagree, openState, title, discription, agreeText = "agree", disagreeText = "disagree"}) {
//   const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    openState.setOpen(true);
  };

  const handleClose = (func) => {
    openState.setOpen(false);
    // if func is a function then call it
    if(typeof func === 'function'){
        func();
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={openState.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {discription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(handleDisagree)}>{disagreeText}</Button>
          <Button onClick={()=>handleClose(handleAgree)} autoFocus>
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
