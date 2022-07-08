import Icon from './Icon/Icon'
import NavbarButton from './NavbarButton/NavbarButton';
const Categories = ({ categoryClickHandler }) => {
    return (
        <div>
            <NavbarButton category={"shop"} onClick={() => { alert('button clicked') }} />

            <Icon animation="locked" progress={10} />
            <Icon animation="food" category="food" onClick={categoryClickHandler} progress={50} />
            <Icon animation="transport" category="transport" onClick={categoryClickHandler} progress={75} />
            <Icon animation="clothing" category="clothing" onClick={categoryClickHandler} progress={100} />
            <Icon animation="body" category="body" onClick={categoryClickHandler} progress={100} />
            <Icon animation="animals" category="animals" onClick={categoryClickHandler} progress={100} />
            <Icon animation="red-book" progress={100} />
            <Icon animation="blue-book" progress={100} />
            <Icon animation="brown-book" progress={100} />
            <Icon animation="black-book" progress={100} />
        </div>
    );
}

export default Categories;
