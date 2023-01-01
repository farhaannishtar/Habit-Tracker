import { useState } from "react";
import uuid from 'react-uuid';
import EmojiModal from "./EmojiModal";

export default function AddHabit(props) {

  const { setHabits }  = props;
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [isEmojiModalShowing, setIsEmojiModalShowing] = useState(false);
  const [emoji, setEmoji] = useState("");

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
    console.log("newHabit: ", newHabit)
    setHabits(current => [...current, newHabit]);
    event.target.habit.value = "";
    setIsFormShowing(false);
    setEmoji("")
  }

  const cardClickHandler = (e) => {
    setIsFormShowing(true)
  }

  return ( 
    <>
      <div className='card' style={{ backgroundColor: props.color}} onClick={cardClickHandler}>
        { !isFormShowing ? 
          (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          ) 
          :
          (
            <div className="habitInput">
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <input type="text" id="habit" name="habit" required placeholder="Enter Habit"/>
                  <button type="submit">Submit</button>
                  { emoji === "" ?
                    <button type="button" onClick={() => setIsEmojiModalShowing(true)}>Add icon</button>
                    :
                    ""
                  }
                </form>
                <div className="emojiDiv" onClick={() => setIsEmojiModalShowing(true)}>
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
              </div>
              <EmojiModal onClose={() => setIsEmojiModalShowing(false)} isEmojiModalShowing={isEmojiModalShowing} setEmoji={setEmoji}/>
            </div>
          )
        }
      </div>
      <style jsx>{`

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
          /* border: 2px solid red; */
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
          border: 10px solid black;
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

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
      `}</style>
    </>
  )
}