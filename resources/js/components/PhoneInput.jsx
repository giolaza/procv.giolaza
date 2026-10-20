import PhoneInputLib from 'react-country-phone-input';
import 'react-country-phone-input/lib/style.css';
const ReactPhoneInput = PhoneInputLib.default ?? PhoneInputLib;

export default function PhoneInput({ value, onChange }) {
    return (
        <div className="ph-wrap">
            <ReactPhoneInput
                country="ge"
                value={value?.replace('+', '') ?? ''}
                onChange={(phone) => onChange(phone ? `+${phone}` : '')}
                enableSearch
                enableAreaCodes={false}
                searchPlaceholder="Search country..."
                inputProps={{ name: 'phone', autoComplete: 'off' }}
                containerStyle={{ fontFamily: 'var(--font-b)', width: '100%' }}
                inputStyle={{
                    width: '100%',
                    height: '45.5px',
                    padding: '0 0.75rem 0 52px',
                    background: 'var(--bg2)',
                    border: '1px solid var(--rule)',
                    borderRadius: 6,
                    color: 'var(--fg)',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-b)',
                    boxSizing: 'border-box',
                }}
                buttonStyle={{
                    height: '45.5px',
                    background: 'var(--bg2)',
                    border: '1px solid var(--rule)',
                    borderRight: 'none',
                    borderRadius: '6px 0 0 6px',
                }}
            />
            <style>{`
                .ph-wrap .react-tel-input .form-control:focus {
                    border-color: var(--accent) !important;
                    outline: none;
                    box-shadow: none;
                }
                .ph-wrap .react-tel-input .form-control::placeholder {
                    color: var(--fg-muted);
                    opacity: 1;
                }
                .ph-wrap .react-tel-input .flag-dropdown:hover,
                .ph-wrap .react-tel-input .flag-dropdown.open {
                    background: var(--bg3) !important;
                }
                .ph-wrap .react-tel-input .country-list {
                    background: var(--bg2);
                    border: 1px solid var(--rule);
                    border-radius: 6px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
                    margin-top: 2px;
                    max-height: 220px;
                    font-family: var(--font-b);
                    font-size: 0.875rem;
                }
                .ph-wrap .react-tel-input .country-list .country {
                    padding: 7px 12px;
                    color: var(--fg-mid);
                }
                .ph-wrap .react-tel-input .country-list .country:hover,
                .ph-wrap .react-tel-input .country-list .country.highlight {
                    background: var(--bg3);
                    color: var(--fg);
                }
                .ph-wrap .react-tel-input .country-list .search {
                    background: var(--bg2);
                    padding: 8px 10px;
                    position: sticky;
                    top: 0;
                }
                .ph-wrap .react-tel-input .country-list .search-box {
                    width: 100%;
                    padding: 5px 8px;
                    background: var(--bg);
                    border: 1px solid var(--rule);
                    border-radius: 4px;
                    color: var(--fg);
                    font-size: 0.8rem;
                    font-family: var(--font-b);
                    outline: none;
                }
                .ph-wrap .react-tel-input .country-list .dial-code {
                    color: var(--fg-muted);
                }
            `}</style>
        </div>
    );
}
