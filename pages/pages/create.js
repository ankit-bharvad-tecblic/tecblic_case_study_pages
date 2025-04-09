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
        cards: initialPage?.cards ?? [
            { title: '', description: '', link: '' },
            { title: '', description: '', link: '' },
            { title: '', description: '', link: '' },
            { title: '', description: '', link: '' }
        ]
    });

    // Fetch page data if in edit mode
    useEffect(() => {
        if (edit) {
            fetch(`/api/admin/pages/${edit}`)
                .then(res => res.json())
                .then(data => {
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

    // const handleRemoveCard = (index) => {
    //     const updatedCards = [...form.cards];
    //     updatedCards.splice(index, 1);
    //     setForm({ ...form, cards: updatedCards });
    // };

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
        <div className="form-container">
            <h2 className="form-title">
                {edit ? 'Edit Page' : 'Create Page'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="pageTitle" className="form-label">Page Title</label>
                    <input
                        type="text"
                        id="pageTitle"
                        name="pageTitle"
                        value={form.pageTitle}
                        placeholder="Enter page title"
                        className="form-input"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="slug" className="form-label">Page Slug</label>
                    <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={form.slug}
                        placeholder="e.g. canva8-ai"
                        className="form-input"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bannerImage" className="form-label">Banner Image URL</label>
                    <input
                        type="text"
                        id="bannerImage"
                        name="bannerImage"
                        value={form.bannerImage}
                        placeholder="Enter banner image URL"
                        className="form-input"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bannerTitle" className="form-label">Banner Title</label>
                    <input
                        type="text"
                        id="bannerTitle"
                        name="bannerTitle"
                        value={form.bannerTitle}
                        placeholder="Enter banner title"
                        className="form-input"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bannerDescription" className="form-label">Banner Description</label>
                    <textarea
                        id="bannerDescription"
                        name="bannerDescription"
                        value={form.bannerDescription}
                        onChange={handleChange}
                        placeholder="Enter banner description"
                        className="form-textarea"
                        required
                    />
                </div>

                <div>
                    <h2 className="form-title">Content</h2>
                    <EditorCustom
                        form={form}
                        config={{ language: "en" }}
                        handleEditorChange={(event, editor) => {
                            setForm({ ...form, content: editor.getData() });
                        }}
                    />
                </div>
                <div>
                    <h2 className="form-title">Cards</h2>
                    {/* <button
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
                    </button> */}

                    <div className='cards-grid'>

                        {form.cards.map((card, index) => (
                            <div className="card-content">
                                <input
                                    type="text"
                                    name="title"
                                    value={card.title}
                                    placeholder="Card Title"
                                    className="card-input"
                                    onChange={(e) => handleCardChange(e, index)}
                                />
                                <textarea
                                    type="text"
                                    name="description"
                                    value={card.description}
                                    placeholder="Card Description"
                                    className="card-input"
                                    onChange={(e) => handleCardChange(e, index)}
                                />

                                <input
                                    type="text"
                                    name="link"
                                    value={card.link}
                                    placeholder="Link"
                                    className="card-input"
                                    onChange={(e) => handleCardChange(e, index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='btn-con'>
                    <button
                        type="submit"
                        className="submit-button"
                    >
                        {edit ? 'Update Page' : 'Create Page'}
                    </button>
                </div>


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