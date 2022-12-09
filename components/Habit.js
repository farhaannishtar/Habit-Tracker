// This file was used to make new habit card
import styles from '../styles/Habit.module.css';
import { useState } from 'react'

export default function Habit(props) {

  const [editFormShowing, setEditFormShowing] = useState(false);
  const [editButtonText, setEditButtonText] = useState('Edit')
  const [cardStyle, setCardStyle] = useState('card');
  const deleteHandler = () => {
    props.deleteHandler(props.identifier);
  }
  
  const toggleEditForm = () => {
    console.log('User is toggling the edit form');
    setEditFormShowing(!editFormShowing);
    setEditButtonText(editButtonText === 'Edit' ? 'Close' : 'Edit');
  }

  const editHandler = (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    
    const editedHabit = event.target.habit.value;
    console.log("editedHabit: ", editedHabit);
    props.editHandler(props.identifier, editedHabit);
  }  


  const styleCard = () => {
    if (cardStyle === "cardClicked") {
      setCardStyle("card");
    } else {
      setCardStyle("cardClicked");
    }
  }

  return (
    <>
      { props.cardType === "dashboard" ?
        <a onClick={() => styleCard()} className={cardStyle}>
          <h1>{props.habit.text}</h1>
        </a> :
        <a onClick={() => props.styleCard(props.habit.id)} className={props.habit.habit_card_style}>
          <h1>{props.habit.habit_emoji}</h1>
          <h2>{props.habit.habit_name}</h2>
        </a>
      }
      <style jsx>{`
          .card {
            margin: 1rem;
            flex-basis: 40%;
            padding: 1.5rem;
            text-align: left;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.3s ease, border-color 0.3s ease;
            /* border: 2px solid red; */
            height: 9rem;
            width: 30rem;
          }

          .cardClicked {
            margin: 1rem;
            flex-basis: 40%;
            padding: 1.5rem;
            text-align: left;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.3s ease, border-color 0.3s ease;
            background-color: #CBC3E3;
          }

          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }
        `}</style>
        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }

          * {
            box-sizing: border-box;
          }
        `}</style>
    </>
  )
}


// Old code below

{/* {
        editFormShowing ?
        (
          <>
            <div className={styles.container}>
              <form onSubmit={editHandler} className={styles.editForm}>
                <label htmlFor="habit">Edit Habit: </label>
                <input type="text" id="habit" name="habit" required placeholder={props.habit.text}/>
                <button type="submit">Submit</button>
              </form>
              <div className={styles.buttonContainer}>
                <button onClick={deleteHandler}>Delete</button>
                <button onClick={toggleEditForm}>{editButtonText}</button>
              </div>
            </div>
          </>
        )
        : (
          <>
            <div className={styles.container}>
              <p className={styles.p}>{props.habit.text}</p>   
              <div className={styles.buttonContainer}>
                <button onClick={deleteHandler}>Delete</button>
                <button onClick={toggleEditForm}>Edit</button>
              </div>
            </div>
          </>
        )
      } */}