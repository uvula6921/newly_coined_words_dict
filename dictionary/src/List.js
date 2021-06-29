import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {IconButton} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { Link } from "react-router-dom";
import {Card, Typography, CardContent} from '@material-ui/core';
import { useSelector } from "react-redux";

const List = (props) => {
  
  const bucket_list = useSelector((state) => state.dict.list);
  const shouldScroll = useSelector((state) => state.dict.scroll);
  const scrollTarget = useRef();

  React.useEffect(() => {
    
  }, []);
  
  if (shouldScroll && scrollTarget.current) {
    scrollTarget.current.scrollIntoView({behavior: 'smooth', block: 'end'})
  }

  return (
    <ListWrap ref={scrollTarget}>
      {
        bucket_list.map((l, idx) => {
          return (
            <Card key={l.id} id={l.id} style={{
              margin: '20px',
              border: '2px solid #888',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            }}>
              <CardContent>
                <Typography variant="subtitle1" component="h4" style={{
                  fontWeight: '800',
                }}>
                  신조어
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {l.word}
                </Typography>
                <Typography variant="subtitle1" component="h4" style={{
                  fontWeight: '800',
                }}>
                  설명
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {l.desc}
                </Typography>
                <Typography variant="subtitle1" component="h4" style={{
                  fontWeight: '800',
                }}>
                  예문
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {l.exam}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      }
      <Link to="/write">
        <IconButton aria-label="create" style={{
          position: 'fixed',
          bottom: '140px',
          right: '435px',
          backgroundColor: '#2E3C7E',
          color: '#FBEAEB'
        }}>
          <CreateIcon />
        </IconButton>
      </Link>
    </ListWrap>
  );
};

const ListWrap = styled.div`
  padding-top: 30px;
`;

export default List;