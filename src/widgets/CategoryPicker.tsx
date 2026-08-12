import { useEffect, useRef, useState } from "react";
import type { SoundCategory } from "../aliases/sound-category";
import ArrowDownIcon from "../svg/arrow-down-icon";

function CategoryPicker({
    defaultCategoryID,
    onCategoryChoosen,
    categories,
}: {
    defaultCategoryID: number | null,
    onCategoryChoosen: (category: SoundCategory | null) => void;
    categories: Array<SoundCategory> | undefined;
}) {
    const [choosenCategory, setChosenCategory] = useState<SoundCategory | null>(
        null,
    );
    const [selectOpen, setSelectOpen] = useState<boolean>(false);

    const categoryPickerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (defaultCategoryID != null && categories) {
            let tempFind = categories.find(c => c.category_id === defaultCategoryID) || null
            setChosenCategory(tempFind);
            onCategoryChoosen(tempFind);
        }
        const detectClickingOutside = (event: Event) => {
            if (categoryPickerRef.current == null) return;
            const withinBoundaries = event
                .composedPath()
                .includes(categoryPickerRef.current);

            if (!withinBoundaries) {
                setSelectOpen(false);
            }
        };

        document.addEventListener("click", detectClickingOutside);

        return () => {
            document.removeEventListener("click", detectClickingOutside);
        };
    }, [categories]);

    return (
        <div ref={categoryPickerRef} className="category-picker">
            <button
                className="category-button"
                style={{
                    borderRadius: selectOpen ? "30px 30px 0 0" : "50px",
                }}
                onClick={() => {
                    setSelectOpen(prev => !prev);
                }}
            >
                <span className="category-button-text">
                    {choosenCategory == null
                        ? "Kategoria"
                        : choosenCategory.name}
                </span>

                <ArrowDownIcon />
            </button>

            <div className={`category-select ${selectOpen ? "open" : ""}`}>
                {categories?.map((category, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setChosenCategory(category);
                            onCategoryChoosen(category);
                            setSelectOpen(false);
                        }}
                        className="category-select-option"
                    >
                        {category.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPicker;
