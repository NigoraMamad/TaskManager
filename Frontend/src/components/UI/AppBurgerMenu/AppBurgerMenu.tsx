type BurgerMenuProps = {
    id?: string;
    checkboxClass?: string;
    labelClass?: string;
};

const AppBurgerMenu: React.FC<BurgerMenuProps> = ({
    id = 'burger-checkbox',
    checkboxClass = 'burger-checkbox',
    labelClass = 'burger',
}) => {
    return (
        <>
            <input type="checkbox" id={id} className={checkboxClass} />
            <label className={labelClass} htmlFor={id}></label>
        </>
    );
};

export default AppBurgerMenu;