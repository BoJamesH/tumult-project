import EmojiPicker, { Emoji, EmojiStyle } from 'emoji-picker-react'

function Reactions() {
    return (
      <div>
        <EmojiPicker />
        <p>
            My Favorite emoji is:
            <Emoji unified="1f123" size="25" />
        </p>
      </div>
    );
  }

export default Reactions
