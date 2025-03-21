import PubNub from "./PubNub";

import type { Provider } from "@lexical/yjs";

import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

import Editor from "./Editor";
import ExampleTheme from "./ExampleTheme";
import { getRandomUserProfile, UserProfile } from "./getRandomUserProfile";

interface ActiveUserProfile extends UserProfile {
  userId: number;
}

const editorConfig = {
  // NOTE: This is critical for collaboration plugin to set editor state to null. It
  // would indicate that the editor should not try to set any default state
  // (not even empty one), and let collaboration plugin do it instead
  editorState: null,
  namespace: "documentID-223-policy-management-doc",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};

const pubnubConfig = {
  endpoint: "wss://v6.pubnub3.com",
  channel: editorConfig.namespace,
  auth: import.meta.env.VITE_PUBNUB_AUTH_KEY,
  username: "user-" + Math.random().toString(36).substr(2, 4),
  userId: "user-id-" + Math.random().toString(36).substr(2, 9),
  publishKey: "pub-c-0207e2ca-5246-4ad9-87fd-c2bed006ef17",
  subscribeKey: "sub-c-fc2b820b-4687-49c5-83af-b477da7d6b4b",
};

export default function App() {
  const [userProfile, setUserProfile] = useState(() => getRandomUserProfile());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [yjsProvider, setYjsProvider] = useState<null | Provider>(null);
  const [activeUsers, setActiveUsers] = useState<ActiveUserProfile[]>([]);

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

  useEffect(() => {
    if (yjsProvider == null) {
      return;
    }

    yjsProvider.awareness.on("update", handleAwarenessUpdate);

    return () => yjsProvider.awareness.off("update", handleAwarenessUpdate);
  }, [yjsProvider, handleAwarenessUpdate]);

  return (
    <div ref={containerRef} className="p-4">
      <p>
        <b>My Name:</b>{" "}
        <input
          type="text"
          value={userProfile.name}
          onChange={(e) =>
            setUserProfile((profile) => ({ ...profile, name: e.target.value }))
          }
        />{" "}
        <input
          type="color"
          value={userProfile.color}
          onChange={(e) =>
            setUserProfile((profile) => ({ ...profile, color: e.target.value }))
          }
        />
      </p>
      <p>
        <b>Active users!:</b>{" "}
        {activeUsers.map(({ name, color, userId }, idx) => (
          <Fragment key={userId}>
            <span style={{ color }}>{name}</span>
            {idx === activeUsers.length - 1 ? "" : ", "}
          </Fragment>
        ))}
      </p>
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
                params: pubnubConfig,
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
          username={userProfile.name}
          cursorColor={userProfile.color}
          cursorsContainerRef={containerRef}
        />
        <Editor />
      </LexicalComposer>
    </div>
  );
}
