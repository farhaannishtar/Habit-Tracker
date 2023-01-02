import { useState } from "react";
import uuid from 'react-uuid';
import EmojiModal from "./EmojiModal";

export default function AddHabit(props) {

  const { setHabits }  = props;
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [isEmojiModalShowing, setIsEmojiModalShowing] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [cardStyle, setCardStyle] = useState('card');
  const [checkmark, setCheckmark] = useState('/grayCheckmark.svg');

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
  
    // Get data from the form.
    const data = {
      habit: event.target.habit.value,
      emoji: emoji,
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
      key: uuid(),
      text: result.text,
      emoji: result.emoji
    }
    setHabits(current => [...current, newHabit]);
    event.target.habit.value = "";
    setIsFormShowing(false);
    setCardStyle('card');
    setEmoji("")
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          ) 
          :
          (
            <>
              <div className="topLayer">
                <div className='emojiContainer' onClick={() => setIsEmojiModalShowing(true)}>
                  <div className='addEmoji'>
                    {
                      emoji === "" ? <p className="addEmojiText">☻ Add icon</p> : <div className="emoji">{ emoji }</div>
                    }
                    {
                      emoji === "" ? <div className='shadow'></div> : <div className='shadow'></div>
                    }
                  </div>
                </div>
                <label className='container'>
                  <div className="circle">
                    <img src={checkmark} alt="SVG as an image"/>
                  </div>
                </label>
              </div>
              <form onSubmit={handleSubmit}>
                <input className="habitInput" type="text" id="habit" name="habit" required placeholder="Enter Habit"/>
                <button type="submit">Create Habit</button>
              </form>
              <EmojiModal onClose={() => setIsEmojiModalShowing(false)} isEmojiModalShowing={isEmojiModalShowing} setEmoji={setEmoji}/>
            </>
          )
        }
      </div>
      <style jsx>{`

        .habitInput {
          width: 50%; 
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
        
        .emojiContainer {
          height: 202.5px;
          width: 104px;
          /* padding-top: 10px; */
          /* border: 2px solid orange;   */
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
          /* border: 2px dashed black; */
        }
        
        .addEmojiText {
          color: gray;
          position: relative;
          top: 50px;
          left: 10px;
          /* border: 1px solid black; */
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
        
        .addEmoji:hover {
          background-color: rgba(239,239,239,255);
          cursor: pointer;
        }
        
        .emoji {
          font-size: 100px;
          background-color: none;
          position: relative;
          bottom: 20px;
          /* border: 1px solid red; */
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

        svg {
          width: 100px;
          height: 100px;
        }

        .button:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }

        .button:focus-visible {
          box-shadow: none;
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
          /* border: 2px solid green; */
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
          /* border: 2px solid green; */
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