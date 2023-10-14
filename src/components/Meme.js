import React, {useState, useEffect} from "react";

import './Meme.css'

function Meme()
{
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        url: ""
    }) // state to update the screen with new meme.

    const [memesData, setMemesData] = useState([]); // state to fetch the data from url.

    // Managing side effects.
    // The useEffect() will run only after the DOM is rendered on the page.
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => {
                setMemesData(data.data.memes);
            });
    }, []); // Empty dependency array to fetch data only once on component mount.

    // If you replace the empty dependency with an array that the client changes from render to render (E. G. a state), the useEffect() will run everytime there was a change in that array / state because it will compare the old value of that array / state with the new value and will trigger re-render.

    // Without the dependency, the useEffect() will run every time the Meme Component re-renders.

    // Learn more about clean-up function and removing the effect made in the useEffect().

    // console.log(memesData) // The array with the memes fetched at each run of the app.

    let url

    function getMemeImage(event)
    {
        const randomNumber = Math.floor(Math.random() * memesData.length);
        url = memesData[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            url: url
        }))

        console.log(meme); // working
    }

    // console.log(url); // not working because fetch is async.

    function handleChange(event)
    {
        const {name, value} = event.target
        setMeme(prevMeme => 
        ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    className="form-input"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                /> 
                <input 
                    type="text"
                    className="form-input"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                /> 
                <button 
                    className="form-button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 📺
                </button>
            </div>
            <div className="meme">
                <img src={meme.url} className="meme-image" alt="meme"/>
                <h2 className="meme-text-top">{meme.topText}</h2>
                <h2 className="meme-text-bottom">{meme.bottomText}</h2>
            </div>
        </main> 
    )
}

export default Meme;