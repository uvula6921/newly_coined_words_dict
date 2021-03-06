import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch } from "react-redux";
import {
  createDictFB,
  updateDictFB,
  modalOpen,
  reload,
} from "./redux/modules/dict";
import { withRouter } from "react-router";

const Write = (props) => {
  const [wordEmpty, setWordEmpty] = useState(false);
  const [defEmpty, setDefEmpty] = useState(false);
  const [examEmpty, setExamEmpty] = useState(false);
  const wordInput = useRef();
  const descInput = useRef();
  const examInput = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.match.path === "/write") {
      dispatch(reload(true));
    }
    return;
  }, []);

  const handleModalClose = () => {
    dispatch(modalOpen(false));
  };

  const submit = () => {
    if (
      wordInput.current.value.length &&
      descInput.current.value.length &&
      examInput.current.value.length
    ) {
      if (props.isEdit) {
        dispatch(
          updateDictFB({
            id: props.dictId,
            word: wordInput.current.value,
            desc: descInput.current.value,
            exam: examInput.current.value,
          })
        );
        handleModalClose();
      } else {
        dispatch(
          createDictFB({
            word: wordInput.current.value,
            desc: descInput.current.value,
            exam: examInput.current.value,
          })
        );
        dispatch(reload(false));
        props.history.push("/");
      }
    } else {
      if (wordInput.current.value === "") {
        setWordEmpty(true);
      } else {
        setWordEmpty(false);
      }

      if (descInput.current.value === "") {
        setDefEmpty(true);
      } else {
        setDefEmpty(false);
      }

      if (examInput.current.value === "") {
        setExamEmpty(true);
      } else {
        setExamEmpty(false);
      }
    }
  };

  return (
    <WriteWrap>
      <InputCont>
        {wordEmpty ? (
          <TextField
            id="new-coined-word"
            label="?????????"
            placeholder="???????????? ??????????????????"
            variant="outlined"
            fullWidth
            helperText="???????????? ??????????????????."
            inputRef={wordInput}
            error
            autoComplete="off"
          />
        ) : props.isEdit ? (
          <TextField
            id="new-coined-word"
            label="?????????"
            placeholder="???????????? ??????????????????"
            variant="outlined"
            fullWidth
            inputRef={wordInput}
            autoComplete="off"
            defaultValue={props.oneDict.word}
          />
        ) : (
          <TextField
            id="new-coined-word"
            label="?????????"
            placeholder="???????????? ??????????????????"
            variant="outlined"
            fullWidth
            inputRef={wordInput}
            autoComplete="off"
          />
        )}
      </InputCont>
      <InputCont>
        {defEmpty ? (
          <TextField
            id="description"
            label="??????"
            placeholder="????????? ??????????????????"
            variant="outlined"
            fullWidth
            helperText="????????? ??????????????????."
            inputRef={descInput}
            error
            multiline
            rows={2}
            autoComplete="off"
          />
        ) : props.isEdit ? (
          <TextField
            id="description"
            label="??????"
            placeholder="????????? ??????????????????"
            variant="outlined"
            fullWidth
            inputRef={descInput}
            multiline
            rows={2}
            autoComplete="off"
            defaultValue={props.oneDict.desc}
          />
        ) : (
          <TextField
            id="description"
            label="??????"
            placeholder="????????? ??????????????????"
            variant="outlined"
            fullWidth
            inputRef={descInput}
            multiline
            rows={2}
            autoComplete="off"
          />
        )}
      </InputCont>
      <InputCont>
        {examEmpty ? (
          <TextField
            id="example"
            label="??????"
            placeholder="????????? ??????????????????"
            variant="outlined"
            fullWidth
            helperText="????????? ??????????????????."
            inputRef={examInput}
            error
            multiline
            rows={2}
            autoComplete="off"
            // onKeyUp={(e) => {
            //   if (e.key === "Enter") {
            //     submit();
            //   }
            // }}
          />
        ) : props.isEdit ? (
          <TextField
            id="example"
            label="??????"
            placeholder="????????? ??????????????????"
            variant="outlined"
            fullWidth
            inputRef={examInput}
            multiline
            rows={2}
            autoComplete="off"
            defaultValue={props.oneDict.exam}
            // onKeyUp={(e) => {
            //   if (e.key === "Enter") {
            //     submit();
            //   }
            // }}
          />
        ) : (
          <TextField
            id="example"
            label="??????"
            placeholder="????????? ??????????????????"
            variant="outlined"
            fullWidth
            inputRef={examInput}
            multiline
            rows={2}
            autoComplete="off"
            // onKeyUp={(e) => {
            //   if (e.key === "Enter") {
            //     submit();
            //   }
            // }}
          />
        )}
      </InputCont>

      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<SaveIcon />}
        onClick={submit}
        fullWidth
        style={{
          marginTop: "30px",
        }}
      >
        Save
      </Button>
    </WriteWrap>
  );
};

const WriteWrap = styled.div`
  padding: 50px 20px;
`;

const InputCont = styled.div`
  margin-top: 20px;
  &:first-child {
    margin-top: 0;
  }
`;

export default withRouter(Write);
