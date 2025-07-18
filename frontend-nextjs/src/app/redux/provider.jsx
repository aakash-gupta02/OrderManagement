'use client'

import React from 'react'
import { store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './store'

export function ReduxProvider(props) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {props.children}
            </PersistGate>
        </Provider>
    )
}