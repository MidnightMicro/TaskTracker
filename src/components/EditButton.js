import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ task, onEdit, index, onDelete }) {
  const [editedMaterials, setEditedMaterials] = useState(task.materials);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
      setOpen(false);
      onEdit(index, editedMaterials);
  };

  // const handleDelete = () => {
  //   setOpen(false);
  //   setEditedMaterials("")
  //   onDelete(index);
  // };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit material needed for this task, please provide the material
            correction here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Materials"
            type="text"
            required
            fullWidth
            variant="standard"
            value={editedMaterials}
            onChange={(e) => {
              setEditedMaterials(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button> */}
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
