import {firestore} from "../../firebase"
const dict_db = firestore.collection("new_coined_word_dict")

// Actions
const LOAD = "dict/LOAD";
const CREATE = "dict/CREATE";
// const DELETE = "dict/DELETE";
// const UPDATE = "dict/UPDATE";
const SCROLL = "dict/SCROLL";

const initialState = {
  list: [],
  scroll: false
};

// Action Creators
export const loadDict = (dict) => {
  return { type: LOAD, dict };
};

export const createDict = (dict) => {
  return { type: CREATE, dict };
};

// export const deleteDict = (num) => {
//   return { type: DELETE, num };
// };

// export const updateDict = (dict) => {
//   return { type: UPDATE, dict };
// };

export const scroll = (scroll) => {
  return { type: SCROLL, scroll };
};

export const loadDictFB = () => {
  return function (dispatch) {
    dict_db.get().then((docs) => {
      let dict_data = [];
      docs.forEach((doc) => {
        if (doc.exists) {
          dict_data = [...dict_data, {id: doc.id, created_at: doc._delegate._document.version.timestamp.seconds, ...doc.data()}]
          // 파이어스토어의 특성 상 data id값에 의해 정렬되는데 나는 등록된 시간 순서에 따라 정렬하고 싶었음.
          dict_data.sort(function(a, b)  {
            return a.created_at - b.created_at;
          });
          // data를 리덕스 스토어에 넣고 created_at에 의해 정렬될 수 있게 한다.
        }
      })
      dispatch(loadDict(dict_data));
    })
  }
};

export const createDictFB = (dict) => {
  return function (dispatch) {
    let adding_dict = {word: dict.word, desc: dict.desc, exam: dict.exam}
    dict_db.add(adding_dict).then((doc) => {
      adding_dict = {...adding_dict, id: doc.id}
      dispatch(createDict(adding_dict));
      dispatch(scroll(true));
    });
  }
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    // do reducer stuff
    case "dict/LOAD": {
      if (action.dict.length) {
        return {...state, list: action.dict}
      }
      return state
    }

    case "dict/CREATE":
      const new_dict_list = [...state.list, action.dict];
      return {...state, list: new_dict_list};

    // case "dict/DELETE": {
    //   const new_dict_list = state.list.filter((l, idx) => {
    //     return action.num !== l.id
    //   })
    //   return {list: [...state.list, new_dict_list]}
    // }
    
    // case "dict/UPDATE": {
    //   const new_dict = action
    //   const new_dict_list = state.list.map((l,idx) => {
    //     if (action.num !== l.id) {
    //       return new_dict
    //     } else {
    //       return l
    //     }
    //     return {list: [...state.list, new_dict_list]}
    //   })
    // }

    case "dict/SCROLL":
      return {...state, scroll: action.scroll};

    default:
      return state;
  }
}