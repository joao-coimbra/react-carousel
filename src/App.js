import Carousel from './components/carousel.component'

import img1 from './assets/1.jpg'
import img2 from './assets/2.jpg'
import img3 from './assets/3.jpg'

function App() {

    const banners = [
        {
            img: img1,
            legend: 'Acesse nossos produtos',
            link: 'https://google.com.br'
        },
        {
            img: img2,
            link: 'https://uol.com.br'
        },
        {
            img: img3,
            legend: 'Outra legenda'
        },
        {
            img: img1,
            legend: 'Acesse nossos produtos',
            link: 'https://google.com.br'
        },
        {
            img: img2,
            link: 'https://uol.com.br'
        },
        {
            img: img3,
            legend: 'Outra legenda'
        }
    ]

    return (
        <section>
            <Carousel
                banners={banners}
                showArrows
                showButtons
                autoSlider
                speed={700}
            />
        </section>
        
    );
}

export default App;
