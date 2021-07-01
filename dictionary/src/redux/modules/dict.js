import { firestore } from "../../firebase";
const dict_db = firestore.collection("new_coined_word_dict");

// Actions
const LOAD = "dict/LOAD";
const CREATE = "dict/CREATE";
const DELETE = "dict/DELETE";
const UPDATE = "dict/UPDATE";
const SCROLL = "dict/SCROLL";
const OPEN = "dict/OPEN";
const RELOAD = "dict/RELOAD";

const initialState = {
  list: [],
  scroll: false,
  modalOpen: false,
  reload: false,
};

// Action Creators
export const loadDict = (dict) => {
  return { type: LOAD, dict };
};

export const createDict = (dict) => {
  return { type: CREATE, dict };
};

export const deleteDict = (id) => {
  return { type: DELETE, id };
};

export const updateDict = (dict) => {
  return { type: UPDATE, dict };
};

export const scroll = (scroll) => {
  return { type: SCROLL, scroll };
};

export const modalOpen = (open) => {
  return { type: OPEN, open };
};

export const reload = (reload) => {
  return { type: RELOAD, reload };
};

// export const setPage = (page) => {
//   return { type: PAGE, page };
// };

// export const setLoading = (loading) => {
//   return { type: LOADING, loading };
// };

export const loadDictFB = (count) => {
  return function (dispatch) {
    dict_db.get().then((docs) => {
      let dict_data = [];
      docs.forEach((doc) => {
        if (doc.exists) {
          dict_data = [
            ...dict_data,
            {
              id: doc.id,
              created_at: doc._delegate._document.version.timestamp.seconds,
              ...doc.data(),
            },
          ];
          // 파이어스토어의 특성 상 data id값에 의해 정렬되는데 나는 등록된 시간 순서에 따라 정렬하고 싶었음.
          dict_data.sort(function (a, b) {
            return a.created_at - b.created_at;
          });
          // data를 리덕스 스토어에 넣고 created_at에 의해 정렬될 수 있게 한다.
        }
      });
      dispatch(loadDict(dict_data.slice(count - 5, count)));
    });
  };
};

export const createDictFB = (dict) => {
  return function (dispatch) {
    let adding_dict = { word: dict.word, desc: dict.desc, exam: dict.exam };
    dict_db.add(adding_dict).then((doc) => {
      dict_db
        .doc(doc.id)
        .get()
        .then((doc) => {
          adding_dict = {
            ...adding_dict,
            id: doc.id,
            created_at: doc._delegate._document.version.timestamp.seconds,
          };
          dispatch(createDict(adding_dict));
          dispatch(scroll(true));
        });
    });
  };
};

export const deleteDictFB = (dict) => {
  return function (dispatch, getState) {
    const deleting_dict = getState().dict.list.filter((l, idx) => {
      return l.id === dict;
    });
    if (!deleting_dict) {
      return;
    }
    dict_db
      .doc(deleting_dict[0].id)
      .delete()
      .then((res) => {
        dispatch(deleteDict(dict));
        dispatch(scroll(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateDictFB = (dict) => {
  return function (dispatch, getState) {
    const updating_dict = getState().dict.list.filter((l, idx) => {
      return l.id === dict.id;
    });
    if (!updating_dict) {
      return;
    }
    console.log(updating_dict[0].id);
    console.log({ ...dict, created_at: updating_dict[0].created_at });
    dict_db
      .doc(updating_dict[0].id)
      .update({ ...dict, created_at: updating_dict[0].created_at })
      .then((res) => {
        dispatch(
          updateDict({ ...dict, created_at: updating_dict[0].created_at })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // do reducer stuff
    case "dict/LOAD": {
      if (action.dict.length) {
        return { ...state, list: [...state.list, ...action.dict] };
      }
      return state;
    }

    case "dict/CREATE":
      // const new_dict_list = [...state.list, action.dict];
      return { ...state, list: [] };

    case "dict/DELETE": {
      const new_dict_list = state.list.filter((l, idx) => {
        return action.id !== l.id;
      });
      return { ...state, list: new_dict_list };
      // 여기서 list의 value로는 spread 할당을 해주면 안됨.
      // 기존 list와 new_dict_list의 차이는 지워야할 객체가 있냐없냐인데
      // ...state.list를 해버리면 지워야할 객체를 함께 담아버리는꼴임.
    }

    case "dict/UPDATE": {
      const new_dict = action.dict;
      const new_dict_list = state.list.map((l, idx) => {
        if (new_dict.id === l.id) {
          return new_dict;
        } else {
          return l;
        }
      });
      return { ...state, list: new_dict_list };
    }

    case "dict/SCROLL":
      return { ...state, scroll: action.scroll };

    case "dict/OPEN":
      return { ...state, modalOpen: action.open };

    case "dict/RELOAD":
      return { ...state, reload: action.reload };

    default:
      return state;
  }
}
