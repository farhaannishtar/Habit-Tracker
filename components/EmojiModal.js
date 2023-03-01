import EmojiPicker from "emoji-picker-react";

export default function EmojiModal(props) {
  const { isModalVisible, setEmoji, onClose } = props;

  const handleEmojiClick = (emojiData) => {
    setEmoji(emojiData.emoji);
    onClose();
  };

  if (!isModalVisible) return null;

  return (
    <div
      className="flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 z-10"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </div>
    </div>
  );
}
