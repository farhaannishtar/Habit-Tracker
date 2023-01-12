import { useState, useEffect } from 'react'
import EmojiModal from "./EmojiModal";
import InlineEdit from './InlineEdit';

export default function Habit(props) {

  const [editingValue, setEditingValue] = useState(props.habit.text);
  const [checkmark, setCheckmark] = useState('/grayCheckMark.svg');
  const [isEmojiModalShowing, setIsEmojiModalShowing] = useState(false);
  const [emoji, setEmoji] = useState(props.habit.emoji);
  const [textDecoration, setTextDecoration] = useState('none');

  const deleteHandler = (e) => {
    e.stopPropagation()
    props.deleteHandler(props.id);
  }
  const completeHabit = () => {
    if (props.habit.completed === false) {
      props.updateCompletedHabits(props.id, true);
      setCheckmark("/redCheckMark.svg");
      setTextDecoration('line-through');
    } else {
      props.updateCompletedHabits(props.id, false);
      setCheckmark("/grayCheckMark.svg");
      setTextDecoration('none')
    }
  }

  useEffect(() => {
    props.editHabitTextHandler(props.id, editingValue);
  }, [editingValue]);

  useEffect(() => {
    props.editHabitEmojiHandler(props.id, emoji);  
  }, [emoji]);

  const emojiClickHandler = (e) => {
    e.stopPropagation()
    setIsEmojiModalShowing(true)
  }

  return (
    <>
      { props.isEditable ?
        (
          <div className='card' style={{ backgroundColor: props.color}} onClick={completeHabit}>
            <div className="topLayer">
              <div className='emojiContainer'>
                <div className='emoji' onClick={emojiClickHandler}>{ emoji }</div>
                <div className='shadow'></div>
              </div>
              <label className='container'>
                <div className="circle">
                  <img src={checkmark} alt="SVG as an image"/>
                </div>
              </label>
            </div> 
            <div onClick={(e) => e.stopPropagation()} className='inline'>
              <InlineEdit editingValue={editingValue} setEditingValue={setEditingValue} textDecoration={textDecoration}/>
            </div>
            <div className='trashcan'>
              <img src='/trash.svg' onClick={deleteHandler}/>
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
        img:hover {
          cursor: pointer;
        }

        .card {
          margin: 1rem;
          padding: 1.5rem;
          border: 1px solid #eaeaea;
          border-radius: 15px;
          transition: color 0.3s ease, border-color 0.3s ease;
          height: 370px;
          width: 383px;
          border: 2px solid black;
          cursor: pointer;
          user-select: none;
        }

        .topLayer {
          display: flex;
          justify-content: space-between;
          position: relative;
          bottom: 15px;
          left: 15px;
        }
        
        .emojiContainer {
          height: 202.5px;
          width: 104px;
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

        h1 {
          margin-top: 0px;
          cursor: pointer
        }

        .emoji {
          font-size: 100px;
          cursor: pointer;
        }

        .emoji:hover {
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

        .card:hover,
        .card:focus,
        .card:active {
          border-color: #0070f3;
        }
        
        .trashcan {
          display: none;
        }

        .card .trashcan {
          display: flex;
          justify-content: flex-end;
          user-select:none;
          margin-top: 40px;
          margin-left: 345px; 
        }
      `}</style>
    </>
  )
}