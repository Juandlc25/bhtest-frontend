import React, { useState } from "react";
import "./Calendar.css";
import Header from "./Header";
import Events from "./Events";
import { useStateValue } from "../StateProvider";

function Calendar() {
  const [data, setData] = useState([]);
  const [{ events }, dispatch] = useStateValue();

  var gapi = window.gapi;
  var API_KEY = "AIzaSyAbo4F8dCAHCDj3lZ6A3O9Dq-tv_iTDASk";
  var CLIENT_ID =
    "247418151423-8tduj5vvtjko7ftsj35coku89c5fufk2.apps.googleusercontent.com";
  var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
  var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const addEvent = (e) => {
    e.preventDefault();
    gapi.load("client:auth2", () => {
      console.log("loaded client");
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
      gapi.client.load("calendar", "v3", () => console.log("bam!"));
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: "whatever bro",
            location: "I just tested",
            description: "I almost finish",
            start: {
              dateTime: "2020-06-28T09:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: "2020-06-28T17:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [
              { email: "lpage@example.com" },
              { email: "sbrin@example.com" },
            ],
            reminders: {
              useDefault: false,
              overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 10 },
              ],
            },
          };
          var request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event) => {
            window.open(event.htmlLink);
          });
          gapi.client.calendar.events
            .list({
              calendarId: "primary",
              timeMin: new Date().toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 10,
              orderBy: "startTime",
            })
            .then((response) => {
              const events = response.result.items;
              setData(events);
            });
        });
    });
  };

  return (
    <>
      <Header />
      <div className="title">
        <img
          className="titleImg"
          src="https://play-lh.googleusercontent.com/oGR9I1X9No3SfFEXrq655tETtVVzI3jIphhmEVPGPEVuM5gfwh8lOGWHQFf6gjSTvw=s180"
          alt="google"
        />
        <h2>Google Calendar</h2>
      </div>
      <div className="calendar">
        <button onClick={addEvent}>Get your upcoming events</button>
        {data.map((event) => (
          <Events
            key={event.id}
            name={event.summary}
            id={event.id}
            language={event.created}
            description={event.status}
          />
        ))}
      </div>
    </>
  );
}

export default Calendar;
