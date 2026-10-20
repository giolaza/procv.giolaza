import { useForm } from '@inertiajs/react';
import CvWizardLayout from '@/layouts/CvWizardLayout';
import WizardNav from '@/components/WizardNav';
import MonthPicker from '@/components/MonthPicker';
import Field from '@/components/Field';

function emptyEdu() {
    return {
        id: null,
        institution: '',
        degree: '',
        field_of_study: '',
        start_date: '',
        end_date: '',
        is_current: false,
        description: '',
    };
}

export default function Step3({ cv, step, totalSteps }) {
    const { data, setData, post, processing, errors } = useForm({
        educations: cv.educations?.length
            ? cv.educations.map(e => ({
                id: e.id,
                institution: e.institution ?? '',
                degree: e.degree ?? '',
                field_of_study: e.field_of_study ?? '',
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

    function addEdu() {
        setData('educations', [...data.educations, emptyEdu()]);
    }

    function removeEdu(i) {
        setData('educations', data.educations.filter((_, idx) => idx !== i));
    }

    function updateEdu(i, field, value) {
        setData('educations', data.educations.map((edu, idx) =>
            idx === i ? { ...edu, [field]: value } : edu
        ));
    }

    function updateEduMulti(i, fields) {
        setData('educations', data.educations.map((edu, idx) =>
            idx === i ? { ...edu, ...fields } : edu
        ));
    }

    return (
        <CvWizardLayout step={step} totalSteps={totalSteps} cv={cv}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'var(--font-d)' }}>
                Education
            </h1>
            <p style={{ color: 'var(--fg-muted)', marginBottom: '2rem' }}>
                Add your educational background, most recent first.
            </p>

            <form onSubmit={submit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {data.educations.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--fg-muted)', fontSize: '0.9rem', border: '1px dashed var(--rule)', borderRadius: 10 }}>
                        No education added yet — that's okay!
                    </div>
                )}

                {data.educations.map((edu, i) => (
                    <EducationCard
                        key={i}
                        edu={edu}
                        index={i}
                        errors={errors}
                        canRemove={true}
                        onChange={(field, val) => updateEdu(i, field, val)}
                        onChangeMulti={(fields) => updateEduMulti(i, fields)}
                        onRemove={() => removeEdu(i)}
                    />
                ))}

                <button
                    type="button"
                    onClick={addEdu}
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
                    Add education
                </button>

                <WizardNav cv={cv} step={step} processing={processing} />
            </form>
        </CvWizardLayout>
    );
}

function EducationCard({ edu, index, errors, canRemove, onChange, onChangeMulti, onRemove }) {
    const e = (field) => errors[`educations.${index}.${field}`];

    return (
        <div style={{
            background: 'var(--bg2)', border: '1px solid var(--rule)',
            borderRadius: 10, padding: '1.5rem',
            display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Education {index + 1}
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

            <Field label="Institution" error={e('institution')} required inputBg="var(--bg)">
                <input value={edu.institution} onChange={ev => onChange('institution', ev.target.value)} placeholder="e.g. Tbilisi State University" />
            </Field>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field label="Degree" error={e('degree')} inputBg="var(--bg)">
                    <select value={edu.degree} onChange={ev => onChange('degree', ev.target.value)}>
                        <option value="">— Select —</option>
                        <option value="high-school">High School</option>
                        <option value="associate">Associate</option>
                        <option value="bachelor">Bachelor's</option>
                        <option value="master">Master's</option>
                        <option value="doctorate">Doctorate / PhD</option>
                        <option value="certificate">Certificate</option>
                        <option value="bootcamp">Bootcamp</option>
                        <option value="other">Other</option>
                    </select>
                </Field>
                <Field label="Field of study" error={e('field_of_study')} inputBg="var(--bg)">
                    <input value={edu.field_of_study} onChange={ev => onChange('field_of_study', ev.target.value)} placeholder="e.g. Computer Science" />
                </Field>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field label="Start date" error={e('start_date')} required noClone>
                    <MonthPicker value={edu.start_date} onChange={val => onChange('start_date', val)} />
                </Field>
                <Field label="End date" error={e('end_date')} noClone>
                    <MonthPicker
                        value={edu.end_date}
                        onChange={val => onChange('end_date', val)}
                        disabled={edu.is_current}
                        placeholder={edu.is_current ? 'Present' : 'MM / YYYY'}
                    />
                </Field>
            </div>

            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
                <span style={{
                    width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                    border: `2px solid ${edu.is_current ? 'var(--accent)' : 'var(--rule)'}`,
                    background: edu.is_current ? 'var(--accent)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                }}>
                    {edu.is_current && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="2 6 5 9 10 3"/>
                        </svg>
                    )}
                </span>
                <input
                    type="checkbox"
                    checked={edu.is_current}
                    onChange={ev => onChangeMulti({ is_current: ev.target.checked, ...(ev.target.checked ? { end_date: '' } : {}) })}
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--fg-mid)' }}>I currently study here</span>
            </label>

            <Field label="Description" error={e('description')} inputBg="var(--bg)">
                <textarea
                    value={edu.description}
                    onChange={ev => onChange('description', ev.target.value)}
                    placeholder="Achievements, activities, relevant coursework…"
                    rows={3}
                    style={{ resize: 'vertical' }}
                />
            </Field>
        </div>
    );
}
