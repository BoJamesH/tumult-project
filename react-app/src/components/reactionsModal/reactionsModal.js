//reactionsComponent.js

import EmojiPicker, { Emoji, EmojiStyle, EmojiClickData } from 'emoji-picker-react'
import { useState } from 'react';


function ReactionsModal() {
    const [selectedEmoji, setSelectedEmoji] = useState("1f60a");
    const [inputValue, setInputValue] = useState("");



    function onClick(EmojiClickData, MouseEvent) {
        let emojiData = EmojiClickData
        console.log("EmojiClickData.unified", EmojiClickData.unified)
        setInputValue(
          (inputValue) =>
            inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
        );
        setSelectedEmoji(EmojiClickData.unified);

      }
    return (
      <div>
        <EmojiPicker
            onEmojiClick={onClick}
            autoFocusSearch={false}
            emojiStyle={EmojiStyle.DARK}
            theme={'dark'}
        />
        <p>
            My Favorite emoji is:
            <Emoji unified={selectedEmoji} size="25" />
        </p>
      </div>
    );
}

export default ReactionsModal
