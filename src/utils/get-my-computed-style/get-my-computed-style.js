/**
 * @param {HTMLElement} element HTML element with inline style attribute
 * @param {string} property css property
 * @returns {string} without 'px'
 */
export function getMyComputedStyle (element, property) {

    if (!(element instanceof HTMLElement)) throw new Error ('element is not an HTMLElement')

    if (typeof property !== 'string') throw new Error ('property is not a string')
    
    const styles = window.getComputedStyle (element, null)
    const propertyValue = styles.getPropertyValue (property)

    if (propertyValue === '') throw new Error ('property has no value')

    return propertyValue.replace ('px', '')

}