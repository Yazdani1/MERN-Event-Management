import "./createevent.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../../../../node_modules/react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateEvent = () => {
  const history = useHistory();

  //image upload
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [prolanguage, setProlanguage] = useState("JavaScript");
  const [selectedDate, setSelectedDate] = useState(null);

  const dataSubmit = (e) => {
    e.preventDefault();
  };

  const showError = () => {
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>;
  };

  return (
    <div>
      <div className="container create-event-container">
        <div className="row">
          <div className="col-lg-10 col-md-12 col-sm-12">
            <div className="card event-form-design">
              <div className="text-center">
                <h5 className="text-center">Create Yout Event</h5>
              </div>
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                Your post has been posted Successfully!
              </div>
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
              <form>
                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Event name
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    maxLength="100"
                  />
                </div>
                <p>{title ? title.length : 0}/100</p>

                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Even location
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    maxLength="100"
                  />
                </div>

                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Maximum number of participants
                  </label>
                  <input
                    type="number"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control"
                    maxLength="100"
                  />
                </div>

                <div className="event-form">
                  <label for="exampleInputEmail1" className="form-label">
                    Event types
                  </label>
                  <select
                    className="custom-select"
                    value={prolanguage}
                    onChange={(e) => setProlanguage(e.target.value)}
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="Nodejsddddddddddd">Nodejs</option>

                    <option value="Reactjs">React js</option>

                    <option value="VueJS">Vue JS</option>
                  </select>
                </div>

                <div className="form-group">
                  <label for="exampleFormControlTextarea2">Description</label>
                  <ReactQuill
                    class="ql-editor rounded-0"
                    value={des}
                    onChange={(e) => setDes(e)}
                  />
                </div>

                {/* Even date */}

                <div className="even-start-end-date">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="event-form-designddd">
                        <label for="exampleInputEmail1" className="form-label">
                          Event start date
                        </label>
                        <div className="datepicker-design">
                          <DatePicker
                            selected={selectedDate}
                            className="datepicker-design"
                            onChange={(date) => {
                              setSelectedDate(date);
                            }}
                            placeholderText="Select Your Date"
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            isClearable
                            showYearDropdown
                            showWeekNumbers
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="event-form-designddd">
                        <label for="exampleInputEmail1" className="form-label">
                          Event end date
                        </label>

                        <div className="datepicker-design">
                          <DatePicker
                            selected={selectedDate}
                            className="datepicker-design"
                            onChange={(date) => {
                              setSelectedDate(date);
                            }}
                            placeholderText="Select Your Date"
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            isClearable
                            showYearDropdown
                            showWeekNumbers
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group justify-content-center align-items-center">
                  <button
                    type="submit"
                    name="btnSubmit"
                    className="create-event-button"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default CreateEvent;
