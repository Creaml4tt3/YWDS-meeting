import Nav from "./nav";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  QuerySnapshot,
  deleteDoc,
} from "firebase/firestore";
import * as Loading from "../public/lottie/Loading.json";
import FadeIn from "react-fade-in/lib/FadeIn";

export default function Meeting02() {
  const [waiting, setWaiting] = useState(true);

  const loadingStyle = {
    height: 300,
    width: 300,
  };

  firebase.initializeApp({
    apiKey: "AIzaSyD8q_oP6UDGDF4nHUUnG_G3JqfN0xaAUPU",
    authDomain: "meeting-room-yes.firebaseapp.com",
    projectId: "meeting-room-yes",
    storageBucket: "meeting-room-yes.appspot.com",
    messagingSenderId: "42180746933",
    appId: "1:42180746933:web:0b5d558014ad5f1743a8fc",
    measurementId: "G-TGPD7SSCMR",
  });

  const firestore = firebase.firestore();

  function BookingList() {
    const bookingRef = firestore.collection("meeting-02");

    const [isLoading, setIsLoading] = useState(false);

    const [booking, setBooking] = useState([]);

    if (!isLoading) {
      bookingRef.get().then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          let docData = doc.data();
          const docAlldata = {
            id: doc.id,
            name: docData.name,
            startTime: docData.startTime,
            endTime: docData.endTime,
            createAt: docData.createAt,
          };

          booking.push(docAlldata);
          booking.sort((a, b) => b.startTime.localeCompare(a.startTime));
        });
        setIsLoading(true);
        setWaiting(false);
      });
    }

    const [nameValue, setNameValue] = useState("");
    const [startValue, setStartValue] = useState("");
    const [endValue, setEndValue] = useState("");

    const Booked = async (e) => {
      e.preventDefault();

      let createValue = new Date();
      setWaiting(true);

      await bookingRef
        .add({
          name: nameValue,
          startTime: startValue,
          endTime: endValue,
          createAt: createValue,
        })
        .then(() => {});
      setNameValue("");
      setStartValue("");
      setEndValue("");
    };

    return (
      <>
        <div className="Booking-Container">
          {!waiting &&
            booking.map((book) => (
              <BookingListing key={book.id} booking={book} />
            ))}
        </div>
        <div className="Form-Container">
          <form className="Form-Booking" id="Form-Meeting-02" onSubmit={Booked}>
            <input
              className="NameInput"
              type="text"
              placeholder="รายการ..."
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              required
            ></input>
            <input
              className="StartTimeInput"
              type="time"
              //list="Start-Time"
              value={startValue}
              onChange={(e) => setStartValue(e.target.value)}
              required
            ></input>
            <input
              className="EndTimeInput"
              type="time"
              //list="End-Time"
              value={endValue}
              onChange={(e) => setEndValue(e.target.value)}
              required
            ></input>
            <datalist id="Start-Time">
              <option value="09:00"></option>
              <option value="09:30"></option>
              <option value="10:00"></option>
              <option value="10:30"></option>
              <option value="11:00"></option>
              <option value="11:30"></option>
              <option value="13:00"></option>
              <option value="13:30"></option>
              <option value="14:00"></option>
              <option value="14:30"></option>
              <option value="15:00"></option>
              <option value="15:30"></option>
              <option value="16:00"></option>
              <option value="16:30"></option>
              <option value="17:00"></option>
              <option value="17:30"></option>
            </datalist>
            <datalist id="End-Time">
              <option value="09:30"></option>
              <option value="10:00"></option>
              <option value="10:30"></option>
              <option value="11:00"></option>
              <option value="11:30"></option>
              <option value="13:00"></option>
              <option value="13:30"></option>
              <option value="14:00"></option>
              <option value="14:30"></option>
              <option value="15:00"></option>
              <option value="15:30"></option>
              <option value="16:00"></option>
              <option value="16:30"></option>
              <option value="17:00"></option>
              <option value="17:30"></option>
              <option value="18:00"></option>
            </datalist>
            <button type="submit" className="Submit-Button">
              BOOK
            </button>
          </form>
        </div>
      </>
    );
  }

  function BookingListing(props) {
    const { name, startTime, endTime, id, createAt } = props.booking;

    let dateObj = new Date(createAt.seconds * 1000);
    let years = dateObj.getFullYear();
    let months = dateObj.getMonth() + 1;
    let days = dateObj.getDate();
    let hours = dateObj.getHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let dateString =
      days.toString().padStart(2, "0") +
      "/" +
      months.toString().padStart(2, "0") +
      "/" +
      years.toString();

    let timeString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");

    async function deleteBook(id) {
      const reference = doc(firestore, "meeting-02", id);
      setWaiting(true);
      await deleteDoc(reference).then(() => {
        console.log("deleted");
      });
    }

    return (
      <>
        <FadeIn>
          <div className="Booking">
            <section className="Widget-Container">
              <span className="Title">วันที่สร้าง</span>
              <div className="DateCreateAt">{dateString}</div>
            </section>
            <section className="Widget-Container">
              <span className="Title">เวลาที่สร้าง</span>
              <div className="TimeCreateAt">{timeString}</div>
            </section>
            <section className="Widget-Container">
              <span className="Title">ช่วงเวลา</span>
              <div className="Time">{startTime + " / " + endTime}</div>
            </section>
            <section className="Widget-Container">
              <span className="Title">รายการ</span>
              <div className="Name">{name}</div>
            </section>
            <div className="Delete" onClick={() => deleteBook(id)}>
              X
            </div>
          </div>
        </FadeIn>
      </>
    );
  }

  function LoadingMore() {
    return (
      <>
        <div className="Loading">
          <Lottie animationData={Loading} style={loadingStyle}></Lottie>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="App-Container">
        <Nav navActive={"Nav02"} />
        <BookingList />
        {waiting && <LoadingMore />}
      </main>
    </>
  );
}
