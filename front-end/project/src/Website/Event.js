import React from 'react';
import styles from './Event.module.css'; 
import Event1 from "./images/Event1.jpg";
import Event2 from "./images/Event2.jpg";
import Event3 from "./images/Event3.jpg";
import Event4 from "./images/Event4.jpg";
import Event5 from "./images/Event5.jpg";
import Event6 from "./images/Event6.jpg";
import Event7 from "./images/Event7.jpg";
import Event8 from "./images/Event8.jpg";
import Event9 from "./images/Event9.jpg";

const events = [
  { title: "TechXpo 2024", location: "Bellmore, NY", price: "Free", image: Event1 },
  { title: "Creative Sparks Conference", location: "New York, NY", price: "29$", image: Event2 },
  { title: "Innovation Summit", location: "New York, NY", price: "70$", image: Event3 },
  { title: "Artistry Showcase", location: "New York, NY", price: "35$", image: Event4 },
  { title: "Future Trends Forum", location: "Bellmore, NY", price: "Free", image: Event5 },
  { title: "Health & Wellness Expo", location: "Bellmore, NY", price: "Free", image: Event6 },
  { title: "Digital Transformation Conference", location: "Bellmore, NY", price: "Free", image: Event7 },
  { title: "Fashion Fusion Festival", location: "Bellmore, NY", price: "Free", image: Event8 },
  { title: "Green Living Symposium", location: "Bellmore, NY", price: "Free", image: Event9 },
];

const Event = () => (
  <div className={styles.container1}> {/* Use styles.container1 for CSS Modules */}
    {events.map((event, index) => (
      <div className={styles["item-container"]} key={index}> {/* Use styles["item-container"] for CSS Modules */}
        <div className={styles["img-container"]}>
          <img src={event.image} alt={event.title} />
        </div>
        <div className={styles["body-container"]}>
          <div className={styles.overlay}></div>
          <div className={styles["event-info"]}>
            <p className={styles.title}>{event.title}</p>
            <div className={styles.separator}></div>
            <p className={styles.info}>{event.location}</p>
            <p className={styles.price}>{event.price}</p>
            <div className={styles["additional-info"]}>
              <p className={styles.info}>
                <i className="fas fa-map-marker-alt"></i>
                Grand Central Terminal
              </p>
              <p className={styles.info}>
                <i className="far fa-calendar-alt"></i>
                Sat, Sep 19, 10:00 AM EDT
              </p>
              <p className={styles["info description"]}>
                Welcome! Everyone has a unique perspective after reading a book, and we would love you
                to share yours with us! We meet one Sunday evening <a href="Event.html">more...</a>
              </p>
            </div>
          </div>
          <button className={styles.action}>Book it</button>
        </div>
      </div>
    ))}
  </div>
);

export default Event;
