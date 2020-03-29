import React, { Component } from "react";
import "./App.css";
import firebase from "./fire.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: "",
      username: "",
      reports: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const reportsRef = firebase.database().ref("reports");
    const report = {
      title: this.state.currentTitle,
      date: this.state.date,
      debriefing: this.state.debriefing,
      debriefingConductor: this.state.debriefingConductor,
      description: this.state.description,
      errorReason: this.state.errorReason,
      howToRepeat: this.state.howToRepeat,
      isInErrorTable: this.state.isInErrorTable,
      isRepeatable: this.state.isRepeatable,
      isRepeatableOnOtherTanks: this.state.isRepeatableOnOtherTanks,
      reporter: this.state.reporter, //change to ref to user
      solution: this.state.solution,
      solvedInTheField: this.state.solvedInTheField,
      subject: this.state.subject,
      tankID: this.state.tankID
    };
    const user = {
      name: this.state.name,
      phone: this.state.phone
    };
    reportsRef.push(report);
    this.setState({
      currentreport: "",
      username: ""
    });
  }
  componentDidMount() {
    const reportsRef = firebase.database().ref("reports");
    reportsRef.on("value", snapshot => {
      let reports = snapshot.val();
      let newState = [];
      for (let report in reports) {
        newState.push({
          id: report,
          title: reports[report].title,
          user: reports[report].user
        });
      }
      this.setState({
        reports: newState
      });
    });
  }

  removeReport(reportId) {
    const reportRef = firebase.database().ref(`/reports/${reportId}`);
    reportRef.remove();
  }
  removeUser(userId) {
    const userRef = firebase.database().ref(`/users/${userId}`);
    userRef.remove();
  }
  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>Fun Food Friends</h1>
          </div>
        </header>
        <div className="container">
          <section className="add-item">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="What's your name?"
                onChange={this.handleChange}
                value={this.state.username}
              />
              <input
                type="text"
                name="currentItem"
                placeholder="What are you bringing?"
                onChange={this.handleChange}
                value={this.state.currentItem}
              />
              <button>Add Item</button>
            </form>
          </section>
          <section className="display-item">
            <div className="wrapper">
              <ul>
                {this.state.items.map(item => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>
                        brought by: {item.user}
                        <button onClick={() => this.removeItem(item.id)}>
                          Remove Item
                        </button>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
//Hi From Me Iz 29032019
