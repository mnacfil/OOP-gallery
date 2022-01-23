
const get = (targetElement) => {
    const element = document.querySelector(targetElement)
    if(element) return element
    throw new Error ('element does not exist!, please double check.')
}

export default get