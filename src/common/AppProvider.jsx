import { SWRConfig } from 'swr'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RecoilRoot } from 'recoil';

export default function AppProvider({ children }) {

    return (
        <RecoilRoot>
            <DndProvider backend={HTML5Backend}>
                <SWRConfig
                    value={{
                        revalidateOnFocus: false,
                        revalidateOnReconnect: false,
                        revalidateIfStale: false,
                        refreshWhenHidden: true,
                        refreshWhenOffline: true,
                    }}
                >
                    {children}
                </SWRConfig>
            </DndProvider>
        </RecoilRoot>
    );
}
