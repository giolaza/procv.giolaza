import { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import CvWizardLayout from '@/layouts/CvWizardLayout';
import WizardNav from '@/components/WizardNav';
import AutocompleteInput from '@/components/AutocompleteInput';
import { SKILLS, SKILLS_WITH_CATEGORY, SKILL_CATEGORIES } from '@/data/skills';
import { LANGUAGES } from '@/data/languages';

const SKILL_LEVELS = [
    { value: 'beginner',     label: 'Beginner',     color: '#6B7280' },
    { value: 'intermediate', label: 'Intermediate', color: '#0EA5E9' },
    { value: 'advanced',     label: 'Advanced',     color: '#7b00e0' },
    { value: 'expert',       label: 'Expert',       color: '#059669' },
];

const LANGUAGE_LEVELS = ['A1','A2','B1','B2','C1','C2','Native'];

const LEVEL_COLORS = {
    beginner: '#6B7280', intermediate: '#0EA5E9',
    advanced: '#7b00e0', expert: '#059669',
    A1: '#6B7280', A2: '#6B7280', B1: '#0EA5E9', B2: '#0EA5E9',
    C1: '#7b00e0', C2: '#7b00e0', Native: '#059669',
};

function categoryForSkill(name) {
    return SKILLS_WITH_CATEGORY.find(s => s.name.toLowerCase() === name.toLowerCase())?.category ?? 'Other';
}

export default function Step4({ cv, step, totalSteps }) {
    const { data, setData, post, processing, errors } = useForm({
        skills: cv.skills?.length
            ? cv.skills.map(s => ({ id: s.id, name: s.name ?? '', category: s.category ?? 'Other', level: s.level ?? '' }))
            : [],
        languages: cv.languages?.length
            ? cv.languages.map(l => ({ id: l.id, name: l.name ?? '', level: l.level ?? '' }))
            : [],
    });

    function submit(e) {
        e.preventDefault();
        post(route('cv.step.save', { cv: cv.id, step }));
    }

    function addSkill(name, level) {
        if (!name.trim()) return;
        const known = SKILLS_WITH_CATEGORY.find(s => s.name.toLowerCase() === name.trim().toLowerCase());
        setData('skills', [...data.skills, { id: null, name: name.trim(), category: known?.category ?? '', level }]);
    }

    function removeSkill(i) {
        setData('skills', data.skills.filter((_, idx) => idx !== i));
    }

    function updateSkillLevel(i, level) {
        setData('skills', data.skills.map((s, idx) => idx === i ? { ...s, level } : s));
    }

    function addLanguage(name, level) {
        if (!name.trim()) return;
        setData('languages', [...data.languages, { id: null, name: name.trim(), level }]);
    }

    function removeLanguage(i) {
        setData('languages', data.languages.filter((_, idx) => idx !== i));
    }

    function updateLanguageLevel(i, level) {
        setData('languages', data.languages.map((l, idx) => idx === i ? { ...l, level } : l));
    }

    // Group by category; empty category = custom/ungrouped
    const grouped = {};
    const ungrouped = [];
    data.skills.forEach((s, i) => {
        if (!s.category) { ungrouped.push({ ...s, _i: i }); return; }
        if (!grouped[s.category]) grouped[s.category] = [];
        grouped[s.category].push({ ...s, _i: i });
    });

    return (
        <CvWizardLayout step={step} totalSteps={totalSteps} cv={cv}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'var(--font-d)' }}>
                Skills & Languages
            </h1>
            <p style={{ color: 'var(--fg-muted)', marginBottom: '2rem' }}>
                Add your skills and languages — click a chip to change the level.
            </p>

            <form onSubmit={submit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

                {/* ── Skills ── */}
                <section>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--fg)' }}>Skills</h2>

                    {/* Grouped chips */}
                    {(Object.keys(grouped).length > 0 || ungrouped.length > 0) && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.25rem' }}>
                            {SKILL_CATEGORIES.filter(c => grouped[c]).map(cat => (
                                <div key={cat}>
                                    <div style={{
                                        fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
                                        letterSpacing: '0.08em', color: 'var(--fg-muted)', marginBottom: '0.6rem',
                                    }}>{cat}</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {grouped[cat].map(skill => (
                                            <SkillChip key={skill._i} skill={skill}
                                                onLevelChange={level => updateSkillLevel(skill._i, level)}
                                                onRemove={() => removeSkill(skill._i)} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {ungrouped.length > 0 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {ungrouped.map(skill => (
                                        <SkillChip key={skill._i} skill={skill}
                                            onLevelChange={level => updateSkillLevel(skill._i, level)}
                                            onRemove={() => removeSkill(skill._i)} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <SkillAdder onAdd={addSkill} existing={data.skills.map(s => s.name)} />
                    {errors['skills'] && <p style={{ color: '#e05555', fontSize: '0.8rem', marginTop: 6 }}>{errors['skills']}</p>}
                </section>

                <div style={{ borderTop: '1px solid var(--rule)' }} />

                {/* ── Languages ── */}
                <section>
                    <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--fg)' }}>Languages</h2>

                    {data.languages.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                            {data.languages.map((lang, i) => (
                                <LangChip
                                    key={i}
                                    lang={lang}
                                    onLevelChange={level => updateLanguageLevel(i, level)}
                                    onRemove={() => removeLanguage(i)}
                                />
                            ))}
                        </div>
                    )}

                    <LangAdder onAdd={addLanguage} existing={data.languages.map(l => l.name)} />
                </section>

                <WizardNav cv={cv} step={step} processing={processing} />
            </form>
        </CvWizardLayout>
    );
}

function SkillChip({ skill, onLevelChange, onRemove }) {
    const [open, setOpen] = useState(false);
    const color = LEVEL_COLORS[skill.level] ?? 'var(--fg-muted)';

    return (
        <div style={{ position: 'relative', display: 'inline-flex' }}>
            <div
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 8px 5px 12px',
                    background: 'var(--bg2)', border: '1px solid var(--rule)',
                    borderRadius: 99, cursor: 'pointer',
                    fontSize: '0.85rem', fontWeight: 500, color: 'var(--fg)',
                    transition: 'border-color 0.15s',
                }}
                onClick={() => setOpen(o => !o)}
            >
                {skill.level && (
                    <span style={{
                        width: 7, height: 7, borderRadius: '50%',
                        background: color, flexShrink: 0,
                    }} />
                )}
                {skill.name}
                {skill.level && (
                    <span style={{ fontSize: '0.72rem', color, fontWeight: 600 }}>
                        {SKILL_LEVELS.find(l => l.value === skill.level)?.label}
                    </span>
                )}
                <button
                    type="button"
                    onClick={e => { e.stopPropagation(); onRemove(); }}
                    style={{
                        background: 'none', border: 'none', padding: 0,
                        cursor: 'pointer', color: 'var(--fg-muted)',
                        display: 'flex', alignItems: 'center', lineHeight: 1,
                        marginLeft: 2,
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            {open && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0,
                    background: 'var(--bg2)', border: '1px solid var(--rule)',
                    borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    padding: '6px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 140,
                }}>
                    {SKILL_LEVELS.map(l => (
                        <button
                            key={l.value}
                            type="button"
                            onClick={() => { onLevelChange(l.value); setOpen(false); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '6px 10px', borderRadius: 6, border: 'none',
                                background: skill.level === l.value ? 'var(--bg3)' : 'transparent',
                                cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500,
                                color: l.color, textAlign: 'left',
                            }}
                        >
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: l.color, flexShrink: 0 }} />
                            {l.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function LangChip({ lang, onLevelChange, onRemove }) {
    const [open, setOpen] = useState(false);
    const color = LEVEL_COLORS[lang.level] ?? 'var(--fg-muted)';

    return (
        <div style={{ position: 'relative', display: 'inline-flex' }}>
            <div
                style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 8px 5px 12px',
                    background: 'var(--bg2)', border: '1px solid var(--rule)',
                    borderRadius: 99, cursor: 'pointer', fontSize: '0.85rem',
                    fontWeight: 500, color: 'var(--fg)',
                }}
                onClick={() => setOpen(o => !o)}
            >
                {lang.level && (
                    <span style={{
                        padding: '1px 6px', borderRadius: 99,
                        background: color + '22', color,
                        fontSize: '0.7rem', fontWeight: 700,
                    }}>
                        {lang.level}
                    </span>
                )}
                {lang.name}
                <button
                    type="button"
                    onClick={e => { e.stopPropagation(); onRemove(); }}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', marginLeft: 2 }}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            {open && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0,
                    background: 'var(--bg2)', border: '1px solid var(--rule)',
                    borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    padding: '6px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 130,
                }}>
                    {LANGUAGE_LEVELS.map(l => (
                        <button
                            key={l}
                            type="button"
                            onClick={() => { onLevelChange(l); setOpen(false); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '6px 10px', borderRadius: 6, border: 'none',
                                background: lang.level === l ? 'var(--bg3)' : 'transparent',
                                cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500,
                                color: LEVEL_COLORS[l], textAlign: 'left',
                            }}
                        >
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: LEVEL_COLORS[l], flexShrink: 0 }} />
                            {l}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function SkillAdder({ onAdd, existing }) {
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const nameRef = useRef('');

    function handleNameChange(val) {
        nameRef.current = val;
        setName(val);
    }

    function handleAdd() {
        const val = nameRef.current || name;
        if (!val.trim()) return;
        onAdd(val.trim(), level);
        nameRef.current = '';
        setName('');
        setLevel('');
    }

    const filtered = SKILLS.filter(s => !existing.includes(s));

    return (
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px', minWidth: 150 }}>
                <AutocompleteInput
                    value={name}
                    onChange={handleNameChange}
                    suggestions={filtered}
                    placeholder="Add a skill…"
                />
            </div>
            <select
                value={level}
                onChange={e => setLevel(e.target.value)}
                style={{
                    flex: '0 0 150px', height: '45.5px', padding: '0 0.75rem',
                    background: 'var(--bg2)', border: '1px solid var(--rule)',
                    borderRadius: 6, color: level ? 'var(--fg)' : 'var(--fg-muted)',
                    fontSize: '0.875rem', outline: 'none', fontFamily: 'var(--font-b)',
                }}
            >
                <option value="">Level (optional)</option>
                {SKILL_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
            <button
                type="button"
                onClick={handleAdd}
                style={{
                    height: '45.5px', padding: '0 1.25rem', borderRadius: 6,
                    background: 'var(--accent)', color: '#fff', border: 'none',
                    fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                    fontFamily: 'var(--font-b)', whiteSpace: 'nowrap',
                }}
            >
                + Add
            </button>
        </div>
    );
}

function LangAdder({ onAdd, existing }) {
    const [name, setName] = useState('');
    const [level, setLevel] = useState('');
    const nameRef = useRef('');

    function handleNameChange(val) {
        nameRef.current = val;
        setName(val);
    }

    function handleAdd() {
        const val = nameRef.current || name;
        if (!val.trim()) return;
        onAdd(val.trim(), level);
        nameRef.current = '';
        setName(''); setLevel('');
    }

    const filtered = LANGUAGES.filter(l => !existing.includes(l));

    return (
        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px', minWidth: 150 }}>
                <AutocompleteInput
                    value={name}
                    onChange={handleNameChange}
                    suggestions={filtered}
                    placeholder="Add a language…"
                />
            </div>
            <select
                value={level}
                onChange={e => setLevel(e.target.value)}
                style={{
                    flex: '0 0 150px', height: '45.5px', padding: '0 0.75rem',
                    background: 'var(--bg2)', border: '1px solid var(--rule)',
                    borderRadius: 6, color: level ? 'var(--fg)' : 'var(--fg-muted)',
                    fontSize: '0.875rem', outline: 'none', fontFamily: 'var(--font-b)',
                }}
            >
                <option value="">Level (optional)</option>
                {LANGUAGE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <button
                type="button"
                onClick={handleAdd}
                style={{
                    height: '45.5px', padding: '0 1.25rem', borderRadius: 6,
                    background: 'var(--accent)', color: '#fff', border: 'none',
                    fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
                    fontFamily: 'var(--font-b)', whiteSpace: 'nowrap',
                }}
            >
                + Add
            </button>
        </div>
    );
}
