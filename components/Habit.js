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
    e.stopPropagation();
    props.deleteHandler(props._id);
  }

  const completeHabit = () => {
    if (props.habit.completed === false) {
      props.editCompletedHabit(props._id, true);
      setCheckmark("/redCheckMark.svg");
      setTextDecoration('line-through');
    } else {
      props.editCompletedHabit(props._id, false);
      setCheckmark("/grayCheckMark.svg");
      setTextDecoration('none')
    }
  }

  useEffect(() => { 
    if (props.habit.completed === true) {
      setCheckmark("/redCheckMark.svg");
      setTextDecoration('line-through');
    } else {
      setCheckmark("/grayCheckMark.svg");
      setTextDecoration('none')
    }
  }, [props.habit.completed])

  useEffect(() => {
    props.editHabitTextHandler(props._id, editingValue);
  }, [editingValue]);

  useEffect(() => {
    props.editHabitEmojiHandler(props._id, emoji);  
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
            <div className="topLayer flex justify-between relative bottom-3 left-3">
              <div className='h-52 w-28'>
                <div className='emoji text-9xl' onClick={emojiClickHandler}>{ emoji }</div>
                <div className='shadow absolute bottom-0 w-28 h-24 rounded-full bg-slate-500 opacity-20'></div>
              </div>
              <label>
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
          <div onClick={() => props.styleCard(props.habit._id)} className={props.habit.habit_card_style}>
            <h1>{props.habit.habit_emoji}</h1>
            <h2>{props.habit.habit_name}</h2>
          </div>
        )
      }
      <EmojiModal onClose={() => setIsEmojiModalShowing(false)} isEmojiModalShowing={isEmojiModalShowing} setEmoji={setEmoji}/>
      <style jsx>{`

        .emoji {
          /* font-size: 100px; */
          cursor: pointer;
        }

        .emoji:hover {
          opacity: 0.5;
        }

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


        .circle {
          padding: 15px;
          margin: 15px;
          border-radius: 100px;
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


        .shadow {
          -webkit-filter: blur(10px);
          -webkit-transform: scale(1, 0.2);
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