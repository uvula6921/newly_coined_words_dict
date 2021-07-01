import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { Link } from "react-router-dom";
import { Card, Typography, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDictFB,
  modalOpen,
  loadDictFB,
  reload,
} from "./redux/modules/dict";
import Edit from "./Edit";
import FetchMore from "./FetchMore";
import { withRouter } from "react-router";

const List = (props) => {
  const dict_list = useSelector((state) => state.dict.list);
  const shouldScroll = useSelector((state) => state.dict.scroll);
  const scrollTarget = useRef();
  const dispatch = useDispatch();
  const [oneDict, setOneDict] = useState({});
  const [dictId, setDictID] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const reload = useSelector((state) => state.dict.reload);

  useEffect(() => {
    if (reload) {
      window.location.reload(); // /write 페이지로 갔다가 다시 돌아왔을때 렌더링에 문제가 있어서 임시로 새로고침 처리함.
      dispatch(reload(false));
    }
  }, []);

  useEffect(async () => {
    setLoading(true);
    dispatch(loadDictFB(page));
    setLoading(false);
  }, [page]);

  const callOneDict = (id) => {
    const selectedDict = dict_list.filter((l, idx) => {
      return l.id === id;
    });
    setOneDict(selectedDict[0]);
  };

  if (shouldScroll && scrollTarget.current) {
    // scrollTarget.current 를 두번(리덕스 데이터 불러올때, 파이어스토어 데이터 불러올때) 불러오는데
    // 리덕스 데이터때에는 scrollTarget.current 값이 없으므로 scrollTarget.current가 있을때만 scroll되도록 한다.
    setTimeout(function () {
      scrollTarget.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 200);
  }

  return (
    <ListWrap ref={scrollTarget}>
      {dict_list.map((l, idx) => {
        return (
          <Card
            key={l.id}
            id={l.id}
            style={{
              margin: "20px",
              border: "2px solid #888",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              position: "relative",
            }}
          >
            <IconButton
              size="small"
              aria-label="delete"
              style={{
                backgroundColor: "#0B184E",
                padding: "8px",
                position: "absolute",
                top: "3px",
                right: "5px",
              }}
              onClick={() => {
                dispatch(deleteDictFB(l.id));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </IconButton>
            <IconButton
              size="small"
              aria-label="edit"
              style={{
                backgroundColor: "#0B184E",
                padding: "8px",
                position: "absolute",
                top: "3px",
                right: "45px",
              }}
              onClick={() => {
                dispatch(modalOpen(true));
                callOneDict(l.id);
                setDictID(l.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M5 19h1.414l9.314-9.314-1.414-1.414L5 17.586V19zm16 2H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L9.243 19H21v2zM15.728 6.858l1.414 1.414 1.414-1.414-1.414-1.414-1.414 1.414z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </IconButton>

            <CardContent>
              <Typography
                variant="subtitle1"
                component="h4"
                style={{
                  fontWeight: "800",
                }}
              >
                신조어
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {l.word}
              </Typography>
              <Typography
                variant="subtitle1"
                component="h4"
                style={{
                  fontWeight: "800",
                }}
              >
                설명
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {l.desc}
              </Typography>
              <Typography
                variant="subtitle1"
                component="h4"
                style={{
                  fontWeight: "800",
                }}
              >
                예문
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {l.exam}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
      <Link to="/write">
        <IconButton
          aria-label="create"
          style={{
            position: "fixed",
            bottom: "calc(50% - 35vh)",
            right: "calc(50% - 190px)",
            backgroundColor: "#2E3C7E",
            color: "#FBEAEB",
          }}
        >
          <CreateIcon />
        </IconButton>
      </Link>

      <Edit oneDict={oneDict} dictId={dictId}></Edit>
      <FetchMore loading={page !== 0 && loading} setPage={setPage} />
    </ListWrap>
  );
};

const ListWrap = styled.div`
  padding-top: 30px;
`;

export default withRouter(List);
