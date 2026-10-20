import { useForm, usePage } from '@inertiajs/react';
import CvWizardLayout from '@/layouts/CvWizardLayout';
import LocationInput from '@/components/LocationInput';
import PhoneInput from '@/components/PhoneInput';
import WizardNav from '@/components/WizardNav';
import Field from '@/components/Field';

export default function Step1({ cv, step, totalSteps }) {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        first_name: cv.first_name ?? auth.user.first_name ?? '',
        last_name:  cv.last_name  ?? auth.user.last_name  ?? '',
        headline:   cv.headline   ?? '',
        location:   cv.location   ?? '',
        email:      cv.email      ?? auth.user.email ?? '',
        phone:      cv.phone      ?? '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('cv.step.save', { cv: cv.id, step }));
    }

    return (
        <CvWizardLayout step={step} totalSteps={totalSteps} cv={cv}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.4rem', fontFamily: 'Oxanium, sans-serif' }}>
                Let's start with the basics
            </h1>
            <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
                This info will appear at the top of your CV.
            </p>

            <form onSubmit={submit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="First name" error={errors.first_name} required>
                        <input
                            value={data.first_name}
                            onChange={e => setData('first_name', e.target.value)}
                            placeholder="John"
                        />
                    </Field>
                    <Field label="Last name" error={errors.last_name} required>
                        <input
                            value={data.last_name}
                            onChange={e => setData('last_name', e.target.value)}
                            placeholder="Doe"
                        />
                    </Field>
                </div>

                <Field label="Headline" error={errors.headline} hint="e.g. Senior Backend Developer">
                    <input
                        value={data.headline}
                        onChange={e => setData('headline', e.target.value)}
                        placeholder="What's your professional title?"
                    />
                </Field>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="Email" error={errors.email}>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            placeholder="john@example.com"
                        />
                    </Field>
                    <Field label="Phone" error={errors.phone} noClone>
                        <PhoneInput
                            value={data.phone}
                            onChange={val => setData('phone', val ?? '')}
                        />
                    </Field>
                </div>

                <Field label="Location" error={errors.location} noClone>
                    <LocationInput
                        value={data.location}
                        onChange={val => setData('location', val)}
                    />
                </Field>

                <WizardNav cv={cv} step={step} processing={processing} />
            </form>
        </CvWizardLayout>
    );
}

