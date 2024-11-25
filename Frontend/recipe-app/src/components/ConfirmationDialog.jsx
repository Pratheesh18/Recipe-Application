/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,Typography } from "@mui/material";


const ConfirmationDialog = ({open,onClose,onConfirm,title="Confirm Action",message="Are you sure want to proceed ?",confirmText="Yes",cancelText="No",confirmColor="error"}) => {
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{display:'flex',justifyContent:'center'}}>  {title} </DialogTitle>
            <DialogContent>
                <Typography> {message} </Typography>
            </DialogContent>
            <DialogActions sx={{display:'flex',justifyContent:'space-between'}} >
                <Button onClick={onClose} color="primary">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} color="error">
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfirmationDialog;