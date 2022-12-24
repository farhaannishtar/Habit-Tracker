import styles from '../styles/Habit.module.css';
import { useState } from 'react'

export default function Habit(props) {

  const [editFormShowing, setEditFormShowing] = useState(false);
  const [editButtonText, setEditButtonText] = useState('Edit')
  const [cardStyle, setCardStyle] = useState('/grayCheckMark.svg');
  const deleteHandler = () => {
    props.deleteHandler(props.identifier);
  }

  console.log('I will be happy with Natalia and we are going to be a cute couple: ', props.color);
  
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
    if (cardStyle === "/redCheckMark.svg") {
      setCardStyle("/grayCheckMark.svg");
    } else {
      setCardStyle("/redCheckMark.svg");
    }
  }

  return (
    <>
      { props.isEditable ?
        <div className='card' style={{ backgroundColor: props.color}}>
          { editFormShowing  ? (
            <form onSubmit={editHandler} className={styles.editForm}>
              <input type="text" id="habit" name="habit" required placeholder="Edit Habit"/>
              <button type="submit">Submit</button>
            </form>
          )
          : 
            <>
              <div className="checkboxDiv">
               <div className='icon'>
                  <h1 className='emoji'> 🚴</h1>
                  <div className='shadow'></div>
                </div>
                <label className='container'>
                  <div className="circle" onClick={styleCard}>
                    <img src={cardStyle} alt="SVG as an image"/>
                  </div>
                  
                </label>
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
        .emoji {
          font-size: 100px;
        }

        .icon {
          /* border: 2px solid pink; */
        }

        .shadow {
          border-radius: 90%;
          width: 100px;
          height: 100px;
          background: gray;
          opacity: 0.2;
          -webkit-filter: blur(10px);
          -webkit-transform: scale(1, 0.2);
          margin: 0px;
          position: absolute;
          bottom: 10px;
        }

        .circle {
          padding: 20px;
          margin: 20px;
          border-radius: 1500px;
          background-color: white;
          display: flex;
          justify-content: center;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .circle:hover {
          cursor: pointer;
        }

        .checkbox {
          width: 25px;
          height: 25px;
          background-color: white;
          border-radius: 50%;
          border: 1px solid #ddd;
          -webkit-appearance: none;
          cursor: pointer;
        }

        .checkbox:checked {
          appearance: auto;
          clip-path: circle(50% at 50% 50%);
        }

        .checkboxDiv {
          display: flex;
          justify-content: space-between;
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
          /* flex-basis: 50%; */
          padding: 1.5rem;
          border: 1px solid #eaeaea;
          border-radius: 15px;
          transition: color 0.3s ease, border-color 0.3s ease;
          height: 400px;
          width: 550px;;
          /* border: 2px solid green; */
        }

        .cardClicked {
          margin: 1rem;
          flex-basis: 40%;
          padding: 1.5rem;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.3s ease, border-color 0.3s ease;
          height: 400px;
          width: 780px;
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