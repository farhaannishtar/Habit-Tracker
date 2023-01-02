import styles from '../styles/Habit.module.css';
import { useState, useEffect } from 'react'
import EmojiModal from "./EmojiModal";
import uuid from 'react-uuid';

export default function Habit(props) {

  const [editFormShowing, setEditFormShowing] = useState(false);
  const [editButtonText, setEditButtonText] = useState('Edit')
  const [checkmark, setCheckmark] = useState('/grayCheckmark.svg');
  const [isEmojiModalShowing, setIsEmojiModalShowing] = useState(false);
  const [emoji, setEmoji] = useState(props.habit.emoji);

  const deleteHandler = () => props.deleteHandler(props.identifier);

  const toggleEditForm = (event) => {
    event.stopPropagation();
    setEditFormShowing(!editFormShowing);
    setEditButtonText(editButtonText === 'Edit' ? 'Close' : 'Edit');
  }

  const editHabitTextHandler = (event) => {
    event.preventDefault()
    const editedText = event.target.habit.value;
    props.editHabitTextHandler(props.identifier, editedText);
    setEditFormShowing(false);
  }  

  const styleCheckmark = () => {
    if (checkmark === "/redCheckmark.svg") {
      setCheckmark("/grayCheckmark.svg");
    } else {
      setCheckmark("/redCheckmark.svg");
    }
  }

  useEffect(() => async (event) => {
    props.editHabitEmojiHandler(props.identifier, emoji);    
  }, [emoji]);

  return (
    <>
      { props.isEditable ?
        <div className='card' style={{ backgroundColor: props.color}}>
          { editFormShowing  ? (
            <form onSubmit={editHabitTextHandler} className={styles.editForm}>
              <input type="text" id="habit" name="habit" required placeholder="Edit Habit"/>
              <button type="submit">Submit</button>
            </form>
          )
          : 
            <>
              <div className="topLayer">
               <div className='icon' onClick={() => setIsEmojiModalShowing(true)}>
                  { props.habit.emoji ? 
                    (
                      <>
                        <h1 className='emoji'>{emoji}</h1>
                        <div className='shadow'></div>
                      </>
                    )
                    :
                    (
                      <div className='emptyIcon'></div>
                    )
                  }
                </div>
                <label className='container'>
                  <div className="circle" onClick={styleCheckmark}>
                    <img src={checkmark} alt="SVG as an image"/>
                  </div>
                </label>
              </div>
              <h1 className='habitText' onClick={toggleEditForm}>{props.habit.text}</h1> 
            </>
          } 
          {/* <div className='buttons'>
            <button onClick={toggleEditForm}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </div> */}
        </div> 
        :
        <div onClick={() => props.styleCard(props.habit.id)} className={props.habit.habit_card_style}>
          <h1>{props.habit.habit_emoji}</h1>
          <h2>{props.habit.habit_name}</h2>
        </div>
      }
      <EmojiModal onClose={() => setIsEmojiModalShowing(false)} isEmojiModalShowing={isEmojiModalShowing} setEmoji={setEmoji}/>
      <style jsx>{`
        .habitText:hover {
          cursor: pointer
        }

        .emptyIcon {
          height: 202.5px;
          width: 104px;
        }

        .emptyIcon:hover {
          background-color: rgba(239,239,239,255);
          cursor: pointer;
        }

        .icon {
          /* border: 2px solid black; */
        }

        .icon:hover {
          background-color: rgba(239,239,239,255);
          cursor: pointer;
        }

        .circle {
          padding: 15px;
          margin: 15px;
          border-radius: 1500px;
          background-color: white;
          /* background-color: #999999; */
          display: flex;
          justify-content: center;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
           /* border: 2px solid black; */
        }

        .circle:hover {
          cursor: pointer;
        }

        .topLayer {
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

        .emoji {
          font-size: 100px;
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

        .buttons {
          display: flex;
          justify-content: flex-end;
          /* border: 2px solid black; */
        }

        .card {
          margin: 1rem;
          padding: 1.5rem;
          border: 1px solid #eaeaea;
          border-radius: 15px;
          transition: color 0.3s ease, border-color 0.3s ease;
          height: 370px;
          width: 383px;
          /* border: 2px solid green; */
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
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