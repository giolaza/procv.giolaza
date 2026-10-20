import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function MonthPicker({ value, onChange, disabled, placeholder = 'MM / YYYY' }) {
    const date = value ? new Date(`${value}-01`) : null;

    function handleChange(d) {
        if (!d) { onChange(''); return; }
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        onChange(`${y}-${m}`);
    }

    return (
        <div className="mp-wrap">
            <DatePicker
                selected={date}
                onChange={handleChange}
                dateFormat="MM / yyyy"
                showMonthYearPicker
                showFourColumnMonthYearPicker
                placeholderText={placeholder}
                disabled={disabled}
                autoComplete="off"
            />
            <style>{`
                .mp-wrap .react-datepicker-wrapper,
                .mp-wrap .react-datepicker__input-container {
                    display: block;
                    width: 100%;
                }
                .mp-wrap .react-datepicker__input-container input {
                    width: 100%;
                    height: 45.5px;
                    padding: 0.6rem 0.75rem;
                    background: var(--bg2);
                    border: 1px solid var(--rule);
                    border-radius: 6px;
                    color: var(--fg);
                    font-size: 0.95rem;
                    font-family: var(--font-b);
                    box-sizing: border-box;
                    outline: none;
                    cursor: pointer;
                    transition: border-color 0.15s;
                }
                .mp-wrap .react-datepicker__input-container input:focus {
                    border-color: var(--accent);
                }
                .mp-wrap .react-datepicker__input-container input:disabled {
                    opacity: 0.4;
                    cursor: default;
                }
                .mp-wrap .react-datepicker-popper {
                    z-index: 100;
                }
                .mp-wrap .react-datepicker {
                    background: var(--bg2);
                    border: 1px solid var(--rule);
                    border-radius: 8px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
                    font-family: var(--font-b);
                    overflow: hidden;
                }
                .mp-wrap .react-datepicker__header {
                    background: var(--bg3);
                    border-bottom: 1px solid var(--rule);
                    padding: 10px 0 8px;
                }
                .mp-wrap .react-datepicker__current-month,
                .mp-wrap .react-datepicker-year-header {
                    color: var(--fg);
                    font-size: 0.9rem;
                    font-weight: 600;
                }
                .mp-wrap .react-datepicker__navigation-icon::before {
                    border-color: var(--fg-muted);
                }
                .mp-wrap .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
                    border-color: var(--fg);
                }
                .mp-wrap .react-datepicker__month-wrapper {
                    display: flex;
                }
                .mp-wrap .react-datepicker__month-text {
                    color: var(--fg-mid);
                    padding: 6px 8px;
                    border-radius: 5px;
                    font-size: 0.85rem;
                    margin: 2px;
                }
                .mp-wrap .react-datepicker__month-text:hover {
                    background: var(--bg3);
                    color: var(--fg);
                }
                .mp-wrap .react-datepicker__month-text--selected,
                .mp-wrap .react-datepicker__month-text--keyboard-selected {
                    background: var(--accent) !important;
                    color: #fff !important;
                }
            `}</style>
        </div>
    );
}
