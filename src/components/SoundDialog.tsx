import { useEffect, useRef, useState } from "react";
import FileButton from "../widgets/FileButton";
import AudioShow from "../widgets/AudioShow";
import SoundIconPicker from "../widgets/SoundIconPicker";
import SoundNameInput from "../widgets/SoundNameInput";
import CategoryPicker from "../widgets/CategoryPicker";
import type { SoundCategory } from "../aliases/sound-category";
import UploadButton from "../widgets/UploadButton";
import sendFileToServer from "../send-file-to-server";
import fetchToServer from "../fetch-to-server";
import type { Sound } from "../aliases/sound";

function SoundDialog({
  categories,
  onCloseDialog,
  sound,
}: {
  categories: Array<SoundCategory> | undefined;
  onCloseDialog: () => void;
  sound: Sound | null;
}) {
  const [file, setFile] = useState<File | null>(null);
  const emoji = useRef<string>("");
  const name = useRef<string | null>("");
  const category = useRef<SoundCategory | null>(null);
  const start = useRef<number>(0);
  const end = useRef<number>(-1);

  useEffect(() => {
    start.current = 0;
    end.current = -1;
  }, [file]);

  return (
    <>
      <div
        className="sound-dialog-background"
        onClick={() => {
          onCloseDialog();
        }}
      ></div>
      <div id="sound-dialog">
        <SoundIconPicker
          defaultEmoji={sound ? sound.icon : null}
          onEmojiChoosen={(emojiAttr) => {
            emoji.current = emojiAttr;
          }}
        />
        <SoundNameInput
          defaultName={sound ? sound.name : null}
          onNameChange={(nameAttr) => {
            name.current = nameAttr;
          }}
        />
        <CategoryPicker
          defaultCategoryID={sound ? sound.category_id : null}
          onCategoryChoosen={(categoryAttr) => {
            category.current = categoryAttr;
          }}
          categories={categories}
        />
        {sound ? null :
        <FileButton
          onFileChoosen={(fileAttr) => {
            setFile(fileAttr);
          }}
        ></FileButton>}
        {file == null ? null : (
          <AudioShow
            onRegionChanged={(startAttr, endAttr) => {
              start.current = startAttr;
              end.current = endAttr;
            }}
            audio={file}
          />
        )}
        <UploadButton
          label = {sound ? "Edytuj" : "Dodaj dźwięk"}
          disabled={
            sound == null && (name.current == "" || category.current == null || file == null)
          }
          onClick={() => {
            if(sound){
              const payload: any = {
                soundId: sound.sound_id,
              };

              if (name.current !== "" && name.current !== sound.name) {
                payload.newName = name.current;
              }

              if (emoji.current !== "" && emoji.current !== sound.icon) {
                payload.newIcon = emoji.current;
              }

              if (category.current != null && category.current.category_id !== sound.category_id) {
                payload.newCategoryId = category.current.category_id;
              }
              console.log(payload)

              fetchToServer("edit-sound", JSON.stringify(payload));
                onCloseDialog();
                onCloseDialog();
            }
            else{
            if (file == null) return;
            if (category.current == null) return;
            if (name.current == "") return;

            sendFileToServer("upload-sound", file, {
              name: name.current,
              icon: emoji.current,
              category: category.current.category_id,
              start: start.current,
              end: end.current,
            }).then(() => {
              console.log("dodalem pliczek essa");
              onCloseDialog();
            });
          }}}
        />
      </div>
    </>
  );
}

export default SoundDialog;
