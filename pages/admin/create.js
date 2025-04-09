import { useState } from 'react';
import dynamic from 'next/dynamic';

// const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(m => m.CKEditor), { ssr: false });

const Editor = dynamic(() => import("../../components/EditorCustom"), {
    ssr: false,
});


export default function CreatePage() {
    const [form, setForm] = useState({
        pageTitle: '',
        slug: '',
        bannerImage: '',
        content: '<h1>Ankit Tecblic</h1>',
        cards: [{ title: '', description: '', link: '' }]
    });

    const handleChange = (e) => {
        console.log("-------> e", e);
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCardChange = (index, field, value) => {
        const updatedCards = [...form.cards];
        updatedCards[index] = { ...updatedCards[index], [field]: value };
        setForm({ ...form, cards: updatedCards });
    };

    const addCard = () => {
        setForm({
            ...form,
            cards: [...form.cards, { title: '', description: '', link: '' }]
        });
    };

    const removeCard = (index) => {
        const updatedCards = form.cards.filter((_, i) => i !== index);
        setForm({ ...form, cards: updatedCards });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("-------> form", form);
        await fetch('/api/admin/pages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        alert('Page saved!');
    };

    return (
        <div className="max-w-3xl mx-auto p-6 " style={{ padding: "70px" }}>
            <h1 className="text-2xl font-semibold mb-6">Create Page</h1>
            <form onSubmit={handleSubmit} className="space-y-4">


                <input
                    type="text"
                    name="pageTitle"
                    placeholder="Page Title"
                    className="w-full border p-2 input-field"
                    onChange={handleChange}
                />
                <br />
                <input
                    type="text"
                    name="slug"
                    placeholder="Slug (e.g. canva8-ai)"
                    className="w-full border p-2 input-field"
                    onChange={handleChange}
                />

                <br />
                <hr />

                <input
                    type="text"
                    name="bannerImage"
                    placeholder="Banner Image URL"
                    className="w-full border p-2 input-field"
                    onChange={handleChange}
                />

                <br />
                <input
                    type="text"
                    name="bannerTitle"
                    placeholder="Banner Title"
                    className="w-full border p-2 input-field"
                    onChange={handleChange}
                />

                <br />
                <input
                    type="text"
                    name="bannerDescription"
                    placeholder="Banner Description"
                    className="w-full border p-2 input-field"
                    onChange={handleChange}
                />


                <Editor handleEditorChange={(event, editor) => {

                    setForm({ ...form, content: editor.getData() });
                }} form={form} />

                <br />
                <hr />

                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Cards</h2>
                    {form.cards.map((card, index) => (
                        <div key={index} className="border p-4 rounded-lg space-y-2">
                            <input
                                type="text"
                                placeholder="Card Title"
                                className="w-full border p-2 input-field"
                                value={card.title}
                                onChange={(e) => handleCardChange(index, 'title', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Card Description"
                                className="w-full border p-2 input-field"
                                value={card.description}
                                onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Card Link"
                                className="w-full border p-2 input-field"
                                value={card.link}
                                onChange={(e) => handleCardChange(index, 'link', e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => removeCard(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Remove Card
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addCard}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Add Card
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
