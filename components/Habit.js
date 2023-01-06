import { useState, useEffect } from 'react'
import EmojiModal from "./EmojiModal";
import InlineEdit from './InlineEdit';

export default function Habit(props) {

  const [editingValue, setEditingValue] = useState(props.habit.text);
  const [checkmark, setCheckmark] = useState('/grayCheckMark.svg');
  const [isEmojiModalShowing, setIsEmojiModalShowing] = useState(false);
  const [emoji, setEmoji] = useState(props.habit.emoji);

  const deleteHandler = () => props.deleteHandler(props.id);

  const styleCheckmark = () => {
    if (checkmark === "/redCheckMark.svg") {
      setCheckmark("/grayCheckMark.svg");
    } else {
      setCheckmark("/redCheckMark.svg");
    }
  }

  useEffect(() => {
    props.editHabitTextHandler(props.id, editingValue);
  }, [editingValue]);

  useEffect(() => {
    props.editHabitEmojiHandler(props.id, emoji);  
  }, [emoji]);

  const handleEmojiClick = (e) => {
    e.stopPropagation()
    setIsEmojiModalShowing(true)
  }

  return (
    <>
      { props.isEditable ?
        (
          <div className='card' style={{ backgroundColor: props.color}} onClick={styleCheckmark}>
            <div className="topLayer">
              <div className='emojiContainer'>
                  { emoji ? 
                    (
                      <>
                        <div className='emoji' onClick={handleEmojiClick}>{ emoji }</div>
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
                <div className="circle">
                  <img src={checkmark} alt="SVG as an image"/>
                </div>
              </label>
            </div> 
            <div onClick={(e) => e.stopPropagation()}>
            <InlineEdit editingValue={editingValue} setEditingValue={setEditingValue}/>
            </div>
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
        .addEmoji {
          height: 152.5px;
          margin-top: 20px;
          margin-bottom: 30px;
          width: 104px;
          display: flex:
          justify-content: center;
          align-items: center;
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
          cursor: pointer;
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