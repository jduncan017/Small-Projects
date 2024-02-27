import "./MultiSelect.css";
import React, { useCallback } from "react";

// Notes: The dropdown is absolutely positioned as not to interfere with page content
// The box is searchable and users can navigate with keyboard inputs for accessibility
// The list is also sorted for ease of use

const MultiSelect = () => {
  const [items, setItems] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputFilter, setInputFilter] = React.useState("");
  const [highlightIndex, setHighlightIndex] = React.useState(-1);

  // keyboardNavActive and navSource help to separate interactions between mouse nav & keyboard nav
  const [keyboardNavActive, setKeyboardNavActive] = React.useState(false);
  const [navSource, setNavSource] = React.useState("");

  const multiSelectRef = React.useRef(undefined);
  const dropdownRef = React.useRef(undefined);

  React.useEffect(() => {
    setItems([
      { label: "d", value: "d" },
      { label: "a", value: "a" },
      { label: "b", value: "b" },
      { label: "c", value: "c" },
      { label: "f", value: "f" },
      { label: "z", value: "z" },
      { label: "w", value: "w" },
      { label: "p", value: "p" },
    ]);
  }, []);

  function toggleDropdown() {
    setIsOpen((prevOpen) => !prevOpen);
  }

  // displays user selections in dropdown when it's closed
  const selectedItems = items
    .filter((item) => selected.includes(item.value))
    .map((item) => item.label)
    .join(", ");

  function selectItem(item) {
    setSelected((prevSelected) => {
      if (prevSelected.includes(item.value)) {
        return prevSelected.filter((element) => element !== item.value);
      } else {
        return [...prevSelected, item.value];
      }
    });
  }

  // updates inputFilter for dropdown list as the user types (search)
  const handleInputChange = (event) => {
    setHighlightIndex(-1); // this is used for keyboard navigation
    setInputFilter(event.target.value);
    setIsOpen(true);
  };

  // Filters items based on the user input. This is what is rendered in the dropdown
  // Memoized in the case of large datasets to minimize new calculations
  const filteredItems = React.useMemo(() => {
    return items
      .sort((a, b) => a.label.localeCompare(b.label))
      .filter((item) =>
        item.label.toLowerCase().includes(inputFilter.toLowerCase())
      );
  }, [items, inputFilter]);

  // keyboard listeners
  const handleKeyInputs = useCallback(
    (event) => {
      setKeyboardNavActive(true);
      setTimeout(() => setKeyboardNavActive(false), 500);
      setNavSource("keyboard");
      if (
        event.key === "ArrowDown" &&
        highlightIndex < filteredItems.length - 1
      ) {
        event.preventDefault();
        setHighlightIndex((prevState) => prevState + 1);
      } else if (event.key === "ArrowUp" && highlightIndex > 0) {
        event.preventDefault();
        setHighlightIndex((prevState) => prevState - 1);
      } else if (event.key === " " && isOpen && filteredItems[highlightIndex]) {
        event.preventDefault();
        selectItem(filteredItems[highlightIndex]);
      } else if (event.key === "Enter") {
        event.preventDefault();
        setIsOpen(!isOpen);
      } else if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [filteredItems, highlightIndex, isOpen]
  );

  // handles closing the dropdown on outside click
  React.useEffect(() => {
    // this makes sure the dropdown doesn't close when items are clicked
    function handleInputBlur(e) {
      if (isOpen && !multiSelectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleInputBlur);

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleInputBlur);
    };
  }, [isOpen]);

  // ensures that highlighted items remain visible on keyboard nav
  // if the user goes past the edge of the dropbox
  const ensureHighlightedVisible = useCallback(() => {
    if (navSource !== "keyboard") return;
    const dropdownElement = dropdownRef.current;
    const highlightedItemElement =
      dropdownElement.querySelector(".item_highlighted");

    if (!dropdownElement || !highlightedItemElement) return;

    const dropdownTop = dropdownElement.scrollTop;
    const dropdownBottom = dropdownTop + dropdownElement.offsetHeight;
    const itemTop = highlightedItemElement.offsetTop;
    const itemBottom = itemTop + highlightedItemElement.offsetHeight;

    if (itemTop < dropdownTop) {
      dropdownElement.scrollTop = itemTop;
    } else if (itemBottom > dropdownBottom) {
      dropdownElement.scrollTop = itemBottom - dropdownElement.offsetHeight;
    }
  }, [navSource]);

  React.useEffect(() => {
    if (isOpen) {
      ensureHighlightedVisible();
    }
  }, [highlightIndex, ensureHighlightedVisible, isOpen]);

  function handleMouseEnter(index) {
    if (!keyboardNavActive) {
      setHighlightIndex(index);
      setNavSource("mouse");
    }
  }

  return (
    <div className="container" ref={multiSelectRef}>
      <label htmlFor="multiselect">Multi-Select Input</label>
      <input
        className="multiselect"
        value={isOpen ? inputFilter : selectedItems}
        onClick={toggleDropdown}
        onChange={handleInputChange}
        label={"multiselect"}
        placeholder="Select Items"
        onKeyDown={handleKeyInputs}
      />
      {isOpen && (
        <ul
          className="dropdown"
          onMouseEnter={() => setHighlightIndex(-1)}
          ref={dropdownRef}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={item.value}
                className={`item ${
                  selected.includes(item.value) ? "item_selected" : ""
                } ${index === highlightIndex ? "item_highlighted" : ""}`}
                onClick={() => selectItem(item)}
                onMouseEnter={() => handleMouseEnter(index)}
                onKeyDown={handleKeyInputs}
                tabIndex={-1} // this stops arrow keys from scrolling the dropdown
              >
                <input
                  type="checkbox"
                  checked={selected.includes(item.value)}
                  onChange={() => selectItem(item)}
                  onClick={(e) => e.stopPropagation()}
                  id={`checkbox-${item.value}`}
                />
                <label htmlFor={`checkbox-${item.value}`}>{item.label}</label>
              </li>
            ))
          ) : (
            <p className="item item_null">No Items to Display</p> // displays if user filter input matches no items
          )}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
