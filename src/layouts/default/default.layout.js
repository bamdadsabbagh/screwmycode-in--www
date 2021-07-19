import React from 'react'
import PropTypes from 'prop-types'
import { HeaderComponent, MetaComponent, TitleComponent } from '../../components'
import { Wrapper, Container } from './default.layout.styles'

const propTypes = {
    'children': PropTypes.oneOfType ([
        PropTypes.element,
        PropTypes.array,
    ]).isRequired,
    'customMeta': PropTypes.bool,
}

const defaultProps = {
    'customMeta': false,
}

/**
 * @param {object} props react props
 * @param {React.ReactElement} props.children react children
 * @param {boolean} [props.customMeta] have your own meta?
 * @returns {React.ReactElement} react component
 */
export function DefaultLayout ({
    children,
    customMeta = defaultProps.customMeta,
}) {

    return (
        <>
            {!customMeta && <MetaComponent/>}
            <HeaderComponent/>
            <Container>
                <TitleComponent/>
                <Wrapper>
                    {children}
                </Wrapper>
            </Container>
        </>
    )

}

DefaultLayout.propTypes = propTypes

DefaultLayout.defaultProps = defaultProps