import * as DownshiftLib from 'downshift';
const useCombobox = DownshiftLib.useCombobox;
import { useState } from 'react';

export default function AutocompleteInput({ value, onChange, suggestions, placeholder }) {
    const [items, setItems] = useState([]);

    const { isOpen, getMenuProps, getInputProps, getItemProps, highlightedIndex, setInputValue } =
        useCombobox({
            items,
            inputValue: value,
            onInputValueChange({ inputValue }) {
                onChange(inputValue ?? '');
                const q = (inputValue ?? '').toLowerCase();
                setItems(
                    q.length < 1
                        ? []
                        : suggestions
                            .filter(s => s.toLowerCase().includes(q) && s.toLowerCase() !== q)
                            .slice(0, 8)
                );
            },
            onSelectedItemChange({ selectedItem }) {
                if (selectedItem) {
                    onChange(selectedItem);
                    setInputValue(selectedItem);
                }
            },
            itemToString: i => i ?? '',
        });

    const showMenu = isOpen && items.length > 0;

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <input
                {...getInputProps()}
                placeholder={placeholder}
                autoComplete="off"
                style={{
                    width: '100%', boxSizing: 'border-box',
                    background: 'var(--bg2)', border: '1px solid var(--rule)',
                    borderRadius: showMenu ? '6px 6px 0 0' : 6,
                    padding: '0.6rem 0.75rem',
                    color: 'var(--fg)', fontSize: '0.95rem', outline: 'none',
                    fontFamily: 'var(--font-b)',
                    transition: 'border-color 0.15s',
                }}
            />
            <ul
                {...getMenuProps()}
                style={{
                    display: showMenu ? 'block' : 'none',
                    position: 'absolute', top: '100%', left: 0, right: 0,
                    background: 'var(--bg2)',
                    border: '1px solid var(--rule)', borderTop: 'none',
                    borderRadius: '0 0 6px 6px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    listStyle: 'none', margin: 0, padding: '4px 0',
                    zIndex: 50, maxHeight: 220, overflowY: 'auto',
                }}
            >
                {items.map((item, i) => (
                    <li
                        key={item}
                        {...getItemProps({ item, index: i })}
                        style={{
                            padding: '7px 12px', cursor: 'pointer',
                            fontSize: '0.875rem',
                            color: highlightedIndex === i ? 'var(--fg)' : 'var(--fg-mid)',
                            background: highlightedIndex === i ? 'var(--bg3)' : 'transparent',
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}
