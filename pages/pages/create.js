


import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { connectToDatabase } from '../../lib/mongodb';
import Page from '../../models/Page';

const EditorCustom = dynamic(() => import("../../components/EditorCustom"), {
    ssr: false,
});

export default function CreatePage({ initialPage }) {
    const router = useRouter();
    const { edit } = router.query;

    // const [formData, setFormData] = useState({
    //     title: initialPage?.pageTitle || "",
    //     slug: initialPage?.slug || "",
    //     bannerTitle: initialPage?.bannerTitle || "",
    //     bannerDescription: initialPage?.bannerDescription || "",
    //     content: initialPage?.content || "",
    //     cards: initialPage?.cards || []
    // });

    const [form, setForm] = useState({
        pageTitle: initialPage?.pageTitle ?? '',
        slug: initialPage?.slug ?? '',
        bannerImage: initialPage?.bannerImage ?? '',
        bannerTitle: initialPage?.bannerTitle ?? '',
        bannerDescription: initialPage?.bannerDescription ?? '',
        content: initialPage?.content ?? '',
        cards: initialPage?.cards ?? [{ title: '', description: '', link: '' }]
    });

    // Fetch page data if in edit mode
    useEffect(() => {
        if (edit) {
            console.log("edit --> ", edit)
            fetch(`/api/admin/pages/${edit}`)
                .then(res => res.json())
                .then(data => {
                    console.log("data --> ", data)
                    setForm({
                        pageTitle: data.pageTitle || '',
                        slug: data.slug || '',
                        bannerImage: data.bannerImage || '',
                        bannerTitle: data.bannerTitle || '',
                        bannerDescription: data.bannerDescription || '',
                        content: data.content || '',
                        cards: data.cards?.length ? data.cards : [{ title: '', description: '', link: '' }]
                    });
                })
                .catch(console.error);
        }
    }, [edit]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCardChange = (e, index) => {
        const { name, value } = e.target;
        const updatedCards = [...form.cards];
        updatedCards[index][name] = value;
        setForm({ ...form, cards: updatedCards });
    };

    const handleRemoveCard = (index) => {
        const updatedCards = [...form.cards];
        updatedCards.splice(index, 1);
        setForm({ ...form, cards: updatedCards });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = edit ? 'PUT' : 'POST';
        const url = edit ? `/api/admin/pages/${edit}` : `/api/admin/pages`;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        alert(`Page ${edit ? 'updated' : 'created'} successfully!`);
        router.push('/pages');
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">
                {edit ? 'Edit Page' : 'Create Page'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="pageTitle"
                    value={form.pageTitle}
                    placeholder="Page Title"
                    className="w-full border p-2"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    placeholder="Slug (e.g. canva8-ai)"
                    className="w-full border p-2"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bannerImage"
                    value={form.bannerImage}
                    placeholder="Banner Image URL"
                    className="w-full border p-2"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bannerTitle"
                    value={form.bannerTitle}
                    placeholder="Banner Title"
                    className="w-full border p-2"
                    onChange={handleChange}
                />
                <textarea
                    name="bannerDescription"
                    value={form.bannerDescription}
                    onChange={handleChange}
                    placeholder="Banner Description"
                    className="w-full border p-2"
                    rows="3"
                    required
                />
                <div>
                    <h6 className="text-xl font-semibold mb-4">Content</h6>
                    <EditorCustom
                        form={form}
                        config={{ language: "en" }}
                        handleEditorChange={(event, editor) => {
                            setForm({ ...form, content: editor.getData() });
                        }}
                    />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Cards</h2>
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                        onClick={() =>
                            setForm({
                                ...form,
                                cards: [...form.cards, { title: '', description: '', link: '' }]
                            })
                        }
                    >
                        Add Card
                    </button>

                    {form.cards.map((card, index) => (
                        <div key={index} className="border p-4 rounded-lg mb-4 space-y-2">
                            <input
                                type="text"
                                name="title"
                                value={card.title}
                                placeholder="Card Title"
                                className="w-full border p-2"
                                onChange={(e) => handleCardChange(e, index)}
                            />
                            <input
                                type="text"
                                name="description"
                                value={card.description}
                                placeholder="Card Description"
                                className="w-full border p-2"
                                onChange={(e) => handleCardChange(e, index)}
                            />
                            <input
                                type="text"
                                name="link"
                                value={card.link}
                                placeholder="Link"
                                className="w-full border p-2"
                                onChange={(e) => handleCardChange(e, index)}
                            />
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => handleRemoveCard(index)}
                            >
                                Remove Card
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {edit ? 'Update Page' : 'Create Page'}
                </button>
            </form>
        </div>
    );
}




export async function getServerSideProps(context) {
    await connectToDatabase();
    const { edit } = context.query;


    if (edit) {
        const page = await Page.findById(edit).lean();
        if (page) {
            // Convert _id and date fields to strings
            page._id = page._id.toString();
            page.createdAt = page.createdAt?.toISOString() || null;
            page.updatedAt = page.updatedAt?.toISOString() || null;

            // Convert card _id fields to strings if they exist
            if (page.cards && Array.isArray(page.cards)) {
                page.cards = page.cards.map(card => ({
                    ...card,
                    _id: card._id ? card._id.toString() : null
                }));
            }

            return { props: { initialPage: page } };
        }
    }

    return { props: { initialPage: null } };
} 