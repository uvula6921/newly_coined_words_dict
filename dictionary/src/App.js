import React from "react";
import styled from "styled-components";
import "./App.css";
import List from "./List";
import Write from "./Write";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { loadDictFB } from "./redux/modules/dict";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  load: () => {
    // dispatch(loadDictFB(5));
  },
  create: () => {},
});

class App extends React.Component {
  componentDidMount() {
    // this.props.load(); // 컴포넌트 최초 렌더링 시 db 데이터를 받아옴
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Title>
            {this.props.history.location.pathname === "/" && "신조어 사전"}
            {this.props.history.location.pathname === "/write" && "단어 등록"}
          </Title>
          <Route exact path="/" render={(props) => <List />} />
          <Route path="/write" render={(props) => <Write />} />
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  max-width: 400px;
  height: 80vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: #fff;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  @font-face {
    font-family: "ONE-Mobile-POP";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-POP.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  font-family: ONE-Mobile-POP;
  text-align: center;
  box-shadow: rgb(38, 57, 77) 0px 5px 30px -10px;
  background-color: #0a174e;
  color: #f5d042;
  padding: 20px 0;
  font-size: 24px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
