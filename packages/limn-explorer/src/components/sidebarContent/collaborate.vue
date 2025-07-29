<script setup lang="ts">
import Button from '../ui/button/Button.vue';
import SidebarGroup from '../ui/sidebar/SidebarGroup.vue';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { ref } from 'vue';
import ConnectToSession from '../dialog/connectToSession.vue';
import { MonacoBinding } from 'y-monaco';



// const URL = "http://localhost:8787"
// const WS = "ws://localhost:8787/ws"

// FIXME: move to configuration. For now it's fine as it's just test but should be setup directly via ingress
const URL = "https://backend.white-hill-ede6.workers.dev"
const WS = "wss://backend.white-hill-ede6.workers.dev/ws"
// FIXME: use something better
function generateUserColor() {
                const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];
                return colors[Math.floor(Math.random() * colors.length)];
            }

// FIXME: this should not be as a part of destructable sidebar

const connection = ref({
    isConnected: false,
    sessionId: ''
})

async function createSession() {
    console.log('Creating session')
    const response = await fetch(`${URL}/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Connection failed')
        return
    }
    const data: { sessionId: string } = await response.json()
    const { sessionId } = data
    // const url = new (URL as any)(window.location);
    // url.searchParams.set('session', sessionId);
    // window.history.replaceState({}, '', url);
    await connectToSession(sessionId, true)
}

async function connectToSession(sessionId: string, isHost: boolean = false) {
    const response = await fetch(`${URL}/sessions/${sessionId}`);
    if (!response.ok) {
        throw new Error('Session not found');
    }

    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(`${WS}/`, sessionId, ydoc);
    const awareness = provider.awareness
    const userColor = generateUserColor();
    const userName = `User-${Math.floor(Math.random() * 1000)}`;
    
    awareness.setLocalStateField('user', {
        name: userName,
        color: userColor
    });

    // const editor = monacoEditor.value


    const LIMN_EDITOR = window.LIMN_EDITOR

    if (!LIMN_EDITOR) {
        return 
    }

    const ytext = ydoc.getText('monaco');

    if (isHost) {
        ytext.insert(0, (LIMN_EDITOR as any).getValue())
    }

    const binding = new MonacoBinding(ytext, (LIMN_EDITOR as any).getModel(), new Set([LIMN_EDITOR as any]), awareness);

    // provider.on('status', (event) => {
    //     console.log('Provider status:', event.status);
    //     // this.updateConnectionStatus(event.status === 'connected');
    // });

    // // Awareness events for user tracking
    // awareness.on('change', () => {
    //     console.log('update awareness')
    //     // this.updateUserAwareness();
    // });

    // // Document sync events
    // ydoc.on('update', () => {
    //     console.log('Document updated');
    // });


    connection.value = {
        isConnected: true,
        sessionId: sessionId
    }


    // FIXME: provide this higher up so editor can handle.
}

async function onConnect(data: any) {
    const sessionId = data.sessionId
    if (!sessionId) {
        return
    }
    await connectToSession(sessionId)
}

</script>

<template>
    <SidebarGroup>
    <div v-if="!connection.isConnected">
        <div class="flex w-full items-center justify-between p-1">
                <Button @click="createSession">Start Session</Button>
        </div>
        <ConnectToSession @submit="onConnect" />
    </div>
    <div v-if="connection.isConnected">
        Connected<br/>{{ connection.sessionId }}
    </div>
    </SidebarGroup>
</template>
