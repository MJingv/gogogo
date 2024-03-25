function Father(name) {
    this.name = name || 'father'
    this.money = 1000
}

Father.prototype.house = 10

function Child(name) {
    Father.call(this)
    this.name = name || 'child'
}

Child.prototype = Object.create(Father.prototype)
Child.prototype.constructor = Child

const f = new Father('f')
const c = new Child('c')
// console.log(c, c.house, c.__proto__, Child.prototype)

const useState = (initVal) => {
    let state = initVal
    const setState = (newVal) => {
        state = newVal
        // render()
    }
    return [state, setState]
}

const [count, setCount] = useState(0)
// console.log(count);
// setCount(1)
// console.log(count)


const Carousel = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, interval);

        return () => {
            clearInterval(timer);
        };
    }, [images.length, interval]);

    return (
        <div className="carousel">
            <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index + 1}`} />
                ))}
            </div>
            <button className="carousel-prev" onClick={handlePrev}>Prev</button>
            <button className="carousel-next" onClick={handleNext}>Next</button>
        </div>
    );
};



