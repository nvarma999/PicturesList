import React from 'react';
import mountain1 from "../assets/images/Mountain/mountain1.jpg";
import mountain2 from "../assets/images/Mountain/mountain2.jpg";
import mountain3 from "../assets/images/Mountain/mountain3.jpg";
import mountain4 from "../assets/images/Mountain/mountain4.jpg";
import mountain5 from "../assets/images/Mountain/mountain5.jpg";
import mountain6 from "../assets/images/Mountain/mountain6.jpg";
import mountain7 from "../assets/images/Mountain/mountain7.jpg";
import mountain8 from "../assets/images/Mountain/mountain8.jpg";
import beach1 from "../assets/images/Beach/Beach1.jpg";
import beach2 from "../assets/images/Beach/Beach2.jpg";
import beach3 from "../assets/images/Beach/Beach3.jpg";
import beach4 from "../assets/images/Beach/Beach4.jpg";
import beach5 from "../assets/images/Beach/Beach5.jpg";
import beach6 from "../assets/images/Beach/Beach6.jpg";
import bird1 from "../assets/images/Bird/Bird1.jpg";
import bird2 from "../assets/images/Bird/Bird2.jpg";
import bird3 from "../assets/images/Bird/Bird3.jpg";
import bird4 from "../assets/images/Bird/Bird4.jpg";
import bird5 from "../assets/images/Bird/Bird5.jpg";
import bird6 from "../assets/images/Bird/Bird6.jpg";
import bird7 from "../assets/images/Bird/Bird7.jpg";
import bird8 from "../assets/images/Bird/Bird8.jpg";
import food1 from "../assets/images/Food/Food1.jpg";
import food2 from "../assets/images/Food/Food2.jpg";
import food3 from "../assets/images/Food/Food3.jpg";
import food4 from "../assets/images/Food/Food4.jpg";
import food5 from "../assets/images/Food/Food5.jpg";
import food6 from "../assets/images/Food/Food6.jpg";
import food7 from "../assets/images/Food/Food7.jpg";
import './home.css';


export const Home = () => {
    const Default = {
        name: "Mountain",
        images: [
            { img: mountain1, name: "mountain" },
            { img: mountain2, name: "mountain" },
            { img: mountain3, name: "mountain" },
            { img: mountain4, name: "mountain" },
            { img: mountain5, name: "mountain" },
            { img: mountain6, name: "mountain" },
            { img: mountain7, name: "mountain" },
            { img: mountain8, name: "mountain" },
        ]
    }

    const buttonsImage = [
        {
            name: "Mountain",
            images: [
                { img: mountain1, name: "mountain" },
                { img: mountain2, name: "mountain" },
                { img: mountain3, name: "mountain" },
                { img: mountain4, name: "mountain" },
                { img: mountain5, name: "mountain" },
                { img: mountain6, name: "mountain" },
                { img: mountain7, name: "mountain" },
                { img: mountain8, name: "mountain" },
            ]
        },
        {
            name: "Beaches",
            images: [
                { img: beach1, name: "Beaches" },
                { img: beach2, name: "Beaches" },
                { img: beach3, name: "Beaches" },
                { img: beach4, name: "Beaches" },
                { img: beach5, name: "Beaches" },
                { img: beach6, name: "Beaches" },
            ]
        },
        {
            name: "Birds",
            images: [
                { img: bird1, name: "Birds" },
                { img: bird2, name: "Birds" },
                { img: bird3, name: "Birds" },
                { img: bird4, name: "Birds" },
                { img: bird5, name: "Birds" },
                { img: bird6, name: "Birds" },
                { img: bird7, name: "Birds" },
                { img: bird8, name: "Birds" },
            ]
        },
        {
            name: "Food",
            images: [
                { img: food1, name: "Food" },
                { img: food2, name: "Food" },
                { img: food3, name: "Food" },
                { img: food4, name: "Food" },
                { img: food5, name: "Food" },
                { img: food6, name: "Food" },
                { img: food7, name: "Food" }
            ]
        },
    ]
    const [image, setImage] = React.useState(Default);
    const [buttonClick, isButtonClick] = React.useState(true)

    const [searchText, setSearchText] = React.useState("")
    const [searchImage, setSearchImage] = React.useState({});

    const onButton = (name) => {
        setImage(name);
        isButtonClick(true)
    }

    React.useEffect(() => {
        if (searchText) {
            isButtonClick(false)
            const filterdData = buttonsImage.filter((name) => {
                return name.name.toLowerCase().includes(searchText.toLowerCase())
            })
            if (filterdData.length > 0) {
                filterdData.map((fd) =>  setSearchImage(fd))
            } else setSearchImage({})

        } else {
            setImage(Default)
            isButtonClick(true)
        }
    }, [searchText])

    return (
        <>
            <input type="search" placeholder="Search.." onChange={(e) => setSearchText(e.target.value)}></input>

            <div className="buttonName">
                {buttonsImage.map((bi) => {
                    const buttonName = searchText === "" ? bi.name.toLowerCase() === image.name.toLowerCase() : bi.name.toLowerCase() === searchText.toLowerCase();
                    let btn_class = buttonName ? "buttons" : "inActive";
                    return (
                        <input type="button" className={btn_class} value={bi.name} onClick={() => onButton(bi)} />
                    )
                }
                )}
                {buttonClick && searchText === '' &&
                    <h4 className="header">{`${image.name} Pictures`}</h4>
                }
            </div>

            <div className="images">
                {
                    searchText === "" ? buttonClick && image.images.map((img) => {
                        return (
                            <img src={img.img} alt={img.name}></img>
                        )
                    }) : searchImage && searchImage.name ? searchImage.images && searchImage.images.map((img) => {
                        return (
                            <img src={img.img} alt={img.name}></img>
                        )
                    }) : <p className="nofound">No Images Found</p>

                }

            </div>

        </>
    )
}