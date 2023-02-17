import EmojiPicker from 'emoji-picker-react';
import styles from '../styles/EmojiModal.module.css';

export default function EmojiModal(props) {

  const { isEmojiModalShowing, setEmoji, onClose } = props;

  const handleEmojiClick = (emojiData) => {
    setEmoji(emojiData.emoji);
    onClose();
  } 

  if (!isEmojiModalShowing) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        <EmojiPicker onEmojiClick={handleEmojiClick}/>
      </div>
    </div>
  )
}