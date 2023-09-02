import React from "react"
import { ViewedSection, SlideBox, SlideContainer, SlideSection, ViewedList, PopularSection, SectionTitle, PopularList } from "./Home.styled"
import ItemCard from "components/ItemCard/ItemCard"

const items=[
    {id:'1',
    image:'https://fikiwiki.com/uploads/posts/2022-02/1645013281_1-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-1.jpg',
    name:'first',
    price:'1200'
    },
    {id:'2',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013267_2-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-2.jpg',
    name:'second',
    price:'1400'
    },
    {id:'3',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013246_3-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-3.jpg',
    name:'third',
    price:'1500'
    },
    {id:'4',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013309_4-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-4.jpg',
    name:'fourth',
    price:'1600'
    }
]

const itemsPopular=[
    {id:'1',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013226_18-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-23.jpg',
    name:'first',
    price:'1200'
    },
    {id:'2',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013289_15-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-20.jpg',
    name:'second',
    price:'1400'
    },
    {id:'3',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013245_16-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-21.jpg',
    name:'third',
    price:'1500'
    },
    {id:'4',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013260_5-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-6.jpg',
    name:'fourth',
    price:'1600'
    },
    {id:'5',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013317_27-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-35.jpg',
    name:'first',
    price:'1200'
    },
    {id:'6',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013249_21-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-29.jpg',
    name:'second',
    price:'1400'
    },
    {id:'7',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013301_22-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-30.jpg',
    name:'third',
    price:'1500'
    },
    {id:'8',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013235_9-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-13.jpg',
    name:'fourth',
    price:'1600'
    },
    {id:'9',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013307_23-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-31.jpg',
    name:'first',
    price:'1200'
    },
    {id:'10',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013268_11-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-15.jpg',
    name:'second',
    price:'1400'
    },
    {id:'11',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013291_24-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-32.jpg',
    name:'third',
    price:'1500'
    },
    {id:'12',
    image:'https://fikiwiki.com/uploads/posts/2022-02/thumbs/1645013242_25-fikiwiki-com-p-ochen-krasivie-kartinki-skachat-33.jpg',
    name:'fourth',
    price:'1600'
    }
]


const Home:React.FC=()=>{
return(
    <main>
        <SlideSection className="container">
            <SlideContainer >
                <SlideBox/>
            </SlideContainer>
        </SlideSection>
        <ViewedSection className="container">
            <SectionTitle>Нещодавно переглянуті товари</SectionTitle>
            <ViewedList>
                {items.map(item=>(<ItemCard key={item.id} path={item.image} name={item.name} price={item.price}/>))}
            </ViewedList>
        </ViewedSection>
        <PopularSection className="container">
            <SectionTitle>Популярні товари</SectionTitle>
            <PopularList>
                {itemsPopular.map(item=>(<ItemCard key={item.id} path={item.image} name={item.name} price={item.price}/>))}
            </PopularList>
        </PopularSection>
    </main>
)
}

export default Home 