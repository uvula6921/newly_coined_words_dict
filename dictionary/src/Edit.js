import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Write from "./Write";
import { modalOpen } from "./redux/modules/dict";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    width: "356px",
  },
}));

const Edit = ({ oneDict, dictId }) => {
  const editModalOpen = useSelector((state) => state.dict.modalOpen);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(modalOpen(false));
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={editModalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editModalOpen}>
          <div className={classes.paper}>
            <Write
              isEdit={editModalOpen}
              oneDict={oneDict}
              dictId={dictId}
            ></Write>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Edit;
