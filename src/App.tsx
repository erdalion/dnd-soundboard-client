import "./App.css";
import "./App-mobile.css";
import "./App-desktop.css"
import DirectoriesPanel from "./components/DirectoriesPanel";
import SearchPanel from "./components/SearchPanel";
import SoundPanel from "./components/SoundPanel";
import { useEffect, useState } from "react";
import SoundDialog from "./components/SoundDialog";
import type { SoundCategory } from "./aliases/sound-category";
import type { ServerResponse } from "./aliases/server-response";
import fetchToServer from "./fetch-to-server";
import type { Sound } from "./aliases/sound";
import { Blaze } from "./components/canvasui/Blaze";

//smooth scrolling
import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";

function App() {
    useLenis(() => {});
    const [editedSound, setEditedSound] = useState<Sound | null>(null);
    const [directory, setDirectory] = useState<
        | {
            folder_id: number;
            folder_name: string;
        }
        | undefined
    >(undefined);

    const [categories, setCategories] = useState<
        Array<SoundCategory> | undefined
    >();
    const [soundDialogOpen, setSoundDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchToServer<ServerResponse<Array<SoundCategory>>>(
            "get-all-categories",
        ).then((response) => {
            console.log(response);
            setCategories(response.result);
        });
    }, []);

    return (
        <main>
            <ReactLenis root />
            {/* <div className="background-noise"></div> */}
            <DirectoriesPanel
                onDirectoryChange={(directory: {
                    folder_id: number;
                    folder_name: string;
                }) => {
                    setDirectory(directory);
                }}
            />
            <Blaze
                height={0.6}
                sparkColor={[0.55, 0.15, 1]}
                smokeColor={[0.2, 0.03, 0.35]}
                distortion={0.35}
                speed={0.8}
                sparks={0.7}
                smoke={0.45}
                glow={1.2}
            >
            <SearchPanel
                onNewSoundButtonClick={() => {
                    setEditedSound(null);
                    setSoundDialogOpen(true);
                }}
            />
            {soundDialogOpen ? (
                <SoundDialog
                    categories={categories}
                    sound={editedSound}
                    onCloseDialog={() => {
                        setSoundDialogOpen(false);
                    }}
                />
            ) : null}
            
                <SoundPanel categories={categories} directoryId={directory?.folder_id} onEditSound={(sound) => { setEditedSound(sound); setSoundDialogOpen(true); }} />
            </Blaze>

        </main>
    );
}

export default App;
