import { useEffect, useState } from "react";
import ChooseEmojiIcon from "../svg/choose-emoji-icon";
import EmojiPickerEmbed from "./EmojiPickerEmbed";

function SoundIconPicker({
  defaultEmoji,
  onEmojiChoosen,
}: {
  defaultEmoji:string | null
  onEmojiChoosen: (emoji: string) => void;
}) {
  const [emoji, setEmoji] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState<boolean>(false);

  useEffect(() => {
    if(defaultEmoji){ 
        setEmoji(defaultEmoji);
        onEmojiChoosen(defaultEmoji);
    }
  }, [])
  return (
    <>
      <button
        onClick={() => {
          setPickerOpen(true);
        }}
        className="sound-icon-button"
      >
        {emoji == null ? (
          <ChooseEmojiIcon />
        ) : (
          <div className="sound-icon-button-emoji emoji">{emoji}</div>
        )}
        <div className="sound-icon-button-text">
          Kliknij tutaj aby dodać ikonę dźwięku
        </div>
      </button>
      {pickerOpen ? (
        <div
          className="emoji-picker-background"
          onClick={() => {
            setPickerOpen(false);
          }}
        ></div>
      ) : null}
      <EmojiPickerEmbed
        onEmojiChoosen={(emoji) => {
          onEmojiChoosen(emoji);
          setEmoji(emoji);
          setPickerOpen(false);
        }}
        onDeletingButtonClick={() => {
          onEmojiChoosen("");
          setEmoji(null);
          setPickerOpen(false);
        }}
        open={pickerOpen}
      />
    </>
  );
}

export default SoundIconPicker;
