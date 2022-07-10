import Icon from './Icon/Icon'

const Categories = ({ categoryClickHandler, setActivePage, setExerciseActive, progress }) => {
    const categories = ['food', 'transport', 'clothing', 'body', 'animals']
    return (
        <div>
            {categories.map((category) =>
                <Icon
                    animation={category}
                    category={category}
                    onClick={categoryClickHandler}
                    setActivePage={setActivePage}
                    setExerciseActive={setExerciseActive}
                    progress={progress} />
            )}
        </div>
    );
}

export default Categories;
