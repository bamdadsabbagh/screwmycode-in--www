import React from 'react'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from 'styled-components'
import { ThemeStyles } from '../src/styles/theme.styles'

/**
 * @function
 * @name JestWrapper
 * @description jest: wrapper with recoil and styled-components for tests
 * @param {React.ReactElement} Component - react sub component
 * @returns {React.ReactElement} - react component
 */
export function JestWrapper (Component) {

    return (
        <RecoilRoot>
            <ThemeProvider theme={ThemeStyles}>
                {Component}
            </ThemeProvider>
        </RecoilRoot>
    )

}