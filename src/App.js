import "./App.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import { fetchUsers, AddLike, DeleteUser } from "./redux/actions";

function App({ dispatchUsers, users, dispatchLike, dispatchDelete }) {
  const [filtered, setFiltered] = useState(users);
  const [isToggled, setToggled] = useState(false);

  function likeFilter() {
    setToggled(!isToggled);
    if (!isToggled) {
      let newUsers = [...users].filter((item) => item.like === true);
      setFiltered(newUsers);
    } else {
      setFiltered(users);
    }
  }

  useEffect(() => {
    fetch("https://reqres.in/api/users/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.data);
        dispatchUsers(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatchUsers]);

  useEffect(() => {
    setFiltered(users);
  }, [users]);

  return (
    <div className="App">
      <header className="header">
        <button className="header__btn" onClick={() => likeFilter()}>
          Показать только лайки
        </button>
      </header>
      <section className="cards">
        <ul className="cards__list">
          {filtered.map((i) => (
            <li className="cards__item" key={i.id}>
              <img src={i.avatar} alt="avatar"></img>
              <div className="cards__info">
                <div
                  className="cards__like"
                  onClick={() => dispatchLike(i.id, i.like)}
                >
                  {i.like ? <p>&#9829;</p> : <p>&#9825;</p>}
                </div>
                <div>
                  <p>{i.first_name}</p>
                  <p>{i.last_name}</p>
                </div>
                <p className="cards__del" onClick={() => dispatchDelete(i.id)}>
                  &#10006;
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.reducer.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUsers: (data) => dispatch(fetchUsers(data)),
    dispatchLike: (id, like) => dispatch(AddLike(id, like)),
    dispatchDelete: (id) => dispatch(DeleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
