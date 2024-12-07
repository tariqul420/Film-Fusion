import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useParams } from "react-router-dom";

const SelectGenre = ({ setSelectedOptions, selectedOptions, genres }) => {
    const { id } = useParams()
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const items = [
        { id: 1, name: "Action" },
        { id: 2, name: "Drama" },
        { id: 3, name: "Comedy" },
        { id: 4, name: "Horror" },
        { id: 5, name: "Thriller" },
        { id: 6, name: "Mystery" },
        { id: 7, name: "Romance" },
        { id: 8, name: "Crime" },
    ];

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const isSelected = (item) => {
        return selectedOptions.some(selectedItem => selectedItem.id === item.id);
    };

    const toggleSelection = (item) => {
        if (isSelected(item)) {
            setSelectedOptions(selectedOptions.filter(selectedItem => selectedItem.id !== item.id));
        } else {
            setSelectedOptions([...selectedOptions, item]);
        }
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.closest(".custom-select")) return;
            handleBlur();
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (location.pathname === `/update-movie/${id}`) {
            setSelectedOptions(genres)
        }
    }, [genres, id, setSelectedOptions]);

    return (
        <div className="relative custom-select">
            <input
                type="text"
                placeholder={selectedOptions.length > 0 ? selectedOptions.map(option => option.name).join(', ') : "Select genres (1-3)"}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsOpen(true)}
                className={`py-3 dark:bg-color-primary-d bg-white font-medium px-4 border focus:outline-[#3B82F6] border-gray-300 rounded-lg w-full`}
            />

            <IoIosArrowDown
                className={`${isOpen ? "rotate-[180deg]" : "rotate-0"} transition-all duration-300 text-[1.3rem] absolute top-[10px] right-3 text-gray-500`} />

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute left-0 w-full mt-1 border border-gray-200 rounded-md dark:bg-color-primary-d bg-white shadow-lg z-20">
                    <div className="w-full overflow-auto">
                        {filteredItems.map(item => (
                            <p
                                key={item.id}
                                onClick={() => toggleSelection(item)}
                                className="cursor-pointer px-2 py-1 flex items-center hover:bg-color-accent"
                            >
                                <img
                                    src="https://besnik-space.fra1.cdn.digitaloceanspaces.com/doplac/dYj3EG2tlN8jM29cWxiA1711341238.svg"
                                    alt="checkicon"
                                    className={`${isSelected(item) ? "scale-[1] opacity-100" : "scale-[0.5] opacity-0"} mr-2 transition-all duration-300 w-6 h-6`}
                                />
                                {item.name}
                            </p>
                        ))}

                        {filteredItems?.length === 0 && (
                            <p className="text-center text-[0.9rem] text-text py-8">No search found!</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

SelectGenre.propTypes = {
    selectedOptions: PropTypes.any.isRequired,
    setSelectedOptions: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired
}

export default SelectGenre;
