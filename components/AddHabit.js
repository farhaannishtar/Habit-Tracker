import { useState } from "react";
import uuid from 'react-uuid';
import EmojiModal from "./EmojiModal";
import InlineEdit from "./InlineEdit";

export default function AddHabit(props) {

  const { setHabits }  = props;
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [editingValue, setEditingValue] = useState("");
  const [isEmojiModalShowing, setIsEmojiModalShowing] = useState(false);
  const [emoji, setEmoji] = useState("🏗");
  const [cardStyle, setCardStyle] = useState('card');
  const [checkmark, setCheckmark] = useState('/grayCheckMark.svg');

  const handleSubmit = async (habitText) => {
    // Get data from the form.
    const data = {
      text: habitText,
      emoji: emoji,
      completed: false
    }
  
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)
  
    // API endpoint where we send form data.
    const endpoint = '/api/form'
  
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }
  
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)
  
    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
  
    console.log("result: ", result)

    const newHabit = {
      id: uuid(),
      text: result.text,
      emoji: result.emoji,
      completed: false
    }
    setHabits(current => [...current, newHabit]);
    setIsFormShowing(false);
    setCardStyle('card');
    setEmoji("🏗")
    setEditingValue("");
  }

  const cardClickHandler = (e) => {
    setIsFormShowing(true)
    setCardStyle('cardForm');
  }

  return ( 
    <>
      <div className={cardStyle} style={{ backgroundColor: props.color}} onClick={cardClickHandler}>
        { !isFormShowing ? 
          (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
          ) 
          :
          (
            <>
              <div className="topLayer">
                <div className='emojiContainer'>
                  <div className='addEmoji'>
                    <div className="emoji" onClick={() => setIsEmojiModalShowing(true)}>{ emoji }</div>
                    <div className='shadow'></div>
                  </div>
                </div>
                <label className='container'>
                  <div className="circle">
                    <img src={checkmark} alt="SVG as an image"/>
                  </div>
                </label>
              </div>
              <InlineEdit editingValue={editingValue} setEditingValue={setEditingValue} handleSubmit={handleSubmit} emoji={emoji}/>
              <EmojiModal onClose={() => setIsEmojiModalShowing(false)} isEmojiModalShowing={isEmojiModalShowing} setEmoji={setEmoji}/>
            </>
          )
        }
      </div>
      <style jsx>{`
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
        
        .addEmoji {
          height: 152.5px;
          margin-top: 20px;
          margin-bottom: 30px;
          width: 104px;
          display: flex:
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        
        .addEmoji:hover {
          cursor: pointer;
        }
        
        .emoji {
          font-size: 100px;
          background-color: none;
          position: relative;
          bottom: 20px;
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

        svg {
          width: 100px;
          height: 100px;
        }

        .card {
          margin: 1rem;
          padding: 1.5rem;
          border: 5px solid black;
          border-radius: 15px;
          border-style: dashed;
          transition: color 0.3s ease, border-color 0.3s ease;
          height: 370px;
          width: 383px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .cardForm {
          margin: 1rem;
          padding: 1.5rem;
          border: 5px solid black;
          border-radius: 15px;
          border-style: dashed;
          transition: color 0.3s ease, border-color 0.3s ease;
          height: 370px;
          width: 383px;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
        .cardForm:hover,
        .cardForm:focus,
        .cardForm:active {
          color: #0070f3;
          border-color: #0070f3;
        }
      `}</style>
    </>
  )
}