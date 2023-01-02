import styles from '../styles/Habit.module.css';
import { useState, useEffect } from 'react'
import EmojiModal from "./EmojiModal";

export default function Habit(props) {

  const [editFormShowing, setEditFormShowing] = useState(false);
  const [editButtonText, setEditButtonText] = useState('Edit')
  const [checkmark, setCheckmark] = useState('/grayCheckMark.svg');
  const [isEmojiModalShowing, setIsEmojiModalShowing] = useState(false);
  const [emoji, setEmoji] = useState(props.habit.emoji);

  const deleteHandler = () => props.deleteHandler(props.identifier);

  const toggleEditForm = (event) => {
    event.stopPropagation();
    setEditFormShowing(!editFormShowing);
    setEditButtonText(editButtonText === 'Edit' ? 'Close' : 'Edit');
  }

  const editHabitTextHandler = (event) => {
    event.preventDefault();
    const editedText = event.target.habit.value;
    props.editHabitTextHandler(props.identifier, editedText);
    setEditFormShowing(false);
  }  

  const styleCheckmark = () => {
    if (checkmark === "/redCheckMark.svg") {
      setCheckmark("/grayCheckMark.svg");
    } else {
      setCheckmark("/redCheckMark.svg");
    }
  }

  useEffect(() => async() => {
    props.editHabitEmojiHandler(props.identifier, emoji);  
    console.log("props.identifier: ", props.identifier, "emoji: ", emoji);
    setEmoji(props.habit.emoji);
  }, [props.habit.emoji]);

  return (
    <>
      { props.isEditable ?
        (
          <div className='card' style={{ backgroundColor: props.color}}>
            <div className="topLayer">
              <div className='emojiContainer' onClick={() => setIsEmojiModalShowing(true)}>
                  { emoji ? 
                    (
                      <>
                        <div className='emoji'>{ emoji }</div>
                        <div className='shadow'></div>
                      </>
                    )
                    :
                    (
                      <div className='addEmoji'>
                        {
                          emoji === "" ? <p className="addEmojiText">☻ Add icon</p> : <div className="emoji">{ emoji }</div>
                        }
                        <div className='shadow'></div>
                      </div>
                    )
                  }
              </div>
              <label className='container'>
                <div className="circle" onClick={styleCheckmark}>
                  <img src={checkmark} alt="SVG as an image"/>
                </div>
              </label>
            </div>
            { editFormShowing  ? 
              (
                <div className='formDiv'>
                  <form onSubmit={editHabitTextHandler} className={styles.editForm}>
                    <input className="habitInput" type="text" id="habit" name="habit" required placeholder="Edit Habit"/>
                    <button type="submit">Edit</button>
                  </form>
                </div>
              )
              :
              <h1 className='habitText' onClick={toggleEditForm}>{props.habit.text}</h1> 
            }
          </div> 
        )
        :
        (
          <div onClick={() => props.styleCard(props.habit.id)} className={props.habit.habit_card_style}>
            <h1>{props.habit.habit_emoji}</h1>
            <h2>{props.habit.habit_name}</h2>
          </div>
        )
      }
      <EmojiModal onClose={() => setIsEmojiModalShowing(false)} isEmojiModalShowing={isEmojiModalShowing} setEmoji={setEmoji}/>
      <style jsx>{`

        .formDiv {
          position: relative;
          right: 55px;
          bottom: 17px;
          /* border: 2px solid red; */
        }

        .habitInput {
          width: 60%; 
          height: 30px; 
          font-size:20px;
          color: black;
          border-radius: 50px;
          border: 0;
          /* background-color: rgba(239,239,239,255); */
        } 

        .habitInput:hover {
          background-color: rgba(239,239,239,255);
        }

        .habitInput::placeholder {
            font-weight: bold;
            opacity: 0.25;
            color: black;
        }

        .addEmoji {
          height: 152.5px;
          margin-top: 20px;
          margin-bottom: 30px;
          width: 104px;
          display: flex:
          justify-content: center;
          align-items: center;
          /* border: 2px solid green;  */
        }

        .addEmojiText {
          color: gray;
          position: relative;
          top: 50px;
          left: 10px;
        }

        .addEmoji:hover {
          background-color: rgba(239,239,239,255);
          cursor: pointer;
        }

        .emojiContainer {
          height: 202.5px;
          width: 104px;
          /* border: 2px solid black;  */
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

        .topLayer {
          display: flex;
          justify-content: space-between;
          position: relative;
          bottom: 15px;
          left: 15px;
          /* border: 2px solid black; */
        }
          
        .habitText:hover {
          cursor: pointer
          background-color: props.color;
          opacity: 0.5;
        }

        h1 {
          margin-top: 0px;
          cursor: pointer
          /* border: 2px solid black; */
        }

        .emoji {
          font-size: 100px;
          cursor: pointer;
          /* border: 1px solid red; */
        }

        .emoji:hover {
          background-color: props.color;
          opacity: 0.5;
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