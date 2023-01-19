import React from 'react';
import io from 'socket.io-client';
import { SOCKET_IO_URL } from '../api/config';

export const socket = io.connect(SOCKET_IO_URL);
export const SocketContext = React.createContext();
