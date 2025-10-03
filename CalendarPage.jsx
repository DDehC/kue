// frontend/src/pages/CalendarPage.jsx
import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarPage.css";

export default function CalendarPage() {
  // Lock horizontal scrolling while mounted
  useEffect(() => {
    document.documentElement.classList.add("no-x");
    document.body.classList.add("no-x");
    return () => {
      document.documentElement.classList.remove("no-x");
      document.body.classList.remove("no-x");
    };
  }, []);

  return (
    <div className="cal-page">
      <div className="cal-wrap">
        <div className="cal-card">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            firstDay={1}
            expandRows={true}
            height="auto"
            dayMaxEventRows={3}
            fixedWeekCount={false}
            showNonCurrentDates={true}
            nowIndicator={true}
            selectable={true}
            selectMirror={true}
            headerToolbar={{ left: "prev,next today", center: "title", right: "" }}
            events={[]}
          />
        </div>
      </div>
    </div>
  );
}
