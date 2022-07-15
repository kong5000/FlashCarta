import Icon from './Icon/Icon'

const Categories = ({ categoryClickHandler, setActivePage, setExerciseActive, progress }) => {
    return (
        <div className='category-selection'>
            <Icon
                label={'1 - 50'}
                animation={'blue-book'}
                category={'50'}
                onClick={categoryClickHandler}
                setActivePage={setActivePage}
                setExerciseActive={setExerciseActive}
                progress={progress} />
            <div className='icon-row-container'>
                <Icon
                    label={'food'}
                    animation={'food'}
                    category={'food'}
                    onClick={categoryClickHandler}
                    setActivePage={setActivePage}
                    setExerciseActive={setExerciseActive}
                    progress={progress} />
                <Icon
                    label={'clothing'}
                    animation={'clothing'}
                    category={'clothing'}
                    onClick={categoryClickHandler}
                    setActivePage={setActivePage}
                    setExerciseActive={setExerciseActive}
                    progress={progress} />
            </div>
            <Icon
                label={'51 - 100'}
                animation={'red-book'}
                category={'100'}
                onClick={categoryClickHandler}
                setActivePage={setActivePage}
                setExerciseActive={setExerciseActive}
                progress={progress} />
            <div className='icon-row-container'>
                <Icon
                    label={'body'}
                    animation={'body'}
                    category={'body'}
                    onClick={categoryClickHandler}
                    setActivePage={setActivePage}
                    setExerciseActive={setExerciseActive}
                    progress={progress} />
                <Icon
                    label={'transport'}
                    animation={'transport'}
                    category={'transport'}
                    onClick={categoryClickHandler}
                    setActivePage={setActivePage}
                    setExerciseActive={setExerciseActive}
                    progress={progress} />
            </div>
            <Icon
                label={'101 - 151'}
                animation={'brown-book'}
                category={'150'}
                onClick={categoryClickHandler}
                setActivePage={setActivePage}
                setExerciseActive={setExerciseActive}
                progress={progress} />
            <Icon
                label={'animals'}
                animation={'animals'}
                category={'animals'}
                onClick={categoryClickHandler}
                setActivePage={setActivePage}
                setExerciseActive={setExerciseActive}
                progress={progress} />
            <Icon
                label={'151 - 200'}
                animation={'brown-book'}
                category={'200'}
                onClick={categoryClickHandler}
                setActivePage={setActivePage}
                setExerciseActive={setExerciseActive}
                progress={progress} />
        </div>
    );
}

export default Categories;
