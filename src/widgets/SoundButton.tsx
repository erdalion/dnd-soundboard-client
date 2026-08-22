import type { Sound } from "../aliases/sound";
import fetchToServer from "../fetch-to-server";
import ThreeDotsIcon from "../svg/three-dots-icon";

function SoundButton({ sound, onEdit }: { sound: Sound; onEdit: (sound: Sound) => void }) {
    return (
        <div
            className="sound-button"
            onClick={() => {
                fetchToServer(
                    "play-sound",
                    JSON.stringify({ soundId: sound.sound_id }),
                );
            }}
        >
            <div className="sound-button-icon emoji">
                {(sound.icon)}
            </div>
            <div className="sound-button-name">{sound.name}</div>
            {/* <div className="sound-button-play-icon">
                <PlayArrowIcon />
            </div> */}
            <button className="sound-button-menu-button" onClick={(e) => { e.stopPropagation(); onEdit(sound); }}>
                <ThreeDotsIcon />
            </button>
        </div>
    );
}

export default SoundButton;
