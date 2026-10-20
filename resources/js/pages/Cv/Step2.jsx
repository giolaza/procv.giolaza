import { useForm } from '@inertiajs/react';
import CvWizardLayout from '@/layouts/CvWizardLayout';
import WizardNav from '@/components/WizardNav';
import LocationInput from '@/components/LocationInput';
import MonthPicker from '@/components/MonthPicker';
import Field from '@/components/Field';

const EMPLOYMENT_TYPES = [
    { value: 'full-time',   label: 'Full-time' },
    { value: 'part-time',   label: 'Part-time' },
    { value: 'freelance',   label: 'Freelance' },
    { value: 'internship',  label: 'Internship' },
    { value: 'contract',    label: 'Contract' },
];

function emptyExp() {
    return {
        id: null,
        position: '',
        company: '',
        employment_type: '',
        location: '',
        start_date: '',
        end_date: '',
        is_current: false,
        description: '',
    };
}

export default function Step2({ cv, step, totalSteps }) {
    const { data, setData, post, processing, errors } = useForm({
        experiences: cv.work_experiences?.length
            ? cv.work_experiences.map(e => ({
                id: e.id,
                position: e.position ?? '',
                company: e.company ?? '',
                employment_type: e.employment_type ?? '',
                location: e.location ?? '',
                start_date: e.start_date ? e.start_date.slice(0, 7) : '',
                end_date: e.end_date ? e.end_date.slice(0, 7) : '',
                is_current: e.is_current ?? false,
                description: e.description ?? '',
            }))
            : [],
    });

    function submit(e) {
        e.preventDefault();
        post(route('cv.step.save', { cv: cv.id, step }));
    }

    function addExp() {
        setData('experiences', [...data.experiences, emptyExp()]);
    }

    function removeExp(i) {
        setData('experiences', data.experiences.filter((_, idx) => idx !== i));
    }

    function updateExp(i, field, value) {
        setData('experiences', data.experiences.map((exp, idx) =>
            idx === i ? { ...exp, [field]: value } : exp
        ));
    }

    function updateExpMulti(i, fields) {
        setData('experiences', data.experiences.map((exp, idx) =>
            idx === i ? { ...exp, ...fields } : exp
        ));
    }

    return (
        <CvWizardLayout step={step} totalSteps={totalSteps} cv={cv}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'var(--font-d)' }}>
                Work experience
            </h1>
            <p style={{ color: 'var(--fg-muted)', marginBottom: '2rem' }}>
                Add your work history, most recent first.
            </p>

            <form onSubmit={submit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {data.experiences.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--fg-muted)', fontSize: '0.9rem', border: '1px dashed var(--rule)', borderRadius: 10 }}>
                        No work experience added yet — that's okay!
                    </div>
                )}

                {data.experiences.map((exp, i) => (
                    <ExperienceCard
                        key={i}
                        exp={exp}
                        index={i}
                        errors={errors}
                        canRemove={true}
                        onChange={(field, val) => updateExp(i, field, val)}
                        onChangeMulti={(fields) => updateExpMulti(i, fields)}
                        onRemove={() => removeExp(i)}
                    />
                ))}

                <button
                    type="button"
                    onClick={addExp}
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        alignSelf: 'flex-start',
                        padding: '0.55rem 1rem', borderRadius: 6,
                        border: '1px dashed var(--accent)',
                        background: 'var(--accent-light)',
                        color: 'var(--accent)', fontSize: '0.875rem',
                        fontWeight: 500, cursor: 'pointer',
                        fontFamily: 'var(--font-b)',
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add position
                </button>

                <WizardNav cv={cv} step={step} processing={processing} />
            </form>
        </CvWizardLayout>
    );
}

function ExperienceCard({ exp, index, errors, canRemove, onChange, onChangeMulti, onRemove }) {
    const e = (field) => errors[`experiences.${index}.${field}`];

    return (
        <div style={{
            background: 'var(--bg2)', border: '1px solid var(--rule)',
            borderRadius: 10, padding: '1.5rem',
            display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Position {index + 1}
                </span>
                {canRemove && (
                    <button type="button" onClick={onRemove} style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--fg-muted)', padding: 4, borderRadius: 4,
                        display: 'flex', alignItems: 'center',
                    }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                        </svg>
                    </button>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field label="Job title" error={e('position')} required inputBg="var(--bg)">
                    <input value={exp.position} onChange={ev => onChange('position', ev.target.value)} placeholder="e.g. Senior Developer" />
                </Field>
                <Field label="Company" error={e('company')} required inputBg="var(--bg)">
                    <input value={exp.company} onChange={ev => onChange('company', ev.target.value)} placeholder="e.g. Acme Corp" />
                </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field label="Employment type" error={e('employment_type')} inputBg="var(--bg)">
                    <select value={exp.employment_type} onChange={ev => onChange('employment_type', ev.target.value)}>
                        <option value="">— Select —</option>
                        {EMPLOYMENT_TYPES.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>
                </Field>
                <Field label="Location" error={e('location')} noClone>
                    <LocationInput
                        value={exp.location}
                        onChange={val => onChange('location', val)}
                    />
                </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field label="Start date" error={e('start_date')} required noClone>
                    <MonthPicker value={exp.start_date} onChange={val => onChange('start_date', val)} />
                </Field>
                <Field label="End date" error={e('end_date')} noClone>
                    <MonthPicker
                        value={exp.end_date}
                        onChange={val => onChange('end_date', val)}
                        disabled={exp.is_current}
                        placeholder={exp.is_current ? 'Present' : 'MM / YYYY'}
                    />
                </Field>
            </div>

            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
                <span style={{
                    width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                    border: `2px solid ${exp.is_current ? 'var(--accent)' : 'var(--rule)'}`,
                    background: exp.is_current ? 'var(--accent)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                }}>
                    {exp.is_current && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="2 6 5 9 10 3"/>
                        </svg>
                    )}
                </span>
                <input
                    type="checkbox"
                    checked={exp.is_current}
                    onChange={ev => onChangeMulti({ is_current: ev.target.checked, ...(ev.target.checked ? { end_date: '' } : {}) })}
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--fg-mid)' }}>I currently work here</span>
            </label>

            <Field label="Description" error={e('description')} inputBg="var(--bg)">
                <textarea
                    value={exp.description}
                    onChange={ev => onChange('description', ev.target.value)}
                    placeholder="Briefly describe your responsibilities and achievements…"
                    rows={3}
                    style={{ resize: 'vertical' }}
                />
            </Field>
        </div>
    );
}

