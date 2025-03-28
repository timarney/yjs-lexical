import {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import Editor from "./Editor/Editor";
import Theme from "./Editor/Theme";
import type { Provider } from "@lexical/yjs";
import PubNub from "./PubNub";
import { ActiveUserProfile } from "./Editor/userProfile";

const editorConfig = {
  // NOTE: This is critical for collaboration plugin to set editor state to null. It
  // would indicate that the editor should not try to set any default state
  // (not even empty one), and let collaboration plugin do it instead
  editorState: null,
  namespace: "documentID-m-28-gcforms",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: Theme,
};

const pubnubConfig = {
  endpoint: "wss://v6.pubnub3.com",
  channel: editorConfig.namespace,
  auth: import.meta.env.VITE_PUBNUB_AUTH_KEY,
  publishKey: "pub-c-2c8347ad-4337-42ff-b87f-bd6de2c9cf11",
  subscribeKey: "sub-c-58dd0ab3-eeed-462b-a7de-bc06af435381",
};

export interface ColabEditorProps {
  setActiveUsers: (users: ActiveUserProfile[]) => void;
  profile: { id: string; name: string; color: string };
}

export const ColabEditor = forwardRef(
  ({ setActiveUsers, profile }: ColabEditorProps, ref) => {
    const [yjsProvider, setYjsProvider] = useState<null | Provider>(null);

    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleAwarenessUpdate = useCallback(() => {
      const awareness = yjsProvider!.awareness!;
      setActiveUsers(
        Array.from(awareness.getStates().entries()).map(
          ([userId, { color, name }]) => ({
            color,
            name,
            userId,
          })
        )
      );
    }, [yjsProvider]);

    useImperativeHandle(ref, () => ({
      clearAwarenessState: () => {
        if (yjsProvider) {
          yjsProvider.awareness.setLocalStateField("name", null);
          yjsProvider.awareness.setLocalStateField("color", null);
          yjsProvider.awareness.setLocalStateField("focusing", false);
          yjsProvider.awareness.setLocalStateField("anchorPos", null);
        }
      },
    }));

    useEffect(() => {
      if (yjsProvider == null) {
        return;
      }

      yjsProvider.awareness.on("update", handleAwarenessUpdate);

      return () => yjsProvider.awareness.off("update", handleAwarenessUpdate);
    }, [yjsProvider, handleAwarenessUpdate]);

    return (
      <div ref={containerRef} className="relative">
        <LexicalComposer initialConfig={editorConfig}>
          {/* With CollaborationPlugin - we MUST NOT use @lexical/react/LexicalHistoryPlugin */}
          <CollaborationPlugin
            id="lexical/react-rich-collab"
            providerFactory={(id, yjsDocMap) => {
              const doc = new Y.Doc();
              yjsDocMap.set(id, doc);
              const provider = new WebsocketProvider(
                pubnubConfig.endpoint,
                id,
                doc,
                {
                  WebSocketPolyfill: PubNub as unknown as typeof WebSocket,
                  params: {
                    ...pubnubConfig,
                    username: profile.name,
                    userId: profile.id,
                  },
                }
              ) as unknown as Provider;

              // This is a hack to get reference to provider with standard CollaborationPlugin.
              // To be fixed in future versions of Lexical.
              setTimeout(() => setYjsProvider(provider), 0);
              return provider;
            }}
            // Unless you have a way to avoid race condition between 2+ users trying to do bootstrap simultaneously
            // you should never try to bootstrap on client. It's better to perform bootstrap within Yjs server.
            shouldBootstrap={false}
            username={profile.name}
            cursorColor={profile.color}
            cursorsContainerRef={containerRef}
          />
          <Editor />
        </LexicalComposer>
      </div>
    );
  }
);
