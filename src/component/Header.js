import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { posActions } from "../store/pos-slice";
import "react-datepicker/dist/react-datepicker.css";

const DUMMY_USER = ['1','2','3','4']

const month_names_short = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Header = (props) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());
  const [user, setUser] = useState();

  const day =
    startDate.getDate() <= 9 ? "0" + startDate.getDate() : startDate.getDate();
  const date = `${day}-${
    month_names_short[startDate.getMonth()]
  }-${startDate.getFullYear()}`;

  const selectedUser = (event) => {
    setUser(event.target.value);
    // console.log(event.target)
    dispatch(posActions.changeUser(event.target.value));
  };
  const dateHandler = (startDate) => {
    // console.log(startDate)
    const day =
      startDate.getDate() <= 9
        ? "0" + startDate.getDate()
        : startDate.getDate();
    const date = `${day}-${
      month_names_short[startDate.getMonth()]
    }-${startDate.getFullYear()}`;
    dispatch(posActions.changeDate(date));
    setStartDate(startDate);
  };

  return (
    <div className="home-picker">
      <div className="input-group">
        <span className="input-group-prepend">
          <label htmlFor="user" className="input-user-text">
            USER
          </label>
        </span>
        <select
          className="home-select-user"
          id="user"
          name="user"
          onClick={selectedUser}
        >
          <option value='default'>Default</option>
          {DUMMY_USER.map((user)=><option value={user} key={user}>{user}</option>)}
          <option value='all'>All</option>
          {/* <option value="1">1</option>
          <option value="2">2</option>
          <option value="Aniket">Aniket</option> */}
        </select>
      </div>
      <DatePicker
        selected={startDate}
        onSelect={dateHandler}
        maxDate={new Date()}
        // maxDate={addDays(new Date(), 5)}
        placeholderText="Select a date..."
        className="home-select-date"
      />
    </div>
  );
};

export default Header;
