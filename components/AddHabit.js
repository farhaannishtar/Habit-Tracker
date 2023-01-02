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

  const styleCheckmark = () => {
    if (checkmark === "/redCheckmark.svg") {
      setCheckmark("/grayCheckmark.svg");
    } else {
      setCheckmark("/redCheckmark.svg");
    }
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
                <div className='icon' onClick={() => setIsEmojiModalShowing(true)}>
                  <div className='addEmoji'>
                    {
                      emoji !== "" ? 
                      (
                        <div className="emoji">
                          { emoji }
                        </div> 
                      )
                      :
                      (
                        ""
                      )
                    }
                  </div>
                  <div className='shadow'></div>
                </div>
                {
                  emoji === "" ? 
                  (
                      <p className="addIcon">☻ Add icon</p>
                  )
                  :
                  (
                    ""
                  )
                }
                <label className='container'>
                  <div className="circle">
                    <img src={checkmark} alt="SVG as an image"/>
                  </div>
                </label>
              </div>
              <form onSubmit={handleSubmit}>
                <input className="habitextInput" type="text" id="habit" name="habit" required placeholder="Enter Habit"/>
                <button type="submit">Submit</button>
              </form>
              <EmojiModal onClose={() => setIsEmojiModalShowing(false)} isEmojiModalShowing={isEmojiModalShowing} setEmoji={setEmoji}/>
            </>
          )
        }
      </div>
      <style jsx>{`

        

        .habitextInput {
          width: 100%; 
          height:30px; 
          font-size:30px;
        }
        
        .addEmoji {
          height: 202.5px;
          width: 104px;
        }
        
        .addEmoji:hover {
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

        .icon:hover + .addIcon {
          display: block;
          /* color: red; */
          cursor: pointer;
        }
        
        .addIcon {
          display: none;
          position: relative;
          right: 120px;
          top: 75px;
          height: 20px;
          color: gray;
          /* border: 2px solid red;  */
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

        .emoji {
          /* border: 2px solid red; */
          margin-top: 0;
          padding: 0;
          font-size: 100px;
        }

        .emoji:hover {
          background-color: rgba(239,239,239,255);
        }

        .emojiDiv {
          border: 2px solid red;
          display: flex;
          justify-content: center;
        }        

        .habitInput {
          height: 200px;
          display: flex;
          flex-direction: column;
          /* border: 2px solid magenta; */
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
          cursor: pointer;
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