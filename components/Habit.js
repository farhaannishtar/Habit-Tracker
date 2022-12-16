import styles from '../styles/Habit.module.css';
import { useState } from 'react'

export default function Habit(props) {

  const [editFormShowing, setEditFormShowing] = useState(false);
  const [editButtonText, setEditButtonText] = useState('Edit')
  const [cardStyle, setCardStyle] = useState('card');
  const deleteHandler = () => {
    props.deleteHandler(props.identifier);
  }
  
  const toggleEditForm = (event) => {
    // Stops the onClick function from being executed by the parent component 
    event.stopPropagation();
    
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
      { props.isEditable ?
        <div className={cardStyle}>
          { editFormShowing  ? (
            <form onSubmit={editHandler} className={styles.editForm}>
              <input type="text" id="habit" name="habit" required placeholder="Edit Habit"/>
              <button type="submit">Submit</button>
            </form>
          )
          : 
            <>
              <div className="checkboxDiv">
                <input className="checkbox" type="checkbox" id="checkbox" onClick={() => styleCard()}/>
              </div>
              <h1>{props.habit.text}</h1> 
            </>
          } 
          <div className='buttons'>
            <button onClick={toggleEditForm}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </div> 
        :
        <div onClick={() => props.styleCard(props.habit.id)} className={props.habit.habit_card_style}>
          <h1>{props.habit.habit_emoji}</h1>
          <h2>{props.habit.habit_name}</h2>
        </div>
      }
      <style jsx>{`

        .checkbox {
          width: 25px;
          height: 25px;
          background-color: white;
          border-radius: 50%;
          border: 1px solid #ddd;
          -webkit-appearance: none;
          cursor: pointer;
          box-shadow: inset 0 2px 5px rgba(0,0,0,0.25);
        }

        .checkbox:checked {
          appearance: auto;
          clip-path: circle(50% at 50% 50%);
          background-color: red;
        }

        .checkboxDiv {
          display: flex;
          justify-content: flex-end;
          position: relative;
          bottom: 15px;
          left: 15px;
          /* border: 2px solid black; */
        }

        h1 {
          margin-top: 0px;
          /* border: 2px solid black; */
        }

        .buttons {
          display: flex;
          justify-content: flex-end;
          /* border: 2px solid black; */
        }

        .card {
          margin: 1rem;
          flex-basis: 40%;
          padding: 1.5rem;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.3s ease, border-color 0.3s ease;
          height: 150px;
          width: 980px;
          // 
          box-shadow: inset 0 2px 5px rgba(0,0,0,0.45);
          /* border: 2px solid green; */
        }

        .cardClicked {
          margin: 1rem;
          flex-basis: 40%;
          padding: 1.5rem;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.3s ease, border-color 0.3s ease;
          height: 150px;
          width: 980px;
          box-shadow: inset 0 2px 5px rgba(0,0,0,0.45);
          border: 3px solid black;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .cardClicked:hover,
        .cardClicked:focus,
        .cardClicked:active {
          border-color: #808080
        }

        button {
          background-color: black;
          color: white;
          font-size: 16px;
          border-radius: 4px;
        }
      `}</style>
    </>
  )
}