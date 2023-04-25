import React from 'react'

const Styles = () => {

    const updateDesign = (ev) => {
        document.querySelector('.App').className="App"
        if (ev.target.value !== "Default") {
            document.querySelector('.App').classList.add(ev.target.value)
        }
    }

    return (
        <div>
            <select onChange={updateDesign}>
                <option>Default</option>
                <option value="design_marie">Plup</option>
                <option value="design_vincent">Peupeuche</option>
                <option value="design_dorian">Sourcils</option>
            </select>
        </div>
    )
}

export default Styles
